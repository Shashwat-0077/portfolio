import { Metadata } from "next";

import HeroSection from "@/pages/home/HeroSection";
import TechSection from "@/pages/home/TechSection";
import ProjectSection from "@/pages/home/ProjectSection";
import EducationSection from "@/pages/home/EducationSection";

export const metadata: Metadata = {
    title: "Shashwat Gupta",
    description: "Coding beyond the stars — Portfolio of Shashwat Gupta.",
    openGraph: {
        title: "Shashwat Gupta",
        description:
            "Explore the cosmic codebase of a developer building digital galaxies.",
        url: "https://www.shashwatgupta.me/",
        siteName: "Shashwat Gupta Portfolio",
        images: [
            {
                url: "https://www.shashwatgupta.me/logo.png",
                width: 1000,
                height: 927,
                alt: "Shashwat Gupta",
            },
        ],
        type: "website",
    },
    // twitter: {
    //     card: "summary_large_image",
    //     title: "Shashwat Gupta",
    //     description:
    //         "Explore the cosmic codebase of a developer building digital galaxies.",
    //     images: ["https://yourdomain.com/preview-image.jpg"],
    // },
};

export default function HomePage() {
    return (
        <main className="min-h-scree bg-background relative">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <HeroSection />
                {/* Tech section */}
                <TechSection />
                {/* Projects */}
                <ProjectSection />
                {/* Education */}
                <EducationSection />
            </div>
        </main>
    );
}
