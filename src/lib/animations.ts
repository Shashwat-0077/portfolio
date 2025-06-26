"use client";

import gsap from "gsap";

export const DockAnimations = {
    animateIn: async ({
        dock,
        inactiveLinks,
        dockLid,
        onComplete = () => {},
    }: {
        dock: HTMLDivElement;
        inactiveLinks: HTMLDivElement[];
        dockLid: HTMLDivElement;
        onComplete?: () => void;
    }): Promise<void> => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                    resolve();
                },
            });

            tl.to(dock, {
                y: 0,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                duration: 0.3,
                ease: "power2.out",
                delay: 0.3, // Reduced delay since we handle timing externally
            })
                .to(dockLid, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        dockLid.style.zIndex = "-1"; // Hide the lid after animation
                    },
                })
                .to(
                    dock,
                    {
                        padding: "0 1.75rem",
                        duration: 0.3,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .to(
                    inactiveLinks,
                    {
                        width: "3rem",
                        duration: 0.3,
                        ease: "back.out(1.7)",
                    },
                    "<0.2"
                );
        });
    },
    animateOut: ({
        dock,
        inactiveLinks,
        dockLid,
        onComplete = () => {},
    }: {
        dock: HTMLElement;
        inactiveLinks: HTMLElement[];
        dockLid: HTMLElement;
        onComplete?: () => void;
    }): Promise<void> => {
        return new Promise((resolve) => {
            gsap.set(dockLid, {
                opacity: 0,
                zIndex: 10,
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                    resolve();
                },
            });

            tl.to(inactiveLinks, {
                width: 0,
                duration: 0.3,
                ease: "power2.out",
            })
                .to(
                    dockLid,
                    {
                        opacity: 0.5,
                        duration: 0.3,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .to(
                    dock,
                    {
                        padding: 0,
                        duration: 0.3,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .to(dock, {
                    y: 10,
                    duration: 0.3,
                    ease: "power2.inOut",
                });
        });
    },
    collapse: ({
        dock,
        inactiveLinks,
        onComplete = () => {},
    }: {
        dock: HTMLDivElement;
        inactiveLinks: HTMLDivElement[];
        onComplete?: () => void;
    }): Promise<void> => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                    resolve();
                },
            });

            tl.to(inactiveLinks, {
                width: 0,
                duration: 0.3,
                ease: "power2.out",
            }).to(
                dock,
                {
                    padding: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                "<"
            );
        });
    },
    expand: ({
        dock,
        inactiveLinks,
        onComplete = () => {},
    }: {
        dock: HTMLDivElement;
        inactiveLinks: HTMLDivElement[];
        onComplete?: () => void;
    }): Promise<void> => {
        return new Promise((resolve) => {
            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete();
                    resolve();
                },
            });

            tl.to(dock, {
                padding: "0 1.75rem",
                duration: 0.3,
                ease: "power2.inOut",
            }).to(
                inactiveLinks,
                {
                    width: "3rem",
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
                "<0.2"
            );
        });
    },
};

export const PageAnimations = {
    slideInAndOut: () => {
        document.documentElement.animate(
            [
                {
                    opacity: 1,
                    transform: "translateY(0)",
                },
                {
                    opacity: 0.7,
                    transform: "translateY(-35%)",
                },
            ],
            {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-old(root)",
            }
        );

        document.documentElement.animate(
            [
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0 100%)",
                },
                {
                    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                },
            ],
            {
                duration: 1500,
                easing: "cubic-bezier(0.87, 0, 0.13, 1)",
                fill: "forwards",
                pseudoElement: "::view-transition-new(root)",
            }
        );
    },
};

export const PreloaderAnimations = {
    animateOut: ({
        preloader,
        textContainer,
        setHasShown,
        setIsLoading,
    }: {
        preloader: HTMLDivElement | null;
        textContainer: HTMLDivElement | null;
        setHasShown: (value: boolean) => void;
        setIsLoading: (value: boolean) => void;
    }) => {
        if (!preloader || !textContainer) {
            return;
        }

        const tl = gsap.timeline({
            onComplete: () => {
                preloader.remove();
                setHasShown(true);
            },
        });

        // First fade out the text
        tl.to(textContainer, {
            opacity: 0.5,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => {
                setIsLoading(false);
            },
        })
            // Then slide the entire preloader up
            .to(preloader, {
                y: "-100%",
                duration: 1.2,
                ease: "power4.inOut",
                delay: 0.2,
            });
    },
};

export const ProgressBarAnimations = {
    animate: ({
        progressBar,
        width,
        totalDuration,
    }: {
        progressBar: HTMLDivElement | null;
        width: number;
        totalDuration: number;
    }) => {
        gsap.to(progressBar, {
            width: width > 400 ? "400px" : "77vw",
            duration: totalDuration / 1000, // Convert ms to seconds
            ease: "circ.inOut",
        });
    },
};
