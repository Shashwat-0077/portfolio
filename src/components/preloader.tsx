"use client";

import { useRef, useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";

const ROUTES_TO_PREFETCH = ["/", "/skills", "/projects", "/contact"];

const Preloader = () => {
    const totalDuration = 2000;
    const { width } = useWindowSize();

    const router = useTransitionRouter();
    const preloaderRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const greetings = [
        "hello",
        "नमस्कार",
        "नमः",
        "வணக்கம்",
        "నమస్కారం",
        "നമസ്കാരം",
        "ನಮಸ್ಕಾರ",
        "السلام علیکم",
        "खोय",
        "ꯊꯧꯕꯥ",
        "ᱵᱟᱝᱜᱟ",
        "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
        "नमस्ते",
    ];

    // Set mounted state
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isComplete || !isMounted) {
            return;
        }

        // Prefetch routes
        const prefetchRoutes = async () => {
            try {
                await Promise.all(
                    ROUTES_TO_PREFETCH.map((route) => router.prefetch(route))
                );
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn("Failed to prefetch routes:", error);
            }
        };

        prefetchRoutes();

        // Animate progress bar
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: width > 400 ? "400px" : "77vw",
                duration: totalDuration / 1000,
                ease: "circ.inOut",
            });
        }

        // Text cycling
        const intervalTime = totalDuration / greetings.length;
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            currentIndex++;

            if (currentIndex >= greetings.length) {
                clearInterval(intervalId);

                // Animate out
                const tl = gsap.timeline({
                    onComplete: () => {
                        setIsComplete(true);
                        // Safer DOM removal
                        if (preloaderRef.current) {
                            try {
                                // Check if element still exists and has a parent
                                if (
                                    document.body.contains(preloaderRef.current)
                                ) {
                                    preloaderRef.current.style.display = "none";
                                    // Use a small delay to ensure animations are complete
                                    setTimeout(() => {
                                        if (
                                            preloaderRef.current &&
                                            document.body.contains(
                                                preloaderRef.current
                                            )
                                        ) {
                                            preloaderRef.current.remove();
                                        }
                                    }, 100);
                                }
                            } catch (error) {
                                console.warn(
                                    "Error removing preloader:",
                                    error
                                );
                            }
                        }
                    },
                });

                if (textContainerRef.current) {
                    tl.to(textContainerRef.current, {
                        opacity: 0.5,
                        scale: 0.8,
                        duration: 0.5,
                        ease: "power2.in",
                    });
                }

                if (preloaderRef.current) {
                    tl.to(preloaderRef.current, {
                        y: "-100%",
                        duration: 1.2,
                        ease: "power4.inOut",
                        delay: 0.2,
                    });
                }

                return;
            }

            setCurrentTextIndex(currentIndex);
        }, intervalTime);

        return () => clearInterval(intervalId);
    }, [isComplete, isMounted, router, greetings.length, width, totalDuration]);

    if (isComplete || !isMounted) {
        return null;
    }

    return (
        <div
            ref={preloaderRef}
            className="bg-background fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ zIndex: 99999 }}
        >
            <div className="flex flex-1 items-center justify-center">
                <div
                    ref={textContainerRef}
                    className="text-center text-[clamp(2rem,15vw,6rem)] font-light tracking-wider text-white transition-all duration-300"
                    style={{
                        fontFamily: "Inter, sans-serif",
                        minHeight: "1.2em",
                    }}
                >
                    {greetings[currentTextIndex]}
                </div>
            </div>

            <div className="fixed bottom-5 flex flex-col items-center justify-center gap-2">
                <div
                    className="bg-foreground h-1 w-0 rounded-full"
                    ref={progressBarRef}
                />
            </div>
        </div>
    );
};

export default Preloader;
