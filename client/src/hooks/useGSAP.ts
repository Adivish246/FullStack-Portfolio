import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  animation: gsap.TweenVars;
  trigger?: gsap.ScrollTriggerVars;
}

export function useGSAP<T extends HTMLElement>(options: UseGSAPOptions) {
  const elementRef = useRef<T>(null);
  
  useEffect(() => {
    if (!elementRef.current) return;
    
    let animation: gsap.core.Tween;
    
    if (options.trigger) {
      animation = gsap.from(elementRef.current, {
        ...options.animation,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
          ...options.trigger
        }
      });
    } else {
      animation = gsap.from(elementRef.current, options.animation);
    }
    
    return () => {
      animation.kill();
      if (options.trigger) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [options.animation, options.trigger]);
  
  return elementRef;
}

export function use3DCardEffect<T extends HTMLElement>() {
  const cardRef = useRef<T>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / -20;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.4)',
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.5,
        ease: "power2.out"
      });
    };
    
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return cardRef;
}
