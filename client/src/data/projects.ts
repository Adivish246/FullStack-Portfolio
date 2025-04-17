export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Scrumpts",
    description: "Chocolate eCommerce Platform with modern UI and seamless checkout experience.",
    tech: ["React", "TypeScript", "Vite"],
    link: "#"
  },
  {
    id: 2,
    title: "Online Auction",
    description: "Real-time auction platform with bidding system and secure payment integration.",
    tech: ["Python", "Django"],
    link: "#"
  },
  {
    id: 3,
    title: "Movie Platform",
    description: "Streaming service with personalized recommendations and user reviews.",
    tech: ["Python", "Django"],
    link: "#"
  },
  {
    id: 4,
    title: "Portfolio V1",
    description: "My first portfolio website showcasing clean design and responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#"
  },
  {
    id: 5,
    title: "CodeVault",
    description: "Snippet storage app with syntax highlighting and organization features.",
    tech: ["Node.js", "Express", "MongoDB"],
    link: "#"
  }
];
