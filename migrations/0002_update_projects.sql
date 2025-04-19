-- Delete existing projects if any
DELETE FROM projects;

-- Insert updated projects
INSERT INTO projects (title, description, tech, link, created_at)
VALUES
  ('Scrumpts', 'Chocolate eCommerce Platform with modern UI and seamless checkout experience.', ARRAY['React', 'TypeScript', 'Vite'], 'https://github.com/Adivish246', NOW()),
  ('Online Auction', 'Real-time auction platform with bidding system and secure payment integration.', ARRAY['Python', 'Django'], 'https://github.com/Adivish246', NOW()),
  ('Movie Platform', 'Streaming service with personalized recommendations and user reviews.', ARRAY['Python', 'Django'], 'https://github.com/Adivish246', NOW()),
  ('Portfolio V1', 'My first portfolio website showcasing clean design and responsive layout.', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://github.com/Adivish246', NOW()),
  ('CodeVault', 'Snippet storage app with syntax highlighting and organization features.', ARRAY['Node.js', 'Express', 'MongoDB'], 'https://github.com/Adivish246', NOW()),
  ('TaskMaster Pro', 'Advanced project management system with real-time collaboration and Kanban boards.', ARRAY['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'WebSocket'], 'https://github.com/Adivish246', NOW()),
  ('FitFlow', 'Fitness tracking application with workout planning, progress analytics, and social features.', ARRAY['React Native', 'Node.js', 'GraphQL', 'MongoDB', 'AWS'], 'https://github.com/Adivish246', NOW()),
  ('DevConnect', 'Social platform for developers with code sharing, mentorship matching, and live collaboration.', ARRAY['Vue.js', 'FastAPI', 'Redis', 'PostgreSQL', 'Docker'], 'https://github.com/Adivish246', NOW()); 