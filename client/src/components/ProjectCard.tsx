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
  
  useEffect(() => {
    if (!cardRef.current || !innerRef.current) return;
    
    const card = cardRef.current;
    const inner = innerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / -20;
      
      gsap.to(inner, {
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
      gsap.to(inner, {
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
  
  return (
    <div ref={cardRef} className="project-card relative group">
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to bottom right, ${gradientFrom}/20, ${gradientTo}/20)`
        }}
      ></div>
      <div 
        ref={innerRef}
        className="card-inner bg-[#1a1a2e] border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-['Space_Grotesk'] font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded text-white"
                style={{
                  background: `${gradientFrom}/30`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4 bg-[#16213e] border-t border-gray-800">
          <a 
            href={project.link} 
            className="block text-center text-white rounded-lg py-2 transition-all duration-300 hover:scale-105"
            style={{
              background: `linear-gradient(90deg, ${gradientFrom}/50, ${gradientTo}/50)`,
              backgroundSize: "200% 100%"
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                backgroundPosition: "100% 0%",
                duration: 0.5
              });
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              gsap.to(target, {
                backgroundPosition: "0% 0%",
                duration: 0.5
              });
            }}
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}
