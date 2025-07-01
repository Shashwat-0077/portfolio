"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Observer } from "gsap/Observer";
import { ChevronRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/transition-link";
import Magnetic from "@/components/ui/magnetic";
import { useAnimationStore } from "@/stores/animation-store";
import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import NowListening from "@/components/ui/now-listening";
import LatestCommit from "@/components/ui/latest-commit";
import Learning from "@/components/ui/learning";
import WakatimeStats from "@/components/ui/wakatime-stats";

gsap.registerPlugin(Observer);

const HeroSection = () => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const shashwatRef = useRef<HTMLSpanElement>(null);
    const softwareRef = useRef<HTMLSpanElement>(null);
    const shashwatLineRef = useRef<SVGLineElement>(null);
    const softwareLineRef = useRef<SVGLineElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    const { isCompatible } = useAnimationStore();

    useGSAP(async () => {
        if (
            !headerRef.current ||
            !paraRef.current ||
            !shashwatLineRef.current ||
            !softwareLineRef.current ||
            !socialRef.current ||
            !buttonsRef.current
        ) {
            return;
        }

        // Set initial states
        gsap.set([shashwatLineRef.current, softwareLineRef.current], {
            clipPath: "inset(0 100% 0 0)",
        });

        gsap.set(
            [
                socialRef.current,
                headerRef.current,
                paraRef.current,
                buttonsRef.current,
            ],
            {
                opacity: 0,
                y: 30,
            }
        );

        const tl = gsap.timeline({
            defaults: {
                duration: 0.6,
                ease: "power2.out",
            },
        });

        // Animate content in sequence
        tl.to(socialRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
        })
            .to(
                headerRef.current,
                {
                    opacity: 1,
                    y: 0,
                },
                "-=0.3"
            )
            .to(
                paraRef.current,
                {
                    opacity: 1,
                    y: 0,
                },
                "-=0.4"
            )
            .to(
                [shashwatLineRef.current, softwareLineRef.current],
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.4,
                    ease: "power2.inOut",
                    stagger: 0.1,
                },
                "-=0.2"
            )
            .to(
                buttonsRef.current,
                {
                    opacity: 1,
                    y: 0,
                },
                "-=0.3"
            );
    }, []);

    return (
        <>
            {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

            <section className="relative py-50 text-white">
                <div className="grid place-content-center gap-12 lg:grid-cols-2 lg:gap-20 xl:gap-32">
                    {/* Content Section */}
                    <div className="flex flex-col justify-center space-y-8 lg:space-y-10">
                        {/* Social Icons */}
                        <div ref={socialRef} className="flex gap-6">
                            <Magnetic color="#6b7277">
                                <Github size={28} />
                            </Magnetic>
                            <Magnetic color="#0077B5">
                                <Linkedin size={28} />
                            </Magnetic>
                            <Magnetic color="#EA4335">
                                <Mail size={28} />
                            </Magnetic>
                        </div>

                        {/* Main Heading */}
                        <h1
                            ref={headerRef}
                            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                        >
                            <span className="block">
                                <span className="text-primary">Crafting</span>{" "}
                                Code
                            </span>
                            <span className="block">
                                Like{" "}
                                <span className="text-primary">Poetry</span>
                            </span>
                        </h1>

                        {/* Description */}
                        <p
                            ref={paraRef}
                            className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl"
                        >
                            I&apos;m{" "}
                            <span
                                ref={shashwatRef}
                                className="relative inline-block font-medium text-white"
                            >
                                shashwat gupta
                                <svg
                                    className="pointer-events-none absolute top-full left-0 -mt-1 h-2 w-full"
                                    viewBox="0 0 100 5"
                                    preserveAspectRatio="none"
                                >
                                    <line
                                        ref={shashwatLineRef}
                                        x1="1"
                                        y1="2.5"
                                        x2="99"
                                        y2="2.5"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="3,3"
                                        className="text-primary"
                                    />
                                </svg>
                            </span>
                            , based in Himachal Pradesh, blending logic with
                            creativity to build thoughtful{" "}
                            <span
                                ref={softwareRef}
                                className="relative inline-block font-medium text-white"
                            >
                                software
                                <svg
                                    className="pointer-events-none absolute top-full left-0 -mt-1 h-2 w-full"
                                    viewBox="0 0 100 5"
                                    preserveAspectRatio="none"
                                >
                                    <line
                                        ref={softwareLineRef}
                                        x1="1"
                                        y1="2.5"
                                        x2="99"
                                        y2="2.5"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        strokeDasharray="5,5"
                                        className="text-primary"
                                    />
                                </svg>
                            </span>
                            .
                        </p>

                        {/* Action Buttons */}
                        <div
                            ref={buttonsRef}
                            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary hover:bg-primary/90 h-auto px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-105"
                            >
                                <TransitionLink href="/projects">
                                    <span>See my work</span>
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </TransitionLink>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="ghost"
                                className="h-auto px-6 py-3 font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                            >
                                <a
                                    href="/resume.pdf"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Download CV</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Image and Bubbles Section */}
                    <div className="relative flex items-center justify-center lg:justify-end">
                        <div className="relative aspect-square w-full max-w-md lg:max-w-lg xl:max-w-xl">
                            {/* Cloud Bubbles */}
                            <NowListening />
                            <WakatimeStats />
                            <LatestCommit />
                            <Learning />

                            {/* Main Image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src="/chilling.png"
                                    alt="Shashwat Gupta - Software Developer"
                                    width={450}
                                    height={450}
                                    className="pointer-events-none h-full max-h-[400px] w-full max-w-[400px] object-contain select-none"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
