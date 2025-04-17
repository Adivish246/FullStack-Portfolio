import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!socialIconsRef.current) return;
    
    const socialIcons = socialIconsRef.current.querySelectorAll(".social-icon");
    
    socialIcons.forEach((icon, index) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          boxShadow: index === 0 ? "0 0 15px rgba(138, 43, 226, 0.6)" : 
                    index === 1 ? "0 0 15px rgba(0, 255, 255, 0.6)" : 
                    "0 0 15px rgba(57, 255, 20, 0.6)",
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          boxShadow: "none",
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
    <footer ref={footerRef} className="py-6 bg-[#16213e] relative overflow-hidden">
      {/* Glow line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a2be2]/70 to-transparent"></div>
      
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-10 left-1/4 w-40 h-40 rounded-full bg-[#8a2be2]/10 blur-[50px]"></div>
        <div className="absolute -bottom-10 right-1/4 w-40 h-40 rounded-full bg-[#00ffff]/10 blur-[50px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Aditya Vishwakarma. All rights reserved.</p>
          
          <div ref={socialIconsRef} className="flex space-x-4">
            <a 
              href="#" 
              className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a2e] border border-gray-700 text-gray-400 hover:text-[#8a2be2] hover:border-[#8a2be2] transition-all duration-300"
              style={{
                overflow: "hidden",
                position: "relative"
              }}
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-[#8a2be2]/20"></span>
              <i className="fab fa-github relative z-10"></i>
            </a>
            
            <a 
              href="#" 
              className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a2e] border border-gray-700 text-gray-400 hover:text-[#00ffff] hover:border-[#00ffff] transition-all duration-300"
              style={{
                overflow: "hidden",
                position: "relative"
              }}
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-[#00ffff]/20"></span>
              <i className="fab fa-linkedin-in relative z-10"></i>
            </a>
            
            <a 
              href="#" 
              className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a2e] border border-gray-700 text-gray-400 hover:text-[#39ff14] hover:border-[#39ff14] transition-all duration-300"
              style={{
                overflow: "hidden",
                position: "relative"
              }}
            >
              <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-[#39ff14]/20"></span>
              <i className="fas fa-envelope relative z-10"></i>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>Crafted with <span className="text-red-500">❤</span> and lots of neon glow</p>
        </div>
      </div>
    </footer>
  );
}
