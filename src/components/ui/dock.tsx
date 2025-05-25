"use client";
import { Home, User, Mail } from "lucide-react";
import TransitionLink from "@/components/transition-link";
import { ANIMATION_CONSTANTS } from "@/lib/constants";

const Dock = () => {
    return (
        <div
            data-dock
            className="fixed top-6 left-1/2 -translate-x-1/2 transform"
            style={{
                zIndex: ANIMATION_CONSTANTS.DOCK_Z_INDEX,
                transition: `transform ${ANIMATION_CONSTANTS.DOCK_HIDE_DURATION}ms ${ANIMATION_CONSTANTS.DOCK_HIDE_EASING}`,
            }}
        >
            <div className="flex items-center gap-2 rounded-full border-2 border-gray-600 bg-gray-700 px-6 py-2 shadow-lg">
                <TransitionLink
                    href="/"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-300 hover:scale-125"
                >
                    <Home className="h-6 w-6 text-white" />
                </TransitionLink>

                <TransitionLink
                    href="/about"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-300 hover:scale-125"
                >
                    <User className="h-6 w-6 text-white" />
                </TransitionLink>

                <TransitionLink
                    href="/contact"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center transition-all duration-300 hover:scale-125"
                >
                    <Mail className="h-6 w-6 text-white" />
                </TransitionLink>
            </div>
        </div>
    );
};

export default Dock;
