import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWindowSize } from "react-use";
import gsap from "gsap";

interface Position {
    left: number;
    top: number;
}

interface BoxData {
    id: number;
    ref: React.RefObject<HTMLDivElement>;
    originalPosition: Position;
    currentPosition: Position;
}

const FastGridAnimation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { width: windowWidth } = useWindowSize();
    const [boxes, setBoxes] = useState<BoxData[]>([]);
    const [expandedBox, setExpandedBox] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // Layout configuration
    const boxCount = 50;
    const boxSize = 80;
    const expandedSize = { width: 2, height: 2 };

    // Layout state
    const [layout, setLayout] = useState({
        columns: 0,
        rows: 0,
        gap: 12,
        padding: 15,
        offsetX: 0,
        offsetY: 50,
    });

    const calculateLayout = useCallback(() => {
        if (!containerRef.current) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();

        // Responsive gap and padding
        let gap: number, padding: number;
        if (windowWidth <= 320) {
            gap = 6;
            padding = 5;
        } else if (windowWidth <= 480) {
            gap = 8;
            padding = 8;
        } else if (windowWidth <= 768) {
            gap = 10;
            padding = 10;
        } else {
            gap = 12;
            padding = 15;
        }

        const availableWidth =
            Math.min(containerRect.width, windowWidth) - padding * 2;
        const columns = Math.max(
            1,
            Math.floor((availableWidth + gap) / (boxSize + gap))
        );
        const rows = Math.ceil(boxCount / columns);
        const gridWidth = columns * boxSize + (columns - 1) * gap;
        const offsetX = (availableWidth - gridWidth) / 2 + padding;

        setLayout({
            columns,
            rows,
            gap,
            padding,
            offsetX,
            offsetY: 50,
        });
    }, [windowWidth]);

    const calculateBoxPosition = useCallback(
        (index: number): Position => {
            const row = Math.floor(index / layout.columns);
            const col = index % layout.columns;

            const left = layout.offsetX + col * (boxSize + layout.gap);
            const top = layout.offsetY + row * (boxSize + layout.gap);

            return { left, top };
        },
        [layout]
    );

    const initializeBoxes = useCallback(() => {
        const newBoxes: BoxData[] = Array.from({ length: boxCount }, (_, i) => {
            const position = calculateBoxPosition(i);
            return {
                id: i + 1,
                ref: React.createRef<HTMLDivElement>(),
                originalPosition: position,
                currentPosition: position,
            };
        });
        setBoxes(newBoxes);
    }, [calculateBoxPosition]);

    const animateToPositions = useCallback(
        (targetPositions: {
            [key: number]: Position & { width?: number; height?: number };
        }) => {
            setIsAnimating(true);

            const timeline = gsap.timeline({
                ease: "power2.out",
                onComplete: () => setIsAnimating(false),
            });

            Object.entries(targetPositions).forEach(([index, position]) => {
                const boxIndex = parseInt(index);
                const box = boxes[boxIndex];
                if (box?.ref.current) {
                    timeline.to(
                        box.ref.current,
                        {
                            x: position.left,
                            y: position.top,
                            width: position.width || boxSize,
                            height: position.height || boxSize,
                            duration: 0.25, // Reduced from 0.6 to 0.25
                            ease: "power2.out",
                        },
                        0
                    );
                }
            });

            return timeline;
        },
        [boxes]
    );

    const expandBox = useCallback(
        (boxIndex: number) => {
            if (isAnimating) {
                return;
            }

            const expandedRow = Math.floor(boxIndex / layout.columns);
            const expandedCol = boxIndex % layout.columns;

            const expandedPixelWidth =
                expandedSize.width * boxSize +
                (expandedSize.width - 1) * layout.gap;
            const expandedPixelHeight =
                expandedSize.height * boxSize +
                (expandedSize.height - 1) * layout.gap;

            const rightDisplacement =
                (expandedSize.width - 1) * (boxSize + layout.gap);
            const bottomDisplacement =
                (expandedSize.height - 1) * (boxSize + layout.gap);

            const wouldOverflow =
                expandedCol + expandedSize.width > layout.columns;
            const actualExpandedCol = wouldOverflow
                ? layout.columns - expandedSize.width
                : expandedCol;

            const targetPositions: {
                [key: number]: Position & { width?: number; height?: number };
            } = {};

            boxes.forEach((box, index) => {
                const boxRow = Math.floor(index / layout.columns);
                const boxCol = index % layout.columns;
                const originalPos = box.originalPosition;

                if (index === boxIndex) {
                    // Expanded box
                    const adjustedX = wouldOverflow
                        ? layout.offsetX +
                          actualExpandedCol * (boxSize + layout.gap)
                        : originalPos.left;

                    targetPositions[index] = {
                        left: adjustedX,
                        top: originalPos.top,
                        width: expandedPixelWidth,
                        height: expandedPixelHeight,
                    };
                } else {
                    let newLeft = originalPos.left;
                    let newTop = originalPos.top;

                    if (wouldOverflow) {
                        // Push entire row to the left
                        if (boxRow === expandedRow && boxCol < expandedCol) {
                            newLeft = originalPos.left - rightDisplacement;
                        }

                        // Push columns down
                        if (
                            boxCol >= actualExpandedCol &&
                            boxCol < actualExpandedCol + expandedSize.width &&
                            boxRow > expandedRow
                        ) {
                            newTop = originalPos.top + bottomDisplacement;
                        }
                    } else {
                        // Push entire row to the right
                        if (boxRow === expandedRow && boxCol > expandedCol) {
                            newLeft = originalPos.left + rightDisplacement;
                        }

                        // Push columns down
                        if (
                            boxCol >= expandedCol &&
                            boxCol < expandedCol + expandedSize.width &&
                            boxRow > expandedRow
                        ) {
                            newTop = originalPos.top + bottomDisplacement;
                        }
                    }

                    targetPositions[index] = { left: newLeft, top: newTop };
                }
            });

            animateToPositions(targetPositions);
        },
        // eslint-disable-next-line
        [boxes, layout, isAnimating, animateToPositions]
    );

    const collapseAll = useCallback(() => {
        if (isAnimating) {
            return;
        }

        const targetPositions: {
            [key: number]: Position & { width?: number; height?: number };
        } = {};

        boxes.forEach((box, index) => {
            targetPositions[index] = {
                left: box.originalPosition.left,
                top: box.originalPosition.top,
                width: boxSize,
                height: boxSize,
            };
        });

        animateToPositions(targetPositions);
    }, [boxes, isAnimating, animateToPositions]);

    const toggleExpansion = useCallback(
        (boxIndex: number) => {
            if (isAnimating) {
                return;
            }

            if (expandedBox === boxIndex) {
                setExpandedBox(null);
                collapseAll();
            } else {
                if (expandedBox !== null) {
                    setExpandedBox(null);
                    collapseAll();
                    setTimeout(() => {
                        setExpandedBox(boxIndex);
                        expandBox(boxIndex);
                    }, 280); // Reduced from 650 to 280
                } else {
                    setExpandedBox(boxIndex);
                    expandBox(boxIndex);
                }
            }
        },
        [expandedBox, expandBox, collapseAll, isAnimating]
    );

    // Initialize and setup
    useEffect(() => {
        calculateLayout();
    }, [calculateLayout]);

    useEffect(() => {
        if (layout.columns > 0) {
            initializeBoxes();
        }
    }, [layout, initializeBoxes]);

    // Set initial positions with GSAP
    useEffect(() => {
        boxes.forEach((box) => {
            if (box.ref.current) {
                gsap.set(box.ref.current, {
                    x: box.originalPosition.left,
                    y: box.originalPosition.top,
                    width: boxSize,
                    height: boxSize,
                });
            }
        });
    }, [boxes]);

    // Handle layout changes
    useEffect(
        () => {
            if (expandedBox !== null) {
                setExpandedBox(null);
                collapseAll();
            }
        },
        // eslint-disable-next-line
        [windowWidth]
    );

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && expandedBox !== null) {
                setExpandedBox(null);
                collapseAll();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [expandedBox, collapseAll]);

    const containerHeight =
        layout.rows * boxSize +
        (layout.rows - 1) * layout.gap +
        layout.offsetY +
        300;

    return (
        <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black p-5 font-sans">
            <div
                ref={containerRef}
                className="relative w-full max-w-6xl"
                style={{ height: `${containerHeight}px` }}
            >
                {boxes.map((box, index) => (
                    <div
                        key={box.id}
                        ref={box.ref}
                        className={`absolute flex cursor-pointer items-center justify-center rounded-xl text-base font-bold text-white shadow-lg transition-all duration-150 ease-out ${
                            expandedBox === index
                                ? "z-50 scale-105 rounded-2xl text-2xl shadow-2xl"
                                : "z-10"
                        } ${
                            index % 2 === 0
                                ? "bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600"
                                : "bg-gradient-to-br from-pink-400 via-rose-500 to-red-500"
                        }`}
                        onClick={() => toggleExpansion(index)}
                        style={{
                            boxShadow:
                                expandedBox === index
                                    ? "0 20px 60px rgba(0, 0, 0, 0.4), 0 8px 30px rgba(139, 92, 246, 0.3)"
                                    : "0 4px 20px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {box.id}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FastGridAnimation;
