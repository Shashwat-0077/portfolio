"use client";

import { usePathname } from "next/navigation";
import type React from "react";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";

import { useAnimationStore } from "@/store/animation-store";
import { BROWSER_SUPPORT } from "@/lib/constants";
import { DockAnimations, PageAnimations } from "@/lib/animations";

const TransitionLink = ({
    children,
    href,
    className,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    active?: boolean;
}) => {
    const pathname = usePathname();
    const router = useTransitionRouter();

    const {
        isDockAnimating,
        setDockAnimating,
        setCursorDisabled,
        setTransitioning,
    } = useAnimationStore();

    const clearCursorAnimations = () => {
        const existingAnimations = document.querySelectorAll(
            "[data-cursor-animation]"
        );
        existingAnimations.forEach((element) => {
            if (document.body.contains(element)) {
                document.body.removeChild(element);
            }
        });
    };

    const handleNavigation = async (e: React.MouseEvent, path: string) => {
        e.preventDefault();

        // Prevent new transitions if dock is already animating
        if (isDockAnimating || pathname === path) {
            return;
        }

        const dock = document.querySelector("[data-dock]") as HTMLDivElement;
        const inactiveLinks = Array.from(
            dock.querySelectorAll(`.dock-link.inactive`)
        ) as HTMLElement[];
        const dockContainer = document.querySelector(
            "[data-dock-container]"
        ) as HTMLDivElement;

        const hasViewTransitionSupport = BROWSER_SUPPORT.hasViewTransitions();

        // Clear any existing cursor animations immediately
        clearCursorAnimations();

        // Set states
        setDockAnimating(true);
        setCursorDisabled(true);
        setTransitioning(true);

        try {
            if (
                hasViewTransitionSupport &&
                dock &&
                dockContainer &&
                inactiveLinks.length > 0
            ) {
                await DockAnimations.animateOut({
                    dock,
                    inactiveLinks,
                    dockContainer,
                });
                router.push(path, {
                    onTransitionReady: PageAnimations.slideInAndOut,
                });
            } else {
                // For browsers without View Transition support - no dock animation
                router.push(path);

                // Small delay to simulate navigation
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (_error) {
            // Reset dock state on error
            if (dock && hasViewTransitionSupport && dockContainer) {
                dockContainer.style.pointerEvents = "auto";
            }
        } finally {
            // Reset all states
            setDockAnimating(false);
            setCursorDisabled(false);
            setTransitioning(false);
        }
    };

    return (
        <Link
            href={href}
            prefetch={true}
            className={className}
            onClick={(e) => handleNavigation(e, href)}
            type="button"
        >
            {children}
        </Link>
    );
};

export default TransitionLink;
