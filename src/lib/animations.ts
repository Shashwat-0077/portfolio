import gsap from "gsap";

const DOCK_BOX_SHADOW_ACTIVE = "rgba(0, 0, 0, 0.45) 0px 10px 20px -10px";
const DOCK_BOX_SHADOW_INACTIVE = "rgba(0, 0, 0, 0) 0px 0px 0px 0px";

export const DockAnimations = {
    animateIn: async ({
        dock,
        inactiveLinks,
        dockContainer,
    }: {
        dock: HTMLDivElement;
        inactiveLinks: HTMLElement[];
        dockContainer: HTMLDivElement;
    }) => {
        return new Promise((resolve) => {
            const tl = gsap.timeline();

            gsap.set(dockContainer, {
                y: 10,
                boxShadow: DOCK_BOX_SHADOW_INACTIVE,
            });

            gsap.set(dock, {
                opacity: 0.5,
                padding: 0,
            });

            gsap.set(inactiveLinks, {
                width: 0,
            });

            tl.to(dockContainer, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
                delay: 1.5,
                boxShadow: DOCK_BOX_SHADOW_ACTIVE,
            })
                .to(
                    dock,
                    {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .to(dock, {
                    padding: "0 1.75rem",
                    duration: 0.3,
                    ease: "power2.inOut",
                })
                .to(
                    inactiveLinks,
                    {
                        width: "3rem",
                        duration: 0.3,
                        ease: "back.out(1.7)",
                        onComplete: () => {
                            dockContainer.style.pointerEvents = "auto";
                            resolve({
                                done: true,
                            });
                        },
                    },
                    "<0.2"
                );
        });
    },
    animateOut: ({
        dock,
        inactiveLinks,
        dockContainer,
    }: {
        dock: HTMLDivElement;
        inactiveLinks: HTMLElement[];
        dockContainer: HTMLDivElement;
    }): Promise<void> => {
        dockContainer.style.pointerEvents = "none";

        return new Promise((resolve) => {
            const tl = gsap.timeline();

            tl.to(inactiveLinks, {
                width: 0,
                duration: 0.3,
                ease: "power2.out",
            })
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
                    opacity: 0.5,
                    duration: 0.3,
                    fill: "forwards",
                    ease: "power2.inOut",
                })
                .to(
                    dockContainer,
                    {
                        y: 10,
                        fill: "forwards",
                        duration: 0.3,
                        ease: "power2.inOut",
                        boxShadow: DOCK_BOX_SHADOW_INACTIVE,
                        onComplete: resolve,
                    },
                    "<"
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
