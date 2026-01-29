export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[];
  video?: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: string[];
  category: string[];
  date: string;
  featured: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "inventix-studio",
    title: "Inventix Studio",
    description: "A creative software house delivering custom SaaS solutions, web apps, and digital products.",
    longDescription: "Inventix Studio is our flagship brand - a full-service software development company specializing in custom SaaS solutions, web applications, and digital products. We've built scalable platforms for businesses worldwide, focusing on modern tech stacks and user-centric design.",
    images: [
      "/brands/inventix-logo.svg",
      "/brands/inventix-logo.svg",
      "/brands/inventix-logo.svg"
    ],
    websiteLink: "https://inventix.studio",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    category: ["SaaS", "Web App", "Full Stack"],
    date: "2024",
    featured: true
  },
  {
    id: "zaptools",
    title: "ZapTools",
    description: "A suite of free, fast, and easy-to-use online tools designed to simplify everyday tasks.",
    longDescription: "ZapTools is a comprehensive collection of free online utilities that help users accomplish everyday tasks quickly and efficiently. From text processing to data conversion, ZapTools provides a clean, intuitive interface for a wide range of tools.",
    images: [
      "/brands/zaptools-logo.svg",
      "/brands/zaptools-logo.svg"
    ],
    websiteLink: "https://zaptools.com",
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    category: ["Web App", "Tools", "Frontend"],
    date: "2024",
    featured: true
  },
  {
    id: "britrecruit",
    title: "BritRecruit",
    description: "A UK-focused recruitment platform connecting employers and job seekers with modern hiring tools.",
    longDescription: "BritRecruit revolutionizes the UK recruitment market with modern technology and user-friendly interfaces. The platform streamlines the hiring process for both employers and job seekers, featuring advanced matching algorithms and intuitive dashboards.",
    images: [
      "/brands/britrecruit-logo.svg"
    ],
    websiteLink: "https://britrecruit.com",
    techStack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    category: ["SaaS", "Platform", "Full Stack"],
    date: "2024",
    featured: false
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A modern, scalable e-commerce solution with advanced inventory management and analytics.",
    longDescription: "Built a comprehensive e-commerce platform with real-time inventory tracking, advanced analytics, and seamless payment integration. Features include multi-vendor support, custom product configurators, and AI-powered recommendations.",
    images: [
      "/brands/inventix-logo.svg"
    ],
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Stripe", "Redis"],
    category: ["E-Commerce", "Full Stack", "Platform"],
    date: "2023",
    featured: false
  },
  {
    id: "dashboard-analytics",
    title: "Analytics Dashboard",
    description: "Real-time data visualization and analytics platform with customizable widgets and reports.",
    longDescription: "A powerful analytics dashboard that aggregates data from multiple sources, providing real-time insights through interactive charts and customizable widgets. Features include automated report generation, data export, and team collaboration tools.",
    images: [
      "/brands/zaptools-logo.svg"
    ],
    techStack: ["React", "TypeScript", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    category: ["Dashboard", "Data Visualization", "Full Stack"],
    date: "2023",
    featured: false
  },
  {
    id: "mobile-app",
    title: "Mobile Task Manager",
    description: "Cross-platform mobile application for task management with team collaboration features.",
    longDescription: "A feature-rich mobile application built with React Native, offering seamless task management across iOS and Android. Includes real-time synchronization, team workspaces, file attachments, and push notifications.",
    images: [
      "/brands/britrecruit-logo.svg"
    ],
    techStack: ["React Native", "TypeScript", "Firebase", "Redux", "Expo"],
    category: ["Mobile", "Cross-Platform", "App"],
    date: "2024",
    featured: false
  }
];
