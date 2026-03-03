# Oredrok Portfolio - RPG Character Sheet

A Final Fantasy Tactics-inspired portfolio website featuring pixel art aesthetics, sick animations, and RPG-themed UI components.

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
- **Modern Tech Stack**: Astro + Svelte 5 (Runes) + Tailwind CSS v3 + GSAP + Lenis

## 🛠️ Tech Stack

- **Framework**: Astro 5
- **Components**: Svelte 5 with Runes API (`$props`, `$state`, `$derived`)
- **Animations**: GSAP (with ScrollTrigger, TextPlugin)
- **Smooth Scroll**: Lenis
- **Styling**: Tailwind CSS v3 + CSS Custom Properties
- **TypeScript**: Full type safety throughout

## 📦 Project Structure

```
oredrok-portfolio/
├── src/
│   ├── components/
│   │   ├── rpg/              # Reusable RPG UI components
│   │   │   ├── RPGPanel.svelte
│   │   │   ├── RPGMenu.svelte
│   │   │   ├── StatBar.svelte
│   │   │   ├── EquipmentSlot.svelte
│   │   │   └── PixelAvatar.svelte
│   │   └── layout/
│   │       ├── PageLayout.astro
│   │       └── LeftPanel.svelte
│   ├── lib/
│   │   ├── animations.ts     # 20+ GSAP animation utilities
│   │   └── lenis.ts          # Smooth scroll setup
│   ├── pages/
│   │   └── index.astro       # Character sheet homepage
│   ├── styles/
│   │   ├── global.css        # CSS variables + Tailwind
│   │   └── fonts.css         # Pixel font imports
│   └── assets/
│       ├── avatar/           # Avatar sprites
│       └── icons/            # Tech stack icons
├── public/
│   ├── avatar-placeholder.svg
│   └── icons/
└── tailwind.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.20+ or 20.3+ or 22+
- npm, pnpm, or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:4321/`

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

## 🚧 Phase 1 Complete!

✅ **Completed:**
- Foundation setup (Astro + Svelte 5 + Tailwind)
- All core RPG components with animations
- Character sheet homepage
- Comprehensive animation library
- Lenis smooth scroll integration
- Responsive mobile design

**Next Phases:**
- **Phase 2**: Content collections for missions/expeditions
- **Phase 3**: Quest board pages with filtering
- **Phase 4**: Contact form with backend
- **Phase 5**: Page transitions, polish, deployment

## 📄 License

This project is for portfolio purposes.

---

*May your builds be swift and your deploys be green. ⚔️*
