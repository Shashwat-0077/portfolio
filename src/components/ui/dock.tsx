"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

import TransitionLink from "@/components/transition-link";
import { BROWSER_SUPPORT, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePreloaderStore } from "@/store/preloader-store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { DockAnimations } from "@/lib/animations";
import { useAnimationStore } from "@/store/animation-store";
import useIdle from "@/hooks/useIdle";

// TODO :  Make dock small when ideal

const Dock = () => {
    const dockRef = useRef<HTMLDivElement>(null);
    const dockLidRef = useRef<HTMLDivElement>(null);
    const isPreloaderLoading = usePreloaderStore((s) => s.isLoading);
    const { isDockAnimating, setDockAnimating } = useAnimationStore();

    const isIdle = useIdle(5000, {
        enabled: !isDockAnimating,
    });

    const pathname = usePathname();

    useEffect(() => {
        if (isDockAnimating || !dockRef.current) {
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
    }, [isIdle, isDockAnimating]);

    useEffect(() => {
        if (!dockRef.current) {
            return;
        }
        // NOTE : Had to create this because the idle state was not being applied immediately, they took time, and if in that time the user clicks on the dock, it breaks the dock animation.
        // This is a hack to ensure that the dock is not clickable while the animation is happening.

        if (isDockAnimating) {
            dockRef.current.style.pointerEvents = "none";
        } else {
            setTimeout(() => {
                if (!dockRef.current) {
                    return;
                }
                dockRef.current.style.pointerEvents = "auto";
            }, 100);
        }
    }, [isDockAnimating]);

    useGSAP(() => {
        if (
            !dockRef.current ||
            isPreloaderLoading ||
            !BROWSER_SUPPORT.hasViewTransitions() ||
            !dockLidRef.current
        ) {
            return;
        }

        const inactiveLinks = Array.from(
            dockRef.current?.querySelectorAll(`.dock-link.inactive`) || []
        ) as HTMLDivElement[];
        DockAnimations.animateIn({
            dock: dockRef.current,
            dockLid: dockLidRef.current,
            inactiveLinks,
            onComplete: () => {
                setDockAnimating(false);
            },
        });
    }, [isPreloaderLoading]);

    // HACK : Brightness not working on mobile and tablet devices

    return (
        <div
            data-dock
            ref={dockRef}
            className="border-border fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border-[2px] bg-white/5 px-7 backdrop-blur-lg"
        >
            <div
                data-dock-lid
                className="absolute inset-0 z-10 bg-black opacity-50"
                ref={dockLidRef}
            >
                &nbsp;
            </div>
            <TooltipProvider>
                {ROUTES.map((route) => {
                    const isActive = pathname === route.path;
                    return (
                        <Tooltip key={route.path} delayDuration={500}>
                            <TooltipContent>
                                <span className="text-xs font-medium text-white">
                                    {route.label}
                                </span>
                            </TooltipContent>
                            <TooltipTrigger>
                                <TransitionLink
                                    href={route.path}
                                    className={cn(
                                        `dock-link flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center`,
                                        isActive
                                            ? "active text-primary"
                                            : "inactive"
                                    )}
                                >
                                    <route.icon className="h-6 w-6" />
                                </TransitionLink>
                            </TooltipTrigger>
                        </Tooltip>
                    );
                })}
            </TooltipProvider>
        </div>
    );
};

export default Dock;
