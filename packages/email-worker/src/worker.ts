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

// Create HTML email template
function createEmailHTML(data: ContactFormData, ipAddress: string): string {
	return `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
			line-height: 1.6;
			color: #333;
			background-color: #f4f4f4;
			margin: 0;
			padding: 20px;
		}
		.container {
			max-width: 600px;
			margin: 0 auto;
			background-color: #ffffff;
			border-radius: 12px;
			box-shadow: 0 4px 6px rgba(0,0,0,0.1);
			overflow: hidden;
		}
		.header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 40px 30px;
			text-align: center;
		}
		.header h1 {
			margin: 0;
			font-size: 28px;
			font-weight: 600;
		}
		.header p {
			margin: 10px 0 0 0;
			opacity: 0.9;
			font-size: 14px;
		}
		.content {
			padding: 40px 30px;
		}
		.field {
			margin-bottom: 24px;
		}
		.field-label {
			font-weight: 600;
			color: #667eea;
			display: block;
			margin-bottom: 8px;
			font-size: 12px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		.field-value {
			color: #333;
			font-size: 16px;
			padding: 16px;
			background-color: #f8f9fa;
			border-left: 4px solid #667eea;
			border-radius: 4px;
			white-space: pre-wrap;
			word-wrap: break-word;
		}
		.message-box {
			background-color: #f8f9fa;
			border-left: 4px solid #764ba2;
			padding: 20px;
			border-radius: 4px;
			margin-top: 10px;
		}
		.meta-info {
			margin-top: 40px;
			padding-top: 24px;
			border-top: 2px solid #e9ecef;
			font-size: 13px;
			color: #666;
		}
		.meta-info strong {
			color: #333;
		}
		.meta-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 8px;
		}
		.footer {
			background-color: #f8f9fa;
			padding: 24px 30px;
			text-align: center;
			font-size: 13px;
			color: #666;
			border-top: 1px solid #e9ecef;
		}
		.footer a {
			color: #667eea;
			text-decoration: none;
		}
		.badge {
			display: inline-block;
			padding: 4px 12px;
			background-color: #667eea;
			color: white;
			border-radius: 12px;
			font-size: 11px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>📧 New Contact Form</h1>
			<p>Someone reached out through your portfolio</p>
		</div>
		<div class="content">
			<div class="field">
				<span class="field-label">👤 Name</span>
				<div class="field-value">${sanitizeInput(data.name)}</div>
			</div>
			<div class="field">
				<span class="field-label">📮 Email</span>
				<div class="field-value"><a href="mailto:${sanitizeInput(data.email)}" style="color: #667eea; text-decoration: none;">${sanitizeInput(data.email)}</a></div>
			</div>
			${data.projectType ? `
			<div class="field">
				<span class="field-label">💼 Project Type</span>
				<div class="field-value">${sanitizeInput(data.projectType)}</div>
			</div>
			` : ''}
			${data.budget ? `
			<div class="field">
				<span class="field-label">💰 Budget</span>
				<div class="field-value">${sanitizeInput(data.budget)}</div>
			</div>
			` : ''}
			<div class="field">
				<span class="field-label">💬 Message</span>
				<div class="message-box">${sanitizeInput(data.message)}</div>
			</div>
			<div class="meta-info">
				<strong>📊 Submission Details</strong>
				<div style="margin-top: 12px;">
					<div class="meta-row">
						<span>IP Address:</span>
						<span><code style="background: #e9ecef; padding: 2px 8px; border-radius: 4px; font-size: 12px;">${ipAddress}</code></span>
					</div>
					<div class="meta-row">
						<span>Timestamp:</span>
						<span>${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</span>
					</div>
					<div class="meta-row">
						<span>Terms Agreed:</span>
						<span>${data.agreedToTerms ? '<span class="badge">✓ Yes</span>' : '<span style="color: #dc3545;">✗ No</span>'}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<p>This email was sent from your portfolio contact form at <a href="https://oredrok.dev">oredrok.dev</a></p>
			<p style="margin-top: 8px; color: #999; font-size: 11px;">Powered by Cloudflare Email Workers</p>
		</div>
	</div>
</body>
</html>
`;
}

// Create plain text email (fallback)
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

		// Add HTML version (primary)
		msg.addMessage({
			contentType: 'text/html',
			data: createEmailHTML(formData, ipAddress),
		});

		// Add plain text version (fallback)
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
