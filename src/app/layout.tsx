import type React from "react";
import "./globals.css";
import Dock from "@/components/ui/dock";
import CursorAnimation from "@/components/ui/cursor-animation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                {/* Navigation persists across all pages */}
                <Dock />
                <CursorAnimation />

                {/* Only the main content area will transition */}
                <main className="page-content">{children}</main>
            </body>
        </html>
    );
}
