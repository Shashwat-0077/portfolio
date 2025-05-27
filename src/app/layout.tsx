import type React from "react";
import "./globals.css";
import CursorAnimation from "@/components/ui/cursor-animation";
import Preloader from "@/components/preloader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

    return (
        <html lang="en">
            <body>
                {/* Preloader - shows on first visit */}
                <Preloader />

                {/* Navigation persists across all pages */}
                <CursorAnimation />

                {/* Only the main content area will transition */}
                <main className="page-content">{children}</main>
            </body>
        </html>
    );
}
