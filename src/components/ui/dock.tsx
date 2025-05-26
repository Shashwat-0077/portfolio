"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/transition-link";
import { ANIMATION_CONSTANTS, BROWSER_SUPPORT, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { animateDockIn } from "@/lib/dock-animations";
import { usePreloaderStore } from "@/store/preloader-store";
import { useGSAP } from "@gsap/react";

const Dock = () => {
    // const { isLoading } = usePreloaderStore();
    const dockRef = useRef<HTMLDivElement>(null);
    const { isLoading } = usePreloaderStore();

    const pathname = usePathname();

    useGSAP(() => {
        if (
            !dockRef.current ||
            isLoading ||
            !BROWSER_SUPPORT.hasViewTransitions()
        ) {
            return;
        }

        const inactiveLinks = Array.from(
            dockRef.current?.querySelectorAll(`.dock-link.inactive`) || []
        ) as HTMLElement[];

        animateDockIn(dockRef.current, inactiveLinks);
    }, [isLoading, dockRef.current]);

    return (
        <div
            data-dock
            ref={dockRef}
            className="fixed top-6 left-1/2 flex -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-[#737373] bg-[#3C3C3C] px-7"
            style={{
                zIndex: ANIMATION_CONSTANTS.DOCK_Z_INDEX,
            }}
        >
            {ROUTES.map((route) => {
                const isActive = pathname === route.path;
                return (
                    <TransitionLink
                        key={route.path}
                        href={route.path}
                        className={cn(
                            `dock-link flex h-12 w-12 flex-shrink-0 cursor-pointer items-center justify-center`,
                            isActive ? "active text-primary" : "inactive"
                        )}
                    >
                        <route.icon className="h-6 w-6" />
                    </TransitionLink>
                );
            })}
        </div>
    );
};

export default Dock;
