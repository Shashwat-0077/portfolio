import { Hammer, Home, LayoutDashboard, Phone } from "lucide-react";

import { TECHNOLOGIES } from "@/data/technologies";

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

export const BROWSER_SUPPORT = {
    hasViewTransitions: () =>
        typeof document !== "undefined" && "startViewTransition" in document,
};

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

export const ringConfigs = [
    {
        id: "ring-3",
        zIndex: 3,
        radius: 450,
        duration: 60,
        reversed: false,
        items: [
            TECHNOLOGIES["TypeScript"].Icon,
            TECHNOLOGIES["Next.js"].Icon,
            TECHNOLOGIES["Tailwind"].Icon,
            TECHNOLOGIES["Express"].Icon,
            TECHNOLOGIES["MongoDB"].Icon,
            TECHNOLOGIES["Drizzle"].Icon,
            TECHNOLOGIES["Git"].Icon,
            TECHNOLOGIES["Docker"].Icon,
            TECHNOLOGIES["Python"].Icon,
            TECHNOLOGIES["React"].Icon,
        ],
    },
    {
        id: "ring-2",
        zIndex: 2,
        radius: 300,
        duration: 60,
        reversed: true,
        items: [
            TECHNOLOGIES["Node.js"].Icon,
            TECHNOLOGIES["SQL"].Icon,
            TECHNOLOGIES["Redis"].Icon,
            TECHNOLOGIES["GraphQL"].Icon,
            TECHNOLOGIES["PostgreSQL"].Icon,
            TECHNOLOGIES["Firebase"].Icon,
            TECHNOLOGIES["AWS"].Icon,
            TECHNOLOGIES["Keras"].Icon,
        ],
    },
    {
        id: "ring-1",
        zIndex: 1,
        radius: 150,
        duration: 60,
        reversed: false,
        items: [
            TECHNOLOGIES["TensorFlow"].Icon,
            TECHNOLOGIES["PyTorch"].Icon,
            TECHNOLOGIES["scikit-learn"].Icon,
            TECHNOLOGIES["OpenCV"].Icon,
            TECHNOLOGIES["Flask"].Icon,
            TECHNOLOGIES["Linux"].Icon,
        ],
    },
];
