"use client";
import Image from "next/image";
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
                className="rounded-full"
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
const Galaxy = () => {
    const iconSize = 38;
    const size = 1400;
    const avatarSize = 60;

    return (
        <div
            className="absolute 2xl:z-10"
            style={{
                width: `${size}px`, // Fixed visual width
                height: `${size}px`,
                right: "-425px",
                top: "-425px",
                flexShrink: 0, // Prevent shrinking on small screens
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 1000 1000"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <foreignObject
                    x="50%"
                    y="50%"
                    width={`${avatarSize}px`}
                    height={`${avatarSize}px`}
                    style={{
                        transform: `translate(-${avatarSize / 2}px, -${avatarSize / 2}px)`,
                        zIndex: 1,
                    }}
                >
                    <div className="rounded-full border-[2px] p-1">
                        <div className="bg-primary overflow-hidden rounded-full">
                            <Image
                                priority
                                src="/Avatar.png"
                                alt="Avatar"
                                width={avatarSize}
                                height={avatarSize}
                            />
                        </div>
                    </div>
                </foreignObject>
                {ringConfigs.map((config) => (
                    <Ring
                        key={config.id}
                        id={config.id}
                        zIndex={config.zIndex}
                        radius={config.radius}
                        center={500}
                        ringStrokeWidth={0.8}
                        ringStrokeColor="rgba(255, 255, 255, 1)"
                        duration={config.duration}
                        ringDasharray="1,10"
                        reversed={config.reversed}
                        iconSize={iconSize}
                        items={config.items}
                    />
                ))}
            </svg>
        </div>
    );
};

export default Galaxy;
