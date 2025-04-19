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
    link: "https://github.com/Adivish246"
  },
  {
    id: 2,
    title: "Online Auction",
    description: "Real-time auction platform with bidding system and secure payment integration.",
    tech: ["Python", "Django"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 3,
    title: "Movie Platform",
    description: "Streaming service with personalized recommendations and user reviews.",
    tech: ["Python", "Django"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 4,
    title: "Portfolio V1",
    description: "My first portfolio website showcasing clean design and responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 5,
    title: "CodeVault",
    description: "Snippet storage app with syntax highlighting and organization features.",
    tech: ["Node.js", "Express", "MongoDB"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 6,
    title: "TaskMaster Pro",
    description: "Advanced project management system with real-time collaboration and Kanban boards.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "WebSocket"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 7,
    title: "FitFlow",
    description: "Fitness tracking application with workout planning, progress analytics, and social features.",
    tech: ["React Native", "Node.js", "GraphQL", "MongoDB", "AWS"],
    link: "https://github.com/Adivish246"
  },
  {
    id: 8,
    title: "DevConnect",
    description: "Social platform for developers with code sharing, mentorship matching, and live collaboration.",
    tech: ["Vue.js", "FastAPI", "Redis", "PostgreSQL", "Docker"],
    link: "https://github.com/Adivish246"
  }
];
