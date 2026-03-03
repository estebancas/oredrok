<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { cardTilt, magneticCursor } from '$lib/animations';

  interface Props {
    slot: string;
    item: string;
    icon: string;
    description?: string;
    enableTilt?: boolean;
    enableMagnetic?: boolean;
    class?: string;
  }

  let {
    slot,
    item,
    icon,
    description,
    enableTilt = true,
    enableMagnetic = true,
    class: className = ''
  }: Props = $props();

  let slotElement: HTMLDivElement;
  let showTooltip = $state(false);
  let cleanupTilt: (() => void) | undefined;
  let cleanupMagnetic: (() => void) | undefined;

  onMount(() => {
    if (slotElement) {
      if (enableTilt) {
        cleanupTilt = cardTilt(slotElement, 8);
      }
      if (enableMagnetic) {
        cleanupMagnetic = magneticCursor(slotElement, 0.15);
      }
    }
  });

  onDestroy(() => {
    cleanupTilt?.();
    cleanupMagnetic?.();
  });
</script>

<div
  bind:this={slotElement}
  class="equipment-slot {className}"
  onmouseenter={() => (showTooltip = true)}
  onmouseleave={() => (showTooltip = false)}
  role="button"
  tabindex="0"
  style="transform-style: preserve-3d;"
>
  <div class="slot-icon-wrapper">
    <img src={icon} alt={slot} class="slot-icon pixel-art" />
    <div class="icon-glow"></div>
  </div>

  <div class="slot-info">
    <span class="slot-name text-pixel text-xs text-[var(--color-text-muted)]">{slot}</span>
    <span class="item-name text-pixel text-sm text-[var(--color-accent)]">{item}</span>
  </div>

  {#if description && showTooltip}
    <div class="tooltip">
      <p class="text-xs">{description}</p>
    </div>
  {/if}
</div>

<style>
  .equipment-slot {
    display: flex;
    align-items: center;
    gap: var(--spacing-rpg-md);
    padding: var(--spacing-rpg-md);
    border: var(--border-rpg-thin) solid var(--color-border);
    border-radius: var(--radius-sm);
    background: linear-gradient(135deg, rgba(15, 26, 46, 0.5) 0%, rgba(10, 18, 32, 0.8) 100%);
    position: relative;
    cursor: pointer;
    transition: all var(--duration-normal) var(--ease-out);
    overflow: visible;
  }

  .equipment-slot::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: var(--radius-sm);
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(245, 166, 35, 0.2) 50%,
      transparent 70%
    );
    background-size: 200% 200%;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
    pointer-events: none;
    z-index: -1;
  }

  .equipment-slot:hover {
    border-color: var(--color-accent);
    background: linear-gradient(135deg, rgba(15, 26, 46, 0.8) 0%, rgba(10, 18, 32, 1) 100%);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4), var(--shadow-glow);
  }

  .equipment-slot:hover::before {
    opacity: 1;
    animation: shimmerBorder 1.5s ease-in-out infinite;
  }

  .slot-icon-wrapper {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 166, 35, 0.1);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-sm);
    transition: all var(--duration-normal) var(--ease-out);
  }

  .equipment-slot:hover .slot-icon-wrapper {
    border-color: var(--color-accent);
    background: rgba(245, 166, 35, 0.2);
    transform: translateZ(20px);
  }

  .slot-icon {
    width: 32px;
    height: 32px;
    transition: transform var(--duration-normal) var(--ease-out);
    position: relative;
    z-index: 1;
  }

  .equipment-slot:hover .slot-icon {
    transform: rotate(5deg) scale(1.1);
    animation: floatIcon 2s ease-in-out infinite;
  }

  .icon-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle, rgba(245, 166, 35, 0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-out);
  }

  .equipment-slot:hover .icon-glow {
    opacity: 1;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .slot-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .slot-name {
    opacity: 0.8;
  }

  .item-name {
    font-weight: bold;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .equipment-slot:hover .item-name {
    color: var(--color-active);
  }

  .tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background-color: var(--color-panel);
    border: var(--border-rpg-thin) solid var(--color-accent);
    padding: var(--spacing-rpg-sm) var(--spacing-rpg-md);
    border-radius: var(--radius-sm);
    white-space: nowrap;
    z-index: var(--z-tooltip);
    pointer-events: none;
    animation: tooltipFadeIn 0.2s ease-out;
    box-shadow: var(--shadow-md);
    max-width: 250px;
    white-space: normal;
  }

  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--color-accent);
  }

  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes shimmerBorder {
    0% {
      background-position: 200% 200%;
    }
    100% {
      background-position: -200% -200%;
    }
  }

  @keyframes floatIcon {
    0%,
    100% {
      transform: rotate(5deg) scale(1.1) translateY(0);
    }
    50% {
      transform: rotate(5deg) scale(1.1) translateY(-4px);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .equipment-slot {
      padding: var(--spacing-rpg-sm);
    }

    .slot-icon-wrapper {
      width: 40px;
      height: 40px;
    }

    .slot-icon {
      width: 24px;
      height: 24px;
    }

    .tooltip {
      left: 0;
      right: 0;
      transform: none;
      max-width: none;
    }

    .tooltip::after {
      left: var(--spacing-rpg-md);
    }
  }
</style>
