/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-elevated': 'var(--bg-elevated)',
        'accent-blue': 'var(--accent-blue)',
        'accent-blue-dark': 'var(--accent-blue-dark)',
        'accent-green': 'var(--accent-green)',
        'accent-green-dark': 'var(--accent-green-dark)',
        'accent-red': 'var(--accent-red)',
        'accent-red-dark': 'var(--accent-red-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-pixel': 'var(--border-pixel)',
        'border-light': 'var(--border-light)',
      },
      fontFamily: {
        'pixel-header': ['"Press Start 2P"', 'monospace'],
        'pixel-body': ['"VT323"', 'monospace'],
        'pixel-label': ['"DotGothic16"', '"Press Start 2P"', 'monospace'],
      },
      borderWidth: {
        'pixel': 'var(--border-pixel)',
        'chunky': 'var(--border-chunky)',
      },
      spacing: {
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)',
      },
    },
  },
  plugins: [],
}
