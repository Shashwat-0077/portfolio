import Dock from "@/components/ui/dock";
import HeroSection from "@/components/pages/home/HeroSection";

export default function HomePage() {
    return (
        <main className="bg-background min-h-screen">
            <Dock />
            <div className="container mx-auto">
                {/* Hero Section */}
                <HeroSection />
                {/* Tech section */}
                {/* Projects */}
                {/* Timeline */}
            </div>
        </main>
    );
}
