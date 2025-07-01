import { ArrowUpRight, Copyright } from "lucide-react";
import Image from "next/image";
import React from "react";

import TransitionLink from "@/components/transition-link";

const Footer = () => {
    return (
        <div className="bg-background border-muted relative grid w-full overflow-hidden border-t md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {/* Logo */}
            <div className="relative hidden max-h-[800px] w-full overflow-hidden select-none md:block">
                <Image
                    src={"/logo-outline.svg"}
                    className="pointer-events-none relative right-0 scale-120 select-none md:right-20 md:scale-140 lg:right-40 lg:scale-150"
                    alt="logo"
                    width={1000}
                    height={1000}
                />
            </div>

            {/* Main Content */}
            <div className="w-full py-16 pr-10 pl-10 md:pl-0">
                {/* Contact Section */}
                <div className="mb-12 lg:mb-20">
                    <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:mb-7 lg:text-6xl">
                        Contact me
                    </h1>
                    <div className="border-muted bg-background flex w-full max-w-xl items-center gap-2 rounded-full border p-2">
                        <input
                            type="text"
                            className="w-full py-2 pl-4 text-sm outline-none lg:py-1 lg:pl-5 lg:text-base"
                            placeholder="Enter your email address"
                        />
                        <ArrowUpRight
                            size={24}
                            className="mr-2 shrink-0 sm:size-6 lg:mr-3 lg:size-[30px]"
                        />
                    </div>
                </div>

                {/* Links Section */}
                <div className="flex gap-8 sm:gap-16 lg:gap-52">
                    {/* Routes */}
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl underline lg:text-2xl">
                            Routes
                        </h2>
                        <div className="flex flex-col gap-3 lg:gap-4">
                            <TransitionLink
                                href="/"
                                className="transition-opacity hover:opacity-70"
                            >
                                Home
                            </TransitionLink>
                            <TransitionLink
                                href="/skills"
                                className="transition-opacity hover:opacity-70"
                            >
                                Skills
                            </TransitionLink>
                            <TransitionLink
                                href="/projects"
                                className="transition-opacity hover:opacity-70"
                            >
                                Projects
                            </TransitionLink>
                            <TransitionLink
                                href="/contact"
                                className="transition-opacity hover:opacity-70"
                            >
                                Contact
                            </TransitionLink>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex-1">
                        <h2 className="mb-4 text-xl underline lg:text-2xl">
                            Socials
                        </h2>
                        <div className="flex flex-col gap-3 lg:gap-4">
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-70"
                            >
                                Github
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-70"
                            >
                                Linkedin
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-70"
                            >
                                Mail
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-70"
                            >
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="absolute right-2 bottom-2 flex items-center gap-1 text-xs opacity-70 sm:right-4 sm:bottom-4 sm:gap-2 sm:text-sm">
                    <Copyright size={14} className="sm:size-4" />
                    <span>
                        {new Date().getFullYear()} Shashwat Gupta. All rights
                        reserved
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;
