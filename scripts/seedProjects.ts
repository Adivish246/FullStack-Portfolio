import { db } from "../server/db";
import { projects } from "../client/src/data/projects";
import { projects as projectsTable } from "../shared/schema";

async function seedProjects() {
  console.log("Seeding projects...");
  
  try {
    // Insert all projects
    for (const project of projects) {
      await db.insert(projectsTable).values({
        title: project.title,
        description: project.description,
        tech: project.tech,
        link: project.link,
        imageUrl: null
      });
    }
    
    console.log("Projects seeded successfully!");
  } catch (error) {
    console.error("Error seeding projects:", error);
  } finally {
    process.exit(0);
  }
}

seedProjects();