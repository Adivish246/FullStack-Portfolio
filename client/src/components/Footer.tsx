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
              href="https://github.com/Adivish246" 
              className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e] group relative overflow-hidden transform hover:scale-110 transition-all duration-300"
              style={{
                position: "relative"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a2be2] to-[#00ffff] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-[#8a2be2] rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#8a2be2] to-[#00ffff] rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 group-hover:scale-105"></div>
              <i className="fab fa-github text-gray-400 group-hover:text-white relative z-10 text-xl transform group-hover:rotate-12 transition-all duration-300"></i>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/aditya-vishwakarmaa-823340336" 
              className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e] group relative overflow-hidden transform hover:scale-110 transition-all duration-300"
              style={{
                position: "relative"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff] to-[#39ff14] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-[#00ffff] rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00ffff] to-[#39ff14] rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 group-hover:scale-105"></div>
              <i className="fab fa-linkedin-in text-gray-400 group-hover:text-white relative z-10 text-xl transform group-hover:rotate-12 transition-all duration-300"></i>
            </a>
            
            <a 
              href="mailto:adityavishwakarma11234@gmail.com" 
              className="social-icon w-12 h-12 flex items-center justify-center rounded-full bg-[#1a1a2e] group relative overflow-hidden transform hover:scale-110 transition-all duration-300"
              style={{
                position: "relative"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14] to-[#8a2be2] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border border-[#39ff14] rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-[#39ff14] to-[#8a2be2] rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 group-hover:scale-105"></div>
              <i className="fas fa-envelope text-gray-400 group-hover:text-white relative z-10 text-xl transform group-hover:rotate-12 transition-all duration-300"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
