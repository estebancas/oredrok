<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import ComparisonCard from '../ui/ComparisonCard.svelte';
  import PixelButton from '../ui/PixelButton.svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLHeadingElement;

  const leftItems = [
    { text: 'Generic solutions that don\'t fit your needs', icon: '❌' },
    { text: 'Slow delivery and missed deadlines', icon: '❌' },
    { text: 'Poor communication and updates', icon: '❌' },
    { text: 'Outdated technology stack', icon: '❌' },
    { text: 'High hourly rates with hidden costs', icon: '❌' },
    { text: 'Limited availability and flexibility', icon: '❌' }
  ];

  const rightItems = [
    { text: 'Custom-built applications tailored to you', icon: '✅' },
    { text: 'Rapid development with agile sprints', icon: '✅' },
    { text: 'Daily updates and transparent workflow', icon: '✅' },
    { text: 'Modern stack: TypeScript, Node.js, Svelte', icon: '✅' },
    { text: 'Fair pricing with no surprises', icon: '✅' },
    { text: 'Full-time availability when you need me', icon: '✅' }
  ];

  const techStack = [
    { name: 'TypeScript', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Svelte', level: 80 },
    { name: 'React', level: 75 },
    { name: 'AWS', level: 70 }
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

      // Animate tech stack bars
      techStack.forEach((_, index) => {
        const bar = document.querySelector(`#tech-bar-${index}`);
        if (bar) {
          gsap.from(bar, {
            scaleX: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              once: true
            }
          });
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
    WHY CHOOSE ME?
  </h2>

  <p class="section-subtitle pixel-body">
    I offer you a better solution
  </p>

  <!-- Comparison Cards -->
  <ComparisonCard
    leftTitle="Other Developers"
    rightTitle="Oredrok (Me)"
    leftSubtitle="$120k-180k/year + overhead"
    rightSubtitle="$40-90/hour, flexible"
    {leftItems}
    {rightItems}
  />

  <!-- Tech Stack -->
  <div class="tech-stack">
    <h3 class="tech-title pixel-label">Tech Stack & Expertise</h3>
    <div class="tech-grid">
      {#each techStack as tech, index}
        <div class="tech-item">
          <div class="tech-header">
            <span class="pixel-label">{tech.name}</span>
            <span class="pixel-body text-accent-blue">{tech.level}%</span>
          </div>
          <div class="tech-bar-bg">
            <div
              id="tech-bar-{index}"
              class="tech-bar-fill"
              style="width: {tech.level}%"
            ></div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- CTA -->
  <div class="about-cta">
    <PixelButton variant="green" size="lg" href="#contact">
      Calculate My Team's Cost ►
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

  /* Tech Stack */
  .tech-stack {
    margin-top: var(--spacing-4xl);
    padding: var(--spacing-xl);
    background: var(--bg-secondary);
    border: var(--border-pixel) solid var(--border-light);
    border-radius: var(--radius-md);
  }

  .tech-title {
    font-size: 14px;
    color: var(--accent-blue);
    margin-bottom: var(--spacing-lg);
    text-align: center;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .tech-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tech-header .pixel-label {
    font-size: 12px;
    color: var(--text-secondary);
  }

  .tech-header .pixel-body {
    font-size: 16px;
    font-weight: bold;
  }

  .tech-bar-bg {
    height: 12px;
    background: var(--bg-primary);
    border: 2px solid var(--border-pixel);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .tech-bar-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--accent-blue) 0%,
      var(--accent-green) 100%
    );
    transform-origin: left;
    box-shadow: 0 0 10px var(--accent-blue);
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

    .tech-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
