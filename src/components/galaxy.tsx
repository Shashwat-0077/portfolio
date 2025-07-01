"use client";
import { IconType } from "react-icons";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import React, { useEffect, useRef } from "react";

import { ringConfigs } from "@/lib/constants";

gsap.registerPlugin(Observer);

// NOTE: New thing i learned, in the SVG the order matters to render dom, zIndex is not respected in SVGs like it is in HTML.

const Ring = ({
    id,
    radius,
    center,
    ringStrokeColor,
    ringStrokeWidth = 4,
    items = [],
    duration = 50,
    reversed = false,
    ringDasharray = "2,10",
    ringDashoffset = "0",
    zIndex,
    iconSize = 40, // Default icon size
}: {
    id: string;
    radius: number;
    center: number;
    zIndex: number;
    ringStrokeColor?: string;
    ringStrokeWidth?: number;
    items?: IconType[];
    duration?: number;
    reversed?: boolean;
    ringDasharray?: string;
    ringDashoffset?: string;
    iconSize?: number;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rotationTweenRef = useRef<gsap.core.Tween | null>(null);
    const observersRef = useRef<Observer[]>([]);

    const x = center;
    const y = center - radius;
    const offset = 60;

    const circleCenter = radius + offset / 2;
    const circleRadius = radius;

    const angleStep = (2 * Math.PI) / items.length;

    useEffect(() => {
        const rotationObj = { rotation: reversed ? 360 : 0 };

        // Create the rotation tween
        rotationTweenRef.current = gsap.to(rotationObj, {
            rotation: reversed ? 0 : 360,
            duration: duration,
            ease: "linear",
            repeat: -1,
            onUpdate: () => {
                // Apply rotation to the main container
                gsap.set(`#${id}-items`, {
                    rotation: rotationObj.rotation,
                    transformOrigin: "center center",
                });

                // Counter-rotate each individual item to keep them upright
                items.forEach((_, i) => {
                    gsap.set(`#${id}-item-${i}`, {
                        rotation: -rotationObj.rotation,
                        transformOrigin: "center center",
                    });
                });
            },
        });

        // Create observers for each item to pause/resume rotation on hover
        items.forEach((_, i) => {
            const observer = Observer.create({
                target: `#${id}-item-${i}`,
                type: "pointer",
                onHover: (): void => {
                    if (rotationTweenRef.current) {
                        rotationTweenRef.current.pause();
                    }
                },
                onHoverEnd: (): void => {
                    if (rotationTweenRef.current) {
                        rotationTweenRef.current.resume();
                    }
                },
            });
            observersRef.current.push(observer);
        });

        // Cleanup function
        return (): void => {
            // Kill all observers for this ring
            observersRef.current.forEach((observer) => observer.kill());
            observersRef.current = [];

            if (rotationTweenRef.current) {
                rotationTweenRef.current.kill();
            }
        };
    }, [items, id, duration, reversed]);

    return (
        <>
            <path
                id={id}
                d={`M ${x},${y} A ${radius},${radius} 0 1,1 ${x - 0.001},${y}`}
                fill="none"
                stroke={ringStrokeColor ?? "#fff"}
                strokeWidth={ringStrokeWidth}
                strokeDasharray={ringDasharray}
                strokeDashoffset={ringDashoffset}
                style={{ zIndex: -1 }}
            />
            <foreignObject
                x={x - radius - offset / 2}
                y={y - offset / 2}
                width={radius * 2 + offset}
                height={radius * 2 + offset}
                className="pointer-events-auto rounded-full"
                style={{
                    zIndex: zIndex,
                }}
            >
                <div
                    ref={containerRef}
                    className="relative h-full w-full rounded-full"
                    id={`${id}-items`}
                    style={{
                        zIndex: 1,
                    }}
                >
                    {items.map((Item, i) => {
                        const width = iconSize;
                        const height = iconSize;
                        const angle = i * angleStep;
                        const itemX =
                            circleCenter +
                            circleRadius * Math.cos(angle) -
                            width / 2;
                        const itemY =
                            circleCenter +
                            circleRadius * Math.sin(angle) -
                            height / 2;

                        return Item ? (
                            <Item
                                key={i}
                                id={`${id}-item-${i}`}
                                className="bg-background absolute"
                                style={{
                                    left: `${itemX}px`,
                                    top: `${itemY}px`,
                                    width: `${width}px`,
                                    height: `${height}px`,
                                    zIndex: 1,
                                }}
                            />
                        ) : (
                            <div
                                key={i}
                                id={`${id}-item-${i}`}
                                className="bg-background absolute"
                                style={{
                                    left: `${itemX}px`,
                                    top: `${itemY}px`,
                                    width: `${width}px`,
                                    height: `${height}px`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span className="text-gray-500">null</span>
                            </div>
                        );
                    })}
                </div>
            </foreignObject>
        </>
    );
};

const Galaxy = ({
    size = 1400, // Default size for the galaxy
}: {
    size: number;
}) => {
    const iconSize = 40;

    return (
        <div
            className="absolute top-[calc(50%-140px)] left-[calc(50%+18px)] -translate-x-1/2 -translate-y-1/2 opacity-80"
            style={{
                width: `${size}px`,
                height: `${size}px`,
                flexShrink: 0, // Prevent shrinking on small screens
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none"
            >
                {ringConfigs.map((config) => (
                    <Ring
                        key={config.id}
                        id={config.id}
                        zIndex={config.zIndex}
                        radius={config.radius}
                        center={500}
                        ringStrokeColor="rgba(255, 255, 255, 0.5)"
                        ringStrokeWidth={1}
                        duration={config.duration}
                        ringDasharray="3 20"
                        reversed={config.reversed}
                        iconSize={iconSize}
                        items={config.items}
                    />
                ))}
            </svg>
        </div>
    );
};

export default React.memo(Galaxy);
