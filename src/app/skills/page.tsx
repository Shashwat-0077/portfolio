"use client";

import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TECHNOLOGIES } from "@/data/technologies";
import TechCards from "@/components/ui/tech-cards";
import { useAnimationStore } from "@/store/animation-store";

export default function SkillsPage() {
    const { isCompatible } = useAnimationStore();

    const allTechs = Object.keys(TECHNOLOGIES) as (keyof typeof TECHNOLOGIES)[];

    return (
        <div className="bg-background font-garet font-light">
            <div className="bg-background container mx-auto min-h-screen text-white">
                {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

                <h1 className="font-garet py-20 text-center text-9xl font-bold">
                    Skills
                </h1>

                <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                        <TabsTrigger value="all" className="w-1/6">
                            All
                        </TabsTrigger>
                        <TabsTrigger value="languages" className="w-1/6">
                            Languages
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <TechCards techs={allTechs} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
