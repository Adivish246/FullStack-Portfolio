import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Cube3D from "./Cube3D";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen grid-background flex items-center pt-16"
      style={{
        backgroundImage: `
          linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        backgroundPosition: "center center"
      }}
    >
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <div className="relative z-10">
            <h2 className="text-lg font-medium text-[#00ffff] mb-2">Hello, I'm</h2>
            <h1 
              ref={nameRef}
              className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold mb-6 bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#39ff14] bg-clip-text text-transparent"
            >
              Aditya Vishwakarma
            </h1>
            <h3 
              ref={roleRef}
              className="text-2xl md:text-3xl font-['Space_Grotesk'] text-gray-300 mb-8"
            >
              Full Stack Developer
            </h3>
            <p 
              ref={descRef}
              className="text-gray-400 max-w-lg mb-8"
            >
              Crafting immersive web experiences with modern technologies and creative solutions.
            </p>
            <div ref={ctaRef} className="flex space-x-4">
              <a 
                href="#projects" 
                className="relative bg-[#8a2be2]/20 hover:bg-[#8a2be2]/30 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                style={{
                  filter: "drop-shadow(0 0 8px #8a2be2) drop-shadow(0 0 20px rgba(138, 43, 226, 0.3))"
                }}
              >
                <span className="relative z-10">View My Work</span>
                <span 
                  className="absolute inset-0 rounded-lg opacity-70"
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
                className="border border-gray-600 hover:border-[#00ffff] px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:filter hover:drop-shadow-[0_0_8px_rgba(0,255,255,1)]"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full">
            <div 
              className="absolute inset-0 rounded-full blur-2xl opacity-70 animate-pulse"
              style={{ background: "linear-gradient(to bottom right, rgba(138, 43, 226, 0.3), rgba(0, 255, 255, 0.3))" }}
            ></div>
            <div className="absolute inset-4 rounded-full bg-[#16213e] border border-[#8a2be2]/30 flex items-center justify-center overflow-hidden">
              <Cube3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
