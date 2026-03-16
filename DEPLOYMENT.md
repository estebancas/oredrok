# Cloudflare Pages Deployment Guide

## Quick Setup (First Time)

### Step 1: Connect to Cloudflare Pages

1. Go to **[Cloudflare Dashboard](https://dash.cloudflare.com/)**
2. Navigate to **Workers & Pages** (left sidebar)
3. Click **Create** button
4. Select **Connect to Git**

### Step 2: Authorize GitHub

1. Select **GitHub** as your Git provider
2. Click **Connect GitHub**
3. Authorize Cloudflare to access your GitHub account
4. Select the repository: **estebancas/oredrok**

### Step 3: Configure Build Settings

Use these exact settings:

```
Project Name: oredrok-portfolio
Production branch: main
```

**Build settings:**
```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
```

**Environment variables (build):**
- None required for now (add later if needed)

### Step 4: Deploy

1. Click **Save and Deploy**
2. Wait for the first build (usually 2-3 minutes)
3. Once complete, you'll get a URL like: `https://oredrok-portfolio.pages.dev`

---

## What You Get Automatically

✅ **Production Deployments** - Every push to `main` triggers a deployment
✅ **Preview Deployments** - Every PR gets a unique preview URL
✅ **Branch Deployments** - Every branch gets its own URL
✅ **Automatic Rollbacks** - Easy rollback in dashboard
✅ **Build Caching** - Faster subsequent builds
✅ **Global CDN** - Your site runs on Cloudflare's edge network
✅ **Analytics** - Free web analytics built-in

---

## Branch Strategy

### Production
- **Branch:** `main`
- **URL:** `https://oredrok-portfolio.pages.dev` (or custom domain)
- **Triggers:** Push to `main` or merge PR

### Preview Deployments
- **Branch:** Any branch (e.g., `feat/cloudflare-adapter`)
- **URL:** `https://[commit-hash].oredrok-portfolio.pages.dev`
- **Triggers:** Push to any branch

### Pull Request Previews
- **Triggers:** Opening/updating a PR
- **URL:** Shown as comment on the PR
- **Benefit:** Review changes before merging

---

## Merge Your Feature Branch

Once Cloudflare is set up, merge your feature branch:

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge your feature branch
git merge feat/cloudflare-adapter

# Push to trigger production deployment
git push origin main
```

---

## Custom Domain (Optional)

1. In Cloudflare Pages project settings
2. Go to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `oredrok.com`)
5. Follow DNS instructions
6. SSL automatically provisioned

---

## Environment Variables & Secrets

### Add via Dashboard:
1. Project Settings → **Environment variables**
2. Add variables for Production/Preview
3. Click **Save**

### Or via CLI:
```bash
echo "secret-value" | npx wrangler pages secret put SECRET_KEY --project-name=oredrok-portfolio
```

---

## Monitoring & Logs

### View Build Logs:
1. Go to your project in dashboard
2. Click on any deployment
3. View build logs and function logs

### Real-time Logs (CLI):
```bash
npx wrangler pages deployment tail --project-name=oredrok-portfolio
```

---

## Troubleshooting

### Build Fails
- Check build logs in dashboard
- Verify `package.json` scripts work locally
- Ensure all dependencies are in `package.json` (not just `devDependencies`)

### Functions Don't Work
- Check compatibility date in `wrangler.jsonc`
- Verify `nodejs_compat` flag is set
- Check function logs in dashboard

### Wrong Node Version
- Cloudflare uses Node 18+ by default
- To specify: Add `NODE_VERSION` environment variable in dashboard

---

## Useful Commands

```bash
# Local preview with Cloudflare runtime
npm run build
npx wrangler pages dev ./dist

# View deployments
npx wrangler pages deployment list --project-name=oredrok-portfolio

# View project info
npx wrangler pages project list
```

---

## Next Steps After Setup

1. ✅ Verify production deployment works
2. ✅ Test preview deployment by creating a PR
3. 🔜 Add custom domain (optional)
4. 🔜 Set up Web Analytics in dashboard
5. 🔜 Configure any environment variables needed

---

**Repository:** https://github.com/estebancas/oredrok
**Cloudflare Dashboard:** https://dash.cloudflare.com/
