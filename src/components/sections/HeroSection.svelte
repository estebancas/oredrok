<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import PixelButton from '../ui/PixelButton.svelte';

  let heroRef: HTMLElement;
  let titleRef: HTMLHeadingElement;
  let subtitleRef: HTMLParagraphElement;
  let ctaContainerRef: HTMLDivElement;

  onMount(() => {
    if (typeof window !== 'undefined') {
      // Staggered entrance animation
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(titleRef, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'back.out(1.7)'
      })
      .from(subtitleRef, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.4')
      .from(ctaContainerRef, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');

      // Pixel flicker effect on title
      gsap.to(titleRef, {
        opacity: 0.95,
        duration: 0.1,
        repeat: 2,
        yoyo: true,
        delay: 1.5
      });
    }
  });

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<section
  bind:this={heroRef}
  class="hero-section section-container pixel-grid"
  id="hero"
>
  <div class="hero-content">
    <!-- Main Headline -->
    <h1
      bind:this={titleRef}
      class="hero-title pixel-header"
    >
      OREDROK
    </h1>

    <!-- Subtitle/Role -->
    <p
      bind:this={subtitleRef}
      class="hero-subtitle pixel-body"
    >
      Software Wizard crafting digital experiences<br />
      with the range of a modern renaissance developer
    </p>

    <!-- CTA Buttons -->
    <div
      bind:this={ctaContainerRef}
      class="hero-ctas"
    >
      <PixelButton variant="blue" size="lg" onclick={scrollToContact}>
        Hire Me Now ►
      </PixelButton>
      <PixelButton variant="outline" size="lg" onclick={scrollToProjects}>
        View Work ▼
      </PixelButton>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator pixel-label">
      <span class="arrow">▼</span>
      <span>Scroll</span>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: var(--bg-primary);
    overflow: hidden;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--spacing-xl);
    position: relative;
    z-index: 2;
    max-width: 900px;
    padding-bottom: 80px;
  }

  .hero-title {
    font-size: clamp(48px, 8vw, 72px);
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-shadow:
      4px 4px 0 var(--accent-blue),
      8px 8px 0 var(--bg-secondary);
    line-height: 1.4;
    margin: 0;
  }

  .hero-subtitle {
    font-size: clamp(20px, 3vw, 28px);
    color: var(--text-secondary);
    max-width: 700px;
    line-height: 1.6;
  }

  .hero-ctas {
    display: flex;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    flex-wrap: wrap;
    justify-content: center;
  }

  .scroll-indicator {
    margin-top: var(--spacing-2xl);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--text-muted);
    font-size: 10px;
    animation: bounce 2s infinite;
  }

  .arrow {
    font-size: 16px;
    display: block;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-section {
      min-height: 90vh;
    }

    .hero-title {
      font-size: clamp(32px, 10vw, 48px);
      text-shadow:
        2px 2px 0 var(--accent-blue),
        4px 4px 0 var(--bg-secondary);
    }

    .hero-subtitle {
      font-size: clamp(16px, 4vw, 20px);
    }

    .hero-ctas {
      flex-direction: column;
      width: 100%;
      gap: var(--spacing-md);
    }

    .scroll-indicator {
      bottom: var(--spacing-lg);
    }
  }
</style>
