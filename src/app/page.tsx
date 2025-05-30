import Dock from "@/components/ui/dock";
import HeroSection from "@/components/pages/home/HeroSection";
import TechSection from "@/components/pages/home/TechSection";
import ProjectSection from "@/components/pages/home/ProjectSection";

export default function HomePage() {
    return (
        <main className="bg-background min-h-screen">
            <Dock />
            <div className="container mx-auto">
                {/* Hero Section */}
                <HeroSection />
                {/* Tech section */}
                <TechSection />
                {/* Projects */}
                <ProjectSection />
                {/* Timeline */}
            </div>
        </main>
    );
}
