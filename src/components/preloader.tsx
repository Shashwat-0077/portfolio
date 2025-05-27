"use client";

import { useRef, useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import { useTransitionRouter } from "next-view-transitions";

import { usePreloaderStore } from "@/store/preloader-store";
import { ROUTES_TO_PREFETCH } from "@/lib/constants";
import { PreloaderAnimations, ProgressBarAnimations } from "@/lib/animations";

// Enhanced route prefetching utility
class RoutePrefetcher {
    private prefetchedRoutes = new Set<string>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private router: any) {}

    // Prefetch all routes with better error handling
    async prefetchRoutes(routes: string[]): Promise<void> {
        try {
            const routesToPrefetch = routes.filter(
                (route) => !this.prefetchedRoutes.has(route)
            );

            const prefetchPromises = routesToPrefetch.map(async (route) => {
                try {
                    await this.router.prefetch(route);
                    this.prefetchedRoutes.add(route);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.warn(
                        `❌ Failed to prefetch route ${route}:`,
                        error
                    );
                }
            });

            await Promise.all(prefetchPromises);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error during route prefetching:", error);
        }
    }

    // Check network conditions before prefetching
    shouldPrefetch(): boolean {
        if (typeof navigator === "undefined") {
            return true;
        }

        // Check if user has data saver enabled
        if ("connection" in navigator) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const connection = (navigator as any).connection;
            if (connection?.saveData) {
                // eslint-disable-next-line no-console
                console.log("🚫 Skipping prefetch - Data saver enabled");
                return false;
            }

            // Check connection speed - be more lenient for route prefetching
            if (connection?.effectiveType === "slow-2g") {
                // eslint-disable-next-line no-console
                console.log(
                    "🚫 Skipping prefetch - Very slow connection detected"
                );
                return false;
            }
        }

        return true;
    }

    // Execute prefetching strategy
    async executePrefetch(): Promise<void> {
        if (!this.shouldPrefetch()) {
            return;
        }

        await this.prefetchRoutes(ROUTES_TO_PREFETCH);
    }

    // Get prefetch status
    getStatus() {
        return {
            prefetched: this.prefetchedRoutes.size,
            total: ROUTES_TO_PREFETCH.length,
            routes: Array.from(this.prefetchedRoutes),
        };
    }
}

const Preloader = () => {
    const totalDuration = 2000;
    const { width } = useWindowSize();

    const router = useTransitionRouter();
    const preloaderRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const { isLoading, hasShown, setIsLoading, setHasShown } =
        usePreloaderStore();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [prefetchStatus, setPrefetchStatus] = useState({
        prefetched: 0,
        total: 0,
        routes: [] as string[],
    });

    // Initialize prefetcher
    const prefetcherRef = useRef<RoutePrefetcher | null>(null);

    const greetings = [
        "नमस्कार", // Marathi, Nepali, Konkani, Maithili, Bengali, Assamese, Odia, Gujarati
        "नमः", // Sanskrit
        "வணக்கம்", // Tamil
        "నమస్కారం", // Telugu
        "നമസ്കാരം", // Malayalam
        "ನಮಸ್ಕಾರ", // Kannada
        "السلام علیکم", // Urdu, Kashmiri, Sindhi
        "खोय", // Bodo
        "ꯊꯧꯕꯥ", // Manipuri (Meitei): "Khoi Bha"
        "ᱵᱟᱝᱜᱟ", // Santali
        "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", // Punjabi
        "नमस्ते", // Hindi, Dogri
    ];

    // Animation cycle effect
    useEffect(() => {
        if (hasShown || !isLoading) {
            return;
        }

        // Initialize prefetcher
        if (!prefetcherRef.current) {
            prefetcherRef.current = new RoutePrefetcher(router);
        }

        // Enhanced route prefetching with status tracking
        const executeRoutePrefetching = async () => {
            try {
                // Start prefetching immediately
                await prefetcherRef.current?.executePrefetch();

                // Update status after prefetching
                if (prefetcherRef.current) {
                    const status = prefetcherRef.current.getStatus();
                    setPrefetchStatus(status);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Route prefetching failed:", error);
            }
        };

        ProgressBarAnimations.animate({
            progressBar: progressBarRef.current,
            width: width,
            totalDuration: totalDuration,
        });

        // Text cycling animation
        const intervalTime = totalDuration / greetings.length;
        let currentIndex = 0;

        const intervalId = setInterval(() => {
            currentIndex = currentIndex + 1;

            if (currentIndex >= greetings.length) {
                clearInterval(intervalId);
                PreloaderAnimations.animateOut({
                    preloader: preloaderRef.current,
                    textContainer: textContainerRef.current,
                    setHasShown,
                    setIsLoading,
                });
                return;
            }

            setCurrentTextIndex(currentIndex);
        }, intervalTime);

        // Start route prefetching immediately (don't wait for animation)
        executeRoutePrefetching();

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
                {/* Optional: Show prefetch status during development */}
                {process.env.NODE_ENV === "development" &&
                    prefetchStatus.prefetched > 0 && (
                        <div className="mb-2 text-xs text-white/60">
                            Prefetched: {prefetchStatus.prefetched}/
                            {prefetchStatus.total} routes
                        </div>
                    )}

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
