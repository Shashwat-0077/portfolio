"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { TECHNOLOGIES } from "@/lib/constants";

const TechSection = () => {
    useGSAP(() => {
        if (!document) {
            return;
        }

        const cards = document.getElementsByClassName(
            "card"
        ) as HTMLCollectionOf<HTMLDivElement>;

        const cardsContainer = document.getElementById("cards");

        if (cards.length === 0 || !cardsContainer) {
            return;
        }

        cardsContainer.addEventListener("mousemove", (e) => {
            for (const card of cards) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                gsap.to(card, {
                    "--mouse-x": `${x}px`,
                    "--mouse-y": `${y}px`,
                });
            }
        });
    });

    return (
        <section className="mx-auto max-w-[90svw] py-20">
            <h2 className="mb-8 text-3xl font-bold tracking-tight">
                Latest tech I know
            </h2>
            <style jsx>{`
                #cards:hover > .card > .card-border {
                    opacity: 1;
                }
            `}</style>
            <div
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                id={"cards"}
            >
                {[
                    TECHNOLOGIES["TypeScript"],
                    TECHNOLOGIES["Next.js"],
                    TECHNOLOGIES["Tailwind CSS"],
                    TECHNOLOGIES["Express"],
                    TECHNOLOGIES["Zustand"],
                    TECHNOLOGIES["Drizzle ORM"],
                    TECHNOLOGIES["Git"],
                    TECHNOLOGIES["Docker"],
                ].map(({ description, title, icon }) => (
                    <div
                        className="card group text-card-foreground bg-border/10 relative overflow-hidden rounded-lg shadow-sm"
                        key={title}
                    >
                        {/* card border */}
                        <div className="card-border absolute top-0 left-0 z-[1] h-full w-full border-inherit bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.5),transparent_40%)] opacity-0 transition-opacity duration-300 content-['']" />

                        {/* card before (mimic pseudo element) */}
                        <div className="card-before absolute top-0 left-0 z-[3] h-full w-full border-inherit bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.06),transparent_40%)] opacity-0 transition-opacity duration-300 content-[''] group-hover:opacity-100" />

                        {/* card content */}
                        <div className="card-content relative z-[2] m-[1px] flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-between gap-4 rounded-[inherit] bg-[#343434] p-6">
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-semibold">
                                    {title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {description}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="bg-muted/50 flex items-center justify-center rounded-md p-2">
                                    {icon}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechSection;
