<script lang="ts">
  import { onMount } from 'svelte';
  import { dialogOpen } from '$lib/animations';

  interface Props {
    title?: string;
    variant?: 'default' | 'gold' | 'accent';
    padding?: 'sm' | 'md' | 'lg';
    animated?: boolean;
    class?: string;
    children?: import('svelte').Snippet;
  }

  let {
    title,
    variant = 'default',
    padding = 'md',
    animated = false,
    class: className = '',
    children
  }: Props = $props();

  let panelElement: HTMLDivElement;

  const paddingClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  };

  const headerColors = {
    default: 'bg-[var(--color-border)]',
    gold: 'bg-[var(--color-accent)]',
    accent: 'bg-[var(--color-active)]'
  };

  const headerTextColors = {
    default: 'text-[var(--color-text)]',
    gold: 'text-[var(--color-bg)]',
    accent: 'text-[var(--color-text)]'
  };

  onMount(() => {
    if (animated && panelElement) {
      dialogOpen(panelElement);
    }
  });
</script>

<div
  bind:this={panelElement}
  class="rpg-panel {className}"
  style="opacity: {animated ? 0 : 1}"
>
  {#if title}
    <div class="rpg-panel-header {headerColors[variant]} {headerTextColors[variant]}">
      <span class="text-pixel text-xs tracking-wider">{title}</span>
    </div>
  {/if}
  <div class="rpg-panel-body {paddingClasses[padding]}">
    {#if children}
      {@render children()}
    {/if}
  </div>
</div>

<style>
  .rpg-panel {
    border: var(--border-rpg-thick) solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-panel);
    overflow: hidden;
    transition: border-color var(--duration-normal) var(--ease-out);
  }

  .rpg-panel:hover {
    border-color: var(--color-accent);
  }

  .rpg-panel-header {
    padding: var(--spacing-rpg-sm) var(--spacing-rpg-md);
    border-bottom: var(--border-rpg-thin) solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .rpg-panel-body {
    background: linear-gradient(135deg, var(--color-panel) 0%, #0a1220 100%);
  }
</style>
