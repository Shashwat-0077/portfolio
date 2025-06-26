"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import gsap from "gsap";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import useIdle from "@/hooks/useIdle";

interface DockState {
    isAnimating: boolean;
    isCollapsed: boolean;
    hasNavigated: boolean;
    isCompatible: boolean;
    isMounted: boolean;
}

const Dock = () => {
    const dockRef = useRef<HTMLDivElement>(null);
    const lidRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const pathname = usePathname();
    const router = useTransitionRouter();

    const [state, setState] = useState<DockState>({
        isAnimating: true,
        isCollapsed: false,
        hasNavigated: false,
        isCompatible: false,
        isMounted: false,
    });

    // Check compatibility after mount to avoid hydration mismatch
    useEffect(() => {
        const checkCompatibility = () => {
            const compatible =
                typeof document !== "undefined" &&
                "startViewTransition" in document;
            setState((prev) => ({
                ...prev,
                isCompatible: compatible,
                isMounted: true,
            }));
        };

        checkCompatibility();
    }, []);

    // Only use idle detection if compatible and not navigated
    const isIdle = useIdle(5000, {
        enabled:
            state.isCompatible &&
            !state.hasNavigated &&
            !state.isAnimating &&
            state.isMounted,
    });

    // Entrance animation
    useEffect(() => {
        if (
            !state.isMounted ||
            !state.isCompatible ||
            !dockRef.current ||
            !lidRef.current
        ) {
            if (state.isMounted) {
                setState((prev) => ({ ...prev, isAnimating: false }));
            }
            return;
        }

        const dock = dockRef.current;
        const lid = lidRef.current;
        const inactiveLinks = dock.querySelectorAll(
            ".dock-link.inactive"
        ) as NodeListOf<HTMLElement>;

        // Set initial state
        gsap.set(dock, {
            x: "-50%",
            padding: 0,
            y: 10,
        });
        gsap.set(inactiveLinks, { width: 0 });

        const tl = gsap.timeline({
            delay: 1.5,
            onComplete: () =>
                setState((prev) => ({ ...prev, isAnimating: false })),
        });

        tl.to(dock, {
            y: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power2.out",
        })
            .to(lid, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    lid.style.zIndex = "-1";
                },
            })
            .to(
                dock,
                {
                    padding: "0 1.75rem",
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<"
            )
            .to(
                inactiveLinks,
                {
                    width: "3rem",
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
                "<0.2"
            );

        return () => {
            try {
                tl.kill();
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn("Error cleaning up entrance animation:", error);
            }
        };
    }, [state.isMounted, state.isCompatible]);

    // Handle idle state (only if not navigated)
    useEffect(() => {
        if (
            !state.isCompatible ||
            state.isAnimating ||
            state.hasNavigated ||
            !dockRef.current ||
            !state.isMounted
        ) {
            return;
        }

        const dock = dockRef.current;
        const inactiveLinks = dock.querySelectorAll(
            ".dock-link.inactive"
        ) as NodeListOf<HTMLElement>;

        // Kill any existing timeline
        if (timelineRef.current) {
            timelineRef.current.kill();
        }

        const tl = gsap.timeline({
            onComplete: () =>
                setState((prev) => ({ ...prev, isCollapsed: isIdle })),
        });

        if (isIdle && !state.isCollapsed) {
            // Collapse
            tl.to(inactiveLinks, {
                width: 0,
                duration: 0.3,
                ease: "power2.out",
            }).to(
                dock,
                {
                    padding: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<"
            );
        } else if (!isIdle && state.isCollapsed) {
            // Expand
            tl.to(dock, {
                padding: "0 1.75rem",
                duration: 0.3,
                ease: "power2.inOut",
            }).to(
                inactiveLinks,
                {
                    width: "3rem",
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
                "<0.2"
            );
        }

        timelineRef.current = tl;

        return () => {
            try {
                if (timelineRef.current) {
                    timelineRef.current.kill();
                    timelineRef.current = null;
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.warn("Error cleaning up timeline:", error);
            }
        };
    }, [
        isIdle,
        state.isAnimating,
        state.hasNavigated,
        state.isCollapsed,
        state.isCompatible,
        state.isMounted,
    ]);

    // Navigation handler
    const handleNavigation = async (e: React.MouseEvent, href: string) => {
        e.preventDefault();

        // Prevent navigation if already on the same page or animating
        if (pathname === href || state.isAnimating) {
            return;
        }

        if (!state.isCompatible) {
            router.push(href);
            return;
        }

        const dock = dockRef.current;
        const lid = lidRef.current;
        if (!dock || !lid) {
            router.push(href);
            return;
        }

        const inactiveLinks = dock.querySelectorAll(
            ".dock-link.inactive"
        ) as NodeListOf<HTMLElement>;

        setState((prev) => ({
            ...prev,
            isAnimating: true,
            hasNavigated: true,
        }));

        // Animate out
        gsap.set(lid, { opacity: 0, zIndex: 10 });

        const tl = gsap.timeline({
            onComplete: () => {
                // Navigate with view transition
                router.push(href, {
                    onTransitionReady: () => {
                        // Page transition animation
                        document.documentElement.animate(
                            [
                                { opacity: 1, transform: "translateY(0)" },
                                { opacity: 0.7, transform: "translateY(-35%)" },
                            ],
                            {
                                duration: 1500,
                                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                                fill: "forwards",
                                pseudoElement: "::view-transition-old(root)",
                            }
                        );

                        document.documentElement.animate(
                            [
                                {
                                    clipPath:
                                        "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
                                },
                                {
                                    clipPath:
                                        "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                                },
                            ],
                            {
                                duration: 1500,
                                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                                fill: "forwards",
                                pseudoElement: "::view-transition-new(root)",
                            }
                        );
                    },
                });
            },
        });

        tl.to(inactiveLinks, {
            width: 0,
            duration: 0.3,
            ease: "power2.out",
        })
            .to(
                lid,
                {
                    opacity: 0.5,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<"
            )
            .to(
                dock,
                {
                    padding: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<"
            )
            .to(dock, {
                y: 10,
                duration: 0.3,
                ease: "power2.inOut",
            });
    };

    // Don't render until mounted to avoid hydration mismatch
    if (!state.isMounted) {
        return (
            <div className="border-border fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-2 bg-white/5 backdrop-blur-lg">
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
                                    <Link
                                        href={route.path}
                                        className={linkClasses}
                                    >
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
    }

    return (
        <div
            ref={dockRef}
            className="border-border fixed top-6 left-1/2 z-50 flex items-center justify-center overflow-hidden rounded-full border-2 bg-white/5 backdrop-blur-lg"
            style={{ pointerEvents: state.isAnimating ? "none" : "auto" }}
        >
            {state.isCompatible && (
                <div
                    ref={lidRef}
                    className="absolute inset-0 z-10 bg-black opacity-50"
                />
            )}

            <TooltipProvider>
                {ROUTES.map((route) => {
                    const isActive = pathname === route.path;
                    const linkClasses = cn(
                        "dock-link flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center transition-colors",
                        isActive
                            ? "active text-primary"
                            : "inactive text-muted-foreground hover:text-primary"
                    );

                    if (state.isCompatible) {
                        return (
                            <Tooltip key={route.path} delayDuration={500}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={(e) =>
                                            handleNavigation(e, route.path)
                                        }
                                        className={linkClasses}
                                        disabled={state.isAnimating}
                                    >
                                        <route.icon className="h-6 w-6" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span className="text-xs font-medium text-white">
                                        {route.label}
                                    </span>
                                </TooltipContent>
                            </Tooltip>
                        );
                    }

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

export default Dock;
