"use client";

import React from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Heading from "@/components/ui/heading";

gsap.registerPlugin(SplitText, ScrollTrigger);

const EducationSection = () => {
    const para1Ref = React.useRef<HTMLDivElement>(null);
    const para2Ref = React.useRef<HTMLDivElement>(null);
    const para3Ref = React.useRef<HTMLDivElement>(null);
    const para4Ref = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const paragraphs = [
            { ref: para1Ref, index: 0 },
            { ref: para2Ref, index: 1 },
            { ref: para3Ref, index: 2 },
            { ref: para4Ref, index: 3 },
        ];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const splits: any[] = [];

        // Initialize SplitText for each paragraph
        paragraphs.forEach(({ ref, index }) => {
            if (!ref.current) {
                return;
            }

            const split = new SplitText(ref.current, {
                type: "words",
                wordsClass: `word-${index}`,
            });

            splits.push(split);

            // Wrap each word with a wrapper for the highlight effect
            split.words.forEach((word) => {
                const wrapper = document.createElement("span");
                wrapper.className = `word-wrapper-${index}`;

                // Create the highlight element
                const highlight = document.createElement("span");
                highlight.className = `word-highlight-${index}`;

                wrapper.appendChild(highlight);
                wrapper.appendChild(word.cloneNode(true));
                word.replaceWith(wrapper);
            });
        });

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "250px center",
                end: "+=1000%",
                scrub: true,
                pin: true,
            },
        });

        const sequences = [
            { start: 0, highlightEnd: 1.0, textStart: 1.3, textEnd: 6.1 }, // Para 1
            { start: 6.4, highlightEnd: 9.4, textStart: 9.7, textEnd: 14.5 }, // Para 2
            { start: 14.8, highlightEnd: 17.8, textStart: 18.1, textEnd: 22.9 }, // Para 3
            { start: 23.2, highlightEnd: 26.2, textStart: 26.5, textEnd: 31.3 }, // Para 4
        ];

        gsap.set(".word-highlight-0", { opacity: 1 });

        sequences.forEach((seq, index) => {
            // 1. Before/highlights appear
            tl.to(
                `.word-highlight-${index}`,
                {
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.5,
                    ease: "power2.out",
                },
                seq.start
            );

            // 2. Before/highlights fade
            tl.to(
                `.word-highlight-${index}`,
                {
                    opacity: 0,
                    stagger: 0.03,
                    duration: 0.3,
                    ease: "power2.out",
                },
                seq.highlightEnd
            );

            // 3. Words appear
            tl.to(
                `.word-${index}`,
                {
                    opacity: 1,
                    stagger: 0.03,
                    duration: 0.3,
                    ease: "power2.out",
                },
                seq.textStart
            );

            // 4. Words disappear
            if (index !== 3) {
                tl.to(
                    `.word-${index}`,
                    {
                        opacity: 0,
                        stagger: 0.03,
                        duration: 0.4,
                        ease: "power2.out",
                    },
                    seq.textEnd
                );
            }
        });

        return () => {
            splits.forEach((split) => split.revert());
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="relative mt-28 h-screen w-full">
            <Heading>Education</Heading>

            <style jsx global>{`
                .word-wrapper-0,
                .word-wrapper-1,
                .word-wrapper-2,
                .word-wrapper-3 {
                    position: relative;
                    display: inline-block;
                }

                .word-highlight-0,
                .word-highlight-1,
                .word-highlight-2,
                .word-highlight-3 {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 999px;
                    opacity: 0;
                    transform: scaleY(0.9);
                    z-index: 1;
                }

                .word-highlight-0 {
                    background-color: #2a2a2a;
                }

                .word-highlight-1 {
                    background-color: #2a2a2a;
                }

                .word-highlight-2 {
                    background-color: #2a2a2a;
                }

                .word-highlight-3 {
                    background-color: #2a2a2a;
                }

                .word-0,
                .word-1,
                .word-2,
                .word-3 {
                    opacity: 0;
                    position: relative;
                    z-index: 2;
                }

                .education-card {
                    padding: 0;
                }

                .education-title {
                    font-size: clamp(1.8rem, 5vw, 3.5rem);
                    font-weight: 800;
                    margin-bottom: 1rem;
                    color: #ffffff;
                    letter-spacing: -0.02em;
                }

                .education-subtitle {
                    font-size: clamp(1rem, 2.5vw, 1.2rem);
                    font-weight: 400;
                    color: #94a3b8;
                    margin-bottom: 0.5rem;
                }

                .education-marks {
                    font-size: clamp(1rem, 2.5vw, 1.2rem);
                    font-weight: 400;
                    color: #94a3b8;
                    margin-bottom: 2rem;
                }

                .education-content {
                    font-size: clamp(1rem, 3vw, 1.5rem);
                    line-height: 1.6;
                    color: #e2e8f0;
                    font-weight: 400;
                }
            `}</style>

            <div className="relative h-96 select-none">
                <div
                    ref={para1Ref}
                    className="absolute top-0 left-0 h-full w-full"
                >
                    <div className="education-card">
                        <h1 className="education-title">Class 10th</h1>
                        <h2 className="education-subtitle">
                            St. Vivekanand Millennium School, Pinjore, Panchkula
                        </h2>
                        <div className="education-marks">Percentage : 82%</div>

                        <div className="education-content">
                            Completed my secondary education with a strong
                            foundation in core subjects including Mathematics,
                            Science, English, and Social Studies. This crucial
                            phase laid the groundwork for my academic journey,
                            where I developed critical thinking skills and
                            discovered my passion for technology and computer
                            science. Achieved excellent grades while actively
                            participating in various school activities and
                            competitions that helped shape my overall
                            personality and academic excellence.
                        </div>
                    </div>
                </div>

                <div
                    ref={para2Ref}
                    className="absolute top-0 left-0 h-full w-full"
                >
                    <div className="education-card">
                        <h1 className="education-title">Class 12th</h1>
                        <h2 className="education-subtitle">
                            Pandit Mohan Lal SD Public School, sector 32,
                            Chandigarh
                        </h2>
                        <div className="education-marks">
                            Percentage : 80.16%
                        </div>

                        <div className="education-content">
                            Pursued higher secondary education in the Science
                            stream with Physics, Chemistry, Mathematics, and
                            Computer Science as core subjects. This period was
                            instrumental in shaping my analytical thinking and
                            problem-solving abilities. Gained deep understanding
                            of fundamental scientific principles while
                            developing a strong interest in programming and
                            computer applications. Successfully cleared JEE
                            Mains and other competitive examinations during this
                            phase.
                        </div>
                    </div>
                </div>

                <div
                    ref={para3Ref}
                    className="absolute top-0 left-0 h-full w-full"
                >
                    <div className="education-card">
                        <h1 className="education-title">
                            Bachelors of Computer Applications{" "}
                        </h1>
                        <h2 className="education-subtitle">
                            Vellore Institute of Technology, Vellore
                        </h2>
                        <div className="education-marks">CGPA: 9.05</div>

                        <div className="education-content">
                            Completed my undergraduate degree in Computer
                            Applications, gaining comprehensive knowledge in
                            programming languages, database management, software
                            engineering, and web development. This program
                            provided hands-on experience with modern
                            technologies and development frameworks. Developed
                            multiple projects and applications during the
                            course, building a strong foundation for a career in
                            software development and gaining practical
                            experience in full-stack development.
                        </div>
                    </div>
                </div>

                <div
                    ref={para4Ref}
                    className="absolute top-0 left-0 h-full w-full"
                >
                    <div className="education-card">
                        <h1 className="education-title">
                            Masters of Computer Applications
                        </h1>
                        <h2 className="education-subtitle">
                            Vellore Institute of Technology, Vellore
                        </h2>
                        <div className="education-marks">CGPA: 8.88</div>

                        <div className="education-content">
                            Currently pursuing my post-graduate degree in
                            Computer Applications with advanced coursework in
                            software architecture, advanced algorithms, machine
                            learning, and modern development frameworks. This
                            program focuses on research-oriented learning and
                            industry-relevant skills. Working on cutting-edge
                            technologies and contributing to innovative projects
                            that solve real-world problems. Specializing in
                            full-stack development with a focus on modern web
                            technologies and cloud computing.
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[400px] w-full">&nbsp;</div>
        </section>
    );
};

export default EducationSection;
