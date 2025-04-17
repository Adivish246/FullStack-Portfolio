import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  gradientFrom: string;
  gradientTo: string;
}

export default function ProjectCard({ project, gradientFrom, gradientTo }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current || !innerRef.current) return;
    
    const card = cardRef.current;
    const inner = innerRef.current;
    const glow = glowRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / -15;
      
      // Move the glow effect to follow the mouse
      if (glow) {
        gsap.to(glow, {
          x: x - 100,
          y: y - 100,
          opacity: 0.7,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      
      gsap.to(inner, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        boxShadow: `0 20px 30px rgba(0, 0, 0, 0.4), 
                    0 0 30px rgba(${gradientFrom === '#8a2be2' ? '138, 43, 226' : 
                                    gradientFrom === '#00ffff' ? '0, 255, 255' : 
                                    '57, 255, 20'}, 0.3)`,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.5,
        ease: "power2.out"
      });
      
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.3
        });
      }
    };
    
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <div ref={cardRef} className="project-card relative group">
      {/* Moving glow effect */}
      <div 
        ref={glowRef} 
        className="absolute w-200 h-200 rounded-full opacity-0 pointer-events-none z-0"
        style={{
          width: "200px",
          height: "200px",
          background: `radial-gradient(circle, ${gradientFrom}80, transparent 70%)`,
          filter: `blur(20px)`
        }}
      ></div>
      
      {/* Card background glow on hover */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom right, ${gradientFrom}30, ${gradientTo}30)`,
          boxShadow: `0 0 30px ${gradientFrom}50`,
          filter: `blur(2px)`
        }}
      ></div>
      
      <div 
        ref={innerRef}
        className="card-inner bg-[#1a1a2e]/90 backdrop-blur-sm border border-gray-800 group-hover:border-opacity-0 rounded-xl overflow-hidden h-full flex flex-col relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          transition: "border 0.3s ease"
        }}
      >
        {/* Border glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            border: `1px solid transparent`,
            background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo}) border-box`,
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            zIndex: -1
          }}
        ></div>
        
        <div className="p-6 flex-grow relative z-10">
          <h3 
            className="text-xl font-['Space_Grotesk'] font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textShadow: `0 0 10px ${gradientFrom}40`
            }}
          >
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 group-hover:text-white transition-colors duration-300">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded text-white font-medium transition-all duration-300 hover:scale-110"
                style={{
                  background: `${gradientFrom}30`,
                  boxShadow: `0 0 10px ${gradientFrom}20`,
                  border: `1px solid ${gradientFrom}30`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-[#16213e]/80 backdrop-blur-sm border-t border-gray-800 group-hover:border-opacity-0">
          <a 
            href={project.link} 
            className="block text-center text-white rounded-lg py-2 transition-all duration-300 hover:scale-105 relative overflow-hidden"
            style={{
              background: `linear-gradient(90deg, ${gradientFrom}70, ${gradientTo}70)`,
              backgroundSize: "200% 100%",
              textShadow: "0 0 5px rgba(255, 255, 255, 0.5)"
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                backgroundPosition: "100% 0%",
                boxShadow: `0 0 20px ${gradientTo}70`,
                duration: 0.5
              });
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                backgroundPosition: "0% 0%",
                boxShadow: "none",
                duration: 0.5
              });
            }}
          >
            <span className="relative z-10">View Project</span>
            <span className="absolute top-0 left-0 right-0 bottom-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-shimmer"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
