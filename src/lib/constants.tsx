import { Hammer, Home, LayoutDashboard, Phone } from "lucide-react";
import {
    SiTypescript,
    SiNextdotjs,
    SiTailwindcss,
    SiExpress,
    SiDocker,
    SiGit,
    SiDrizzle,
    SiMongodb,
} from "react-icons/si";
import { IconType } from "react-icons";
import { FaAppleAlt, FaBeer, FaDragon } from "react-icons/fa";
import { MdAlarm, MdBolt, MdPets } from "react-icons/md";
import { GiAbstract049, GiCrystalBars, GiGooExplosion } from "react-icons/gi";
import { AiFillBug, AiFillHeart, AiOutlineCloud } from "react-icons/ai";
import { RiCameraLensLine, RiEarthLine, RiSunLine } from "react-icons/ri";
import { BiCycling, BiGhost, BiRocket } from "react-icons/bi";
import { TbHexagonLetterX, TbZodiacScorpio } from "react-icons/tb";
import { LuMountain, LuShip } from "react-icons/lu";
import { TiWeatherSnow } from "react-icons/ti";
import { CgGames } from "react-icons/cg";

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
    [key: string]: {
        title: string;
        description: string;
        Icon: IconType | React.ComponentType<React.SVGProps<SVGSVGElement>>;
        defaultIconColor: string;
    };
};

export const TECHNOLOGIES = {
    TypeScript: {
        title: "TypeScript",
        description: "Type safe JavaScript",
        Icon: SiTypescript,
        defaultIconColor: "#7077FF",
    },
    "Next.js": {
        title: "Next.js",
        description: "React framework for SSR & routing",
        Icon: SiNextdotjs,
        defaultIconColor: "#7077FF",
    },
    "Tailwind CSS": {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework",
        Icon: SiTailwindcss,
        defaultIconColor: "#7077FF",
    },
    Express: {
        title: "Express",
        description: "Minimal Node.js web framework",
        Icon: SiExpress,
        defaultIconColor: "#7077FF",
    },
    MongoDB: {
        title: "MongoDB",
        description: "NoSQL database",
        Icon: SiMongodb,
        defaultIconColor: "#7077FF",
    },
    "Drizzle ORM": {
        title: "Drizzle ORM",
        description: "Type-safe SQL ORM for TypeScript",
        Icon: SiDrizzle,
        defaultIconColor: "#7077FF",
    },
    Git: {
        title: "Git",
        description: "Version control system",
        Icon: SiGit,
        defaultIconColor: "#7077FF",
    },
    Docker: {
        title: "Docker",
        description: "Containerization platform",
        Icon: SiDocker,
        defaultIconColor: "#7077FF",
    },
};

export type Project = {
    logoUrl: string;
    backgroundImageUrl: string;
    title: string;
    description: string;
    liveLink: string;
    githubLink: string;
    foreGroundColor: string;
    primaryColor: string;
    textColor: string;
    technologies: Technology[keyof Technology][];
};

export const PROJECTS = {
    Momentum: {
        logoUrl: "/projects/Momentum/logo.svg",
        backgroundImageUrl: "/projects/Momentum/background.png",
        title: "Momentum",
        description:
            "Momentum is a powerful web app that helps you track, visualize, and manage your data effortlessly. With seamless Notion integration, you can sync and analyze your Notion databases alongside your personal data. Momentum features interactive charts for deep insights, a habit tracker with vibrant heat-maps to monitor your progress, and a clean, intuitive interface to keep you organized and motivated every step of the way",
        liveLink: "https://momentum-pied.vercel.app/",
        githubLink: "https://github.com/Shashwat-0077/momentum",
        foreGroundColor: "#ffffff",
        primaryColor: "#F2545B",
        textColor: "#ffffff",
        technologies: [
            TECHNOLOGIES["Next.js"],
            TECHNOLOGIES["Tailwind CSS"],
            TECHNOLOGIES["TypeScript"],
            TECHNOLOGIES["Drizzle ORM"],
            TECHNOLOGIES["MongoDB"],
            TECHNOLOGIES["Git"],
        ],
    },
    "Virtual Doc": {
        logoUrl: "/projects/VirtualDoc/logo.svg",
        backgroundImageUrl: "/projects/VirtualDoc/background.png",
        title: "Virtual Doc",
        description:
            "Connect with doctors instantly, book appointments with ease, and consult via secure video calls — all in one place. Built with a powerful tech stack: real-time communication using Socket.IO and WebRTC, a seamless interface powered by Next.js, a robust backend with Express and MongoDB, and secure login through Google Authentication. Your care, re-imagined.",
        liveLink: "",
        githubLink:
            "https://github.com/Shashwat-0077/online-medical-consultation",
        foreGroundColor: "#000000",
        primaryColor: "#16ccbd",
        textColor: "#000000",
        technologies: [
            TECHNOLOGIES["Next.js"],
            TECHNOLOGIES["Tailwind CSS"],
            TECHNOLOGIES["TypeScript"],
            TECHNOLOGIES["Git"],
            TECHNOLOGIES["Express"],
        ],
    },
};

export const ringConfigs = [
    {
        id: "ring-3",
        zIndex: 3,
        radius: 400,
        duration: 60,
        reversed: false,
        items: [
            FaDragon,
            MdPets,
            GiGooExplosion,
            AiFillBug,
            RiSunLine,
            BiCycling,
            TbZodiacScorpio,
            LuMountain,
            TiWeatherSnow,
            CgGames,
        ],
    },
    {
        id: "ring-2",
        zIndex: 2,
        radius: 300,
        duration: 60,
        reversed: true,
        items: [
            FaAppleAlt,
            MdBolt,
            GiCrystalBars,
            AiFillHeart,
            RiEarthLine,
            BiGhost,
            TbHexagonLetterX,
            LuShip,
        ],
    },
    {
        id: "ring-1",
        zIndex: 1,
        radius: 200,
        duration: 60,
        reversed: false,
        items: [
            FaBeer,
            MdAlarm,
            GiAbstract049,
            AiOutlineCloud,
            RiCameraLensLine,
            BiRocket,
        ],
    },
];
