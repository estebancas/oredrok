// Type declarations for cloudflare:email module
// This module is only available in Cloudflare Workers runtime

declare module 'cloudflare:email' {
	export class EmailMessage {
		constructor(from: string, to: string, raw: string | ReadableStream);
	}
}
