"use client";

import React from "react";
import { Home, User, Mail } from "lucide-react";

import TransitionLink from "@/components/ui/transition-link";
import { TooltipProvider } from "@/components/ui/tooltip";

const Dock = () => {
    return (
        <div
            data-dock
            className="fixed left-1/2 top-6 z-50 -translate-x-1/2 transform"
        >
            <TooltipProvider>
                <div className="flex items-center gap-2 rounded-full border-2 border-[#737373] bg-[#3C3C3C] px-10 shadow-deep">
                    <TransitionLink
                        href="/"
                        className="flex h-12 w-12 items-center justify-center transition-all duration-300 hover:scale-125"
                    >
                        <Home className="h-6 w-6 text-white" />
                    </TransitionLink>

                    <TransitionLink
                        href="/about"
                        className="flex h-12 w-12 items-center justify-center transition-all duration-300 hover:scale-125"
                    >
                        <User className="h-6 w-6 text-white" />
                    </TransitionLink>

                    <TransitionLink
                        href="/contact"
                        className="flex h-12 w-12 items-center justify-center transition-all duration-300 hover:scale-125"
                    >
                        <Mail className="h-6 w-6 text-white" />
                    </TransitionLink>
                </div>
            </TooltipProvider>
        </div>
    );
};

export default Dock;
