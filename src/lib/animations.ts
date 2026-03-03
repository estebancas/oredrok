import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// ============================================
// ANIMATION UTILITIES
// ============================================

/**
 * Fade in with slide up animation
 */
export const fadeInUp = (element: Element | string, delay = 0, duration = 0.6) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration,
    delay,
    ease: 'power2.out'
  });
};

/**
 * Fade in with slide from direction
 */
export const fadeInFrom = (
  element: Element | string,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom',
  delay = 0,
  duration = 0.6
) => {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 }
  };

  return gsap.from(element, {
    opacity: 0,
    ...directions[direction],
    duration,
    delay,
    ease: 'power2.out'
  });
};

/**
 * Staggered reveal animation for children
 */
export const staggerReveal = (
  parent: Element | string,
  childSelector: string,
  staggerAmount = 0.1,
  triggerOnScroll = true
) => {
  const config: gsap.TweenVars = {
    opacity: 0,
    y: 20,
    stagger: staggerAmount,
    duration: 0.5,
    ease: 'power2.out'
  };

  if (triggerOnScroll) {
    config.scrollTrigger = {
      trigger: parent,
      start: 'top 80%',
      once: true
    };
  }

  return gsap.from(`${parent as string} ${childSelector}`, config);
};

/**
 * Dialog slide up with bounce animation
 */
export const dialogOpen = (element: Element | string, duration = 0.4) => {
  return gsap.from(element, {
    y: 100,
    opacity: 0,
    duration,
    ease: 'back.out(1.4)'
  });
};

/**
 * Dialog close animation
 */
export const dialogClose = (element: Element | string, duration = 0.3) => {
  return gsap.to(element, {
    y: 100,
    opacity: 0,
    duration,
    ease: 'back.in(1.4)'
  });
};

/**
 * Typewriter text effect
 */
export const typewriter = (
  element: Element | string,
  text: string,
  speed = 0.05
) => {
  return gsap.to(element, {
    duration: text.length * speed,
    text: text,
    ease: 'none'
  });
};

/**
 * Pixel wipe page transition
 */
export const pixelWipe = (onComplete?: () => void) => {
  const tl = gsap.timeline({ onComplete });

  tl.to('.page-transition-overlay', {
    scaleX: 1,
    duration: 0.3,
    ease: 'power2.in'
  }).to('.page-transition-overlay', {
    scaleX: 0,
    duration: 0.3,
    ease: 'power2.out',
    delay: 0.1
  });

  return tl;
};

/**
 * Scale bounce animation (for button clicks, etc.)
 */
export const scaleBounce = (element: Element | string) => {
  return gsap.timeline().to(element, {
    scale: 0.9,
    duration: 0.1,
    ease: 'power2.in'
  }).to(element, {
    scale: 1,
    duration: 0.3,
    ease: 'elastic.out(1, 0.5)'
  });
};

/**
 * Glow pulse animation
 */
export const glowPulse = (element: Element | string, glowColor = 'rgba(245, 166, 35, 0.6)') => {
  return gsap.to(element, {
    boxShadow: `0 0 30px ${glowColor}`,
    duration: 0.8,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  });
};

/**
 * Card hover tilt effect (3D transform)
 */
export const cardTilt = (element: HTMLElement, intensity = 10) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsap.to(element, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Magnetic cursor effect (element follows cursor)
 */
export const magneticCursor = (element: HTMLElement, intensity = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * intensity,
      y: y * intensity,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

/**
 * Shimmer loading effect
 */
export const shimmer = (element: Element | string) => {
  return gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 1.5,
    ease: 'none',
    repeat: -1
  });
};

/**
 * Scroll-triggered progressive reveal
 */
export const scrollReveal = (
  element: Element | string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean;
    markers?: boolean;
  } = {}
) => {
  const {
    start = 'top 80%',
    end = 'top 20%',
    scrub = false,
    markers = false
  } = options;

  return gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
      markers,
      once: true
    }
  });
};

/**
 * Parallax scroll effect
 */
export const parallax = (
  element: Element | string,
  speed = 0.5,
  direction: 'up' | 'down' = 'up'
) => {
  const y = direction === 'up' ? -100 * speed : 100 * speed;

  return gsap.to(element, {
    y: y,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

/**
 * Ripple effect on click
 */
export const rippleEffect = (element: HTMLElement, e: MouseEvent) => {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ripple.style.position = 'absolute';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.width = '0';
  ripple.style.height = '0';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(245, 166, 35, 0.5)';
  ripple.style.pointerEvents = 'none';
  ripple.style.transform = 'translate(-50%, -50%)';

  element.appendChild(ripple);

  gsap.to(ripple, {
    width: 100,
    height: 100,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove()
  });
};

/**
 * Floating/bobbing idle animation
 */
export const float = (
  element: Element | string,
  distance = 10,
  duration = 2
) => {
  return gsap.to(element, {
    y: distance,
    duration,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });
};

/**
 * Rotate idle animation
 */
export const rotate = (
  element: Element | string,
  rotation = 360,
  duration = 3
) => {
  return gsap.to(element, {
    rotation,
    duration,
    ease: 'none',
    repeat: -1
  });
};

/**
 * Stat bar fill animation
 */
export const statBarFill = (
  element: Element | string,
  targetWidth: number,
  duration = 1
) => {
  return gsap.to(element, {
    width: `${targetWidth}%`,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true
    }
  });
};

/**
 * Segment pulse animation (for stat bars)
 */
export const segmentPulse = (segments: Element[], delay = 0) => {
  const tl = gsap.timeline({ delay });

  segments.forEach((segment, i) => {
    tl.to(segment, {
      scale: 1.1,
      duration: 0.1,
      ease: 'power2.out'
    }).to(segment, {
      scale: 1,
      duration: 0.1,
      ease: 'power2.in'
    }, '<0.05');
  });

  return tl;
};

/**
 * Page entrance animation
 */
export const pageEntrance = (containerSelector: string) => {
  const tl = gsap.timeline();

  tl.from(containerSelector, {
    opacity: 0,
    duration: 0.3
  }).from(`${containerSelector} > *`, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out'
  }, '<0.1');

  return tl;
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Refresh ScrollTrigger (call after DOM updates)
 */
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined' && ScrollTrigger) {
    ScrollTrigger.refresh();
  }
};

/**
 * Kill all ScrollTriggers
 */
export const killAllScrollTriggers = () => {
  if (typeof window !== 'undefined' && ScrollTrigger) {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
};

/**
 * Set up responsive animations
 */
export const matchMedia = (breakpoint: string, callback: () => void) => {
  if (typeof window !== 'undefined') {
    gsap.matchMedia().add(breakpoint, callback);
  }
};

export default {
  fadeInUp,
  fadeInFrom,
  staggerReveal,
  dialogOpen,
  dialogClose,
  typewriter,
  pixelWipe,
  scaleBounce,
  glowPulse,
  cardTilt,
  magneticCursor,
  shimmer,
  scrollReveal,
  parallax,
  rippleEffect,
  float,
  rotate,
  statBarFill,
  segmentPulse,
  pageEntrance,
  refreshScrollTrigger,
  killAllScrollTriggers,
  matchMedia
};
