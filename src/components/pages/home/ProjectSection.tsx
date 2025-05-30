import React from "react";

import ProjectCard from "@/components/ui/project-card";

const ProjectSection = () => {
    return (
        <section className="mx-auto max-w-[90svw] py-52">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">Projects</h2>
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
                <ProjectCard />
                <ProjectCard />
            </div>
        </section>
    );
};

export default ProjectSection;
