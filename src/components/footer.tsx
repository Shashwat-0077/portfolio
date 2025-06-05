import { ArrowUpRight, Copyright } from "lucide-react";
import Image from "next/image";
import React from "react";

import TransitionLink from "@/components/transition-link";

const Footer = () => {
    return (
        <div className="bg-background border-muted relative flex w-full border-t">
            <div className="shrink-0 grow-0">
                <Image
                    src={"/footer-logo.svg"}
                    alt="logo"
                    width={1000}
                    height={1000}
                />
            </div>
            <div className="w-full px-32 pt-32">
                <h1 className="text-6xl">Contact me</h1>
                <div className="border-muted bg-background mt-7 flex w-full max-w-xl items-center gap-2 rounded-full border p-2">
                    <input
                        type="text"
                        className="w-full py-1 pl-5 outline-none"
                        placeholder="Enter your email address"
                    />
                    <ArrowUpRight size={30} className="mr-3" />
                </div>
                <div className="mt-20 flex gap-52">
                    <div>
                        <div>
                            <h2 className="text-2xl underline">Routes</h2>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                            <div>
                                <TransitionLink href="/">Home</TransitionLink>
                            </div>
                            <div>
                                <TransitionLink href="/skills">
                                    Skills
                                </TransitionLink>
                            </div>
                            <div>
                                <TransitionLink href="/projects">
                                    Projects
                                </TransitionLink>
                            </div>
                            <div>
                                <TransitionLink href="/contact">
                                    Contact
                                </TransitionLink>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 className="text-2xl underline">Socials</h2>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                            <div>Github</div>
                            <div>Linkedin</div>
                            <div>Mail</div>
                            <div>Instagram</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-2 bottom-2 flex gap-2">
                <Copyright /> {new Date().getFullYear()} Shashwat Gupta. All
                rights reserved
            </div>
        </div>
    );
};

export default Footer;
