import Image from "next/image";

import Galaxy from "@/components/galaxy";

const HeroSection = () => {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-between gap-8 px-4 py-8">
            {/* Text Content */}
            <div className="z-10 max-w-2xl flex-1 space-y-6">
                <h1
                    className={`text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] font-bold text-white sm:text-[clamp(3rem,7vw,7rem)] sm:leading-[0.85] md:text-[clamp(3.5rem,6vw,8rem)]`}
                >
                    LANGUAGE I <br />
                    <span className="text-primary">SPEAK</span>
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base lg:text-lg">
                    Code isn&apos;t just logic — it&apos;s how I shape ideas
                    into elegant, intuitive, and sometimes magical experiences.
                </p>
            </div>

            {/* Galaxy + Image Visual Unit */}
            <div className="relative top-[100px] left-[50px] flex min-h-[500px] max-w-[700px] flex-1 items-center justify-center">
                {/* Galaxy Background Container */}
                <div className="relative flex h-full w-full items-center justify-center">
                    {/* Galaxy Component */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Galaxy
                            size={Math.min(
                                1000,
                                typeof window !== "undefined"
                                    ? window.innerWidth * 0.4
                                    : 700
                            )}
                        />
                    </div>

                    {/* Thinking Image Overlay */}
                    <div className="relative z-10 flex items-center justify-center select-none">
                        <div className="relative h-[280px] w-[280px] select-none sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px]">
                            <Image
                                priority
                                src="/thinking.webp"
                                fill
                                alt="Thinking"
                                className="object-contain select-none"
                                sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/*
            <div className="bg-gradient-radial from-primary/10 absolute inset-0 rounded-full via-transparent to-transparent opacity-30 blur-3xl" />
            <div className="bg-primary/40 absolute top-1/4 right-1/4 h-2 w-2 animate-pulse rounded-full" />
            <div className="absolute bottom-1/3 left-1/4 h-1 w-1 animate-pulse rounded-full bg-white/30 delay-1000" />
            <div className="bg-primary/20 absolute top-1/2 left-1/3 h-1.5 w-1.5 animate-pulse rounded-full delay-500" />

            <div className="absolute top-1/6 left-1/5 h-1 w-1 animate-pulse rounded-full bg-white/20 delay-300" />
            <div className="bg-primary/30 absolute top-3/4 right-1/3 h-1.5 w-1.5 animate-pulse rounded-full delay-700" />
            <div className="absolute right-1/5 bottom-1/4 h-1 w-1 animate-pulse rounded-full bg-white/40 delay-1200" />
            <div className="bg-primary/50 absolute top-1/3 right-2/3 h-0.5 w-0.5 animate-pulse rounded-full delay-200" />
            <div className="absolute bottom-1/5 left-1/2 h-2 w-2 animate-pulse rounded-full bg-white/15 delay-900" />
            <div className="bg-primary/25 absolute top-2/3 left-1/6 h-1 w-1 animate-pulse rounded-full delay-400" />
            <div className="absolute right-1/6 bottom-2/5 h-1.5 w-1.5 animate-pulse rounded-full bg-white/25 delay-1100" />
            <div className="bg-primary/35 absolute top-1/5 right-1/2 h-0.5 w-0.5 animate-pulse rounded-full delay-600" />
            <div className="absolute bottom-1/6 left-2/3 h-1 w-1 animate-pulse rounded-full bg-white/35 delay-800" />
            <div className="bg-primary/15 absolute top-4/5 right-2/5 h-1.5 w-1.5 animate-pulse rounded-full delay-1300" />
            <div className="absolute top-1/8 left-3/4 h-0.5 w-0.5 animate-pulse rounded-full bg-white/45 delay-100" />
            <div className="bg-primary/45 absolute right-3/4 bottom-3/4 h-1 w-1 animate-pulse rounded-full delay-1400" />
            <div className="absolute top-3/5 left-4/5 h-2 w-2 animate-pulse rounded-full bg-white/10 delay-1500" /> */}
        </section>
    );
};

export default HeroSection;
