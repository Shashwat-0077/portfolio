import Dock from "@/components/ui/dock";
import HeroSection from "@/components/pages/home/HeroSection";
import TechSection from "@/components/pages/home/TechSection";
import ProjectSection from "@/components/pages/home/ProjectSection";
import EducationSection from "@/components/pages/home/EducationSection";

export default function HomePage() {
    return (
        <main className="bg-background relative min-h-screen">
            <Dock />
            <div>
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
