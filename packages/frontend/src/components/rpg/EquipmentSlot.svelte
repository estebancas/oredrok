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
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    border: var(--border-thin) solid;
    border-radius: var(--radius-sm);
    position: relative;
    cursor: pointer;
    overflow: visible;
  }

  .slot-icon-wrapper {
    position: relative;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid;
    border-radius: var(--radius-sm);
  }

  .slot-icon {
    width: 32px;
    height: 32px;
    position: relative;
    z-index: 1;
  }

  .icon-glow {
    position: absolute;
    inset: 0;
  }

  .slot-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .tooltip {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%) translateY(0);
    border: var(--border-thin) solid;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    white-space: nowrap;
    z-index: var(--z-tooltip);
    pointer-events: none;
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
    border-top: 6px solid;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .equipment-slot {
      padding: var(--spacing-sm);
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
      left: var(--spacing-md);
    }
  }
</style>
