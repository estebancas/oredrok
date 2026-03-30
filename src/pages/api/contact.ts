import type { APIRoute } from 'astro';

// Mark this endpoint as server-rendered (required for POST requests)
export const prerender = false;

// Email template function
function createEmailHtml(data: {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
  timestamp: string;
  ip?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 20px; }
    .field-label { font-weight: 600; color: #667eea; margin-bottom: 5px; }
    .field-value { background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #667eea; }
    .message-box { background: white; padding: 15px; border-radius: 4px; border-left: 3px solid #764ba2; white-space: pre-wrap; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>

      ${data.projectType ? `
      <div class="field">
        <div class="field-label">Project Type</div>
        <div class="field-value">${data.projectType}</div>
      </div>
      ` : ''}

      ${data.budget ? `
      <div class="field">
        <div class="field-label">Budget</div>
        <div class="field-value">${data.budget}</div>
      </div>
      ` : ''}

      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${data.message}</div>
      </div>

      <div class="footer">
        <strong>Submission Details:</strong><br>
        Received: ${data.timestamp}<br>
        ${data.ip ? `IP Address: ${data.ip}<br>` : ''}
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
function createEmailText(data: {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
  timestamp: string;
  ip?: string;
}) {
  return `
NEW CONTACT FORM SUBMISSION
============================

Name: ${data.name}
Email: ${data.email}
${data.projectType ? `Project Type: ${data.projectType}\n` : ''}${data.budget ? `Budget: ${data.budget}\n` : ''}
MESSAGE:
${data.message}

---
Received: ${data.timestamp}
${data.ip ? `IP: ${data.ip}` : ''}
  `.trim();
}

// Input validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 5000); // Limit length
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get environment variables
    // In dev: uses .env file via import.meta.env
    // In production: uses Cloudflare environment variables
    const RECIPIENT_EMAIL = import.meta.env.RECIPIENT_EMAIL;
    const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'info@oredrok.dev';

    // Check if email is configured
    if (!RECIPIENT_EMAIL) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email service not configured. Please contact the administrator.'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, projectType, budget, message, agreeToTerms } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields: name, email, and message are required.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You must agree to be contacted about this project.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Please provide a valid email address.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      projectType: projectType ? sanitizeInput(projectType) : undefined,
      budget: budget ? sanitizeInput(budget) : undefined,
      message: sanitizeInput(message),
      timestamp: new Date().toISOString(),
      ip: request.headers.get('cf-connecting-ip') || undefined,
    };

    // Prepare email content
    const emailHtml = createEmailHtml(sanitizedData);
    const emailText = createEmailText(sanitizedData);

    // Send email using Cloudflare Email Workers
    // Using MailChannels API (free for Cloudflare Workers)
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: RECIPIENT_EMAIL }],
          dkim_domain: 'oredrok.dev',
          dkim_selector: 'mailchannels',
        },
      ],
      from: {
        email: FROM_EMAIL,
        name: 'Portfolio Contact Form',
      },
      reply_to: {
        email: sanitizedData.email,
        name: sanitizedData.name,
      },
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      content: [
        {
          type: 'text/plain',
          value: emailText,
        },
        {
          type: 'text/html',
          value: emailHtml,
        },
      ],
    };

    // Check if we're in development mode
    const isDev = import.meta.env.DEV;

    if (isDev) {
      // In development, just log the email instead of sending
      console.log('📧 DEV MODE: Contact form submission received');
      console.log(`From: ${sanitizedData.name} <${sanitizedData.email}>`);
      console.log(`Project: ${sanitizedData.projectType || 'Not specified'} | Budget: ${sanitizedData.budget || 'Not specified'}`);
    } else {
      // Production: Send via MailChannels
      const mailChannelsResponse = await fetch(
        'https://api.mailchannels.net/tx/v1/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        }
      );

      if (!mailChannelsResponse.ok) {
        const errorText = await mailChannelsResponse.text();
        console.error('MailChannels error:', errorText);

        return new Response(
          JSON.stringify({
            success: false,
            message: 'Failed to send email. Please try again later or contact me directly.'
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Handle OPTIONS for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
