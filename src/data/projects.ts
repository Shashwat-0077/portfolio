import { Technology } from "@/data/technologies";

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
            "Next.js",
            "React",
            "Tailwind",
            "API Design",
            "Drizzle",
        ] satisfies (keyof Technology)[],
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
            "Next.js",
            "React",
            "Tailwind",
            "API Design",
            "Drizzle",
        ] satisfies (keyof Technology)[],
    },
};

export type Project = typeof PROJECTS;
