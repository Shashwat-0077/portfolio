import Dock from "@/components/ui/dock";
import HeroSection from "@/components/pages/home/HeroSection";
import TechSection from "@/components/pages/home/TechSection";
import ProjectSection from "@/components/pages/home/ProjectSection";
import EducationSection from "@/components/pages/home/EducationSection";

export default function HomePage() {
    return (
        <main className="bg-background relative min-h-screen">
            {/* <div
                className="pointer-events-none absolute inset-0 bg-[url('/background-2.jpg')] bg-cover bg-center opacity-10 brightness-20"
                aria-hidden="true"
            ></div> */}
            <Dock />
            <div className="container mx-auto">
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
