"use client";

import React from "react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

import TransitionLink from "@/components/transition-link";
import { ANIMATION_CONSTANTS, BROWSER_SUPPORT, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePreloaderStore } from "@/store/preloader-store";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
} from "@/components/ui/tooltip";
import { DockAnimations } from "@/lib/animations";

const Dock = () => {
    // const { isLoading } = usePreloaderStore();
    const dockRef = useRef<HTMLDivElement>(null);
    const dockContainerRef = useRef<HTMLDivElement>(null);
    const { isLoading } = usePreloaderStore();

    const pathname = usePathname();

    useGSAP(() => {
        if (
            !dockRef.current ||
            !dockContainerRef.current ||
            isLoading ||
            !BROWSER_SUPPORT.hasViewTransitions()
        ) {
            return;
        }

        const inactiveLinks = Array.from(
            dockRef.current?.querySelectorAll(`.dock-link.inactive`) || []
        ) as HTMLElement[];

        DockAnimations.animateIn({
            dock: dockRef.current,
            inactiveLinks,
            dockContainer: dockContainerRef.current,
        });
    }, [isLoading, dockRef.current]);

    // HACK : Brightness not working on mobile and tablet devices

    return (
        <div
            data-dock-container
            ref={dockContainerRef}
            className="fixed top-6 left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{
                zIndex: ANIMATION_CONSTANTS.DOCK_Z_INDEX,
            }}
        >
            <div
                data-dock
                ref={dockRef}
                className="border-border bg-primary-foreground flex items-center justify-center rounded-[inherit] border-[2px] px-7"
            >
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
        </div>
    );
};

export default Dock;
