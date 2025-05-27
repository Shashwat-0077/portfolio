"use client";

import { useRef, useState, useEffect } from "react";
import { usePreloaderStore } from "@/store/preloader-store";
import { ROUTES_TO_PREFETCH } from "@/lib/constants";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useWindowSize } from "react-use";

const Preloader = () => {
    const totalDuration = 2000;
    const { width } = useWindowSize();

    const router = useRouter();
    const preloaderRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const { isLoading, hasShown, setIsLoading, setHasShown } =
        usePreloaderStore();

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    // const [progress, setProgress] = useState(0);

    const greetings = [
        "வணக்கம்", // Tamil
        "నమస్కారం", // Telugu
        "നമസ്കാരം", // Malayalam
        "ನಮಸ್ಕಾರ", // Kannada
        "السلام علیکم", // Urdu, Kashmiri, Sindhi
        "खोय", // Bodo
        "ꯊꯧꯕꯥ", // Manipuri (Meitei): "Khoi Bha"
        "ᱵᱟᱝᱜᱟ", // Santali
        "नमः", // Sanskrit
        "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
        "नमस्कार", // Marathi, Nepali, Konkani, Maithili, Bengali, Assamese, Odia, Gujarati
        "नमस्ते", // Hindi, Dogri
    ];

    // Animation cycle effect
    useEffect(() => {
        if (hasShown || !isLoading) {
            return;
        }

        // Background prefetching
        const prefetchRoutesInBackground = () => {
            ROUTES_TO_PREFETCH.forEach((route) => {
                router.prefetch(route);
            });
        };

        // Exit animation
        const animateOut = () => {
            if (!preloaderRef.current || !textContainerRef.current) return;

            console.log("Starting exit animation");

            const tl = gsap.timeline({
                onComplete: () => {
                    setHasShown(true);
                },
            });

            // First fade out the text
            tl.to(textContainerRef.current, {
                opacity: 0.5,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    setIsLoading(false);
                },
            })
                // Then slide the entire preloader up
                .to(preloaderRef.current, {
                    y: "-100%",
                    duration: 1.2,
                    ease: "power4.inOut",
                    delay: 0.2,
                });
        };

        gsap.to(progressBarRef.current, {
            width: width > 400 ? "400px" : "77vw",
            duration: totalDuration / 1000, // Convert ms to seconds
            ease: "circ.inOut",
        });

        // // Animate progress numbers separately
        // gsap.to(
        //     { value: 0 },
        //     {
        //         value: 100,
        //         duration: totalDuration / 1000,
        //         ease: "circ.inOut",
        //         onUpdate: function () {
        //             const currentProgress = this.targets()[0].value;
        //             let displayProgress;

        //             if (currentProgress < 20) displayProgress = 10;
        //             else if (currentProgress < 42) displayProgress = 30;
        //             else if (currentProgress < 65) displayProgress = 54;
        //             else if (currentProgress < 86) displayProgress = 77;
        //             else if (currentProgress < 98) displayProgress = 95;
        //             else displayProgress = 100;

        //             setProgress(displayProgress);
        //         },
        //     }
        // );

        const intervalTime = totalDuration / greetings.length;
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            currentIndex = currentIndex + 1;

            if (currentIndex >= greetings.length) {
                clearInterval(intervalId);
                animateOut();
                return;
            }

            setCurrentTextIndex(currentIndex);
        }, intervalTime);

        // Start prefetching in background
        prefetchRoutesInBackground();

        return () => clearInterval(intervalId);
    }, [
        isLoading,
        hasShown,
        setIsLoading,
        setHasShown,
        router,
        greetings.length,
        width,
    ]);

    return (
        <div
            ref={preloaderRef}
            className={`bg-background fixed inset-0 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300`}
            style={{ zIndex: 99999 }}
        >
            {/* Main Text - Center */}
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
                {/* <div>{progress}</div> */}
                <div
                    className="bg-foreground h-1 w-0 rounded-full"
                    ref={progressBarRef}
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
};

export default Preloader;
