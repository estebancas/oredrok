<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import gsap from 'gsap';

  interface Props {
    isOpen: boolean;
    onClose?: () => void;
    title?: string;
    variant?: 'blue' | 'green' | 'red';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    children?: import('svelte').Snippet;
    class?: string;
  }

  let {
    isOpen = $bindable(false),
    onClose,
    title,
    variant = 'blue',
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showCloseButton = true,
    children,
    class: className = ''
  }: Props = $props();

  let backdropEl: HTMLDivElement;
  let modalEl: HTMLDivElement;
  let previousActiveElement: HTMLElement | null = null;

  // Handle ESC key
  function handleKeydown(e: KeyboardEvent) {
    if (closeOnEscape && e.key === 'Escape' && isOpen) {
      handleClose();
    }
  }

  // Handle backdrop click
  function handleBackdropClick(e: MouseEvent) {
    if (closeOnBackdrop && e.target === backdropEl) {
      handleClose();
    }
  }

  // Close modal
  function handleClose() {
    if (onClose) {
      onClose();
    } else {
      isOpen = false;
    }
  }

  // Lock body scroll when modal is open
  $effect(() => {
    if (typeof window === 'undefined') return;

    if (isOpen) {
      previousActiveElement = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Animate in
      if (backdropEl && modalEl) {
        gsap.fromTo(
          backdropEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );

        gsap.fromTo(
          modalEl,
          {
            opacity: 0,
            scale: 0.9,
            y: 50,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.4,
            ease: 'back.out(1.4)',
            delay: 0.1
          }
        );
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';

      // Return focus to previous element
      if (previousActiveElement) {
        previousActiveElement.focus();
        previousActiveElement = null;
      }
    }
  });

  onMount(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', handleKeydown);
    }
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', handleKeydown);
      document.body.style.overflow = '';
    }
  });
</script>

{#if isOpen}
  <div
    class="pixel-modal-backdrop"
    bind:this={backdropEl}
    onclick={handleBackdropClick}
    role="presentation"
  >
    <div
      class="pixel-modal pixel-modal-{variant} pixel-modal-{size} {className}"
      bind:this={modalEl}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onclick={(e) => e.stopPropagation()}
    >
      {#if title || showCloseButton}
        <div class="pixel-modal-header">
          {#if title}
            <h2 id="modal-title" class="pixel-modal-title pixel-header">
              {title}
            </h2>
          {/if}
          {#if showCloseButton}
            <button
              class="pixel-modal-close"
              onclick={handleClose}
              aria-label="Close modal"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square">
                <line x1="6" y1="6" x2="18" y2="18"></line>
                <line x1="18" y1="6" x2="6" y2="18"></line>
              </svg>
            </button>
          {/if}
        </div>
      {/if}

      <div class="pixel-modal-body">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .pixel-modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
    z-index: var(--z-modal, 2000);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
  }

  .pixel-modal {
    background: var(--bg-secondary);
    border: var(--border-pixel) solid;
    border-radius: var(--radius-md);
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: relative;
    will-change: transform, opacity;
  }

  /* Size variants */
  .pixel-modal-sm {
    width: 100%;
    max-width: 400px;
  }

  .pixel-modal-md {
    width: 100%;
    max-width: 600px;
  }

  .pixel-modal-lg {
    width: 100%;
    max-width: 800px;
  }

  .pixel-modal-xl {
    width: 100%;
    max-width: 1000px;
  }

  /* Color variants */
  .pixel-modal-blue {
    border-color: var(--accent-blue);
    box-shadow: 8px 8px 0 var(--accent-blue-dark), 0 0 30px rgba(59, 130, 246, 0.2);
  }

  .pixel-modal-green {
    border-color: var(--accent-green);
    box-shadow: 8px 8px 0 var(--accent-green-dark), 0 0 30px rgba(74, 222, 128, 0.2);
  }

  .pixel-modal-red {
    border-color: var(--accent-red);
    box-shadow: 8px 8px 0 var(--accent-red-dark), 0 0 30px rgba(239, 68, 68, 0.2);
  }

  .pixel-modal-header {
    background: var(--bg-elevated);
    padding: var(--spacing-md) var(--spacing-lg);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    border-bottom: var(--border-pixel) solid;
  }

  .pixel-modal-blue .pixel-modal-header {
    border-bottom-color: var(--accent-blue);
  }

  .pixel-modal-green .pixel-modal-header {
    border-bottom-color: var(--accent-green);
  }

  .pixel-modal-red .pixel-modal-header {
    border-bottom-color: var(--accent-red);
  }

  .pixel-modal-title {
    font-size: 12px;
    margin: 0;
    color: var(--text-primary);
    text-transform: uppercase;
  }

  .pixel-modal-close {
    background: transparent;
    border: 2px solid var(--border-pixel);
    border-radius: var(--radius-sm);
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--text-secondary);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .pixel-modal-close:hover {
    background: var(--bg-primary);
    transform: scale(1.1);
  }

  .pixel-modal-blue .pixel-modal-close:hover {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
  }

  .pixel-modal-green .pixel-modal-close:hover {
    border-color: var(--accent-green);
    color: var(--accent-green);
    box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
  }

  .pixel-modal-red .pixel-modal-close:hover {
    border-color: var(--accent-red);
    color: var(--accent-red);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
  }

  .pixel-modal-close:active {
    transform: scale(0.95);
  }

  .pixel-modal-close svg {
    width: 16px;
    height: 16px;
  }

  .pixel-modal-body {
    padding: var(--spacing-lg);
    overflow-y: auto;
    flex: 1;
  }

  /* Custom scrollbar */
  .pixel-modal-body::-webkit-scrollbar {
    width: 8px;
  }

  .pixel-modal-body::-webkit-scrollbar-track {
    background: var(--bg-primary);
    border-left: 2px solid var(--border-pixel);
  }

  .pixel-modal-body::-webkit-scrollbar-thumb {
    background: var(--accent-blue);
    border-radius: 2px;
  }

  .pixel-modal-body::-webkit-scrollbar-thumb:hover {
    background: var(--accent-blue-dark);
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .pixel-modal-backdrop {
      padding: var(--spacing-md);
    }

    .pixel-modal {
      max-height: 95vh;
    }

    .pixel-modal-sm,
    .pixel-modal-md,
    .pixel-modal-lg,
    .pixel-modal-xl {
      max-width: 100%;
    }

    .pixel-modal-title {
      font-size: 10px;
    }

    .pixel-modal-header {
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .pixel-modal-body {
      padding: var(--spacing-md);
    }
  }
</style>
