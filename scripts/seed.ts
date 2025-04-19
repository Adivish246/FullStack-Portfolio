import { storage } from "../server/storage";

async function seed() {
  try {
    // Add sample projects
    const projects = [
      {
        title: "Portfolio Website",
        description: "A modern portfolio website built with React, TypeScript, and Express",
        tech: ["React", "TypeScript", "Express", "Tailwind CSS", "PostgreSQL"],
        link: "https://github.com/Adivish246/portfolio",
        imageUrl: "/portfolio-screenshot.png"
      },
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform with user authentication and payment integration",
        tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
        link: "https://github.com/Adivish246/ecommerce",
        imageUrl: "/ecommerce-screenshot.png"
      },
      {
        title: "Task Management App",
        description: "A real-time task management application with collaborative features",
        tech: ["Vue.js", "Firebase", "Vuex", "Material UI", "WebSockets"],
        link: "https://github.com/Adivish246/task-manager",
        imageUrl: "/taskmanager-screenshot.png"
      }
    ];

    // Add contact information
    const contactInfo = {
      email: "adityavishwakarma11234@gmail.com",
      github: "https://github.com/Adivish246",
      linkedin: "https://www.linkedin.com/in/aditya-vishwakarmaa-823340336",
      // You can add more social links here
    };

    // First, let's clear existing projects
    const existingProjects = await storage.getProjects();
    for (const project of existingProjects) {
      await storage.deleteProject(project.id);
    }

    // Then add new projects
    for (const project of projects) {
      await storage.createProject(project);
      console.log(`Created project: ${project.title}`);
    }

    // Update contact information in the database
    await storage.createContactMessage({
      name: "Aditya Vishwakarma",
      email: contactInfo.email,
      message: JSON.stringify(contactInfo) // Store social links in the message field
    });

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed(); 