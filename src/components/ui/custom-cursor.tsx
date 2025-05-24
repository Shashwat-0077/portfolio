"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

const ClickRaysAnimation = () => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const clickX = e.clientX - 1; // just a little offset to center the rays
            const clickY = e.clientY;

            const angles = [90, 135, 180, 225];

            angles.forEach((angle) => {
                const ray = document.createElement("div");
                ray.style.cssText = `
                    position: fixed;
                    left: ${clickX}px;
                    top: ${clickY}px;
                    width: 3px;
                    height: 10px;
                    background: #fff;
                    pointer-events: none;
                    z-index: 9999;
                    transform: rotate(${angle}deg) translateY(100%);
                    transform-origin: center top;
                `;
                document.body.appendChild(ray);

                const tl = gsap.timeline();

                tl.from(ray, {
                    height: 0,
                    transform: `rotate(${angle}deg) translateY(100%)`,
                    transformOrigin: "center top",
                    duration: 0.1,
                    ease: "power2.out",
                })
                    .to(ray, {
                        height: 10,
                        transform: `rotate(${angle}deg) translateY(100%)`,
                        transformOrigin: "center top",
                        duration: 0.1,
                        ease: "power2.out",
                    })
                    .to(ray, {
                        height: 10,
                        transform: `rotate(${angle}deg) translateY(100%)`,
                        duration: 0.1,
                        transformOrigin: "center top",
                        ease: "power2.out",
                    })
                    .to(ray, {
                        height: 0,
                        duration: 0.2,
                        transform: `rotate(${angle}deg) translateY(100%)`,
                        transformOrigin: "center top",
                        ease: "power2.in",
                        onComplete: () => {
                            if (document.body.contains(ray)) {
                                document.body.removeChild(ray);
                            }
                        },
                    });
            });
        };

        // Add click event listener
        document.addEventListener("click", handleClick);

        // Cleanup
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
};

export default ClickRaysAnimation;
