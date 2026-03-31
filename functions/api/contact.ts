import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

interface Env {
	EMAIL: any;
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
			padding: 0;
		}
		.container {
			max-width: 600px;
			margin: 20px auto;
			background-color: #ffffff;
			border-radius: 8px;
			box-shadow: 0 2px 4px rgba(0,0,0,0.1);
			overflow: hidden;
		}
		.header {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			padding: 30px;
			text-align: center;
		}
		.header h1 {
			margin: 0;
			font-size: 24px;
		}
		.content {
			padding: 30px;
		}
		.field {
			margin-bottom: 20px;
		}
		.field-label {
			font-weight: bold;
			color: #555;
			display: block;
			margin-bottom: 5px;
			font-size: 14px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
		}
		.field-value {
			color: #333;
			font-size: 16px;
			padding: 10px;
			background-color: #f8f9fa;
			border-left: 3px solid #667eea;
			white-space: pre-wrap;
			word-wrap: break-word;
		}
		.footer {
			background-color: #f8f9fa;
			padding: 20px;
			text-align: center;
			font-size: 12px;
			color: #666;
			border-top: 1px solid #e9ecef;
		}
		.meta-info {
			margin-top: 30px;
			padding-top: 20px;
			border-top: 2px solid #e9ecef;
			font-size: 13px;
			color: #666;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="header">
			<h1>📧 New Contact Form Submission</h1>
		</div>
		<div class="content">
			<div class="field">
				<span class="field-label">Name</span>
				<div class="field-value">${sanitizeInput(data.name)}</div>
			</div>
			<div class="field">
				<span class="field-label">Email</span>
				<div class="field-value">${sanitizeInput(data.email)}</div>
			</div>
			${data.projectType ? `
			<div class="field">
				<span class="field-label">Project Type</span>
				<div class="field-value">${sanitizeInput(data.projectType)}</div>
			</div>
			` : ''}
			${data.budget ? `
			<div class="field">
				<span class="field-label">Budget</span>
				<div class="field-value">${sanitizeInput(data.budget)}</div>
			</div>
			` : ''}
			<div class="field">
				<span class="field-label">Message</span>
				<div class="field-value">${sanitizeInput(data.message)}</div>
			</div>
			<div class="meta-info">
				<strong>Submission Details:</strong><br>
				IP Address: ${ipAddress}<br>
				Timestamp: ${new Date().toISOString()}<br>
				Terms Agreed: ${data.agreedToTerms ? 'Yes' : 'No'}
			</div>
		</div>
		<div class="footer">
			This email was sent from your portfolio contact form at oredrok.dev
		</div>
	</div>
</body>
</html>
`;
}

// Create plain text version
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

// Pages Function: Handle OPTIONS (CORS preflight)
export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
		},
	});
};

// Pages Function: Handle POST requests
export const onRequestPost: PagesFunction<Env> = async (context) => {
	const { request, env } = context;

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

		// Add HTML version
		msg.addMessage({
			contentType: 'text/html',
			data: createEmailHTML(formData, ipAddress),
		});

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

		// Send email (in local dev, this writes to .eml file)
		await env.EMAIL.send(message);

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
};
