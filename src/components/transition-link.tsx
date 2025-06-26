"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";

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
        isCompatible,
        setCompatible,
    } = useAnimationStore();

    useEffect(() => {
        // Check if the browser supports View Transitions
        const supportsViewTransitions = BROWSER_SUPPORT.hasViewTransitions();
        setCompatible(supportsViewTransitions);

        // If not compatible, clear any existing cursor animations
        if (!supportsViewTransitions) {
            clearCursorAnimations();
        }
    }, [setCompatible]);

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

        // If not compatible, use regular navigation
        if (!isCompatible) {
            router.push(path);
            return;
        }

        // Prevent new transitions if dock is already animating
        if (isDockAnimating || pathname === path) {
            return;
        }

        const dock = document.querySelector("[data-dock]") as HTMLDivElement;
        const dockLid = document.querySelector(
            "[data-dock-lid]"
        ) as HTMLDivElement;
        const inactiveLinks = Array.from(
            dock.querySelectorAll(`.dock-link.inactive`)
        ) as HTMLElement[];

        // Clear any existing cursor animations immediately
        clearCursorAnimations();

        // Set states
        setDockAnimating(true);
        setCursorDisabled(true);
        setTransitioning(true);

        try {
            if (dock && inactiveLinks.length > 0 && dockLid) {
                await DockAnimations.animateOut({
                    dock,
                    inactiveLinks,
                    dockLid,
                });
                router.push(path, {
                    onTransitionReady: PageAnimations.slideInAndOut,
                });
            } else {
                // Fallback for cases where dock elements aren't found
                router.push(path);
                // Small delay to simulate navigation
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        } catch (_error) {
            // Reset dock state on error
            if (dock) {
                dock.style.pointerEvents = "auto";
            }
        } finally {
            setCursorDisabled(false);
            setTransitioning(false);
        }
    };

    // If not compatible, render a regular Link
    if (!isCompatible) {
        return (
            <Link href={href} prefetch={true} className={className}>
                {children}
            </Link>
        );
    }

    // If compatible, render TransitionLink
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
