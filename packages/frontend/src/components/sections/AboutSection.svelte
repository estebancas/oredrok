<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import ComparisonCard from '../ui/ComparisonCard.svelte';
  import PixelButton from '../ui/PixelButton.svelte';
  import PixelIcon from '../ui/PixelIcon.svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLHeadingElement;

  const weapons = [
    { name: 'JavaScript', level: 98 },
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 90 },
    { name: 'Python', level: 80 }
  ];

  const equipment = [
    { name: 'AWS', level: 90 },
    { name: 'Docker', level: 85 },
    { name: 'Kubernetes', level: 80 },
    { name: 'Cloudflare', level: 80 },
  ];

  onMount(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(headingRef, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef,
          start: 'top 70%',
          once: true
        }
      });
    }
  });
</script>

<section
  bind:this={sectionRef}
  class="about-section section-container"
  id="about"
>
  <h2
    bind:this={headingRef}
    class="section-title pixel-header"
  >
    CHARACTER STATS
  </h2>

  <p class="section-subtitle pixel-body">
    Core abilities and equipped tools
  </p>

  <!-- Character Stats Cards -->
  <ComparisonCard
    leftTitle="WEAPONS"
    rightTitle="EQUIPMENT"
    leftSubtitle="Primary Arsenal"
    rightSubtitle="Tools & Infrastructure"
    leftIcon="sword"
    rightIcon="shield"
    leftItems={weapons}
    rightItems={equipment}
  />

  <!-- CTA -->
  <div class="about-cta">
    <PixelButton variant="green" size="lg" href="#contact">
      Let's Work Together ►
    </PixelButton>
  </div>
</section>

<style>
  .about-section {
    background: var(--bg-primary);
    position: relative;
  }

  .section-title {
    font-size: clamp(32px, 6vw, 56px);
    text-align: center;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
    text-shadow:
      3px 3px 0 var(--accent-green),
      6px 6px 0 var(--bg-secondary);
  }

  .section-subtitle {
    font-size: clamp(18px, 3vw, 24px);
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-3xl);
  }

  /* CTA */
  .about-cta {
    margin-top: var(--spacing-4xl);
    display: flex;
    justify-content: center;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .section-title {
      font-size: clamp(24px, 8vw, 32px);
      text-shadow:
        2px 2px 0 var(--accent-green),
        4px 4px 0 var(--bg-secondary);
    }
  }
</style>
