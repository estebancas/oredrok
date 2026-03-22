<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import PixelButton from './PixelButton.svelte';

  let {
    title,
    description,
    image,
    tags = [],
    role,
    href,
    cta = 'View Project',
    class: className = ''
  }: {
    title: string;
    description: string;
    image?: string;
    tags?: string[];
    role?: string;
    href?: string;
    cta?: string;
    class?: string;
  } = $props();

  let cardRef: HTMLDivElement;

  onMount(() => {
    if (cardRef) {
      // Hover lift effect
      cardRef.addEventListener('mouseenter', () => {
        gsap.to(cardRef, {
          y: -8,
          boxShadow: '12px 12px 0 var(--accent-blue-dark), 0 0 30px rgba(59, 130, 246, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      cardRef.addEventListener('mouseleave', () => {
        gsap.to(cardRef, {
          y: 0,
          boxShadow: '8px 8px 0 var(--accent-blue-dark)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  });
</script>

<div
  bind:this={cardRef}
  class="pixel-card pixel-border-blue pixel-cursor {className}"
>
  {#if image}
    <div class="card-image">
      <img src={image} alt={title} class="pixel-perfect" />
    </div>
  {/if}

  <div class="card-content">
    {#if role}
      <span class="role-badge pixel-label {role.toLowerCase().includes('team') ? 'role-team' : role.toLowerCase().includes('solo') ? 'role-solo' : ''}">{role}</span>
    {/if}
    <h3 class="card-title pixel-header">{title}</h3>
    <p class="card-description pixel-body">{description}</p>

    {#if tags.length > 0}
      <div class="card-tags">
        {#each tags as tag}
          <span class="tag pixel-label">{tag}</span>
        {/each}
      </div>
    {/if}

    {#if href}
      <div class="card-cta">
        <PixelButton {href} variant="blue" size="sm" target="_blank" rel="noopener noreferrer">
          {cta} →
        </PixelButton>
      </div>
    {/if}
  </div>
</div>

<style>
  .pixel-card {
    background: var(--bg-secondary);
    border-width: var(--border-pixel);
    border-color: var(--accent-blue);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 8px 8px 0 var(--accent-blue-dark);
    display: flex;
    flex-direction: column;
  }

  .card-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--bg-primary);
    border-bottom: var(--border-pixel) solid var(--border-pixel);
    position: relative;
  }

  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .pixel-card:hover .card-image img {
    transform: scale(1.05);
  }

  .card-content {
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    flex: 1;
  }

  .role-badge {
    font-size: 10px;
    padding: 4px 8px;
    background: var(--bg-primary);
    border: 2px solid var(--accent-green);
    border-radius: var(--radius-sm);
    color: var(--accent-green);
    width: fit-content;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Role-specific colors */
  .role-badge.role-team {
    border-color: var(--accent-green);
    color: var(--accent-green);
  }

  .role-badge.role-solo {
    border-color: #fbbf24;
    color: #fbbf24;
  }

  .card-title {
    font-size: 14px;
    color: var(--text-primary);
    line-height: 1.6;
    margin: 0;
  }

  .card-description {
    font-size: 16px;
    color: var(--text-secondary);
    line-height: 1.5;
    flex: 1;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .tag {
    font-size: 10px;
    padding: 4px 8px;
    background: var(--bg-elevated);
    border: 2px solid var(--border-pixel);
    border-radius: var(--radius-sm);
    color: var(--accent-blue);
  }

  .card-cta {
    margin-top: auto;
    padding-top: var(--spacing-md);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .card-title {
      font-size: 12px;
    }

    .card-description {
      font-size: 14px;
    }
  }
</style>
