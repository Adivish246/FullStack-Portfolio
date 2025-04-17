import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Configure GSAP globally
gsap.config({
  nullTargetWarn: false,
});

// Default ease for all animations
gsap.defaults({
  ease: "power3.out",
  duration: 0.8
});

// Commonly used animations
export const animations = {
  fadeIn: {
    opacity: 0,
    y: 30,
    duration: 0.8
  },
  slideInLeft: {
    opacity: 0,
    x: -50,
    duration: 0.8
  },
  slideInRight: {
    opacity: 0,
    x: 50,
    duration: 0.8
  },
  scale: {
    scale: 0.8,
    opacity: 0,
    duration: 0.8
  }
};

// Common ScrollTrigger configs
export const scrollTriggers = {
  default: {
    start: "top bottom-=100",
    end: "center center",
    toggleActions: "play none none reverse"
  },
  staggered: {
    start: "top bottom-=100",
    end: "center center",
    stagger: 0.1,
    toggleActions: "play none none reverse"
  }
};

export function setupPageTransitions() {
  // This function can be expanded for more complex page transitions
  return {
    enter: (element: HTMLElement) => {
      return gsap.from(element, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        clearProps: "all"
      });
    },
    exit: (element: HTMLElement) => {
      return gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.6
      });
    }
  };
}

export function createTimeline() {
  return gsap.timeline();
}
