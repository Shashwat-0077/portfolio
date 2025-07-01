"use client";

import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import { useAnimationStore } from "@/stores/animation-store";
import HeroSection from "@/pages/skills/HeroSection";
import SkillSections from "@/pages/skills/SkillSections";

export default function SkillsPage() {
    const { isCompatible } = useAnimationStore();

    return (
        <div className="bg-background overflow-x-hidden">
            <div className="container mx-auto min-h-screen">
                {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

                <HeroSection />
                <SkillSections />
            </div>
        </div>
    );
}
