"use client";

import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useAnimationStore } from "@/stores/animation-store";
import { DockAnimations, PageAnimations } from "@/lib/animations";

const TransitionLink = ({
    children,
    href,
    className,
    onClick,
}: {
    children: React.ReactNode;
    href: string;
    className?: string;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}) => {
    const pathname = usePathname();
    const router = useTransitionRouter();

    const isDockAnimating = useAnimationStore((state) => state.isDockAnimating);
    const setDockAnimating = useAnimationStore(
        (state) => state.setDockAnimating
    );
    const setCursorDisabled = useAnimationStore(
        (state) => state.setCursorDisabled
    );
    const setTransitioning = useAnimationStore(
        (state) => state.setTransitioning
    );
    const setIdealAnimationEnabled = useAnimationStore(
        (state) => state.setIdealAnimationEnabled
    );

    const clearCursorAnimations = () => {
        const existingAnimations = document.querySelectorAll(
            "[data-cursor-animation]"
        );
        existingAnimations.forEach((element) => {
            if (document.body.contains(element)) {
                try {
                    document.body.removeChild(element);
                } catch (_) {}
            }
        });
    };

    const handleNavigation = async (e: React.MouseEvent, path: string) => {
        e.preventDefault();

        if (isDockAnimating || pathname === path) {
            return;
        }

        clearCursorAnimations();

        // Set states
        setDockAnimating(true);
        setCursorDisabled(true);
        setTransitioning(true);
        setIdealAnimationEnabled(false);

        const dock = document.querySelector("[data-dock]") as HTMLDivElement;
        const dockLid = document.querySelector(
            "[data-dock-lid]"
        ) as HTMLDivElement;
        const inactiveLinks = Array.from(
            dock.querySelectorAll(`.dock-link.inactive`)
        ) as HTMLElement[];

        try {
            if (dock && inactiveLinks.length > 0 && dockLid) {
                await DockAnimations.animateOut({
                    dock,
                    inactiveLinks,
                    dockLid,
                });
            }

            // Start the navigation (returns void)
            router.push(path, {
                onTransitionReady: PageAnimations.slideInAndOut,
            });
        } catch (_) {
            if (dock) {
                dock.style.pointerEvents = "auto";
            }
        } finally {
            setCursorDisabled(false);
            setTransitioning(false);
        }
    };

    return (
        <Link
            href={href}
            prefetch={true}
            className={className}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
                handleNavigation(e, href);
            }}
            type="button"
        >
            {children}
        </Link>
    );
};

export default TransitionLink;
