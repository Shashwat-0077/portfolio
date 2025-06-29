"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useId } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

import { cn } from "@/lib/utils";
import { useBubbleStore } from "@/stores/bubble-store";

type AnchorPoints = "top-left" | "top-right" | "bottom-right" | "bottom-left";

const CloudBubble = ({
    uniqueId,
    position,
    className,
    shrunkSize,
    expandedSize,
    Icon,
    anchorPoint,
    children,
}: {
    uniqueId?: string;
    position: [number, number];
    expandedSize: [number, number];
    shrunkSize: number;
    className?: string;
    radius?: number;
    Icon?: React.ReactNode;
    anchorPoint?: AnchorPoints;
    children?: React.ReactNode;
    onChange?: (expanded: boolean) => void;
}) => {
    const cloudRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const floatAnimationRef = useRef<gsap.core.Timeline | null>(null);

    const generatedId = useId(); // Always call useId unconditionally
    const bubbleId = uniqueId ?? generatedId; // Use uniqueId if provided, otherwise fallback

    const { expandedBubbleId, setExpandedBubble } = useBubbleStore();
    const isExpanded = expandedBubbleId === bubbleId;

    useGSAP(() => {
        if (!cloudRef.current) {
            return;
        }

        const startFloatAnimation = () => {
            if (floatAnimationRef.current) {
                floatAnimationRef.current.kill();
            }

            const animate = () => {
                if (!cloudRef.current) {
                    return;
                }

                const randomInExcludedRange = () => {
                    const value = Math.random() * 5 + 5;
                    return Math.random() < 0.5 ? -value : value;
                };

                const deltaX = randomInExcludedRange();
                const deltaY = randomInExcludedRange();

                floatAnimationRef.current = gsap.timeline({
                    onComplete: animate,
                });
                floatAnimationRef.current.to(cloudRef.current, {
                    x: deltaX,
                    y: deltaY,
                    duration: 1.5 + Math.random(),
                    ease: "sine.inOut",
                });
            };

            animate();
        };

        const stopFloatAnimation = () => {
            if (floatAnimationRef.current) {
                floatAnimationRef.current.kill();
            }
        };

        const animateToExpanded = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            stopFloatAnimation();

            timelineRef.current = gsap.timeline();
            timelineRef.current
                .to(cloudRef.current, {
                    borderRadius: "20px",
                    duration: 0.2,
                    ease: "power2.out",
                })
                .to(
                    cloudRef.current,
                    {
                        width: `${expandedSize[0]}px`,
                        height: `${expandedSize[1]}px`,
                        duration: 0.5,
                        ease: "back.out(1.5)",
                    },
                    "-=0.1"
                );
        };

        const animateToCollapsed = () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            timelineRef.current = gsap.timeline();
            timelineRef.current
                .to(cloudRef.current, {
                    width: `${shrunkSize}px`,
                    height: `${shrunkSize}px`,
                    duration: 0.45,
                    ease: "back.out(1.4)",
                })
                .to(
                    cloudRef.current,
                    {
                        borderRadius: "50px",
                        duration: 0.2,
                        ease: "power2.inOut",
                    },
                    "-=0.2"
                );
            startFloatAnimation();
        };

        // Start floating animation initially
        if (!isExpanded) {
            startFloatAnimation();
        }

        // Handle expansion/collapse based on store state
        if (isExpanded) {
            animateToExpanded();
        } else {
            animateToCollapsed();
        }

        Observer.create({
            target: cloudRef.current,
            type: "touch,pointer",
            onClick: () => {
                if (isExpanded) {
                    // If already expanded, don't collapse on click within component
                    return;
                }
                // Expand this bubble (will collapse others automatically)
                setExpandedBubble(bubbleId);
            },
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
            if (floatAnimationRef.current) {
                floatAnimationRef.current.kill();
            }
        };
    }, [isExpanded, bubbleId, expandedSize, shrunkSize]);

    // Handle click outside to collapse
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                isExpanded &&
                cloudRef.current &&
                !cloudRef.current.contains(event.target as Node)
            ) {
                setExpandedBubble(null);
            }
        };

        if (isExpanded) {
            document.addEventListener("mouseup", handleClickOutside);
            document.addEventListener("touchend", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        };
    }, [isExpanded, setExpandedBubble]);

    return (
        <div
            className={cn(
                className,
                "absolute z-20 aspect-square overflow-hidden rounded-[20px] border-2 border-white/10 bg-white/5"
            )}
            style={{
                ...(anchorPoint === "top-left" && {
                    top: `${position[0]}%`,
                    left: `${position[1]}%`,
                }),
                ...(anchorPoint === "top-right" && {
                    top: `${position[0]}%`,
                    right: `${position[1]}%`,
                }),
                ...(anchorPoint === "bottom-right" && {
                    bottom: `${position[0]}%`,
                    right: `${position[1]}%`,
                }),
                ...(anchorPoint === "bottom-left" && {
                    bottom: `${position[0]}%`,
                    left: `${position[1]}%`,
                }),
                borderRadius: "50px",
                width: `${shrunkSize}px`,
                height: `${shrunkSize}px`,
                backdropFilter: "blur(10px)",
                cursor: isExpanded ? "default" : "pointer",
            }}
            ref={cloudRef}
        >
            <div
                className="absolute"
                style={{
                    top: `${shrunkSize / 2}px`,
                    left: `${shrunkSize / 2}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                {Icon}
            </div>
            {children}
        </div>
    );
};

export default CloudBubble;
