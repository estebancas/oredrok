<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import PixelCard from '../ui/PixelCard.svelte';
  import PixelButton from '../ui/PixelButton.svelte';

  interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    role?: string;
    href?: string;
    liveUrl?: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
    cta: string;
  }

  interface Props {
    projects?: Project[];
  }

  let { projects = [] }: Props = $props();

  let sectionRef: HTMLElement = $state()!;
  let headingRef: HTMLHeadingElement = $state()!;
  let visibleCount = $state(3);
  let showAll = $state(false);

  const toggleShowMore = () => {
    showAll = !showAll;
    visibleCount = showAll ? projects.length : 3;
  };

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

      // Stagger project cards entrance
      const cards = document.querySelectorAll('.project-card');
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 75%',
          once: true
        }
      });
    }
  });
</script>

<section
  bind:this={sectionRef}
  class="projects-section section-container"
  id="projects"
>
  <h2
    bind:this={headingRef}
    class="section-title pixel-header"
  >
    FEATURED WORK
  </h2>

  <p class="section-subtitle pixel-body">
    Real projects, real results
  </p>

  <div class="projects-grid">
    {#each projects.slice(0, visibleCount) as project, index}
      <div
        class="project-card"
        in:fly={{ y: 30, duration: 600, delay: index > 2 ? (index - 3) * 100 : 0 }}
      >
        <PixelCard
          title={project.title}
          description={project.description}
          image={project.image}
          tags={project.tags}
          role={project.role}
          href={project.href}
          liveUrl={project.liveUrl}
          appStoreUrl={project.appStoreUrl}
          playStoreUrl={project.playStoreUrl}
          cta={project.cta}
        />
      </div>
    {/each}
  </div>

  <!-- Show More/Less Button -->
  {#if projects.length > 3}
    <div class="show-more-container">
      <PixelButton
        variant="blue"
        size="lg"
        onclick={toggleShowMore}
      >
        {showAll ? 'SHOW LESS ◄' : 'SHOW MORE PROJECTS ►'}
      </PixelButton>
    </div>
  {/if}

  <!-- Pixel divider -->
  <div class="pixel-divider"></div>

  <!-- Additional Info -->
  <div class="projects-footer">
    <p class="pixel-body text-center">
      Want to see more? Check out my
      <a href="https://github.com/estebancas" target="_blank" rel="noopener" class="link-accent">
        GitHub profile
      </a>
      for open-source contributions.
    </p>
  </div>
</section>

<style>
  .projects-section {
    background: var(--bg-primary);
    position: relative;
  }

  .section-title {
    font-size: clamp(32px, 6vw, 56px);
    text-align: center;
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
    text-shadow:
      3px 3px 0 var(--accent-blue),
      6px 6px 0 var(--bg-secondary);
  }

  .section-subtitle {
    font-size: clamp(18px, 3vw, 24px);
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-3xl);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-xl);
    justify-items: center;
  }

  .project-card {
    /* Removed opacity: 0 to ensure cards are visible by default */
  }

  .show-more-container {
    margin-top: var(--spacing-3xl);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .projects-footer {
    margin-top: var(--spacing-3xl);
    text-align: center;
  }

  .link-accent {
    color: var(--accent-blue);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
    transition: color 0.2s ease;
  }

  .link-accent:hover {
    color: var(--accent-green);
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: clamp(24px, 8vw, 32px);
      text-shadow:
        2px 2px 0 var(--accent-blue),
        4px 4px 0 var(--bg-secondary);
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: var(--spacing-lg);
    }
  }
</style>
