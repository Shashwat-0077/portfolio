"use client";
import { Github, Send } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import Image from "next/image";
import React from "react";

import { Project } from "@/lib/constants";
import { cn } from "@/lib/utils";

gsap.registerPlugin(Observer);

const ProjectCard = ({
    logoUrl,
    backgroundImageUrl,
    title,
    description,
    technologies,
    githubLink,
    liveLink,
    foreGroundColor,
    textColor,
    primaryColor,
}: Project) => {
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
                        transform: "translateY(-250%)",
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
                    background-image: url("${backgroundImageUrl}");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .card-content {
                    backdrop-filter: blur(5px);
                    background-color: rgba(0, 0, 0, 0.2);
                    color: white;
                }

                .github-link,
                .live-link {
                    transition:
                        background-color 0.3s ease,
                        color 0.3s ease;
                    color: black;
                }

                .github-link:hover,
                .live-link:hover {
                    background-color: ${primaryColor};
                    color: ${foreGroundColor};
                }
            `}</style>
            <div
                className="card bg-primary-foreground h-96 w-full overflow-hidden rounded-4xl select-none"
                ref={cardRed}
            >
                <div
                    className={cn(
                        "card-content relative flex h-full w-full flex-col justify-between p-4"
                    )}
                    style={{
                        fontWeight: 500,
                        color: textColor,
                    }}
                >
                    <div
                        className="absolute top-1/2 left-1/2 size-32 -translate-1/2"
                        ref={logoRef}
                    >
                        <Image
                            src={logoUrl}
                            alt="Project Placeholder"
                            className="h-48 w-full rounded-t-lg object-cover"
                            fill
                        />
                    </div>
                    <div
                        className="text-content opacity-0"
                        ref={textContentRef}
                    >
                        <h1 className="w-full pt-9 pl-20 text-3xl">{title}</h1>
                        <p className="line-clamp-5 pt-10 pl-2">{description}</p>
                    </div>

                    <div className="buttons-and-techs relative w-full overflow-hidden">
                        <div
                            className="tech top-0 flex w-full items-center justify-start gap-3"
                            ref={techContainerRef}
                        >
                            {technologies.slice(0, 4).map(({ Icon, title }) => (
                                <div
                                    key={title}
                                    className="rounded-full bg-white p-2"
                                >
                                    <Icon size={24} color="#000000" />
                                </div>
                            ))}

                            {technologies.length > 4 && (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 text-sm font-medium text-black">
                                    +{technologies.length - 4}
                                </div>
                            )}
                        </div>
                        <div
                            className="buttons absolute top-0 flex w-full translate-y-[200%] transform items-center justify-end gap-3"
                            ref={buttonContainerRef}
                        >
                            {githubLink && (
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-link rounded-full bg-white p-2"
                                >
                                    <Github />
                                </a>
                            )}
                            {liveLink && (
                                <a
                                    href={liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="live-link rounded-full bg-white p-2"
                                >
                                    <Send />
                                </a>
                            )}

                            {/* TODO : use drawer component from vaul to display read more */}
                            {/* <div className="rounded-full bg-white p-2">
                                <BookOpen color="#000" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
