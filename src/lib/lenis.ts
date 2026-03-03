import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll
 * Call this in the browser after DOMContentLoaded
 */
export const initLenis = () => {
  if (typeof window === 'undefined') return null;

  // Create Lenis instance
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Sync Lenis with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis to GSAP ticker for smooth animation loop
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Disable lag smoothing for better sync
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

/**
 * Destroy Lenis instance
 */
export const destroyLenis = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

/**
 * Get current Lenis instance
 */
export const getLenis = () => lenis;

/**
 * Scroll to a specific target
 */
export const scrollTo = (
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    onComplete?: () => void;
  }
) => {
  if (!lenis) return;

  lenis.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
    easing: options?.easing,
    immediate: options?.immediate ?? false,
    onComplete: options?.onComplete,
  });
};

/**
 * Stop smooth scroll
 */
export const stop = () => {
  lenis?.stop();
};

/**
 * Start/resume smooth scroll
 */
export const start = () => {
  lenis?.start();
};

export default {
  initLenis,
  destroyLenis,
  getLenis,
  scrollTo,
  stop,
  start,
};
