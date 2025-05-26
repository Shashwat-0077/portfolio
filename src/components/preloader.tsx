"use client";

import { useEffect, useRef, useState } from "react";
import { usePreloaderStore } from "@/lib/preloader-store";
import { ANIMATION_CONSTANTS, ROUTES_TO_PREFETCH } from "@/lib/constants";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

// Register SplitText plugin
gsap.registerPlugin(SplitText);

const Preloader = () => {
    const router = useRouter();
    const preloaderRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressNumberRef = useRef<HTMLDivElement>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);

    const { isLoading, setIsLoading } = usePreloaderStore();

    const [progress, setProgress] = useState(0);
    const [currentSplit, setCurrentSplit] = useState<SplitText | null>(null);

    const loadingTexts = [
        "hello",
        "ഹലോ",
        "வணக்கம்",
        "ನಮಸ್ಕಾರ",
        "ہیلو",
        "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
        "नमस्ते",
    ];

    // Background prefetching
    const prefetchRoutesInBackground = () => {
        ROUTES_TO_PREFETCH.forEach((route) => {
            router.prefetch(route);
        });
    };

    // Animate text change with SplitText
    const animateTextChange = async (newText: string, isFirst = false) => {
        if (!textContainerRef.current) return;

        const container = textContainerRef.current;

        // Exit animation for current text
        if (!isFirst && currentSplit) {
            await new Promise<void>((resolve) => {
                gsap.to(currentSplit.chars, {
                    y: -80,
                    opacity: 0,
                    rotationX: -90,
                    duration: 0.5,
                    stagger: 0.02,
                    ease: "power2.in",
                    onComplete: () => {
                        currentSplit.revert(); // Clean up previous split
                        resolve();
                    },
                });
            });
        }

        // Set new text
        container.textContent = newText;

        // Create new SplitText instance
        const newSplit = new SplitText(container, {
            type: "chars",
            charsClass: "char",
            mask: "chars",
        });

        setCurrentSplit(newSplit);

        // Set initial state for characters
        gsap.set(newSplit.chars, {
            y: 80,
            opacity: 0,
            rotationX: 90,
            transformOrigin: "center bottom",
        });

        // Enter animation
        return new Promise<void>((resolve) => {
            gsap.to(newSplit.chars, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)",
                onComplete: resolve,
            });
        });
    };

    // Animate progress number with enhanced counting
    const animateProgressNumber = (targetProgress: number) => {
        if (!progressNumberRef.current) return;

        const currentProgress = progress;

        // Create a temporary object to animate
        const progressObj = { value: currentProgress };

        gsap.to(progressObj, {
            value: targetProgress,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
                const currentValue = Math.round(progressObj.value);
                if (progressNumberRef.current) {
                    progressNumberRef.current.textContent = `${currentValue}%`;

                    // Add subtle scale animation on number change
                    gsap.to(progressNumberRef.current, {
                        scale: 1.1,
                        duration: 0.1,
                        yoyo: true,
                        repeat: 1,
                        ease: "power2.inOut",
                    });
                }
            },
        });
    };

    // Animate progress bar with enhanced effects
    const animateProgressBar = (targetProgress: number) => {
        if (!progressBarRef.current) return;

        gsap.to(progressBarRef.current, {
            scaleX: targetProgress / 100,
            duration: 1.5,
            ease: "power3.out",
        });

        // Add glow effect at certain milestones
        if (targetProgress >= 50) {
            gsap.to(progressBarRef.current, {
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
                duration: 0.5,
                ease: "power2.out",
            });
        }
    };

    // Main animation sequence
    const startAnimationSequence = () => {
        const steps = [
            { progress: 0, textIndex: 0, delay: 0 },
            { progress: 15, textIndex: 1, delay: 800 },
            { progress: 30, textIndex: 2, delay: 1600 },
            { progress: 50, textIndex: 3, delay: 2400 },
            { progress: 75, textIndex: 4, delay: 3200 },
            { progress: 90, textIndex: 5, delay: 4000 },
            { progress: 100, textIndex: 6, delay: 4600 },
        ];

        steps.forEach((step, index) => {
            setTimeout(async () => {
                // Update progress
                setProgress(step.progress);
                animateProgressBar(step.progress);
                animateProgressNumber(step.progress);

                // Update text
                await animateTextChange(
                    loadingTexts[step.textIndex],
                    index === 0
                );
            }, step.delay);
        });
    };

    // Enhanced exit animation
    const animateOut = () => {
        if (!preloaderRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                // Clean up SplitText
                if (currentSplit) {
                    currentSplit.revert();
                }
                setIsLoading(false);
            },
        });

        // Exit text with dramatic effect
        if (currentSplit) {
            tl.to(currentSplit.chars, {
                y: -100,
                opacity: 0,
                rotationX: -90,
                scale: 0.8,
                duration: 0.6,
                stagger: 0.03,
                ease: "power3.in",
            });
        }

        // Exit progress elements
        tl.to(
            progressContainerRef.current,
            {
                opacity: 0,
                y: 50,
                scale: 0.9,
                duration: 0.8,
                ease: "power2.inOut",
            },
            "-=0.3"
        );

        // Final slide out
        tl.to(
            preloaderRef.current,
            {
                y: "-100%",
                duration: ANIMATION_CONSTANTS.PRELOADER_SLIDE_DURATION,
                ease: "power4.inOut",
            },
            "-=0.2"
        );
    };

    // Initialize
    useEffect(() => {
        if (!preloaderRef.current) return;

        // Set initial states
        gsap.set([textContainerRef.current, progressContainerRef.current], {
            opacity: 0,
            y: 30,
        });

        gsap.set(progressBarRef.current, {
            scaleX: 0,
            transformOrigin: "center center",
        });

        // Initialize progress number
        if (progressNumberRef.current) {
            progressNumberRef.current.textContent = "0%";
        }

        // Entrance animation
        const tl = gsap.timeline();

        tl.to(textContainerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        }).to(
            progressContainerRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.5"
        );

        // Start background tasks
        prefetchRoutesInBackground();

        // Start main sequence
        setTimeout(() => {
            startAnimationSequence();
        }, 1000);

        // Exit timer
        const exitTimer = setTimeout(() => {
            animateOut();
        }, ANIMATION_CONSTANTS.PRELOADER_DISPLAY_DURATION + 1000);

        return () => {
            clearTimeout(exitTimer);
            // Clean up SplitText on unmount
            if (currentSplit) {
                currentSplit.revert();
            }
        };
    }, []);

    if (!isLoading) {
        return null;
    }

    return (
        <div
            ref={preloaderRef}
            className="bg-background fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ zIndex: ANIMATION_CONSTANTS.PRELOADER_Z_INDEX }}
        >
            {/* Main Text - Center */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    ref={textContainerRef}
                    className="text-center text-6xl font-light tracking-wider text-white"
                    style={{
                        fontFamily: "Inter, sans-serif",
                        minHeight: "1.2em",
                        perspective: "1000px",
                    }}
                >
                    Welcome
                </div>
            </div>

            {/* Progress Section - Bottom */}
            <div
                ref={progressContainerRef}
                className="mb-20 flex flex-col items-center"
            >
                {/* Progress Number */}
                <div
                    ref={progressNumberRef}
                    className="mb-8 text-3xl font-light tracking-wider text-white"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                >
                    0%
                </div>

                {/* Progress Bar Container */}
                <div className="relative">
                    <div className="h-2 w-96 overflow-hidden rounded-full bg-gray-800 shadow-inner">
                        <div
                            ref={progressBarRef}
                            className="relative h-full rounded-full bg-gradient-to-r from-gray-300 via-white to-gray-300"
                            style={{
                                transformOrigin: "center center",
                                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
                            }}
                        />
                    </div>

                    {/* Progress bar glow effect */}
                    <div className="absolute inset-0 h-2 w-96 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 blur-sm" />
                </div>
            </div>

            {/* Enhanced background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Floating particles */}
                <div className="absolute top-1/4 left-1/4 h-1 w-1 animate-pulse rounded-full bg-white opacity-40" />
                <div
                    className="absolute top-2/3 right-1/4 h-1 w-1 animate-pulse rounded-full bg-white opacity-30"
                    style={{ animationDelay: "1.5s" }}
                />
                <div
                    className="absolute bottom-1/3 left-1/5 h-1 w-1 animate-pulse rounded-full bg-white opacity-35"
                    style={{ animationDelay: "3s" }}
                />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>
        </div>
    );
};

export default Preloader;
