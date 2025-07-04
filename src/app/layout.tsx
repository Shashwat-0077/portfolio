"use client";

import { useEffect } from "react";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import ReactLenis from "@studio-freight/react-lenis";

import {
    CursorAnimation,
    CursorAnimationForNonCompatibleBrowsers,
} from "@/components/ui/cursor-animation";
import Preloader from "@/components/preloader";
import Footer from "@/components/footer";
import { useAnimationStore } from "@/stores/animation-store";
import { BROWSER_SUPPORT } from "@/lib/constants";

// export const Sansation = localFont({
//     src: [
//         {
//             path: "../fonts/Sansation/Sansation-Regular.ttf",
//             weight: "400",
//             style: "normal",
//         },
//         // Add Light, LightItalic as needed
//     ],
//     display: "swap",
// });
// export const Ubuntu = localFont({
//     src: [
//         {
//             path: "../fonts/Ubuntu/Ubuntu-Regular.ttf",
//             weight: "400",
//             style: "normal",
//         },
//         // Add Light, LightItalic as needed
//     ],
//     display: "swap",
// });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isCompatible, setCompatible } = useAnimationStore();

    useEffect(() => {
        // Check if the browser supports the View Transition API
        const supportsViewTransitions = BROWSER_SUPPORT.hasViewTransitions();
        setCompatible(supportsViewTransitions);
    }, [setCompatible]);

    // =======================
    // 📝 Notes on View Transition API
    // =======================

    // IMPORTANT: Scrollbar Consistency
    // All pages must have consistent scroll behavior for view transitions to look smooth.
    // If some pages have a scrollbar and others don’t, the transition will break or look jumpy.
    // To avoid this, make sure either all pages show a scrollbar, or none do.

    // IMPORTANT: Animate All Page Content
    // Every visible component on the page should animate in (e.g., fade in, slide in, etc.).
    // If any element appears instantly without animation, the transition may look abrupt or broken.

    // HACK: Force Scrollbar + Delay Content Rendering
    // A workaround to make transitions smoother:
    // 1. Disable scroll during the transition.
    // 2. Initially don't render anything on the new page.
    // 3. Add a small invisible element at the bottom (e.g., 1px tall) to force the scrollbar to appear.
    // 4. Once the transition finishes:
    //    - Scroll to the top (likely a 1px scroll).
    //    - Animate in the hero section.
    //    - Then render the rest of the content (which is off-screen, so the user won’t notice).
    //
    // To implement this:
    // - Use a state variable (e.g., `showContent`) to hide extra content initially.
    // - Set `showContent = true` after the transition is done.

    // NOTE : i don't know why the support for view transitions provided by nextjs is not working properly, but this third-party library is working. so, no complaints here.

    // NOTE : not sure though if this will work with another view-transitions HTML element, haven't tested it yet.

    return (
        <ViewTransitions>
            <html lang="en">
                <body>
                    <Preloader />

                    {!isCompatible ? (
                        <CursorAnimationForNonCompatibleBrowsers />
                    ) : (
                        <CursorAnimation />
                    )}

                    <ReactLenis root>
                        <div>{children}</div>
                    </ReactLenis>
                    <Footer />
                </body>
            </html>
        </ViewTransitions>
    );
}
