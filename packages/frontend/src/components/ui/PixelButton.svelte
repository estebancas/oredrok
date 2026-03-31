<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let {
    variant = 'blue',
    size = 'md',
    href,
    target,
    rel,
    onclick,
    disabled = false,
    children,
    class: className = ''
  }: {
    variant?: 'blue' | 'green' | 'red' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    target?: string;
    rel?: string;
    onclick?: (e: MouseEvent) => void;
    disabled?: boolean;
    children?: import('svelte').Snippet;
    class?: string;
  } = $props();

  let buttonRef: HTMLElement = $state()!

  const variantClasses = {
    blue: 'bg-accent-blue border-accent-blue-dark text-white hover:bg-accent-blue-dark pixel-shadow-blue',
    green: 'bg-accent-green border-accent-green-dark text-black hover:bg-accent-green-dark pixel-shadow-green',
    red: 'bg-accent-red border-accent-red-dark text-white hover:bg-accent-red-dark',
    outline: 'bg-transparent border-text-primary text-text-primary hover:bg-text-primary hover:text-bg-primary'
  };

  const sizeClasses = {
    sm: 'text-[10px] px-4 py-2',
    md: 'text-xs px-6 py-3',
    lg: 'text-sm px-8 py-4'
  };

  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Pixel press animation
    if (buttonRef) {
      gsap.to(buttonRef, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    if (onclick) {
      onclick(e);
    }
  };

  onMount(() => {
    // Add subtle pixel glow animation on hover
    if (buttonRef && !disabled) {
      buttonRef.addEventListener('mouseenter', () => {
        gsap.to(buttonRef, {
          boxShadow: '0 0 20px currentColor, 0 0 40px currentColor, 8px 8px 0 var(--accent-blue-dark)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      buttonRef.addEventListener('mouseleave', () => {
        gsap.to(buttonRef, {
          boxShadow: '8px 8px 0 var(--accent-blue-dark)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });
</script>

{#if href}
  <a
    bind:this={buttonRef}
    {href}
    {target}
    {rel}
    onclick={handleClick}
    class="pixel-button pixel-cursor {variantClasses[variant]} {sizeClasses[size]} {className}"
    class:opacity-50={disabled}
    class:cursor-not-allowed={disabled}
    aria-disabled={disabled}
  >
    {#if children}
      {@render children()}
    {/if}
  </a>
{:else}
  <button
    bind:this={buttonRef}
    onclick={handleClick}
    disabled={disabled}
    class="pixel-button pixel-cursor {variantClasses[variant]} {sizeClasses[size]} {className}"
    class:opacity-50={disabled}
    class:cursor-not-allowed={disabled}
  >
    {#if children}
      {@render children()}
    {/if}
  </button>
{/if}

<style>
  .pixel-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Press Start 2P', monospace;
    border-width: var(--border-pixel);
    border-radius: var(--radius-sm);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: normal;
    transition: all 0.2s ease;
    position: relative;
    white-space: nowrap;
    text-decoration: none;
  }

  .pixel-button:not(:disabled):hover {
    transform: translate(-2px, -2px);
  }

  .pixel-button:not(:disabled):active {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0 var(--accent-blue-dark) !important;
  }

  .pixel-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
