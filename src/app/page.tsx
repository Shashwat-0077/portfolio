import { Metadata } from "next";

import HeroSection from "@/components/pages/home/HeroSection";
import TechSection from "@/components/pages/home/TechSection";
import ProjectSection from "@/components/pages/home/ProjectSection";
// import EducationSection from "@/components/pages/home/EducationSection";

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
        <main className="bg-background relative min-h-screen">
            <div>
                {/* Hero Section */}
                <HeroSection />
                {/* Tech section */}
                <TechSection />
                {/* Projects */}
                <ProjectSection />
                {/* Education */}
                {/* <EducationSection /> */}
            </div>
        </main>
    );
}
