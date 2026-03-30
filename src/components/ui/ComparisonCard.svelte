<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import PixelIcon from './PixelIcon.svelte';

  interface ComparisonItem {
    text?: string;
    name?: string;
    level?: number;
    icon?: string;
  }

  let {
    leftTitle,
    rightTitle,
    leftItems,
    rightItems,
    leftSubtitle,
    rightSubtitle,
    leftIcon,
    rightIcon,
    animated = true,
    class: className = ''
  }: {
    leftTitle: string;
    rightTitle: string;
    leftItems: ComparisonItem[];
    rightItems: ComparisonItem[];
    leftSubtitle?: string;
    rightSubtitle?: string;
    leftIcon?: 'sword' | 'shield' | 'chevron' | 'tome';
    rightIcon?: 'sword' | 'shield' | 'chevron' | 'tome';
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

      // Animate tech bars in left card
      leftItems.forEach((item, index) => {
        if (item.level !== undefined) {
          const bar = document.querySelector(`#left-tech-bar-${index}`);
          if (bar) {
            gsap.from(bar, {
              scaleX: 0,
              duration: 1.2,
              delay: index * 0.1 + 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: leftCardRef,
                start: 'top 80%',
                once: true
              }
            });
          }
        }
      });

      // Animate tech bars in right card
      rightItems.forEach((item, index) => {
        if (item.level !== undefined) {
          const bar = document.querySelector(`#right-tech-bar-${index}`);
          if (bar) {
            gsap.from(bar, {
              scaleX: 0,
              duration: 1.2,
              delay: index * 0.1 + 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: rightCardRef,
                start: 'top 80%',
                once: true
              }
            });
          }
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
      {#if leftIcon}
        <div class="header-icon">
          <PixelIcon name={leftIcon} color="var(--accent-blue)" class="icon-lg" />
        </div>
      {/if}
      <h3 class="pixel-label text-accent-blue text-sm">{leftTitle}</h3>
      {#if leftSubtitle}
        <p class="pixel-body text-text-secondary text-lg mt-2">{leftSubtitle}</p>
      {/if}
    </div>

    <ul class="card-items">
      {#each leftItems as item, index}
        {#if item.level !== undefined}
          <!-- Tech Stack Item -->
          <li class="tech-item">
            <div class="tech-header">
              <span class="tech-name pixel-body">{item.name}</span>
              <span class="tech-value pixel-label">{item.level}</span>
            </div>
            <div class="tech-bar-bg">
              <div
                id="left-tech-bar-{index}"
                class="tech-bar-fill blue-fill"
                style="width: {item.level}%"
              >
                <div class="bar-shine"></div>
              </div>
            </div>
          </li>
        {:else}
          <!-- Regular Item -->
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
        {/if}
      {/each}
    </ul>
  </div>

  <!-- Right Card (Solution/You) -->
  <div
    bind:this={rightCardRef}
    class="comparison-card right-card pixel-border-green"
  >
    <div class="card-header">
      {#if rightIcon}
        <div class="header-icon">
          <PixelIcon name={rightIcon} color="var(--accent-green)" class="icon-lg" />
        </div>
      {/if}
      <h3 class="pixel-label text-accent-green text-sm">{rightTitle}</h3>
      {#if rightSubtitle}
        <p class="pixel-body text-text-secondary text-lg mt-2">{rightSubtitle}</p>
      {/if}
    </div>

    <ul class="card-items">
      {#each rightItems as item, index}
        {#if item.level !== undefined}
          <!-- Tech Stack Item -->
          <li class="tech-item">
            <div class="tech-header">
              <span class="tech-name pixel-body">{item.name}</span>
              <span class="tech-value pixel-label">{item.level}</span>
            </div>
            <div class="tech-bar-bg">
              <div
                id="right-tech-bar-{index}"
                class="tech-bar-fill green-fill"
                style="width: {item.level}%"
              >
                <div class="bar-shine"></div>
              </div>
            </div>
          </li>
        {:else}
          <!-- Regular Item -->
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
        {/if}
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
    text-align: center;
  }

  .header-icon {
    display: inline-block;
    margin-bottom: var(--spacing-md);
    filter: drop-shadow(0 0 10px currentColor);
  }

  .header-icon :global(.icon-lg) {
    width: 40px;
    height: 40px;
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

  /* Tech Stack Styles */
  .tech-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tech-name {
    font-size: 14px;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .tech-value {
    font-size: 14px;
    color: var(--accent-green);
    text-shadow: 0 0 8px rgba(74, 222, 128, 0.5);
    min-width: 40px;
    text-align: right;
  }

  .tech-bar-bg {
    height: 14px;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-sm);
    overflow: hidden;
    position: relative;
  }

  .tech-bar-fill {
    height: 100%;
    transform-origin: left;
    position: relative;
    overflow: hidden;
  }

  .blue-fill {
    background: linear-gradient(
      90deg,
      var(--accent-blue) 0%,
      #60a5fa 50%,
      #93c5fd 100%
    );
    box-shadow:
      0 0 15px rgba(59, 130, 246, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .green-fill {
    background: linear-gradient(
      90deg,
      var(--accent-green) 0%,
      #86efac 50%,
      #bbf7d0 100%
    );
    box-shadow:
      0 0 15px rgba(74, 222, 128, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .bar-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shine 3s infinite;
  }

  @keyframes shine {
    0%, 100% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .comparison-cards {
      grid-template-columns: 1fr;
      gap: var(--spacing-xl);
    }
  }
</style>
