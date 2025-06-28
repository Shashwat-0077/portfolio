"use client";

import { Code, Monitor, Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { useBubbleStore } from "@/stores/bubble-store";
import { useWakatimeStats } from "@/hooks/use-supabase-realtime";
import { formatTimeDifference, getTimeDifference } from "@/utils/dates";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";

import CloudBubble from "./CloudBubble";

const WakatimeStats = () => {
    const id = "wakatime-stats-bubble";
    const isExpanded = useBubbleStore((state) =>
        state.isCurrentBubbleExpanded(id)
    );
    const { data, loading } = useWakatimeStats();

    // Refs for GSAP animations
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const statsInfoRef = useRef<HTMLDivElement>(null);
    const totalTimeRef = useRef<HTMLDivElement>(null);
    const statsItemsRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const emptyStateRef = useRef<HTMLDivElement>(null);
    const liveIndicatorRef = useRef<HTMLDivElement>(null);

    // Animate content when expanded
    useEffect(() => {
        if (isExpanded && contentRef.current) {
            gsap.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    scale: 0.95,
                    y: 10,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    delay: 0.3,
                    ease: "back.out(1.4)",
                }
            );
        }
    }, [isExpanded]);

    // Animate header elements
    useEffect(() => {
        if (isExpanded && headerRef.current) {
            const headerElements = headerRef.current.children;
            gsap.fromTo(
                headerElements,
                {
                    y: -20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.2,
                }
            );
        }
    }, [isExpanded]);

    // Animate loading state
    useEffect(() => {
        if (loading && loadingRef.current && isExpanded) {
            const loadingElements =
                loadingRef.current.querySelectorAll(".animate-pulse");
            gsap.fromTo(
                loadingElements,
                {
                    opacity: 0,
                    x: -20,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, [loading, isExpanded]);

    // Animate stats data when it loads
    useEffect(() => {
        if (data && !loading && isExpanded) {
            // Animate total time with special emphasis
            if (totalTimeRef.current) {
                gsap.fromTo(
                    totalTimeRef.current.children,
                    {
                        y: 30,
                        opacity: 0,
                        scale: 0.8,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        delay: 0.2,
                    }
                );
            }

            // Animate stats items (language, editor, OS) with cool stagger
            if (statsItemsRef.current) {
                const statsItems =
                    statsItemsRef.current.querySelectorAll(".stats-item");
                gsap.fromTo(
                    statsItems,
                    {
                        scale: 0,
                        y: 20,
                        opacity: 0,
                        rotateX: -90,
                    },
                    {
                        scale: 1,
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.5,
                        stagger: 0.15,
                        ease: "back.out(1.7)",
                        delay: 0.5,
                    }
                );
            }

            // Live indicator animation
            if (liveIndicatorRef.current) {
                gsap.fromTo(
                    liveIndicatorRef.current,
                    {
                        scale: 0,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        delay: 0.4,
                    }
                );
            }
        }
    }, [data, loading, isExpanded]);

    // Animate empty state
    useEffect(() => {
        if (!data && !loading && isExpanded && emptyStateRef.current) {
            const emptyElements = emptyStateRef.current.children;
            gsap.fromTo(
                emptyElements,
                {
                    y: 20,
                    opacity: 0,
                    scale: 0.9,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.15,
                    ease: "back.out(1.4)",
                    delay: 0.2,
                }
            );
        }
    }, [data, loading, isExpanded]);

    return (
        <CloudBubble
            uniqueId={id}
            position={[80, 10]}
            shrunkSize={80}
            expandedSize={[400, 170]}
            Icon={<Code strokeWidth={2} size={35} />}
            anchorPoint="bottom-right"
        >
            {isExpanded && (
                <TooltipProvider delayDuration={300}>
                    <div ref={contentRef} className="flex h-full flex-col p-5">
                        <div
                            ref={headerRef}
                            className="mb-4 flex items-center justify-between pt-1.5"
                        >
                            <div className="flex items-center gap-3">
                                <h3 className="pl-12 text-lg font-semibold text-white/90">
                                    Dev Stats
                                </h3>
                            </div>
                            {data && (
                                <div
                                    ref={liveIndicatorRef}
                                    className="flex items-center justify-center gap-2"
                                >
                                    <span className="relative flex size-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                                    </span>
                                    <span className="pt-0.5 text-xs text-white/60">
                                        {formatTimeDifference(
                                            getTimeDifference(data.updated_at)
                                        )}{" "}
                                        ago
                                    </span>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div ref={loadingRef} className="flex-1 space-y-3">
                                <div className="h-8 w-full animate-pulse rounded-md bg-white/10"></div>
                                <div className="h-6 w-3/4 animate-pulse rounded-md bg-white/10"></div>
                                <div className="h-6 w-2/3 animate-pulse rounded-md bg-white/10"></div>
                                <div className="h-6 w-1/2 animate-pulse rounded-md bg-white/10"></div>
                            </div>
                        ) : data ? (
                            <div ref={statsInfoRef} className="flex-1">
                                <div className="space-y-4">
                                    <div
                                        ref={totalTimeRef}
                                        className="flex items-baseline gap-3"
                                    >
                                        <span className="font-mono text-3xl font-bold text-white">
                                            {data.total_time}
                                        </span>
                                        <span className="text-sm text-white/60">
                                            coded today
                                        </span>
                                    </div>

                                    <div
                                        ref={statsItemsRef}
                                        className="flex items-center gap-6 pt-2"
                                    >
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="stats-item flex cursor-help items-center gap-2">
                                                    <Code
                                                        size={16}
                                                        className="text-white/70"
                                                    />
                                                    <span className="text-sm font-medium text-white">
                                                        {data.top_language}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="bottom"
                                                className="rounded-lg border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-lg"
                                                sideOffset={8}
                                            >
                                                <p className="text-xs font-medium">
                                                    Most used programming
                                                    language
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="stats-item flex cursor-help items-center gap-2">
                                                    <Settings
                                                        size={16}
                                                        className="text-white/70"
                                                    />
                                                    <span className="text-sm font-medium text-white">
                                                        {data.editor}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="bottom"
                                                className="rounded-lg border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-lg"
                                                sideOffset={8}
                                            >
                                                <p className="text-xs font-medium">
                                                    Primary code editor
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="stats-item flex cursor-help items-center gap-2">
                                                    <Monitor
                                                        size={16}
                                                        className="text-white/70"
                                                    />
                                                    <span className="text-sm font-medium text-white">
                                                        {data.os}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                side="bottom"
                                                className="rounded-lg border-gray-200 bg-white px-3 py-2 text-gray-900 shadow-lg"
                                                sideOffset={8}
                                            >
                                                <p className="text-xs font-medium">
                                                    Operating system
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                ref={emptyStateRef}
                                className="flex flex-1 flex-col items-center justify-center space-y-3 text-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                    <Code size={24} className="text-white/40" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium text-white/70">
                                        No coding stats
                                    </p>
                                    <p className="text-xs text-white/50">
                                        Your WakaTime data will appear here
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </TooltipProvider>
            )}
        </CloudBubble>
    );
};

export default WakatimeStats;
