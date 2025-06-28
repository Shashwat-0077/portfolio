"use client";
import { Music } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { useBubbleStore } from "@/stores/bubble-store";
import { useNowPlaying } from "@/hooks/use-supabase-realtime";
import { formatTimeDifference, getTimeDifference } from "@/utils/dates";

import CloudBubble from "./CloudBubble";
import { Button } from "./button";

const NowListening = () => {
    const id = "now-playing-bubble";
    const isExpanded = useBubbleStore((state) =>
        state.isCurrentBubbleExpanded(id)
    );
    const { data, loading } = useNowPlaying();

    // Refs for GSAP animations
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const albumArtRef = useRef<HTMLDivElement>(null);
    const songInfoRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
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
                    scale: 0.9,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)",
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
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }
    }, [loading, isExpanded]);

    // Animate song data when it loads
    useEffect(() => {
        if (data && !loading && isExpanded) {
            // Album art animation
            if (albumArtRef.current) {
                gsap.fromTo(
                    albumArtRef.current,
                    {
                        scale: 0,
                        rotation: -10,
                        opacity: 0,
                    },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        delay: 0.2,
                    }
                );
            }

            // Song info animation
            if (songInfoRef.current) {
                const infoElements = songInfoRef.current.children;
                gsap.fromTo(
                    infoElements,
                    {
                        x: 30,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "power2.out",
                        delay: 0.3,
                    }
                );
            }

            // Button animation
            if (buttonRef.current) {
                gsap.fromTo(
                    buttonRef.current,
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        delay: 0.6,
                    }
                );
            }

            // Live indicator pulse animation
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
    }, [data, loading, isExpanded]);

    return (
        <CloudBubble
            uniqueId={id}
            position={[70, 80]}
            shrunkSize={80}
            expandedSize={[400, 210]}
            Icon={<Music strokeWidth={2} size={35} />}
            anchorPoint="bottom-right"
        >
            {isExpanded && (
                <div ref={contentRef} className="flex h-full flex-col p-5">
                    <div
                        ref={headerRef}
                        className="mb-4 flex items-center justify-between pt-1"
                    >
                        <div className="flex items-center gap-3">
                            <h3 className="pl-12 text-lg font-semibold text-white/90">
                                Now listening
                            </h3>
                        </div>
                        {data && (
                            <div
                                ref={liveIndicatorRef}
                                className="flex items-center justify-center gap-2"
                            >
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
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
                        <div ref={loadingRef} className="flex flex-1 gap-4">
                            <div className="h-20 w-20 animate-pulse rounded-xl bg-white/10"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-5 w-3/4 animate-pulse rounded-md bg-white/10"></div>
                                <div className="h-4 w-1/2 animate-pulse rounded-md bg-white/10"></div>
                                <div className="h-3 w-1/3 animate-pulse rounded-md bg-white/10"></div>
                            </div>
                        </div>
                    ) : data ? (
                        <div>
                            <div className="flex flex-1 gap-4">
                                <div
                                    ref={albumArtRef}
                                    className="flex-shrink-0"
                                >
                                    <Image
                                        src={data.artwork || "/placeholder.svg"}
                                        alt="Album Cover"
                                        width={80}
                                        height={80}
                                        className="rounded-xl border border-white/10 shadow-lg"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-1 flex-col justify-between">
                                    <div
                                        ref={songInfoRef}
                                        className="space-y-1"
                                    >
                                        <h4 className="truncate text-base leading-tight font-semibold text-white/90">
                                            {data.title}
                                        </h4>
                                        <p className="truncate text-sm text-white/70">
                                            {data.artist}
                                        </p>
                                        <p className="mt-1 text-xs text-white/40">
                                            {data.genre}
                                        </p>
                                        <p className="text-xs text-white/50">
                                            {data.duration}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div ref={buttonRef} className="mt-auto pt-2">
                                <Button
                                    asChild
                                    className="group relative h-10 w-full cursor-pointer overflow-hidden border border-white/20 bg-gradient-to-r from-white/5 to-white/5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300"
                                    size="sm"
                                    variant="outline"
                                >
                                    <a
                                        href={data?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-200"
                                    >
                                        <span className="z-10">
                                            Open in Apple Music
                                        </span>
                                        {/* Gradient overlay that fades in on hover */}
                                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#fa243c] to-[#e91e63] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            ref={emptyStateRef}
                            className="flex flex-1 flex-col items-center justify-center space-y-3 text-center"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                                <Music size={24} className="text-white/40" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-white/70">
                                    No song playing
                                </p>
                                <p className="text-xs text-white/50">
                                    Music will appear here when playing
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </CloudBubble>
    );
};

export default NowListening;
