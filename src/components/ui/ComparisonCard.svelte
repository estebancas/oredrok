<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import PixelIcon from './PixelIcon.svelte';

  interface ComparisonItem {
    text: string;
    icon?: string;
  }

  let {
    leftTitle,
    rightTitle,
    leftItems,
    rightItems,
    leftSubtitle,
    rightSubtitle,
    animated = true,
    class: className = ''
  }: {
    leftTitle: string;
    rightTitle: string;
    leftItems: ComparisonItem[];
    rightItems: ComparisonItem[];
    leftSubtitle?: string;
    rightSubtitle?: string;
    animated?: boolean;
    class?: string;
  } = $props();

  let leftCardRef: HTMLDivElement;
  let rightCardRef: HTMLDivElement;

  onMount(() => {
    if (animated && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Slide in from left
      gsap.from(leftCardRef, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftCardRef,
          start: 'top 80%',
          once: true
        }
      });

      // Slide in from right
      gsap.from(rightCardRef, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightCardRef,
          start: 'top 80%',
          once: true
        }
      });
    }
  });
</script>

<div class="comparison-cards {className}">
  <!-- Left Card (Problems/Comparison) -->
  <div
    bind:this={leftCardRef}
    class="comparison-card left-card pixel-border-blue"
  >
    <div class="card-header">
      <h3 class="pixel-label text-accent-blue text-sm">{leftTitle}</h3>
      {#if leftSubtitle}
        <p class="pixel-body text-text-secondary text-lg mt-2">{leftSubtitle}</p>
      {/if}
    </div>

    <ul class="card-items">
      {#each leftItems as item}
        <li class="item">
          <span class="icon text-accent-blue">
            {#if item.icon === '✅'}
              <PixelIcon name="chevron" />
            {:else}
              {item.icon || '❌'}
            {/if}
          </span>
          <span class="pixel-body text-text-secondary">{item.text}</span>
        </li>
      {/each}
    </ul>
  </div>

  <!-- Right Card (Solution/You) -->
  <div
    bind:this={rightCardRef}
    class="comparison-card right-card pixel-border-green"
  >
    <div class="card-header">
      <h3 class="pixel-label text-accent-green text-sm">{rightTitle}</h3>
      {#if rightSubtitle}
        <p class="pixel-body text-text-secondary text-lg mt-2">{rightSubtitle}</p>
      {/if}
    </div>

    <ul class="card-items">
      {#each rightItems as item}
        <li class="item">
          <span class="icon text-accent-green">
            {#if !item.icon || item.icon === '✅'}
              <PixelIcon name="chevron" />
            {:else}
              {item.icon}
            {/if}
          </span>
          <span class="pixel-body text-text-primary">{item.text}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .comparison-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
    width: 100%;
  }

  .comparison-card {
    background: var(--bg-secondary);
    border-width: var(--border-pixel);
    border-radius: var(--radius-md);
    padding: var(--spacing-xl);
    position: relative;
  }

  .left-card {
    border-color: var(--accent-blue);
    box-shadow:
      0 0 20px rgba(59, 130, 246, 0.2),
      8px 8px 0 var(--accent-blue-dark);
  }

  .right-card {
    border-color: var(--accent-green);
    box-shadow:
      0 0 20px rgba(74, 222, 128, 0.2),
      8px 8px 0 var(--accent-green-dark);
  }

  .card-header {
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--border-pixel);
  }

  .card-items {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .item {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    line-height: 1.6;
  }

  .icon {
    font-size: 16px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .comparison-cards {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }
</style>
