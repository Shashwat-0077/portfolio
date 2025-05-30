import { Hammer, Home, LayoutDashboard, Phone } from "lucide-react";
import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiExpress,
    SiDocker,
    SiGit,
    SiDrizzle,
} from "react-icons/si";
import { FaZ } from "react-icons/fa6"; // Zustand (custom placeholder icon)

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

export const TECHNOLOGIES = {
    TypeScript: {
        title: "TypeScript",
        description: "Type safe JavaScript",
        icon: <SiTypescript size={36} className="text-[#3178C6]" />,
    },
    "Next.js": {
        title: "Next.js",
        description: "React framework for SSR & routing",
        icon: <SiNextdotjs size={36} className="text-[#000000]" />,
    },
    "Tailwind CSS": {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework",
        icon: <SiTailwindcss size={36} className="text-[#06B6D4]" />,
    },
    Express: {
        title: "Express",
        description: "Minimal Node.js web framework",
        icon: <SiExpress size={36} className="text-[#ffffff]" />,
    },
    Zustand: {
        title: "Zustand",
        description: "Simple and scalable state management",
        icon: <FaZ size={36} className="text-[#000000]" />,
    },
    "Drizzle ORM": {
        title: "Drizzle ORM",
        description: "Type-safe SQL ORM for TypeScript",
        icon: <SiDrizzle size={36} className="text-[#ffda6b]" />,
    },
    Git: {
        title: "Git",
        description: "Version control for code collaboration",
        icon: <SiGit size={36} className="text-[#F05032]" />,
    },
    Docker: {
        title: "Docker",
        description: "Containerized application deployment",
        icon: <SiDocker size={36} className="text-[#2496ED]" />,
    },
};
