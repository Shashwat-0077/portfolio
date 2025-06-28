"use client";

import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import { useAnimationStore } from "@/stores/animation-store";

export default function ContactPage() {
    const { isCompatible } = useAnimationStore();

    return (
        <>
            <div className="bg-background flex min-h-screen flex-col items-center justify-center text-white">
                {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

                <main className="min-h-[3000px] bg-gray-950 text-white">
                    {/* <TimelineDragScroll /> */}
                </main>
            </div>
        </>
    );
}
