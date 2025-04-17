import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const socialIconsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!socialIconsRef.current) return;
    
    const socialIcons = socialIconsRef.current.querySelectorAll(".social-icon");
    
    socialIcons.forEach(icon => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
    
    return () => {
      socialIcons.forEach(icon => {
        icon.removeEventListener("mouseenter", () => {});
        icon.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);
  
  return (
    <footer className="py-6 bg-[#16213e] relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Aditya Vishwakarma. All rights reserved.</p>
          <div ref={socialIconsRef} className="flex space-x-4">
            <a href="#" className="social-icon w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#8a2be2] transition-colors duration-300">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="social-icon w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#00ffff] transition-colors duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="social-icon w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#39ff14] transition-colors duration-300">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
