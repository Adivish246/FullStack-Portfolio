import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Fetch projects from the database API
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    queryFn: async () => {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
    staleTime: 60 * 1000, // 1 minute
  });

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !projectsContainerRef.current) return;

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

    // Project cards animation - only if projects are loaded
    if (projects && projects.length > 0) {
      const projectCards = projectsContainerRef.current.querySelectorAll(".project-card");
      projectCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 relative"
    >
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(138, 43, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138, 43, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center center"
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-[#8a2be2] via-[#00ffff] to-[#39ff14] bg-clip-text text-transparent mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#39ff14] mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">Explore my recent work — each project showcases different skills and technologies.</p>
        </div>
        
        <div ref={projectsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {isLoading ? (
            // Loading state
            Array(6).fill(0).map((_, index) => (
              <div 
                key={index}
                className="h-72 rounded-lg bg-[#1a1a2e] border border-gray-800 animate-pulse"
              ></div>
            ))
          ) : error ? (
            // Error state
            <div className="col-span-3 text-center py-10">
              <div className="text-red-400 text-xl mb-4">Failed to load projects</div>
              <p className="text-gray-400">Please try again later</p>
            </div>
          ) : projects && projects.length > 0 ? (
            // Projects loaded successfully
            projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                gradientFrom={index % 3 === 0 ? "#8a2be2" : index % 3 === 1 ? "#00ffff" : "#39ff14"}
                gradientTo={index % 3 === 0 ? "#00ffff" : index % 3 === 1 ? "#39ff14" : "#8a2be2"}
              />
            ))
          ) : (
            // No projects found
            <div className="col-span-3 text-center py-10">
              <div className="text-gray-400 text-xl">No projects found</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
