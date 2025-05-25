"use client";

import { useEffect } from "react";

const ClickRaysAnimation = () => {
    useEffect(() => {
        // Inject keyframes into the document only once
        const styleId = "click-rays-style";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                @keyframes scaleDown {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const handleClick = (e: MouseEvent) => {
            const clickX = e.clientX - 2;
            const clickY = e.clientY - 2;

            const angles = [90, 135, 180, 225];

            angles.forEach((angle) => {
                const translateWrapper = document.createElement("div");
                translateWrapper.style.cssText = `
                    position: fixed;
                    left: ${clickX}px;
                    top: ${clickY}px;
                    width: 4px;
                    height: 10px;
                    pointer-events: none;
                    z-index: 9999;
                    transform: rotate(${angle}deg) translateY(100%);
                    transition: transform 0.7s ease-out;
                `;

                const scaleWrapper = document.createElement("div");
                scaleWrapper.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: white;
                    animation: scaleDown 0.7s forwards ease-out;
                `;

                translateWrapper.appendChild(scaleWrapper);
                document.body.appendChild(translateWrapper);

                // Trigger translateY animation
                requestAnimationFrame(() => {
                    translateWrapper.style.transform = `rotate(${angle}deg) translateY(400%)`;
                });

                setTimeout(() => {
                    if (document.body.contains(translateWrapper)) {
                        document.body.removeChild(translateWrapper);
                    }
                }, 700);
            });
        };

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return null;
};

export default ClickRaysAnimation;
