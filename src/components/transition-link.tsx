"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useAnimationStore } from "@/lib/animation-store";
import { ANIMATION_CONSTANTS, BROWSER_SUPPORT } from "@/lib/constants";

const TransitionLink = ({
    children,
    href,
    className,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
}) => {
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

    const animateDockOut = (dock: HTMLElement): Promise<void> => {
        return new Promise((resolve) => {
            dock.style.transform = `translateY(${ANIMATION_CONSTANTS.DOCK_HIDE_TRANSLATE_Y}px)`;
            dock.style.transition = `transform ${ANIMATION_CONSTANTS.DOCK_HIDE_DURATION}ms ${ANIMATION_CONSTANTS.DOCK_HIDE_EASING}`;
            dock.style.pointerEvents = "none";

            setTimeout(resolve, ANIMATION_CONSTANTS.DOCK_HIDE_DURATION);
        });
    };

    const animateDockIn = (dock: HTMLElement): Promise<void> => {
        return new Promise((resolve) => {
            dock.style.transform = `translateY(0)`;
            dock.style.transition = `transform ${ANIMATION_CONSTANTS.DOCK_SHOW_DURATION}ms ${ANIMATION_CONSTANTS.DOCK_SHOW_EASING}`;

            setTimeout(() => {
                dock.style.pointerEvents = "auto";
                resolve();
            }, ANIMATION_CONSTANTS.DOCK_SHOW_DURATION);
        });
    };

    const handleNavigation = async (e: React.MouseEvent, path: string) => {
        e.preventDefault();

        // Prevent new transitions if dock is already animating
        if (isDockAnimating) {
            return;
        }

        const dock = document.querySelector("[data-dock]") as HTMLElement;
        const hasViewTransitionSupport = BROWSER_SUPPORT.hasViewTransitions();

        // Clear any existing cursor animations immediately
        clearCursorAnimations();

        // Set states
        setDockAnimating(true);
        setCursorDisabled(true);
        setTransitioning(true);

        try {
            if (hasViewTransitionSupport && dock) {
                // Step 1: Animate dock out
                await animateDockOut(dock);

                // Step 2: Start view transition
                const transition = document.startViewTransition(() => {
                    router.push(path);
                });

                // Step 3: When transition finishes, bring dock back
                await transition.finished;
                await animateDockIn(dock);
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
                dock.style.transform = `translateY(0)`;
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
        <button
            className={className}
            onClick={(e) => handleNavigation(e, href)}
            type="button"
        >
            {children}
        </button>
    );
};

export default TransitionLink;
