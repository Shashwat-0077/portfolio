"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "@/components/transition-link";
import { ANIMATION_CONSTANTS, ROUTES } from "@/lib/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const Dock = () => {
    // const { isLoading } = usePreloaderStore();
    const dockRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    useGSAP(
        () => {
            const tl = gsap.timeline();

            const inactiveLink = Array.from(
                dockRef.current?.querySelectorAll(`.dock-link.inactive`) || []
            ) as HTMLElement[];

            // Initial state
            gsap.set(dockRef.current, {
                opacity: 0.5,
                padding: 0,
                y: 10,
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            });

            gsap.set(inactiveLink, {
                width: 0,
            });

            // Animation sequence
            tl
                // Show dock first
                .to(dockRef.current, {
                    opacity: 1,
                    y: 0,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    duration: 0.3,
                    ease: "power2.out",
                    delay: 1.5,
                })
                .to(dockRef.current, {
                    padding: "0 1.75rem",
                    duration: 0.3,
                    ease: "power2.inOut",
                })
                .to(
                    inactiveLink,
                    {
                        width: "3rem",
                        duration: 0.5,
                        delay: 0.2,
                        ease: "back.out(1.7)",
                    },
                    "<"
                );
        },
        {
            scope: dockRef,
        }
    );

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
