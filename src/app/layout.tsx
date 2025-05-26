import type React from "react";
import "./globals.css";
import CursorAnimation from "@/components/ui/cursor-animation";
import Preloader from "@/components/preloader";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
