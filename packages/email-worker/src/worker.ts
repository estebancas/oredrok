import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

interface Env {
	SEB: any; // Send Email Binding
	RECIPIENT_EMAIL: string;
	FROM_EMAIL: string;
}

interface ContactFormData {
	name: string;
	email: string;
	projectType?: string;
	budget?: string;
	message: string;
	agreedToTerms: boolean;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize user input
function sanitizeInput(input: string): string {
	return input
		.trim()
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.slice(0, 5000); // Limit length
}

// Create plain text email
function createEmailText(data: ContactFormData, ipAddress: string): string {
	return `
NEW CONTACT FORM SUBMISSION
===========================

Name: ${sanitizeInput(data.name)}
Email: ${sanitizeInput(data.email)}
${data.projectType ? `Project Type: ${sanitizeInput(data.projectType)}` : ''}
${data.budget ? `Budget: ${sanitizeInput(data.budget)}` : ''}

Message:
${sanitizeInput(data.message)}

---
Submission Details:
IP Address: ${ipAddress}
Timestamp: ${new Date().toISOString()}
Terms Agreed: ${data.agreedToTerms ? 'Yes' : 'No'}

---
This email was sent from your portfolio contact form at oredrok.dev
`;
}

// Handle CORS preflight
function handleOptions(): Response {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		},
	});
}

// Handle POST requests
async function handlePost(request: Request, env: Env): Promise<Response> {
	try {
		// Parse request body
		const formData: ContactFormData = await request.json();

		// Validate required fields
		if (!formData.name || !formData.email || !formData.message) {
			return new Response(
				JSON.stringify({
					error: 'Missing required fields',
					details: 'Name, email, and message are required',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		}

		// Validate email format
		if (!EMAIL_REGEX.test(formData.email)) {
			return new Response(
				JSON.stringify({
					error: 'Invalid email format',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		}

		// Validate terms agreement
		if (!formData.agreedToTerms) {
			return new Response(
				JSON.stringify({
					error: 'You must agree to the terms',
				}),
				{
					status: 400,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		}

		// Get client IP address
		const ipAddress = request.headers.get('cf-connecting-ip') || 'unknown';

		// Create MIME message
		const msg = createMimeMessage();
		msg.setSender({
			name: 'Portfolio Contact Form',
			addr: env.FROM_EMAIL,
		});
		msg.setRecipient(env.RECIPIENT_EMAIL);
		msg.setSubject(`New Contact Form: ${sanitizeInput(formData.name)}`);

		// Add plain text version
		msg.addMessage({
			contentType: 'text/plain',
			data: createEmailText(formData, ipAddress),
		});

		// Create EmailMessage
		const message = new EmailMessage(
			env.FROM_EMAIL,
			env.RECIPIENT_EMAIL,
			msg.asRaw()
		);

		// Send email using SEB binding
		try {
			await env.SEB.send(message);
		} catch (e) {
			console.error('❌ Error sending email:', e);
			return new Response(
				JSON.stringify({
					error: 'Failed to send email',
					details: e instanceof Error ? e.message : 'Unknown error',
				}),
				{
					status: 500,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				}
			);
		}

		console.log('✅ Email sent successfully');
		console.log('From:', formData.email);
		console.log('Name:', formData.name);
		console.log('IP:', ipAddress);

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Your message has been sent successfully!',
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Cache-Control': 'no-store, no-cache, must-revalidate',
				},
			}
		);
	} catch (error) {
		console.error('❌ Error processing contact form:', error);

		return new Response(
			JSON.stringify({
				error: 'Failed to send message',
				details: error instanceof Error ? error.message : 'Unknown error',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			}
		);
	}
}

// Main worker fetch handler
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Only handle /contact endpoint
		if (url.pathname !== '/contact') {
			return new Response('Not Found', {
				status: 404,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			});
		}

		// Handle OPTIONS (CORS preflight)
		if (request.method === 'OPTIONS') {
			return handleOptions();
		}

		// Handle POST requests
		if (request.method === 'POST') {
			return handlePost(request, env);
		}

		// Method not allowed
		return new Response('Method Not Allowed', {
			status: 405,
			headers: {
				'Allow': 'POST, OPTIONS',
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
};
