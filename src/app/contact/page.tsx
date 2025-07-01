"use client";

import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import { useAnimationStore } from "@/stores/animation-store";

export default function ContactPage() {
    const { isCompatible } = useAnimationStore();

    return (
        <>
            <div className="bg-background min-h-screen flex-col text-white">
                {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

                <main className="container mx-auto min-h-[3000px] text-white"></main>
            </div>
        </>
    );
}
