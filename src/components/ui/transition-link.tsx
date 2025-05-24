"use client";
import React from "react";
import { useTransitionRouter } from "next-view-transitions";

import { cn } from "@/lib/utils";

const TransitionLink = ({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const TRANSITION_TIME = 1500;
    const DOCK_OUT_TRANSITION_TIME = 200;
    const DOCK_IN_TRANSITION_TIME = 500;

    const router = useTransitionRouter();

    function slideInOut() {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)",
                },
                {
                    opacity: 0.2,
                    transform: "translateY(-35%)",
                },
            ],
            {
                duration: TRANSITION_TIME,
                easing: "cubic-bezier(0.87,0,0.13,1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                },
            ],
            {
                duration: TRANSITION_TIME,
                easing: "cubic-bezier(0.87,0,0.13,1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );

        // Animate dock back down after transition completes
        setTimeout(() => {
            const dock = document.querySelector("[data-dock]") as HTMLElement;
            if (dock) {
                dock.animate(
                    [
                        { transform: "translateX(-50%) translateY(-200%)" },
                        { transform: "translateX(-50%) translateY(0)" },
                    ],
                    {
                        duration: DOCK_IN_TRANSITION_TIME,
                        easing: "cubic-bezier(0.87,0,0.13,1)",
                        fill: "forwards",
                    }
                );
            }
        }, TRANSITION_TIME);
    }

    return (
        <a
            className={cn("", className)}
            href={href}
            onClick={(event) => {
                event.preventDefault();

                if (href === window.location.pathname) {
                    // If the link is the current page, do nothing
                    return;
                }

                // Animate dock up before transition starts
                const dock = document.querySelector(
                    "[data-dock]"
                ) as HTMLElement;
                if (dock) {
                    dock.animate(
                        [
                            { transform: "translateX(-50%) translateY(0)" },
                            { transform: "translateX(-50%) translateY(-200%)" },
                        ],
                        {
                            duration: DOCK_OUT_TRANSITION_TIME,
                            easing: "cubic-bezier(0.87,0,0.13,1)",
                            fill: "forwards",
                        }
                    );
                }

                // Start page transition after dock animation
                setTimeout(() => {
                    router.push(href, {
                        onTransitionReady: slideInOut,
                    });
                }, DOCK_OUT_TRANSITION_TIME);
            }}
        >
            {children}
        </a>
    );
};

export default TransitionLink;
