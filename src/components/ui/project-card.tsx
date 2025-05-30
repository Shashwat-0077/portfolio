"use client";
import { BookOpen, Github, Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import Image from "next/image";
import React from "react";

import { TECHNOLOGIES } from "@/lib/constants";

gsap.registerPlugin(Observer);

const ProjectCard = () => {
    const cardRed = React.useRef<HTMLDivElement>(null);
    const logoRef = React.useRef<HTMLDivElement>(null);
    const textContentRef = React.useRef<HTMLDivElement>(null);
    const timelineRef = React.useRef<gsap.core.Timeline | null>(null);
    const techContainerRef = React.useRef<HTMLDivElement>(null);
    const buttonContainerRef = React.useRef<HTMLDivElement>(null);
    const [_isExpanded, setIsExpanded] = React.useState(false);

    useGSAP(() => {
        if (!cardRed.current) {
            return;
        }

        const DURATION = 0.3;

        gsap.set(textContentRef.current, {
            opacity: 0,
        });

        const animateToExpanded = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            timelineRef.current = gsap.timeline();
            timelineRef.current
                .to(logoRef.current, {
                    top: 70,
                    left: 55,
                    width: "50px",
                    height: "50px",
                    duration: DURATION,
                    ease: "power2.inOut",
                })
                .to(
                    techContainerRef.current,
                    {
                        transform: "translateY(250%)",
                        duration: DURATION,
                    },
                    "<"
                )
                .to(
                    buttonContainerRef.current,
                    {
                        transform: "translateY(0%)",
                        duration: DURATION,
                    },
                    "<"
                )
                .to(
                    textContentRef.current,
                    {
                        opacity: 1,
                        duration: DURATION,
                        ease: "power2.inOut",
                    },
                    "<0.2"
                );
        };

        const animateToCollapsed = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            timelineRef.current = gsap.timeline();
            timelineRef.current
                .to(logoRef.current, {
                    top: "50%",
                    left: "50%",
                    width: "128px",
                    height: "128px",
                    duration: DURATION,
                    ease: "power2.inOut",
                })
                .to(
                    textContentRef.current,
                    {
                        opacity: 0,
                        duration: DURATION,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .to(
                    techContainerRef.current,
                    {
                        transform: "translateY(0%)",
                        duration: DURATION,
                    },
                    "<"
                )
                .to(
                    buttonContainerRef.current,
                    {
                        transform: "translateY(250%)",
                        duration: DURATION,
                    },
                    "<"
                );
        };

        const isTouchDevice = "ontouchstart" in window;

        if (isTouchDevice) {
            // Touch device: click to toggle
            Observer.create({
                target: cardRed.current,
                type: "touch",
                onClick: () => {
                    setIsExpanded((prev) => {
                        const newState = !prev;
                        if (newState) {
                            animateToExpanded();
                        } else {
                            animateToCollapsed();
                        }
                        return newState;
                    });
                },
            });
        } else {
            // Non-touch device: hover behavior
            Observer.create({
                target: cardRed.current,
                type: "pointer",
                onHover: () => {
                    animateToExpanded();
                },
                onHoverEnd: () => {
                    animateToCollapsed();
                },
            });
        }
    }, []);

    return (
        <div className="h-full w-full">
            <style jsx>{`
                .card {
                    background-image: url("/projects/momentum-dashboard.png");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .card-content {
                    backdrop-filter: blur(10px);
                    background-color: rgba(
                        0,
                        0,
                        0,
                        0.3
                    ); /* dark translucent overlay */
                    color: white; /* optional: improves contrast for text */
                }
            `}</style>
            <div
                className="card bg-primary-foreground h-96 w-full overflow-hidden rounded-4xl"
                ref={cardRed}
            >
                <div className="card-content relative h-full w-full p-6">
                    <div
                        className="absolute top-1/2 left-1/2 size-32 -translate-1/2"
                        ref={logoRef}
                    >
                        <Image
                            src="/projects/momentum-logo.svg"
                            alt="Project Placeholder"
                            className="h-48 w-full rounded-t-lg object-cover"
                            fill
                        />
                    </div>

                    <div
                        className="text-content opacity-0"
                        ref={textContentRef}
                    >
                        <h1 className="mt-7 ml-20 w-full text-3xl">Momentum</h1>
                        <p className="text-muted mt-10 ml-2 line-clamp-5 h-full w-full">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Porro harum, omnis dolor sequi enim
                            reprehenderit eveniet nisi doloremque cumque quos
                            incidunt! Commodi, velit architecto blanditiis
                            magnam error consequuntur. Voluptas, iusto. Lorem
                            ipsum dolor, sit amet consectetur adipisicing elit.
                            Repudiandae dolor optio vel libero id, quasi ipsum
                            at eos beatae culpa, temporibus odit maxime alias
                            exercitationem ducimus in laborum. Harum, esse.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Amet, quas ab! Nostrum doloribus quam esse
                            quia, debitis repellat tempore minus totam. Alias
                            earum dolorum eum, nesciunt officia velit dolorem
                            error.
                        </p>
                    </div>

                    <div className="buttons-and-techs relative mt-20">
                        <div
                            className="tech absolute top-0 flex w-full items-center justify-start gap-4"
                            ref={techContainerRef}
                        >
                            {[
                                TECHNOLOGIES["Next.js"],
                                TECHNOLOGIES["Tailwind CSS"],
                            ].map(({ Icon, title, defaultIconColor }) => (
                                <div
                                    key={title}
                                    className="rounded-full bg-white p-2"
                                >
                                    <Icon size={24} color={defaultIconColor} />
                                </div>
                            ))}
                        </div>
                        <div
                            className="buttons absolute top-0 flex w-full translate-y-[200%] transform items-center justify-end gap-4"
                            ref={buttonContainerRef}
                        >
                            <div className="rounded-full bg-white p-2">
                                <Github color="#000" />
                            </div>

                            <div className="rounded-full bg-white p-2">
                                <Send color="#000" />
                            </div>

                            {/* TODO : use drawer component from vaul to display read more */}
                            <div className="rounded-full bg-white p-2">
                                <BookOpen color="#000" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
