import Dock from "@/components/ui/dock";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ui/project-card";

export default function ProjectsPage() {
    return (
        <div className="bg-background">
            <div className="bg-background container mx-auto min-h-screen text-white">
                <Dock />

                <h1 className="font-garet py-20 pt-40 text-center text-9xl">
                    Projects
                </h1>

                <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                    {[
                        PROJECTS["Momentum"],
                        PROJECTS["Virtual Doc"],
                        PROJECTS["Virtual Doc"],
                        PROJECTS["Momentum"],
                    ].map((val, index) => (
                        <ProjectCard
                            key={index}
                            title={val.title}
                            description={val.description}
                            logoUrl={val.logoUrl}
                            technologies={val.technologies}
                            githubLink={val.githubLink}
                            liveLink={val.liveLink}
                            backgroundImageUrl={val.backgroundImageUrl}
                            foreGroundColor={val.foreGroundColor}
                            primaryColor={val.primaryColor}
                            textColor={val.textColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
