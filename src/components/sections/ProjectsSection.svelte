<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import PixelCard from '../ui/PixelCard.svelte';

  let sectionRef: HTMLElement;
  let headingRef: HTMLHeadingElement;

  // Sample projects - you can customize these
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
      image: '/images/project-1.png', // Placeholder
      tags: ['TypeScript', 'Node.js', 'React', 'PostgreSQL'],
      href: '#',
      cta: 'View Case Study'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard with real-time data visualization, custom reports, and team collaboration features.',
      image: '/images/project-2.png', // Placeholder
      tags: ['Svelte', 'FastAPI', 'WebSockets', 'MongoDB'],
      href: '#',
      cta: 'See Live Demo'
    },
    {
      title: 'Mobile App Backend',
      description: 'Scalable REST API with authentication, push notifications, and third-party integrations.',
      image: '/images/project-3.png', // Placeholder
      tags: ['Node.js', 'Express', 'AWS', 'Redis'],
      href: '#',
      cta: 'Explore API'
    }
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
    {#each projects as project}
      <div class="project-card">
        <PixelCard
          title={project.title}
          description={project.description}
          image={project.image}
          tags={project.tags}
          href={project.href}
          cta={project.cta}
        />
      </div>
    {/each}
  </div>

  <!-- Pixel divider -->
  <div class="pixel-divider"></div>

  <!-- Additional Info -->
  <div class="projects-footer">
    <p class="pixel-body text-center">
      Want to see more? Check out my
      <a href="https://github.com/yourusername" target="_blank" rel="noopener" class="link-accent">
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
  }

  .project-card {
    /* Removed opacity: 0 to ensure cards are visible by default */
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
