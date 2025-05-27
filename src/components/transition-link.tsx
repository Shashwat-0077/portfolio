"use client";

import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useAnimationStore } from "@/store/animation-store";
import { BROWSER_SUPPORT } from "@/lib/constants";
import { animateDockOut } from "@/lib/dock-animations";

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
    const router = useRouter();
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

        const dock = document.querySelector("[data-dock]") as HTMLElement;
        const inactiveLinks = Array.from(
            dock.querySelectorAll(`.dock-link.inactive`)
        ) as HTMLElement[];

        const hasViewTransitionSupport = BROWSER_SUPPORT.hasViewTransitions();

        // Clear any existing cursor animations immediately
        clearCursorAnimations();

        // Set states
        setDockAnimating(true);
        setCursorDisabled(true);
        setTransitioning(true);

        try {
            if (hasViewTransitionSupport && dock) {
                await animateDockOut(dock, inactiveLinks);

                const transition = document.startViewTransition(() => {
                    router.push(path, {});
                });

                await transition.finished;
            } else {
                // For browsers without View Transition support - no dock animation
                router.push(path);

                // Small delay to simulate navigation
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (error) {
            console.error("Navigation error:", error);

            // Reset dock state on error
            if (dock && hasViewTransitionSupport) {
                dock.style.pointerEvents = "auto";
            }
        } finally {
            // Reset all states
            setDockAnimating(false);
            setCursorDisabled(false);
            setTransitioning(false);
        }
    };

    return (
        <a
            className={className}
            onClick={(e) => handleNavigation(e, href)}
            type="button"
        >
            {children}
        </a>
    );
};

export default TransitionLink;
