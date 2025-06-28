"use client";

import { GitPullRequestArrow, GitCommit, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { useBubbleStore } from "@/stores/bubble-store";
import { useLatestCommit } from "@/hooks/use-supabase-realtime";
import { formatTimeDifference, getTimeDifference } from "@/utils/dates";

import CloudBubble from "./CloudBubble";
import { Button } from "./button";

const LatestCommit = () => {
    const id = "latest-commit-bubble";
    const isExpanded = useBubbleStore((state) =>
        state.isCurrentBubbleExpanded(id)
    );
    const { data, loading } = useLatestCommit();

    // Refs for GSAP animations
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const commitInfoRef = useRef<HTMLDivElement>(null);
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
                    scale: 0.95,
                    y: 10,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    delay: 0.2,
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

    // Animate commit data when it loads
    useEffect(() => {
        if (data && !loading && isExpanded) {
            // Animate all commit info elements together
            if (commitInfoRef.current) {
                const allElements = commitInfoRef.current.children;
                gsap.fromTo(
                    allElements,
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.2,
                        ease: "power2.out",
                        delay: 0.1,
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
            position={[75, 15]}
            shrunkSize={80}
            expandedSize={[400, 220]}
            Icon={<GitPullRequestArrow strokeWidth={2} size={30} />}
            anchorPoint="top-right"
        >
            {isExpanded && (
                <div ref={contentRef} className="flex h-full flex-col p-5">
                    <div
                        ref={headerRef}
                        className="mb-4 flex items-center justify-between pt-1.5"
                    >
                        <div className="flex items-center gap-3">
                            <h3 className="pl-12 text-lg font-semibold text-white/90">
                                Working on
                            </h3>
                        </div>
                        {data && (
                            <div
                                ref={liveIndicatorRef}
                                className="flex items-center justify-center gap-2"
                            >
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-500 opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-purple-500"></span>
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
                        <div
                            ref={loadingRef}
                            className="flex flex-1 flex-col space-y-3"
                        >
                            <div className="h-5 w-3/4 animate-pulse rounded-md bg-white/10"></div>
                            <div className="h-4 w-1/2 animate-pulse rounded-md bg-white/10"></div>
                            <div className="h-3 w-1/3 animate-pulse rounded-md bg-white/10"></div>
                        </div>
                    ) : data ? (
                        <div className="flex flex-1 flex-col">
                            <div
                                ref={commitInfoRef}
                                className="flex-1 space-y-3"
                            >
                                <h4 className="line-clamp-1 text-base leading-tight font-semibold text-white/90">
                                    {data.message}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-white/70">
                                        {data.repo_name}
                                    </span>
                                    <span className="text-white/50">•</span>
                                    <code className="rounded bg-white/10 px-2 py-1 font-mono text-xs text-white/60">
                                        {data.hash.substring(0, 7)}
                                    </code>
                                </div>
                                <p className="text-xs text-white/50">
                                    Committed{" "}
                                    {formatTimeDifference(
                                        getTimeDifference(data.commit_at)
                                    )}{" "}
                                    ago
                                </p>
                            </div>

                            <div ref={buttonRef} className="mt-auto pt-3">
                                <Button
                                    asChild
                                    className="h-9 w-full !border-white/10 !bg-white/1 text-xs font-medium !text-white backdrop-blur-sm transition-all duration-200 hover:!bg-white/25"
                                    size="sm"
                                    variant="outline"
                                >
                                    <a
                                        href={data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink size={14} />
                                        View Commit
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
                                <GitCommit
                                    size={24}
                                    className="text-white/40"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="font-medium text-white/70">
                                    No recent commits
                                </p>
                                <p className="text-xs text-white/50">
                                    Latest commits will appear here
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </CloudBubble>
    );
};

export default LatestCommit;
