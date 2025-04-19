# Modern Portfolio Website

A modern, responsive full-stack portfolio website built with cutting-edge technologies. Features a sleek UI, real-time interactions, and seamless backend integration.

![Portfolio Preview](generated-icon.png)

## 🚀 Features

- **Modern UI/UX**
  - Smooth animations with GSAP
  - Responsive design for all devices
  - Dark theme with modern aesthetics
  - Interactive project cards with hover effects

- **Full-Stack Architecture**
  - React frontend with Vite for optimal performance
  - Express.js backend with TypeScript
  - PostgreSQL database with Drizzle ORM
  - Real-time updates using WebSocket

- **Key Components**
  - Dynamic project showcase
  - Contact form with email integration
  - Smooth scrolling navigation
  - Modern component library with Radix UI
  - Type-safe backend with TypeScript

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- GSAP Animations
- Radix UI Components
- React Query
- Framer Motion

### Backend
- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM
- WebSocket
- Nodemailer

### DevOps
- Vercel Deployment
- Neon PostgreSQL
- TypeScript
- ESBuild

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Adivish246/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```env
DATABASE_URL=your_postgresql_url
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_app_password
```

4. Run development server:
```bash
npm run dev
```

## 🌐 Deployment

The project is configured for Vercel deployment with:
- Automatic frontend and backend builds
- API route handling
- Static file serving
- Environment variable management

## 🎨 Project Structure

```
portfolio/
├── client/           # Frontend React application
├── server/           # Express.js backend
├── shared/           # Shared types and utilities
├── migrations/       # Database migrations
└── public/          # Static assets
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Update database schema

## 📝 Features in Detail

### Project Showcase
- Interactive project cards
- Technology stack display
- Live demo links
- GitHub repository links

### Contact Form
- Real-time validation
- Email notification system
- Success/error handling
- CSRF protection

### Animations
- Smooth page transitions
- Hover effects
- Loading states
- Scroll animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Aditya Vishwakarma**
- GitHub: [@Adivish246](https://github.com/Adivish246)

## 🙏 Acknowledgments

- Radix UI for the component library
- Vercel for hosting
- Neon for PostgreSQL database 