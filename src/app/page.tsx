import { ChevronDown, ChevronRight, Download } from "lucide-react";

import TransitionLink from "@/components/transition-link";
import { Button } from "@/components/ui/button";
import Dock from "@/components/ui/dock";

export default function HomePage() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-background relative flex min-h-screen flex-col items-center justify-center text-white">
                <Dock />

                <h1 className="font-jersey px-4 text-center text-[clamp(2.5rem,17vw,6rem)] leading-[0.9]">
                    Crafting <span className="text-primary">code</span>
                    <br />
                    <span className="text-primary">Like</span> poetry
                </h1>

                <p className="text-muted mt-6 mb-8 text-center">
                    I&apos;m{" "}
                    <span className="decoration-primary underline decoration-dotted decoration-2 underline-offset-4">
                        shashwat
                    </span>
                    , based in Himachal Pradesh, blending logic with creativity
                    <br />
                    to build taught-full{" "}
                    <span className="decoration-primary underline decoration-dotted decoration-2 underline-offset-4">
                        software
                    </span>
                </p>

                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        size="lg"
                        variant=""
                        className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center justify-center text-white"
                    >
                        <TransitionLink href="/projects">
                            <span>See my work</span>
                            <ChevronRight className="h-4 w-4" />
                        </TransitionLink>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        className="text-primary hover:text-primary gap-0 border-transparent bg-transparent shadow-none ring-0 hover:bg-transparent"
                        href="/contact"
                    >
                        <a
                            href="/resume.pdf"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Download className="mr-2 size-7" />
                            <span>Download CV</span>
                        </a>
                    </Button>
                </div>

                <div className="absolute bottom-8 flex items-center justify-center">
                    <ChevronDown className="text-muted-foreground mt-8 size-12 animate-bounce" />
                </div>
            </section>

            {/* Tech section */}
            <section></section>
        </>
    );
}
