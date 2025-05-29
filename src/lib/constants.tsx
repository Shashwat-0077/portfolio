import { Hammer, Home, LayoutDashboard, Phone } from "lucide-react";
import { IconBaseProps } from "react-icons";
import { BiLogoGit } from "react-icons/bi";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import { SiDrizzle, SiExpress, SiMongodb, SiTypescript } from "react-icons/si";
import { TbSql } from "react-icons/tb";

// Animation timing constants
export const ANIMATION_CONSTANTS = {
    DOCK_HIDE_DURATION: 400, // ms
    DOCK_SHOW_DURATION: 500, // ms
    DOCK_HIDE_DELAY: 500, // ms before starting view transition
    CURSOR_CLEANUP_DELAY: 700, // ms

    // Transform values
    DOCK_HIDE_TRANSLATE_Y: -120, // px

    // Z-index values
    DOCK_Z_INDEX: 9999,
    CURSOR_ANIMATION_Z_INDEX: 9999,
    PRELOADER_Z_INDEX: 99999,

    // Easing functions (GSAP)
    DOCK_HIDE_EASING: "power2.inOut",
    DOCK_SHOW_EASING: "back.out(1.2)",
    PAGE_TRANSITION_EASING: "power4.inOut",

    // Page transition timing
    PAGE_TRANSITION_DURATION: 1500, // ms

    // Preloader constants - Extended for SplitText animations
    PRELOADER_DISPLAY_DURATION: 5500, // ms - increased for enhanced animations
    PRELOADER_SLIDE_DURATION: 1.2, // seconds for GSAP
    PRELOADER_FADE_DURATION: 0.8, // seconds for GSAP
    PRELOADER_PROGRESS_DURATION: 4600, // ms - how long progress animation takes
} as const;

// Browser support detection
export const BROWSER_SUPPORT = {
    hasViewTransitions: () =>
        typeof document !== "undefined" && "startViewTransition" in document,
} as const;

// Routes (order matters)
export const ROUTES = [
    {
        icon: Home,
        path: "/",
        label: "Home",
    },
    {
        icon: Hammer,
        path: "/skills",
        label: "Skills",
    },
    {
        icon: LayoutDashboard,
        path: "/projects",
        label: "Projects",
    },
    {
        icon: Phone,
        path: "/contact",
        label: "Contact",
    },
];
export const ROUTES_TO_PREFETCH = ROUTES.map(({ path }) => path);

export type Technology = {
    icon: React.ReactElement<IconBaseProps>;
    name: string;
    description: string;
    color: string;
};

export const TECHNOLOGIES: Technology[] = [
    {
        icon: <SiTypescript />,
        name: "TypeScript",
        description: "Programming language",
        color: "#007acc",
    },
    {
        icon: <RiNextjsLine />,
        name: "Next.js",
        description: "React framework",
        color: "#ffffff",
    },
    {
        icon: <BiLogoGit />,
        name: "GIT",
        description: "Version control system",
        color: "#f05032",
    },
    {
        icon: <RiTailwindCssFill />,
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        color: "#38bdf8",
    },
    {
        icon: <SiExpress />,
        name: "Express.js",
        description: "Web application framework for Node.js",
        color: "#ffffff",
    },
    {
        icon: <SiDrizzle />,
        name: "Drizzle ORM",
        description: "TypeScript ORM for SQL databases",
        color: "#4c51bf",
    },
    {
        icon: <TbSql />,
        name: "SQL",
        description: "Language for managing databases",
        color: "#4479a1",
    },
    {
        icon: <SiMongodb />,
        name: "MongoDB",
        description: "NoSQL database",
        color: "#47a248",
    },
];

export interface Project {
    id: string;
    title: string;
    appIcon: string;
    description: string;
    image: string;
    techStack: Technology[];
    liveUrl?: string;
    githubUrl?: string;
}

export const PROJECTS: Project[] = [
    {
        id: "ecommerce-dashboard",
        title: "E-Commerce Dashboard",
        appIcon: "/icons/dashboard.png",
        description:
            "A comprehensive admin dashboard for managing products, orders, and analytics with real-time data visualization.",
        image: "/projects/ecommerce-dashboard.jpg",
        techStack: [
            TECHNOLOGIES[1],
            TECHNOLOGIES[0],
            TECHNOLOGIES[5],
            TECHNOLOGIES[6],
        ], // Next.js, TypeScript, Drizzle, SQL
        liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
        githubUrl: "https://github.com/username/ecommerce-dashboard",
    },
    {
        id: "task-management-app",
        title: "Task Management System",
        appIcon: "/icons/tasks.png",
        description:
            "A collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking.",
        image: "/projects/task-manager.jpg",
        techStack: [
            TECHNOLOGIES[1],
            TECHNOLOGIES[0],
            TECHNOLOGIES[3],
            TECHNOLOGIES[7],
        ], // Next.js, TypeScript, Tailwind, MongoDB
        liveUrl: "https://taskflow-app.vercel.app",
        githubUrl: "https://github.com/username/task-management",
    },
    {
        id: "weather-forecast-app",
        title: "Weather Forecast App",
        appIcon: "/icons/weather.png",
        description:
            "Real-time weather application with location-based forecasts, interactive maps, and weather alerts.",
        image: "/projects/weather-app.jpg",
        techStack: [TECHNOLOGIES[1], TECHNOLOGIES[0], TECHNOLOGIES[3]], // Next.js, TypeScript, Tailwind
        liveUrl: "https://weather-forecast-pro.vercel.app",
    },
    {
        id: "blog-platform",
        title: "Modern Blog Platform",
        appIcon: "/icons/blog.png",
        description:
            "A full-stack blogging platform with markdown support, commenting system, and SEO optimization.",
        image: "/projects/blog-platform.jpg",
        techStack: [
            TECHNOLOGIES[1],
            TECHNOLOGIES[0],
            TECHNOLOGIES[4],
            TECHNOLOGIES[7],
        ], // Next.js, TypeScript, Express, MongoDB
        liveUrl: "https://modern-blog-platform.vercel.app",
        githubUrl: "https://github.com/username/blog-platform",
    },
    {
        id: "portfolio-website",
        title: "Interactive Portfolio",
        appIcon: "/icons/portfolio.png",
        description:
            "A creative portfolio website with smooth animations, dark mode support, and responsive design.",
        image: "/projects/portfolio.jpg",
        techStack: [TECHNOLOGIES[1], TECHNOLOGIES[0], TECHNOLOGIES[3]], // Next.js, TypeScript, Tailwind
        liveUrl: "https://creative-portfolio.vercel.app",
        githubUrl: "https://github.com/username/portfolio",
    },
    {
        id: "chat-application",
        title: "Real-time Chat App",
        appIcon: "/icons/chat.png",
        description:
            "A modern chat application with real-time messaging, file sharing, and group chat functionality.",
        image: "/projects/chat-app.jpg",
        techStack: [
            TECHNOLOGIES[1],
            TECHNOLOGIES[0],
            TECHNOLOGIES[4],
            TECHNOLOGIES[7],
        ], // Next.js, TypeScript, Express, MongoDB
        githubUrl: "https://github.com/username/chat-app",
    },
];
