import gsap from "gsap";

export const DockAnimations = {
    animateIn: async (dock: HTMLElement, inactiveLinks: HTMLElement[]) => {
        return new Promise((resolve) => {
            const tl = gsap.timeline();

            gsap.set(dock, {
                filter: "brightness(0.5)",
                padding: 0,
                y: 10,
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            });

            gsap.set(inactiveLinks, {
                width: 0,
            });
            // TODO: Need tp implement a better animation for the dock
            // Animation sequence
            tl
                // Show dock first
                .to(dock, {
                    filter: "brightness(1)",
                    y: 0,
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    duration: 0.3,
                    ease: "power2.out",
                    delay: 1.5,
                })
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
                            dock.style.pointerEvents = "auto";
                            resolve({
                                done: true,
                            });
                        },
                    },
                    "<0.2"
                );
        });
    },
    animateOut: (
        dock: HTMLElement,
        inactiveLinks: HTMLElement[]
    ): Promise<void> => {
        dock.style.pointerEvents = "none";

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
                    y: 10,
                    filter: "brightness(0.5)",
                    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: resolve,
                });
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
                    opacity: 0.2,
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
