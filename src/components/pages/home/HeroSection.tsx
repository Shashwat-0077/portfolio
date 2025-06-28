"use client";

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Observer } from "gsap/Observer";
import {
    ChevronRight,
    Code,
    Download,
    Github,
    GitPullRequestArrow,
    GraduationCap,
    Linkedin,
    Mail,
    Music,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import TransitionLink from "@/components/transition-link";
import Magnetic from "@/components/ui/magnetic";
import { useAnimationStore } from "@/store/animation-store";
import { Dock, DockForNonCompatibleBrowsers } from "@/components/ui/dock";
import CloudBubble from "@/components/ui/CloudBubble";

gsap.registerPlugin(Observer);

const HeroSection = () => {
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paraRef = useRef<HTMLParagraphElement>(null);
    const shashwatRef = useRef<HTMLSpanElement>(null);
    const softwareRef = useRef<HTMLSpanElement>(null);
    const shashwatLineRef = useRef<SVGLineElement>(null);
    const softwareLineRef = useRef<SVGLineElement>(null);
    const { isCompatible } = useAnimationStore();

    useGSAP(async () => {
        if (
            !headerRef.current ||
            !paraRef.current ||
            !shashwatLineRef.current ||
            !softwareLineRef.current
        ) {
            return;
        }

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

        await tl.to([shashwatLineRef.current, softwareLineRef.current], {
            clipPath: "inset(0 0% 0 0)", // Reveal by removing right clip
            duration: 0.3,
            ease: "power2.inOut",
            stagger: 0.1,
        });
    });

    return (
        <>
            {!isCompatible ? <DockForNonCompatibleBrowsers /> : <Dock />}

            <section className="relative container mx-auto grid min-h-screen grid-cols-2 place-content-center gap-60 overflow-x-hidden pt-8 text-white">
                <div>
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className="mt-10 flex gap-7">
                        <Magnetic className="cursor-pointer" color="#6b7277">
                            <Github size={30} />
                        </Magnetic>
                        <Magnetic className="cursor-pointer" color="#0077B5">
                            <Linkedin size={30} />
                        </Magnetic>
                        <Magnetic className="cursor-pointer" color="#EA4335">
                            <Mail size={30} />
                        </Magnetic>
                    </div>
                    <h1 className="font-sansation mt-10 -translate-x-3 px-4 text-[clamp(2.5rem,22vw,8rem)] leading-[0.8] font-bold">
                        <span ref={headerRef} className="main-heading">
                            Coding <span className="text-primary">Beyond</span>{" "}
                            <br /> <span className="text-primary">the</span>{" "}
                            Stars
                        </span>
                    </h1>
                    <p
                        ref={paraRef}
                        className="text-muted relative mt-6 mb-8 max-w-prose text-[clamp(0.875rem,2.5vw,1.125rem)]"
                    >
                        I&apos;m{" "}
                        <span
                            ref={shashwatRef}
                            className="relative inline-block"
                        >
                            shashwat gupta
                            <svg
                                className="pointer-events-none absolute top-full left-[0.5] -mt-1 h-2 w-full"
                                viewBox="0 0 100 5"
                                preserveAspectRatio="none"
                            >
                                <line
                                    ref={shashwatLineRef}
                                    x1="1"
                                    y1="2.5"
                                    x2="100"
                                    y2="2.5"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeDasharray="3,3"
                                    className="text-primary"
                                />
                            </svg>
                        </span>
                        , based in Himachal Pradesh, blending
                        <br />
                        logic with creativity to build thought-full{" "}
                        <span
                            ref={softwareRef}
                            className="relative inline-block"
                        >
                            software
                            <svg
                                className="pointer-events-none absolute top-full left-[0.5] -mt-1 h-2 w-full"
                                viewBox="0 0 100 5"
                                preserveAspectRatio="none"
                            >
                                <line
                                    ref={softwareLineRef}
                                    x1="1"
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
                </div>

                <div className="relative mx-auto aspect-square w-full overflow-visible">
                    {/* Top Left - grows towards top-left */}
                    <CloudBubble
                        position={[70, 80]}
                        shrunkSize={80}
                        expandedSize={[400, 200]}
                        Icon={<Music strokeWidth={2} size={35} />}
                        anchorPoint="bottom-right"
                    />

                    {/* Top Right - grows towards top-right */}
                    <CloudBubble
                        position={[80, 10]}
                        shrunkSize={80}
                        expandedSize={[400, 200]}
                        Icon={<Code strokeWidth={2} size={35} />}
                        anchorPoint="bottom-right"
                    />

                    {/* Bottom Right - grows towards bottom-right */}
                    <CloudBubble
                        position={[75, 15]}
                        shrunkSize={80}
                        expandedSize={[400, 200]}
                        Icon={<GitPullRequestArrow strokeWidth={2} size={30} />}
                        anchorPoint="top-right"
                    />

                    {/* Bottom Left - grows towards bottom-left */}
                    <CloudBubble
                        position={[10, 90]}
                        shrunkSize={80}
                        expandedSize={[400, 200]}
                        Icon={<GraduationCap strokeWidth={2} size={35} />}
                        anchorPoint="bottom-right"
                    />

                    {/* Main Image - center */}
                    <Image
                        src="/chilling.png"
                        alt="Hero Image"
                        width={450}
                        height={450}
                        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain select-none"
                        priority
                    />
                </div>
            </section>
        </>
    );
};

export default HeroSection;
