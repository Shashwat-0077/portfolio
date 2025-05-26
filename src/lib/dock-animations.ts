import gsap from "gsap";

export const animateDockIn = async (
    dock: HTMLElement,
    inactiveLinks: HTMLElement[]
) => {
    return new Promise((resolve) => {
        const tl = gsap.timeline();

        gsap.set(dock, {
            opacity: 0.5,
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
                opacity: 1,
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
                    onComplete: resolve,
                },
                "<0.2"
            );
    });
};

export const animateDockOut = (
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
                opacity: 0.5,
                boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: resolve,
            });
    });
};
