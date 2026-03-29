<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let footerRef: HTMLElement;
  let pixelsContainer: HTMLElement;

  onMount(async () => {
    // Dynamically import ScrollTrigger only on client side
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Animate footer on scroll
    gsap.from(footerRef, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef,
        start: 'top 95%',
        once: true,
      },
    });

    // Animate pixel squares with stagger
    const pixels = pixelsContainer.querySelectorAll('.pixel-square');
    gsap.from(pixels, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: footerRef,
        start: 'top 95%',
        once: true,
      },
    });

    // Continuous floating animation for pixels
    pixels.forEach((pixel, index) => {
      gsap.to(pixel, {
        y: gsap.utils.random(-8, 8),
        x: gsap.utils.random(-6, 6),
        duration: gsap.utils.random(2, 4),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.1,
      });
    });
  });

  const currentYear = new Date().getFullYear();
</script>

<footer class="footer" bind:this={footerRef}>
  <!-- Scattered Pixel Squares -->
  <div class="pixels-container" bind:this={pixelsContainer}>
    <!-- Top scattered pixels -->
    <div class="pixel-square pixel-sm" style="top: 20px; left: 8%;"></div>
    <div class="pixel-square pixel-md" style="top: 10px; left: 15%;"></div>
    <div class="pixel-square pixel-xs" style="top: 35px; left: 22%;"></div>
    <div class="pixel-square pixel-lg" style="top: 15px; left: 30%;"></div>
    <div class="pixel-square pixel-sm" style="top: 40px; left: 38%;"></div>
    <div class="pixel-square pixel-md" style="top: 8px; left: 45%;"></div>
    <div class="pixel-square pixel-xs" style="top: 30px; left: 52%;"></div>
    <div class="pixel-square pixel-sm" style="top: 18px; left: 60%;"></div>
    <div class="pixel-square pixel-lg" style="top: 25px; left: 68%;"></div>
    <div class="pixel-square pixel-md" style="top: 12px; left: 75%;"></div>
    <div class="pixel-square pixel-xs" style="top: 38px; left: 82%;"></div>
    <div class="pixel-square pixel-sm" style="top: 20px; left: 90%;"></div>

    <!-- Bottom scattered pixels -->
    <div class="pixel-square pixel-md" style="bottom: 15px; left: 5%;"></div>
    <div class="pixel-square pixel-xs" style="bottom: 35px; left: 12%;"></div>
    <div class="pixel-square pixel-sm" style="bottom: 25px; left: 20%;"></div>
    <div class="pixel-square pixel-lg" style="bottom: 10px; left: 28%;"></div>
    <div class="pixel-square pixel-xs" style="bottom: 40px; left: 36%;"></div>
    <div class="pixel-square pixel-md" style="bottom: 20px; left: 43%;"></div>
    <div class="pixel-square pixel-sm" style="bottom: 8px; left: 50%;"></div>
    <div class="pixel-square pixel-lg" style="bottom: 30px; left: 58%;"></div>
    <div class="pixel-square pixel-xs" style="bottom: 18px; left: 65%;"></div>
    <div class="pixel-square pixel-md" style="bottom: 35px; left: 72%;"></div>
    <div class="pixel-square pixel-sm" style="bottom: 12px; left: 80%;"></div>
    <div class="pixel-square pixel-xs" style="bottom: 28px; left: 88%;"></div>
    <div class="pixel-square pixel-md" style="bottom: 22px; left: 95%;"></div>
  </div>

  <!-- Footer Content -->
  <div class="footer-content">
    <div class="footer-text pixel-body">
      <p class="built-with">Built with Svelte, Astro & Occultism 🧙</p>
      <p class="copyright">© {currentYear} oredrok.dev</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    position: relative;
    width: 100%;
    min-height: 150px;
    background: var(--bg-secondary);
    border-top: 4px solid var(--border-pixel);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: var(--spacing-3xl) var(--spacing-xl);
  }

  /* Scattered Pixel Squares */
  .pixels-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }

  .pixel-square {
    position: absolute;
    background: var(--accent-green);
    border-radius: 1px;
    will-change: transform;
  }

  /* Pixel sizes with varying opacity */
  .pixel-xs {
    width: 4px;
    height: 4px;
    opacity: 0.4;
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
  }

  .pixel-sm {
    width: 8px;
    height: 8px;
    opacity: 0.5;
    box-shadow: 0 0 12px rgba(74, 222, 128, 0.4);
  }

  .pixel-md {
    width: 12px;
    height: 12px;
    opacity: 0.6;
    box-shadow: 0 0 16px rgba(74, 222, 128, 0.5);
  }

  .pixel-lg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.6);
  }

  /* Footer Content */
  .footer-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
  }

  .footer-text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .built-with {
    font-size: 18px;
    color: var(--text-primary);
    margin: 0;
    letter-spacing: 0.5px;
    text-shadow: 0 0 12px rgba(74, 222, 128, 0.3);
  }

  .copyright {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
    opacity: 0.7;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .footer {
      min-height: 180px;
      padding: var(--spacing-2xl) var(--spacing-lg);
    }

    .built-with {
      font-size: 16px;
    }

    .copyright {
      font-size: 12px;
    }

    /* Reduce pixel density on mobile */
    .pixel-square:nth-child(2n) {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .footer {
      min-height: 200px;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    .built-with {
      font-size: 14px;
    }

    /* Further reduce pixels on small screens */
    .pixel-square:nth-child(3n) {
      display: none;
    }
  }

  /* Hover effect on footer */
  .footer:hover .pixel-square {
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: var(--pixel-opacity);
    }
    50% {
      opacity: calc(var(--pixel-opacity) * 1.5);
    }
  }

  .pixel-xs {
    --pixel-opacity: 0.4;
  }

  .pixel-sm {
    --pixel-opacity: 0.5;
  }

  .pixel-md {
    --pixel-opacity: 0.6;
  }

  .pixel-lg {
    --pixel-opacity: 0.7;
  }
</style>
