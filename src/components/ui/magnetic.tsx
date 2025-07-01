"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

const Magnetic = ({
    children,
    className,
    color,
}: {
    children: React.ReactNode;
    className?: string;
    color?: string;
}) => {
    const ref = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) {
            return;
        }

        const xTo = gsap.quickTo(ref.current, "x", {
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
        });
        const yTo = gsap.quickTo(ref.current, "y", {
            duration: 0.3,
            ease: "elastic.out(1, 0.3)",
        });

        // Store original color for reset
        const originalColor = getComputedStyle(ref.current).color;

        const mouseMove = (event: MouseEvent) => {
            if (!ref.current) {
                return;
            }
            const { clientX, clientY } = event;
            const { width, height, left, top } =
                ref.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x); // Scale down the movement for better effect
            yTo(y);
        };

        const mouseEnter = () => {
            if (!ref.current) {
                return;
            }
            // Change color on hover if color prop is provided
            if (color) {
                gsap.to(ref.current, {
                    color: color,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        const mouseLeave = () => {
            if (!ref.current) {
                return;
            }
            // Reset position
            xTo(0);
            yTo(0);

            // Reset color
            if (color) {
                gsap.to(ref.current, {
                    color: originalColor,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        ref.current.addEventListener("mousemove", mouseMove);
        ref.current.addEventListener("mouseenter", mouseEnter);
        ref.current.addEventListener("mouseleave", mouseLeave);

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("mousemove", mouseMove);
                ref.current.removeEventListener("mouseenter", mouseEnter);
                ref.current.removeEventListener("mouseleave", mouseLeave);
            }
        };
    }, [color]);

    return (
        <div ref={ref} className={cn("inline-block cursor-pointer", className)}>
            {children}
        </div>
    );
};

export default Magnetic;
