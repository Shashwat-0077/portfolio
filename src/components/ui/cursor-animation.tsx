"use client";

import { useEffect } from "react";

import { useAnimationStore } from "@/store/animation-store";
import { usePreloaderStore } from "@/store/preloader-store";
import { ANIMATION_CONSTANTS } from "@/lib/constants";

const CursorAnimation = () => {
    const { isCursorDisabled, isDockAnimating, isTransitioning } =
        useAnimationStore();
    const { isLoading } = usePreloaderStore();

    useEffect(() => {
        // Don't initialize cursor animation during preloader
        if (isLoading) {
            return;
        }

        // Inject keyframes into the document only once
        const styleId = "click-rays-style";
        if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
        @keyframes scaleDown {
          0% { transform: scale(1); }
          100% { transform: scale(0); }
        }
      `;
            document.head.appendChild(style);
        }

        const clearExistingAnimations = () => {
            const existingAnimations = document.querySelectorAll(
                "[data-cursor-animation]"
            );
            existingAnimations.forEach((element) => {
                if (document.body.contains(element)) {
                    document.body.removeChild(element);
                }
            });
        };

        const handleClick = (e: MouseEvent) => {
            // Check if cursor animation should be disabled
            if (isCursorDisabled || isDockAnimating || isTransitioning) {
                return;
            }

            const clickX = e.clientX - 2;
            const clickY = e.clientY - 2;
            const angles = [90, 135, 180, 225];

            angles.forEach((angle) => {
                const translateWrapper = document.createElement("div");
                translateWrapper.setAttribute("data-cursor-animation", "true");
                translateWrapper.style.cssText = `
          position: fixed;
          left: ${clickX}px;
          top: ${clickY}px;
          width: 4px;
          height: 10px;
          pointer-events: none;
          z-index: ${ANIMATION_CONSTANTS.CURSOR_ANIMATION_Z_INDEX};
          transform: rotate(${angle}deg) translateY(100%);
          transition: transform ${ANIMATION_CONSTANTS.CURSOR_CLEANUP_DELAY}ms ease-out;
        `;

                const scaleWrapper = document.createElement("div");
                scaleWrapper.style.cssText = `
          width: 100%;
          height: 100%;
          background: white;
          animation: scaleDown ${ANIMATION_CONSTANTS.CURSOR_CLEANUP_DELAY}ms forwards ease-out;
        `;

                translateWrapper.appendChild(scaleWrapper);
                document.body.appendChild(translateWrapper);

                // Trigger translateY animation
                requestAnimationFrame(() => {
                    // Double-check if still allowed before animating
                    if (
                        !isCursorDisabled &&
                        !isDockAnimating &&
                        !isTransitioning
                    ) {
                        translateWrapper.style.transform = `rotate(${angle}deg) translateY(400%)`;
                    } else {
                        // Remove if disabled state was activated
                        if (document.body.contains(translateWrapper)) {
                            document.body.removeChild(translateWrapper);
                        }
                    }
                });

                setTimeout(() => {
                    if (document.body.contains(translateWrapper)) {
                        document.body.removeChild(translateWrapper);
                    }
                }, ANIMATION_CONSTANTS.CURSOR_CLEANUP_DELAY);
            });
        };

        document.addEventListener("click", handleClick);

        // Clear animations when cursor gets disabled
        if (isCursorDisabled || isDockAnimating || isTransitioning) {
            clearExistingAnimations();
        }

        return () => {
            document.removeEventListener("click", handleClick);
            clearExistingAnimations();
        };
    }, [isCursorDisabled, isDockAnimating, isTransitioning, isLoading]);

    return null;
};

export default CursorAnimation;
