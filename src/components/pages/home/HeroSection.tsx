"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import {
    ChevronDown,
    ChevronRight,
    Download,
    Github,
    Linkedin,
    Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/transition-link";
import Magnetic from "@/components/ui/magnetic";

const HeroSection = () => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const shashwatRef = useRef<HTMLSpanElement>(null);
    const softwareRef = useRef<HTMLSpanElement>(null);
    const shashwatLineRef = useRef<SVGLineElement>(null);
    const softwareLineRef = useRef<SVGLineElement>(null);
    // const { isLoading , hasShown} = usePreloaderStore();

    useGSAP(async () => {
        if (
            !headerRef.current ||
            !paraRef.current ||
            !shashwatLineRef.current ||
            !softwareLineRef.current
        ) {
            return;
        }
        const header = headerRef.current;
        const para = paraRef.current;

        const headerSplit = SplitText.create(header, {
            type: "lines",
            mask: "lines",
        });

        const paraSplit = SplitText.create(para, {
            type: "lines,chars",
            autoSplit: true,
            onSplit: (self) => {
                return gsap.from(self.lines, {
                    y: 100,
                    opacity: 0,
                    stagger: 0.05,
                });
            },
        });

        // Set initial state for SVG lines using clip-path for reveal animation
        gsap.set([shashwatLineRef.current, softwareLineRef.current], {
            clipPath: "inset(0 100% 0 0)", // Initially hide by clipping from right
        });

        const tl = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: "power2.out",
            },
        });

        await tl
            .from(headerSplit.lines, {
                y: 100,
                stagger: {
                    amount: 0.1,
                    from: "start",
                },
            })
            .from(paraSplit.chars, {
                opacity: 0,
                ease: "steps(1)",
                stagger: {
                    amount: 0.5,
                    from: "start",
                },
            })
            .to([shashwatLineRef.current, softwareLineRef.current], {
                clipPath: "inset(0 0% 0 0)", // Reveal by removing right clip
                duration: 0.3,
                ease: "power2.inOut",
                stagger: 0.1,
            });
    });

    return (
        <section className="bg-background relative flex min-h-screen flex-col items-center justify-center text-white">
            <div className="flex items-center justify-center gap-7">
                <Magnetic className="cursor-pointer">
                    <Github size={30} />
                </Magnetic>
                <Magnetic className="cursor-pointer" color="#0077B5">
                    <Linkedin size={30} />
                </Magnetic>
                <Magnetic className="cursor-pointer" color="#EA4335">
                    <Mail size={30} />
                </Magnetic>
            </div>

            <h1 className="font-jersey mt-10 px-4 text-center text-[clamp(2.5rem,17vw,6rem)] leading-[0.8]">
                <span ref={headerRef} className="main-heading">
                    Crafting <span className="text-primary">code</span>
                    <br />
                    <span className="text-primary">Like</span> poetry
                </span>
            </h1>
            <p
                ref={paraRef}
                className="text-muted relative mx-auto mt-6 mb-8 max-w-prose px-4 text-center text-[clamp(0.875rem,2.5vw,1.125rem)]"
            >
                I&apos;m{" "}
                <span ref={shashwatRef} className="relative inline-block">
                    shashwat
                    <svg
                        className="pointer-events-none absolute top-full left-0 -mt-1 h-2 w-full"
                        viewBox="0 0 100 5"
                        preserveAspectRatio="none"
                    >
                        <line
                            ref={shashwatLineRef}
                            x1="0"
                            y1="2.5"
                            x2="100"
                            y2="2.5"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            className="text-primary"
                        />
                    </svg>
                </span>
                , based in Himachal Pradesh, blending logic with creativity
                <br />
                to build thought-full{" "}
                <span ref={softwareRef} className="relative inline-block">
                    software
                    <svg
                        className="pointer-events-none absolute top-full left-0 -mt-1 h-2 w-full"
                        viewBox="0 0 100 5"
                        preserveAspectRatio="none"
                    >
                        <line
                            ref={softwareLineRef}
                            x1="0"
                            y1="2.5"
                            x2="100"
                            y2="2.5"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            className="text-primary"
                        />
                    </svg>
                </span>
            </p>

            <div className="flex items-center gap-4">
                <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center justify-center text-white"
                >
                    <TransitionLink href="/projects">
                        <span>See my work</span>
                        <ChevronRight className="h-4 w-4" />
                    </TransitionLink>
                </Button>

                {/* TODO : i will change it to another link, its just here for some time */}
                <Button
                    asChild
                    size="lg"
                    className="text-primary hover:text-primary gap-0 border-transparent bg-transparent shadow-none ring-0 hover:bg-transparent"
                >
                    <a
                        href="/resume.pdf"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <Download className="mr-2 size-7" />
                        <span>Download CV</span>
                    </a>
                </Button>
            </div>

            <div className="absolute top-[85svh] flex items-center justify-center">
                <ChevronDown className="text-muted-foreground mt-8 size-12 animate-bounce" />
            </div>
        </section>
    );
};

export default HeroSection;
