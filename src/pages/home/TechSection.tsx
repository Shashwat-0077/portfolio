"use client";

import gsap from "gsap";
import { MoveRight } from "lucide-react";
import { useGSAP } from "@gsap/react";

import Heading from "@/components/ui/heading";
import { TECHNOLOGIES } from "@/data/technologies";

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
        <section className="py-32">
            <Heading>
                My <span className="text-primary">Learnings</span>
            </Heading>
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
                    TECHNOLOGIES["Tailwind"],
                    TECHNOLOGIES["Express"],
                    TECHNOLOGIES["MongoDB"],
                    TECHNOLOGIES["Drizzle"],
                    TECHNOLOGIES["Git"],
                    TECHNOLOGIES["Docker"],
                ].map(({ description, title, Icon, defaultIconColor }) => {
                    return (
                        <div
                            className="card group text-card-foreground relative overflow-hidden rounded-lg shadow-sm"
                            key={title}
                        >
                            {/* card border */}
                            <div
                                style={{
                                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), color-mix(in oklch, var(--primary) 50%, transparent), transparent 40%)`,
                                }}
                                className="card-border absolute top-0 left-0 z-[1] h-full w-full border-inherit opacity-0 transition-opacity duration-300 content-['']"
                            />

                            {/* card before (mimic pseudo element) */}
                            <div
                                style={{
                                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), color-mix(in oklch, var(--primary) 10%, transparent), transparent 40%)`,
                                }}
                                className="card-before absolute top-0 left-0 z-[3] h-full w-full border-inherit opacity-0 transition-opacity duration-300 content-[''] group-hover:opacity-100"
                            />

                            {/* card content */}
                            <div className="card-content relative z-[2] m-[1px] flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-between gap-4 rounded-[inherit] bg-[oklch(19.5%_0_0)] p-6">
                                <div className="space-y-1.5">
                                    <h3 className="text-lg font-semibold">
                                        {title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center rounded-md p-2">
                                        <Icon
                                            size={36}
                                            color={
                                                defaultIconColor === "#000000"
                                                    ? "#ffffff"
                                                    : defaultIconColor
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-7 flex items-center justify-end gap-3 text-xl">
                View more <MoveRight />
            </div>
        </section>
    );
};

export default TechSection;
