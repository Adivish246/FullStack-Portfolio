import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowOrbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();

    tl.from(nameRef.current, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: "power3.out"
    })
    .from(roleRef.current, {
      duration: 1.2,
      opacity: 0,
      y: 30,
      ease: "power3.out"
    }, "-=1")
    .from(descRef.current, {
      duration: 1,
      opacity: 0,
      y: 20,
      ease: "power3.out"
    }, "-=0.8")
    .from(ctaRef.current, {
      duration: 0.8,
      opacity: 0,
      y: 20,
      ease: "power3.out"
    }, "-=0.6");

    // Animate floating orbs
    if (glowOrbsRef.current) {
      const orbs = glowOrbsRef.current.querySelectorAll('.glow-orb');
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          y: `random(-20, 20)`,
          x: `random(-20, 20)`,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen grid-background flex items-center pt-16 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "center center"
      }}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#8a2be2]/20 blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#00ffff]/20 blur-[100px]"></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 rounded-full bg-[#39ff14]/10 blur-[80px]"></div>
      </div>

      {/* Floating glow orbs */}
      <div ref={glowOrbsRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="glow-orb absolute top-1/5 left-1/4 w-6 h-6 rounded-full bg-[#8a2be2] opacity-20 blur-sm"></div>
        <div className="glow-orb absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-[#00ffff] opacity-20 blur-sm"></div>
        <div className="glow-orb absolute top-2/3 left-1/4 w-5 h-5 rounded-full bg-[#39ff14] opacity-20 blur-sm"></div>
        <div className="glow-orb absolute top-1/2 left-3/4 w-3 h-3 rounded-full bg-[#8a2be2] opacity-20 blur-sm"></div>
        <div className="glow-orb absolute top-3/4 left-1/3 w-5 h-5 rounded-full bg-[#00ffff] opacity-20 blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative z-10">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <div className="relative z-10">
            <h2 className="text-lg font-medium text-[#00ffff] mb-2 animate-pulse">Hello, I'm</h2>
            <h1 
              ref={nameRef}
              className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold mb-6 bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#39ff14] bg-clip-text text-transparent"
              style={{
                filter: "drop-shadow(0 0 8px rgba(138, 43, 226, 0.8))"
              }}
            >
              Aditya Vishwakarma
            </h1>
            <h3 
              ref={roleRef}
              className="text-2xl md:text-3xl font-['Space_Grotesk'] text-gray-300 mb-8"
              style={{
                textShadow: "0 0 15px rgba(0, 255, 255, 0.5)"
              }}
            >
              Full Stack Developer
            </h3>
            <p 
              ref={descRef}
              className="text-gray-300 max-w-lg mb-8"
            >
              Crafting immersive web experiences with modern technologies and creative solutions.
            </p>
            <div ref={ctaRef} className="flex space-x-4">
              <a 
                href="#projects" 
                className="relative bg-[#8a2be2]/30 hover:bg-[#8a2be2]/50 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 10px #8a2be2) drop-shadow(0 0 25px rgba(138, 43, 226, 0.5))"
                }}
              >
                <span className="relative z-10">View My Work</span>
                <span 
                  className="absolute inset-0 rounded-lg opacity-80"
                  style={{
                    content: '',
                    border: '2px solid transparent',
                    background: 'linear-gradient(45deg, #8a2be2, #00ffff, #39ff14) border-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    zIndex: -1
                  }}
                ></span>
              </a>
              <a 
                href="#contact" 
                className="border border-[#00ffff]/50 hover:border-[#00ffff] px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.5)"
                }}
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-70 animate-pulse"
              style={{ 
                background: "linear-gradient(to bottom right, rgba(138, 43, 226, 0.8), rgba(0, 255, 255, 0.8))",
                filter: "drop-shadow(0 0 20px #8a2be2)" 
              }}
            ></div>
            <div className="absolute inset-0 rounded-full animate-ping opacity-30" 
              style={{
                animationDuration: "3s",
                background: "linear-gradient(to bottom right, rgba(0, 255, 255, 0.3), rgba(57, 255, 20, 0.3))"
              }}
            ></div>
            <div className="absolute inset-4 rounded-full bg-[#16213e] border-2 border-[#00ffff]/50 flex items-center justify-center overflow-hidden">
              <img 
                src="/attached_assets/profile-pic.jpg" 
                alt="Aditya Vishwakarma" 
                className="w-full h-full object-cover rounded-full p-2"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
