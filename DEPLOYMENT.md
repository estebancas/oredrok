# Cloudflare Monorepo Deployment Guide

This project is structured as a monorepo with two separate packages:
- **Frontend**: Astro-based portfolio (Cloudflare Pages)
- **Email Worker**: Cloudflare Worker for handling email submissions

---

## Project Structure

```
oredrok-portfolio/
├── packages/
│   ├── frontend/           # Astro Pages frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── wrangler.toml
│   │   └── package.json
│   │
│   └── email-worker/       # Cloudflare Email Worker
│       ├── src/
│       │   └── worker.ts
│       ├── wrangler.toml
│       └── package.json
│
├── package.json            # Root workspace config
└── yarn.lock
```

---

## Local Development

### Prerequisites
- Node.js 18+ or 22+
- Yarn package manager

### Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Copy environment files:**
   ```bash
   # Frontend
   cp packages/frontend/.env.example packages/frontend/.env

   # Email Worker
   cp packages/email-worker/.env.example packages/email-worker/.env
   ```

3. **Configure environment variables:**

   Edit `packages/frontend/.env`:
   ```env
   PUBLIC_WORKER_URL=http://localhost:8788/contact
   ```

   Edit `packages/email-worker/.env` (or set in wrangler.toml):
   ```env
   FROM_EMAIL=info@oredrok.dev
   RECIPIENT_EMAIL=your-email@example.com
   ```

### Run Development Servers

**Option 1: Run both services (recommended)**
```bash
# Terminal 1 - Frontend
yarn dev

# Terminal 2 - Email Worker
yarn dev:worker
```

**Option 2: Run individually**
```bash
# Frontend only
yarn workspace @oredrok/frontend dev

# Email Worker only
yarn workspace @oredrok/email-worker dev
```

- Frontend: http://localhost:4321
- Email Worker: http://localhost:8788

---

## Email Worker Setup

### 1. Enable Email Routing (Required)

Before deploying the email worker, you must enable Email Routing in Cloudflare:

1. Go to **Cloudflare Dashboard** → Your Domain
2. Navigate to **Email** → **Email Routing**
3. Click **Enable Email Routing**
4. Follow the setup wizard to verify your domain
5. Add a destination address (where emails will be sent)
6. Create a catch-all rule or specific routing rules

### 2. Test Email Worker Locally

The email worker will save emails as `.eml` files in local development:
```bash
cd packages/email-worker
yarn dev

# Emails will be saved to:
# .wrangler/tmp/email/*.eml
```

---

## Production Deployment

### Part 1: Deploy Email Worker

1. **Navigate to email worker directory:**
   ```bash
   cd packages/email-worker
   ```

2. **Deploy the worker:**
   ```bash
   yarn deploy
   # or: wrangler deploy src/worker.ts
   ```

3. **Note the worker URL** (e.g., `https://oredrok-email-worker.your-subdomain.workers.dev`)

4. **Update environment variables in Cloudflare Dashboard:**
   - Go to **Workers & Pages** → `oredrok-email-worker` → **Settings** → **Variables**
   - Add:
     - `FROM_EMAIL`: `info@oredrok.dev`
     - `RECIPIENT_EMAIL`: `your-email@example.com`

### Part 2: Deploy Frontend (Cloudflare Pages)

#### First Time Setup

1. **Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)**
2. Navigate to **Workers & Pages** → **Create** → **Connect to Git**
3. Select **GitHub** and authorize
4. Select your repository

5. **Configure Build Settings:**
   ```
   Project Name: oredrok-portfolio
   Production branch: main
   Build command: cd packages/frontend && yarn build
   Build output directory: packages/frontend/dist
   Root directory: (leave empty)
   ```

6. **Add Environment Variables:**
   - Go to **Settings** → **Environment variables**
   - Add `PUBLIC_WORKER_URL`: (your worker URL from Part 1)
     - Example: `https://oredrok-email-worker.your-subdomain.workers.dev/contact`

7. **Click Save and Deploy**

