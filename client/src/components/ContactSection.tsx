import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contactItemsRef.current) return;
    
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Contact items animation
    const contactItems = contactItemsRef.current.querySelectorAll(".contact-item");
    contactItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out"
      });
      
      // Icon animation on hover
      const icon = item.querySelector(".contact-icon");
      if (icon) {
        item.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        item.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clean up event listeners
      const contactItems = contactItemsRef.current?.querySelectorAll(".contact-item");
      contactItems?.forEach(item => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#8a2be2]/20 to-transparent"></div>
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 rounded-full bg-[#39ff14]/10 blur-[80px]"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#00ffff]/10 blur-[80px]"></div>
      </div>
      
      {/* Glow lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a2be2]/50 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#8a2be2] bg-clip-text text-transparent mb-4 animate-glow-pulse"
            style={{
              filter: "drop-shadow(0 0 5px rgba(57, 255, 20, 0.5))"
            }}
          >
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39ff14] to-[#8a2be2] mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">Interested in working together? Feel free to reach out!</p>
        </div>
        
        <div ref={contactItemsRef} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <a 
            href="mailto:contact@example.com" 
            className="contact-item group flex flex-col items-center p-6 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-[#00ffff] transition-all duration-300 relative overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#00ffff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-[#00ffff]/10 to-transparent"></div>
            
            <div 
              className="contact-icon w-16 h-16 flex items-center justify-center bg-[#00ffff]/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
              style={{
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
              }}
            >
              <i className="fas fa-envelope text-2xl text-[#00ffff]"></i>
            </div>
            <h3 
              className="text-xl font-['Space_Grotesk'] font-medium text-white mb-2 group-hover:text-[#00ffff] transition-colors duration-300"
              style={{
                textShadow: "0 0 10px rgba(0, 255, 255, 0)"
              }}
            >
              Email
            </h3>
            <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">contact@example.com</p>
          </a>
          
          <a 
            href="#" 
            className="contact-item group flex flex-col items-center p-6 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-[#8a2be2] transition-all duration-300 relative overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#8a2be2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-[#8a2be2]/10 to-transparent"></div>
            
            <div 
              className="contact-icon w-16 h-16 flex items-center justify-center bg-[#8a2be2]/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
              style={{
                boxShadow: "0 0 15px rgba(138, 43, 226, 0.3)"
              }}
            >
              <i className="fab fa-github text-2xl text-[#8a2be2]"></i>
            </div>
            <h3 
              className="text-xl font-['Space_Grotesk'] font-medium text-white mb-2 group-hover:text-[#8a2be2] transition-colors duration-300"
              style={{
                textShadow: "0 0 10px rgba(138, 43, 226, 0)"
              }}
            >
              GitHub
            </h3>
            <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">github.com/adityav</p>
          </a>
          
          <a 
            href="#" 
            className="contact-item group flex flex-col items-center p-6 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-[#39ff14] transition-all duration-300 relative overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-[#39ff14]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-[#39ff14]/10 to-transparent"></div>
            
            <div 
              className="contact-icon w-16 h-16 flex items-center justify-center bg-[#39ff14]/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
              style={{
                boxShadow: "0 0 15px rgba(57, 255, 20, 0.3)"
              }}
            >
              <i className="fab fa-linkedin-in text-2xl text-[#39ff14]"></i>
            </div>
            <h3 
              className="text-xl font-['Space_Grotesk'] font-medium text-white mb-2 group-hover:text-[#39ff14] transition-colors duration-300"
              style={{
                textShadow: "0 0 10px rgba(57, 255, 20, 0)"
              }}
            >
              LinkedIn
            </h3>
            <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">linkedin.com/in/adityav</p>
          </a>
        </div>
      </div>
    </section>
  );
}
