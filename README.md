# Oredrok Portfolio - RPG Character Sheet

A Final Fantasy Tactics-inspired portfolio website featuring pixel art aesthetics, sick animations, and RPG-themed UI components. Built as a **Yarn workspace monorepo** with separate frontend and email worker packages.

## 🏗️ Architecture

This project uses a **monorepo structure** to properly separate concerns:

- **`@oredrok/frontend`** - Astro-based portfolio (Cloudflare Pages)
- **`@oredrok/email-worker`** - Email handling worker (Cloudflare Worker with `[[send_email]]` binding)

**Why monorepo?** Cloudflare Pages Functions cannot use the `[[send_email]]` binding - only Workers can. The monorepo allows us to have a dedicated Worker for email functionality while keeping the frontend as a static site.

## 🎮 Features

- **RPG-Themed UI**: Inspired by Final Fantasy Tactics with pixel fonts, dialog boxes, and character sheets
- **Sick Animations**:
  - GSAP-powered scroll-triggered animations
  - 3D hover effects on equipment cards with perspective transforms
  - Magnetic cursor effects that follow mouse movement
  - Smooth scroll with Lenis (60fps)
  - Stat bar progressive fills with pulse effects on each segment
  - Floating avatar with breathing animation
  - Interactive tooltips with slide animations
  - Glow effects and shimmer animations
- **Dark Blue Aesthetic**: Custom color palette with midnight blue tones and gold/amber accents
- **Fully Responsive**: Mobile-first design with collapsible navigation
- **Contact Form**: Integrated with Cloudflare Email Workers
- **Modern Tech Stack**: Astro + Svelte 5 (Runes) + Tailwind CSS v3 + GSAP + Lenis

## 🛠️ Tech Stack

### Frontend
- **Framework**: Astro 5
- **Components**: Svelte 5 with Runes API (`$props`, `$state`, `$derived`)
- **Animations**: GSAP (with ScrollTrigger, TextPlugin)
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS v3 + CSS Custom Properties
- **TypeScript**: Full type safety throughout
- **Deployment**: Cloudflare Pages

### Email Worker
- **Runtime**: Cloudflare Workers
- **Email API**: Cloudflare Email Workers
- **Email Formatting**: mimetext
- **TypeScript**: Full type safety

### Development
- **Package Manager**: Yarn Workspaces
- **Build Tool**: Vite (via Astro)

## 📦 Project Structure

```
oredrok-portfolio/                    # Monorepo root
├── packages/
│   ├── frontend/                     # Astro frontend package
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── rpg/             # Reusable RPG UI components
│   │   │   │   │   ├── RPGPanel.svelte
│   │   │   │   │   ├── RPGMenu.svelte
│   │   │   │   │   ├── StatBar.svelte
│   │   │   │   │   ├── EquipmentSlot.svelte
│   │   │   │   │   └── PixelAvatar.svelte
│   │   │   │   ├── sections/        # Page sections (Hero, About, Projects, Contact)
│   │   │   │   ├── ui/              # UI components (Buttons, Modals, etc.)
│   │   │   │   └── layout/
│   │   │   │       ├── PageLayout.astro
│   │   │   │       └── LeftPanel.svelte
│   │   │   ├── content/
│   │   │   │   ├── blog/            # Blog posts (Markdown)
│   │   │   │   └── projects/        # Project case studies
│   │   │   ├── lib/
│   │   │   │   ├── animations.ts    # 20+ GSAP animation utilities
│   │   │   │   └── lenis.ts         # Smooth scroll setup
│   │   │   ├── pages/
│   │   │   │   └── index.astro      # Character sheet homepage
│   │   │   ├── styles/
│   │   │   │   ├── global.css       # CSS variables + Tailwind
│   │   │   │   └── fonts.css        # Pixel font imports
│   │   │   └── assets/
│   │   │       ├── avatar/          # Avatar sprites
│   │   │       └── icons/           # Tech stack icons
│   │   ├── public/
│   │   │   ├── avatar-placeholder.svg
│   │   │   └── icons/
│   │   ├── astro.config.mjs
│   │   ├── wrangler.toml
│   │   ├── tailwind.config.js
│   │   └── package.json
│   │
│   └── email-worker/                 # Email Worker package
│       ├── src/
│       │   └── worker.ts            # Worker entry point
│       ├── wrangler.toml            # Worker config with [[send_email]]
│       └── package.json
│
├── package.json                      # Root workspace config
├── yarn.lock
├── DEPLOYMENT.md                     # Detailed deployment guide
└── README.md                         # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 22+
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/estebancas/oredrok-portfolio.git
cd oredrok-portfolio

# Install all dependencies (monorepo)
yarn install

# Set up environment files
cp packages/frontend/.env.example packages/frontend/.env
cp packages/email-worker/.env.example packages/email-worker/.env
```

### Development

Run both services concurrently:

```bash
# Terminal 1 - Frontend (http://localhost:4321)
yarn dev

# Terminal 2 - Email Worker (http://localhost:8788)
yarn dev:worker
```

### Available Commands

```bash
# Development
yarn dev                    # Start frontend dev server
yarn dev:worker            # Start email worker dev server

# Build
yarn build                 # Build all packages
yarn build:frontend        # Build frontend only
yarn build:worker          # Build email worker only

# Deploy
yarn deploy               # Deploy all packages
yarn deploy:frontend      # Deploy frontend to Pages
yarn deploy:worker        # Deploy email worker

# Preview
yarn preview              # Preview frontend production build
```