#### Subsequent Deployments

Frontend automatically deploys when you push to `main` branch.

To deploy manually:
```bash
cd packages/frontend
yarn deploy
# or: wrangler pages deploy dist
```

---

## Environment Variables Summary

### Frontend (packages/frontend/.env)
```env
# Local development
PUBLIC_WORKER_URL=http://localhost:8788/contact

# Production (set in Cloudflare Pages Dashboard)
PUBLIC_WORKER_URL=https://oredrok-email-worker.your-subdomain.workers.dev/contact
```

### Email Worker (packages/email-worker/.env or wrangler.toml)
```env
FROM_EMAIL=info@oredrok.dev
RECIPIENT_EMAIL=your-email@example.com
```

---

## Yarn Workspace Commands

```bash
# Install all dependencies
yarn install

# Development
yarn dev                    # Run frontend dev server
yarn dev:worker            # Run email worker dev server

# Build
yarn build                 # Build all packages
yarn build:frontend        # Build frontend only
yarn build:worker          # Build email worker only

# Deploy
yarn deploy               # Deploy all packages (requires prior build)
yarn deploy:frontend      # Deploy frontend only
yarn deploy:worker        # Deploy email worker only

# Other
yarn preview              # Preview frontend build locally
```

---

## Deployment Strategy

This project uses **coordinated deployment**:
1. Deploy email worker first (to get the worker URL)
2. Update frontend environment variables with worker URL
3. Deploy frontend

### Automated Deployment (Future Enhancement)

You can set up GitHub Actions to automate this:
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: yarn install
      - run: yarn deploy:worker
      - run: yarn deploy:frontend
```

---

## Monitoring & Debugging

### View Worker Logs
```bash
# Real-time worker logs
cd packages/email-worker
wrangler tail
```

### View Pages Logs
```bash
# Real-time pages logs
cd packages/frontend
wrangler pages deployment tail --project-name=oredrok-portfolio
```

### Check Email Worker Status
```bash
cd packages/email-worker
wrangler deployments list
```

### Local Email Testing
In local dev, emails are saved as `.eml` files:
```bash
# View saved emails
ls -la packages/email-worker/.wrangler/tmp/email/
```

---

## Troubleshooting

### Build Fails
- Ensure you're using Node 18+ or 22+
- Run `yarn install` from root to sync dependencies
- Check that build works locally: `yarn build`

### Email Worker Not Receiving Requests
- Verify `PUBLIC_WORKER_URL` is set correctly in frontend environment
- Check CORS settings in worker
- Verify Email Routing is enabled in Cloudflare Dashboard

### Emails Not Sending
- Confirm Email Routing is enabled and configured
- Check worker logs: `wrangler tail`
- Verify `FROM_EMAIL` matches a verified domain
- Check environment variables are set in Cloudflare Dashboard

### Yarn Workspace Errors
- Delete `node_modules` and `yarn.lock`, then run `yarn install`
- Ensure all `package.json` files have unique names (`@oredrok/frontend`, `@oredrok/email-worker`)

---

## Custom Domain Setup

### Frontend Custom Domain
1. In Cloudflare Pages project settings
2. Go to **Custom domains** → **Set up a custom domain**
3. Enter your domain (e.g., `oredrok.dev`)
4. SSL automatically provisioned

### Email Worker Custom Domain
1. Go to **Workers & Pages** → `oredrok-email-worker` → **Settings** → **Triggers**
2. Add a custom route or subdomain
3. Update `PUBLIC_WORKER_URL` in frontend environment

---

## Next Steps After Setup

1. ✅ Deploy email worker
2. ✅ Enable Email Routing in Cloudflare
3. ✅ Deploy frontend with correct worker URL
4. ✅ Test contact form submission
5. 🔜 Add custom domain
6. 🔜 Set up GitHub Actions for automated deployment
7. 🔜 Configure Web Analytics

---

**Repository:** https://github.com/estebancas/oredrok
**Cloudflare Dashboard:** https://dash.cloudflare.com/
