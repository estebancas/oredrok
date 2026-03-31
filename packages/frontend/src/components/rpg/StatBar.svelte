<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  interface Props {
    label: string;
    value: number; // 0-100
    maxSegments?: number;
    icon?: string;
    color?: string;
    class?: string;
  }

  let {
    label,
    value,
    maxSegments = 10,
    icon,
    color = 'var(--color-accent)',
    class: className = ''
  }: Props = $props();

  let barElement: HTMLDivElement;
  let segmentElements: HTMLDivElement[] = [];
  let filledSegments = $state(0);

  const targetSegments = $derived(Math.round((value / 100) * maxSegments));

  onMount(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Animate stat bar fill on scroll into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: barElement,
          start: 'top 80%',
          once: true
        }
      });

      // Count up animation
      tl.to(
        { value: 0 },
        {
          value: targetSegments,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            const currentValue = Math.round(this.targets()[0].value);
            filledSegments = currentValue;

            // Add pulse effect to newly filled segments
            if (currentValue > 0 && currentValue <= segmentElements.length) {
              const currentSegment = segmentElements[currentValue - 1];
              if (currentSegment) {
                gsap.fromTo(
                  currentSegment,
                  { scale: 1.3, opacity: 0.5 },
                  { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' }
                );
              }
            }
          }
        }
      );
    }
  });
</script>

<div bind:this={barElement} class="stat-bar {className}">
  <div class="stat-label-wrapper">
    {#if icon}
      <img src={icon} alt="" class="stat-icon pixel-art" />
    {/if}
    <span class="stat-label text-pixel text-sm">{label}</span>
  </div>

  <div class="stat-bar-container">
    {#each Array(maxSegments) as _, i}
      <div
        bind:this={segmentElements[i]}
        class="stat-segment"
        class:filled={i < filledSegments}
        style="background-color: {i < filledSegments ? color : 'var(--color-border)'};"
      ></div>
    {/each}
  </div>

  <span class="stat-value text-pixel text-xs">{value}%</span>
</div>

<style>
  .stat-bar {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    padding: var(--spacing-sm);
  }

  .stat-label-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    min-width: 180px;
  }

  .stat-icon {
    width: 24px;
    height: 24px;
  }

  .stat-bar-container {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  .stat-segment {
    flex: 1;
    height: 24px;
    position: relative;
    overflow: hidden;
  }

  .stat-value {
    min-width: 50px;
    text-align: right;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .stat-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }

    .stat-label-wrapper {
      min-width: auto;
      width: 100%;
    }

    .stat-bar-container {
      width: 100%;
    }

    .stat-value {
      align-self: flex-end;
    }
  }
</style>