## 🎨 Component Library

### RPGPanel
Reusable panel component with customizable header and animations.

```svelte
<RPGPanel title="STATS" variant="gold" padding="lg" animated={true} client:visible>
  <!-- Content -->
</RPGPanel>
```

**Props:**
- `title` (optional): Panel header text
- `variant`: `'default'` | `'gold'` | `'accent'` - Header color scheme
- `padding`: `'sm'` | `'md'` | `'lg'` - Content padding size
- `animated`: Enable entrance animation (slide up)

### StatBar
Animated stat bars with scroll-triggered progressive fill and segment pulse effects.

```svelte
<StatBar
  label="TypeScript"
  value={95}
  maxSegments={10}
  icon="/icons/typescript.svg"
  color="var(--color-accent)"
  client:visible
/>
```

**Features:**
- Scroll-triggered fill animation
- Pulse effect on each segment as it fills
- Hover effects on individual segments
- Shine animation on filled segments

### EquipmentSlot
Interactive equipment cards with 3D tilt and magnetic cursor effects.

```svelte
<EquipmentSlot
  slot="Weapon"
  item="Claude Code"
  icon="/icons/tool.svg"
  description="Primary development tool"
  enableTilt={true}
  enableMagnetic={true}
  client:visible
/>
```

**Features:**
- 3D perspective tilt based on mouse position
- Magnetic effect that pulls element toward cursor
- Animated tooltip on hover
- Icon float and glow effects
- Shimmer border animation

### PixelAvatar
Avatar component with breathing animation and floating effect.

```svelte
<PixelAvatar
  src="/avatar-placeholder.svg"
  alt="Wizard Avatar"
  size={128}
  enableFloat={true}
/>
```

## 🎭 Animation Library

The `src/lib/animations.ts` file includes 20+ reusable GSAP animations:

**Basic Animations:**
- `fadeInUp` - Fade in with slide up
- `fadeInFrom` - Fade in from any direction
- `staggerReveal` - Staggered children reveal

**Interactive Effects:**
- `cardTilt` - 3D card tilt on hover
- `magneticCursor` - Magnetic cursor effect
- `rippleEffect` - Click ripple effect
- `scaleBounce` - Elastic scale bounce

**Scroll Animations:**
- `scrollReveal` - Scroll-triggered reveals
- `parallax` - Parallax scroll effects
- `statBarFill` - Animated stat bar fill

**Dialog & Text:**
- `dialogOpen/Close` - Dialog slide animations
- `typewriter` - Character-by-character typing
- `pageEntrance` - Page-level entrance animation

**Visual Effects:**
- `glowPulse` - Continuous glow pulse
- `shimmer` - Shimmer/shine effect
- `float` - Floating/bobbing animation
- `rotate` - Continuous rotation

## 🎨 Color Palette

```css
--color-bg:          #080d1a  /* Deep blue-black */
--color-panel:       #0f1a2e  /* Dark navy */
--color-border:      #1e3a5f  /* Mid blue */
--color-accent:      #f5a623  /* Amber gold */
--color-active:      #ff8c00  /* Orange */
--color-text:        #e8e8e8  /* Off-white */
--color-text-muted:  #7a9abf  /* Muted blue */
```

## 📝 Customization

### Fonts
The project uses Google Fonts with a retro pixel aesthetic:
- **Press Start 2P**: Headers, labels, and UI chrome
- **Pixelify Sans**: Headings and longer text blocks
- **Share Tech Mono**: Body text and descriptions

### Animation Speed
Adjust animation speeds in `src/styles/global.css`:
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Color Theme
All colors are CSS custom properties in `global.css` - easily customizable!

## 🌐 Deployment

This project uses a **coordinated deployment** strategy for the monorepo:

### Quick Deploy

```bash
# Deploy both packages
yarn deploy

# Or deploy individually
yarn deploy:worker        # Deploy email worker first
yarn deploy:frontend      # Deploy frontend (with worker URL)
```

### Detailed Deployment Guide

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive instructions including:
- Email Worker setup with Email Routing
- Cloudflare Pages configuration
- Environment variable setup
- Monitoring and debugging
- Custom domain configuration

### Environment Variables

**Frontend** (`packages/frontend/.env`):
```env
PUBLIC_WORKER_URL=http://localhost:8788/contact  # Local
# or: https://your-worker.workers.dev/contact    # Production
```

**Email Worker** (`packages/email-worker/wrangler.toml`):
```toml
[vars]
FROM_EMAIL = "info@oredrok.dev"
RECIPIENT_EMAIL = "your-email@example.com"
```

## ✅ Features Complete

**Implemented:**
- ✅ Foundation setup (Astro + Svelte 5 + Tailwind)
- ✅ All core RPG components with animations
- ✅ Character sheet homepage
- ✅ Comprehensive animation library
- ✅ Lenis smooth scroll integration
- ✅ Responsive mobile design
- ✅ Content collections for blog and projects
- ✅ Contact form with Cloudflare Email Workers
- ✅ Monorepo architecture with separate email worker
- ✅ Full deployment setup for Cloudflare Pages + Workers

**Future Enhancements:**
- 🔜 GitHub Actions for automated deployment
- 🔜 Page transitions and polish
- 🔜 Web Analytics integration

## 📄 License

This project is for portfolio purposes.

---

*May your builds be swift and your deploys be green. ⚔️*
