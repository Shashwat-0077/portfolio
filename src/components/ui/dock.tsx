"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { usePreloaderStore } from "@/stores/preloader-store";
import { useAnimationStore } from "@/stores/animation-store";
import TransitionLink from "@/components/transition-link";
import { DockAnimations } from "@/lib/animations";
import { useIdle } from "@/hooks";
import { useGlobalTimeout } from "@/stores/time-ref-store";

// BUG Maybe : dock is still expanding after it animates out not sure why though, it happens sometimes, not always

const Dock = () => {
    const START_IDEAL_ANIMATION_DELAY = 1000; // 10 seconds
    const IDLE_TRIGGER_DURATION = 10000; // 5 seconds

    const dockRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLDivElement>(null);

    const { setTimeoutId, clearGlobalTimeout } = useGlobalTimeout();

    const pathname = usePathname();
    const {
        isComplete: preloaderComplete,
        hasShown: preloaderShown,
        setHasShown: setPreloaderShown,
    } = usePreloaderStore();
    const {
        setDockAnimating,
        isDockAnimating,
        setIdealAnimationEnabled,
        isIdealAnimationEnabled,
    } = useAnimationStore();

    const isIdle = useIdle(IDLE_TRIGGER_DURATION, {
        enabled:
            isIdealAnimationEnabled &&
            preloaderComplete &&
            preloaderShown &&
            !isDockAnimating,
    });

    useEffect(() => {
        clearGlobalTimeout();

        if (!dockRef.current || !lidRef.current) {
            return;
        }

        const inactiveLinks = Array.from(
            dockRef.current.querySelectorAll(".dock-link.inactive")
        ) as HTMLDivElement[];

        gsap.set(dockRef.current, {
            x: "-50%",
            padding: 0,
            y: 10,
        });
        gsap.set(inactiveLinks, {
            width: 0,
        });

        // eslint-disable-next-line
    }, []);

    useEffect(
        () => {
            if (!preloaderComplete || preloaderShown) {
                return;
            }

            const handleExpandDock = async () => {
                // Ensure the dock is ready for animation
                if (!dockRef.current || !lidRef.current) {
                    return;
                }

                const inactiveLinks = Array.from(
                    dockRef.current.querySelectorAll(".dock-link.inactive")
                ) as HTMLDivElement[];

                await DockAnimations.animateIn({
                    dock: dockRef.current,
                    dockLid: lidRef.current,
                    inactiveLinks: inactiveLinks,
                });
                setPreloaderShown(true);
                setDockAnimating(false);

                setTimeoutId(
                    setTimeout(() => {
                        setIdealAnimationEnabled(true);
                    }, START_IDEAL_ANIMATION_DELAY)
                ); // count this in as part of the animation delay
            };

            handleExpandDock();
        },
        // eslint-disable-next-line
        [preloaderComplete, preloaderShown]
    );

    useEffect(
        () => {
            if (!preloaderShown && !preloaderComplete) {
                return;
            }

            const handleExpandDock = async () => {
                // Ensure the dock is ready for animation
                if (!dockRef.current || !lidRef.current) {
                    return;
                }

                const inactiveLinks = Array.from(
                    dockRef.current.querySelectorAll(".dock-link.inactive")
                ) as HTMLDivElement[];

                await new Promise((resolve) => setTimeout(resolve, 1500));
                await DockAnimations.animateIn({
                    dock: dockRef.current,
                    dockLid: lidRef.current,
                    inactiveLinks: inactiveLinks,
                });
                setDockAnimating(false);

                setTimeoutId(
                    setTimeout(() => {
                        setIdealAnimationEnabled(true);
                    }, START_IDEAL_ANIMATION_DELAY)
                ); // count this in as part of the animation delay
            };

            handleExpandDock();
        },
        // eslint-disable-next-line
        []
    );

    useEffect(
        () => {
            if (isDockAnimating || !preloaderComplete || !preloaderShown) {
                return;
            }

            if (!isIdealAnimationEnabled) {
                return;
            }

            if (!dockRef.current) {
                return;
            }

            const inactiveLinks = Array.from(
                dockRef.current?.querySelectorAll(`.dock-link.inactive`) || []
            ) as HTMLDivElement[];

            if (isIdle) {
                DockAnimations.collapse({
                    dock: dockRef.current,
                    inactiveLinks: inactiveLinks,
                });
            } else {
                DockAnimations.expand({
                    dock: dockRef.current,
                    inactiveLinks: inactiveLinks,
                });
            }
        },
        // eslint-disable-next-line
        [isIdle, isDockAnimating, isIdealAnimationEnabled]
    );

    return (
        <div
            ref={dockRef}
            data-dock
            className="border-border bg-dock-background fixed top-6 left-1/2 z-50 flex items-center justify-center overflow-hidden rounded-full border-2"
        >
            <div
                ref={lidRef}
                data-dock-lid
                className="absolute inset-0 z-10 bg-black opacity-50"
            />

            <TooltipProvider>
                {ROUTES.map((route) => {
                    const isActive = pathname === route.path;
                    const linkClasses = cn(
                        "dock-link flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center transition-colors",
                        isActive
                            ? "active text-primary"
                            : "inactive text-muted-foreground hover:text-primary"
                    );

                    return (
                        <Tooltip key={route.path} delayDuration={500}>
                            <TooltipTrigger asChild>
                                <TransitionLink
                                    href={route.path}
                                    className={linkClasses}
                                    onClick={() => {
                                        clearGlobalTimeout();
                                    }}
                                >
                                    <route.icon className="h-6 w-6" />
                                </TransitionLink>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span className="text-xs font-medium text-white">
                                    {route.label}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
};

const DockForNonCompatibleBrowsers = () => {
    const dockRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return (
        <div
            ref={dockRef}
            data-dock
            className="border-border fixed top-6 left-1/2 z-50 flex items-center justify-center overflow-hidden rounded-full border-2 bg-white/5 backdrop-blur-lg"
            style={{ transform: "translateX(-50%)", padding: "0 1.75rem" }}
        >
            <TooltipProvider>
                {ROUTES.map((route) => {
                    const isActive = pathname === route.path;
                    const linkClasses = cn(
                        "dock-link flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center transition-colors",
                        isActive
                            ? "active text-primary"
                            : "inactive text-muted-foreground hover:text-primary"
                    );

                    return (
                        <Tooltip key={route.path} delayDuration={500}>
                            <TooltipTrigger asChild>
                                <Link href={route.path} className={linkClasses}>
                                    <route.icon className="h-6 w-6" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <span className="text-xs font-medium text-white">
                                    {route.label}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
};

export { Dock, DockForNonCompatibleBrowsers };
