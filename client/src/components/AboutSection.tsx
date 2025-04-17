import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Set up ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom-=100",
        end: "center center",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .from(contentRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .from(cardRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4");
    
    // 3D card effect
    if (cardRef.current) {
      const card = cardRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };
      
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
      };
    }
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#16213e]/30 z-0"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#8a2be2]/5 to-transparent z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16" ref={titleRef}>
          <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#39ff14] bg-clip-text text-transparent mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8a2be2] to-[#00ffff] mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div ref={contentRef} className="w-full md:w-1/2 order-2 md:order-1">
            <p className="text-gray-300 mb-6 text-lg">I'm a passionate Full Stack Developer with expertise in both front-end and back-end technologies. I love creating immersive, interactive web experiences that combine beautiful design with powerful functionality.</p>
            
            <p className="text-gray-300 mb-6 text-lg">With a strong foundation in modern web technologies, I build scalable applications that deliver exceptional user experiences.</p>
            
            <div className="mt-8">
              <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#00ffff] mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#1a1a2e] p-4 rounded-lg hover:scale-105 transition-transform duration-300">
                  <h4 className="font-medium text-white">Frontend</h4>
                  <p className="text-gray-400 text-sm">React, TypeScript, Vue.js, HTML/CSS, JavaScript</p>
                </div>
                <div className="bg-[#1a1a2e] p-4 rounded-lg hover:scale-105 transition-transform duration-300">
                  <h4 className="font-medium text-white">Backend</h4>
                  <p className="text-gray-400 text-sm">Node.js, Python, Django, Express, MongoDB</p>
                </div>
                <div className="bg-[#1a1a2e] p-4 rounded-lg hover:scale-105 transition-transform duration-300">
                  <h4 className="font-medium text-white">Tools & Others</h4>
                  <p className="text-gray-400 text-sm">Git, Docker, AWS, Firebase, REST APIs</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/20 to-[#39ff14]/20 blur-2xl opacity-50"></div>
              <div 
                ref={cardRef}
                className="absolute inset-0 rounded-xl overflow-hidden bg-[#1a1a2e]/80"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  filter: "drop-shadow(0 0 8px #00ffff) drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))",
                }}
              >
                <div 
                  className="h-full w-full p-6 flex flex-col justify-center"
                  style={{
                    position: "relative",
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-xl opacity-70 z-0"
                    style={{
                      content: '',
                      border: '2px solid transparent',
                      background: 'linear-gradient(45deg, #00ffff, #39ff14) border-box',
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }}
                  ></div>
                  <div className="text-center relative z-10">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-[#8a2be2]">
                      <img src="/attached_assets/profile-pic.jpg" alt="Aditya Vishwakarma" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-['Space_Grotesk'] font-bold text-white mb-2">Aditya Vishwakarma</h3>
                    <p className="text-gray-300 mb-4">Full Stack Developer</p>
                    <div className="flex justify-center space-x-3">
                      <a href="#" className="w-8 h-8 rounded-full bg-[#16213e] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <i className="fab fa-github text-gray-300"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-[#16213e] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <i className="fab fa-linkedin-in text-gray-300"></i>
                      </a>
                      <a href="#" className="w-8 h-8 rounded-full bg-[#16213e] flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-envelope text-gray-300"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
