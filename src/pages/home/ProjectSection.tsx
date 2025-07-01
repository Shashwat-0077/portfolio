"use client";
import React from "react";
import { MoveRight } from "lucide-react";

import ProjectCard from "@/components/ui/project-card";
import Heading from "@/components/ui/heading";
import { PROJECTS } from "@/data/projects";

const ProjectSection = () => {
    return (
        <section className="py-52">
            <Heading>Projects</Heading>
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
            <div className="mt-7 flex items-center justify-end gap-3 text-xl">
                View more <MoveRight />
            </div>
        </section>
    );
};

export default ProjectSection;
