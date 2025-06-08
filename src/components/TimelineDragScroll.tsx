"use client";

import React, { useRef, useEffect, useState } from "react";

interface TimelineItem {
    id: number;
    title: string;
    year: string;
    description: string;
    color: string;
}

const timelineData: TimelineItem[] = [
    {
        id: 1,
        title: "Project Alpha",
        year: "2020",
        description: "Started the first major initiative",
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "Milestone Beta",
        year: "2021",
        description: "Achieved significant breakthrough",
        color: "bg-green-500",
    },
    {
        id: 3,
        title: "Launch Gamma",
        year: "2022",
        description: "Product launch and market entry",
        color: "bg-purple-500",
    },
    {
        id: 4,
        title: "Expansion Delta",
        year: "2023",
        description: "Global expansion phase",
        color: "bg-red-500",
    },
    {
        id: 5,
        title: "Innovation Epsilon",
        year: "2024",
        description: "Next-gen technology integration",
        color: "bg-yellow-500",
    },
    {
        id: 6,
        title: "Future Zeta",
        year: "2025",
        description: "Vision for the future",
        color: "bg-pink-500",
    },
];

const TimelineDragScroll: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragElementRef = useRef<HTMLDivElement>(null);
    const timelineStripRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Timeline configuration
    const timelineHeight = 3000;
    const timelineStartY = 300;
    const timelineEndY = timelineStartY + timelineHeight;

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) {
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (scrollY >= timelineStartY && scrollY <= timelineEndY) {
                // Active timeline section - fixed position
                const progress = (scrollY - timelineStartY) / timelineHeight;
                setScrollProgress(progress);

                if (dragElementRef.current) {
                    dragElementRef.current.style.position = "fixed";
                    dragElementRef.current.style.top = "50%";
                    dragElementRef.current.style.left = "50%";
                    dragElementRef.current.style.transform =
                        "translate(-50%, -50%)";
                    dragElementRef.current.style.zIndex = "1000";
                    dragElementRef.current.style.opacity = "1";
                    dragElementRef.current.style.visibility = "visible";
                }

                // Move timeline strip (reversed: more scroll = more items visible)
                if (timelineStripRef.current) {
                    const maxTranslation = Math.max(
                        0,
                        timelineStripRef.current.scrollWidth -
                            window.innerWidth +
                            200
                    );
                    const translation = (1 - progress) * maxTranslation;
                    timelineStripRef.current.style.transform = `translateX(-${translation}px)`;
                }
            } else {
                // Before or after timeline section - static position in document flow
                // Timeline element NEVER disappears, just changes position
                if (dragElementRef.current) {
                    dragElementRef.current.style.position = "static";
                    dragElementRef.current.style.top = "auto";
                    dragElementRef.current.style.left = "auto";
                    dragElementRef.current.style.transform = "none";
                    dragElementRef.current.style.zIndex = "auto";
                    dragElementRef.current.style.opacity = "1";
                    dragElementRef.current.style.visibility = "visible";
                }

                // Set timeline strip position based on scroll location
                if (timelineStripRef.current) {
                    if (scrollY < timelineStartY) {
                        // Before timeline - show first items
                        timelineStripRef.current.style.transform =
                            "translateX(0px)";
                        setScrollProgress(0);
                    } else {
                        // After timeline - show last items and maintain final state
                        const maxTranslation = Math.max(
                            0,
                            timelineStripRef.current.scrollWidth -
                                window.innerWidth +
                                200
                        );
                        timelineStripRef.current.style.transform = `translateX(-${maxTranslation}px)`;
                        setScrollProgress(1);
                    }
                }
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (!dragElementRef.current?.contains(e.target as Node)) {
                return;
            }

            setIsDragging(true);
            setDragStartX(e.clientX);
            e.preventDefault();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !dragElementRef.current) {
                return;
            }

            const deltaX = e.clientX - dragStartX;
            const dragSensitivity = 5; // Adjust this to control drag sensitivity

            // Convert horizontal drag to scroll (reversed: drag right = scroll down)
            const newScrollY = window.scrollY - deltaX * dragSensitivity;

            // Only scroll if we're in the timeline section, otherwise clamp to boundaries
            const currentScrollY = window.scrollY;
            if (
                currentScrollY >= timelineStartY &&
                currentScrollY <= timelineEndY
            ) {
                const clampedScrollY = Math.max(
                    timelineStartY,
                    Math.min(timelineEndY, newScrollY)
                );
                window.scrollTo(0, clampedScrollY);
            }

            setDragStartX(e.clientX);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (!dragElementRef.current?.contains(e.target as Node)) {
                return;
            }

            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            e.preventDefault();
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging || !dragElementRef.current) {
                return;
            }

            const deltaX = e.touches[0].clientX - dragStartX;
            const dragSensitivity = 3;

            // Convert horizontal drag to scroll (reversed: drag right = scroll down)
            const newScrollY = window.scrollY - deltaX * dragSensitivity;

            // Only scroll if we're in the timeline section, otherwise clamp to boundaries
            const currentScrollY = window.scrollY;
            if (
                currentScrollY >= timelineStartY &&
                currentScrollY <= timelineEndY
            ) {
                const clampedScrollY = Math.max(
                    timelineStartY,
                    Math.min(timelineEndY, newScrollY)
                );
                window.scrollTo(0, clampedScrollY);
            }

            setDragStartX(e.touches[0].clientX);
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        // Add event listeners
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchstart", handleTouchStart, {
            passive: false,
        });
        window.addEventListener("touchmove", handleTouchMove, {
            passive: false,
        });
        window.addEventListener("touchend", handleTouchEnd);

        // Initial scroll check
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [
        isClient,
        isDragging,
        dragStartX,
        timelineStartY,
        timelineEndY,
        timelineHeight,
    ]);

    if (!isClient) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative">
            {/* Content before timeline */}
            <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        Timeline Drag Scroll
                    </h1>
                    <p className="mb-8 text-lg text-gray-600">
                        Scroll down to see the interactive timeline
                    </p>
                    <div className="animate-bounce">
                        <svg
                            className="mx-auto h-6 w-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Timeline drag element - now always visible and part of document flow */}
            <div className="bg-gray-50 py-8">
                <div
                    ref={dragElementRef}
                    className="timeline-dragger mx-auto max-w-4xl px-4"
                    style={{
                        userSelect: "none",
                        cursor: isDragging ? "grabbing" : "grab",
                        transition: "all 0.3s ease",
                    }}
                >
                    {/* Drag handle */}
                    <div className="mb-4 rounded-lg border-2 border-gray-300 bg-white p-4 shadow-xl transition-colors hover:border-blue-400">
                        <div className="flex items-center justify-center">
                            <div className="mr-2 h-1 w-8 rounded-full bg-gray-400"></div>
                            <span className="text-sm font-medium text-gray-600">
                                {scrollProgress === 0
                                    ? "Scroll down or drag right to start timeline"
                                    : scrollProgress === 1
                                      ? "Timeline complete - scroll up or drag left to go back"
                                      : "Drag horizontally to navigate timeline"}
                            </span>
                            <div className="ml-2 h-1 w-8 rounded-full bg-gray-400"></div>
                        </div>
                        <div className="mt-2 text-center text-xs text-gray-500">
                            Progress: {Math.round(scrollProgress * 100)}%
                        </div>
                    </div>

                    {/* Timeline strip */}
                    <div className="overflow-hidden">
                        <div
                            ref={timelineStripRef}
                            className="flex items-center space-x-8 rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 ease-out"
                            style={{ width: "max-content" }}
                        >
                            {timelineData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="relative flex min-w-[200px] flex-col items-center"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className={`h-6 w-6 ${item.color} z-10 mb-4 rounded-full border-2 border-white shadow-lg`}
                                    ></div>

                                    {/* Timeline line */}
                                    {index < timelineData.length - 1 && (
                                        <div className="absolute top-3 left-1/2 h-0.5 w-32 translate-x-3 transform bg-gray-300"></div>
                                    )}

                                    {/* Timeline content */}
                                    <div className="rounded-lg bg-gray-50 p-4 text-center shadow-sm transition-shadow hover:shadow-md">
                                        <div className="mb-1 text-sm font-bold text-gray-500">
                                            {item.year}
                                        </div>
                                        <div className="mb-2 text-lg font-semibold text-gray-800">
                                            {item.title}
                                        </div>
                                        <div className="text-sm leading-relaxed text-gray-600">
                                            {item.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for scroll distance */}
            <div
                className="bg-gradient-to-b from-gray-100 to-gray-200"
                style={{ height: `${timelineHeight + 600}px` }}
            >
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-800">
                            Interactive Timeline Section
                        </h2>
                        <p className="text-lg text-gray-600">
                            The timeline above follows your scroll and responds
                            to horizontal drag
                        </p>
                    </div>

                    {/* Content markers */}
                    <div className="space-y-32">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div
                                key={i}
                                className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md"
                            >
                                <h3 className="mb-4 text-2xl font-semibold">
                                    Scroll Section {i + 1}
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    This content demonstrates how the timeline
                                    moves as you scroll through this section.
                                    You can also drag the timeline horizontally
                                    to navigate through the content.
                                </p>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                                        style={{
                                            width: `${Math.min(100, ((i + 1) / 10) * 100)}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content after timeline */}
            <div className="flex h-screen items-center justify-center bg-gradient-to-b from-green-100 to-green-200">
                <div className="text-center">
                    <h2 className="mb-4 text-4xl font-bold text-gray-800">
                        Timeline Complete
                    </h2>
                    <p className="text-lg text-gray-600">
                        The timeline has returned to normal document flow
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimelineDragScroll;
