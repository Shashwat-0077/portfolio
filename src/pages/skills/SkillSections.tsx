"use client";

import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { gsap } from "gsap";

import { TECHNOLOGIES_ARRAY } from "@/data/technologies";
import { useResizeObserver } from "@/hooks";

type Position =
    | {
          isRightSide: false;
          isBottomSide: false;
          originalPosition: {
              top: number;
              left: number;
          };
          currentPosition: {
              top: number;
              left: number;
          };
      }
    | {
          isRightSide: true;
          isBottomSide: false;
          originalPosition: {
              top: number;
              right: number;
          };
          currentPosition: {
              top: number;
              right: number;
          };
      }
    | {
          isRightSide: false;
          isBottomSide: true;
          originalPosition: {
              bottom: number;
              left: number;
          };
          currentPosition: {
              bottom: number;
              left: number;
          };
      }
    | {
          isRightSide: true;
          isBottomSide: true;
          originalPosition: {
              bottom: number;
              right: number;
          };
          currentPosition: {
              bottom: number;
              right: number;
          };
      };

type BoxData = {
    id: number;
    ref: React.RefObject<HTMLDivElement | null>;
} & Position;

const SkillSections = () => {
    const BOX_SIZE = 120;
    const BOX_COUNT = TECHNOLOGIES_ARRAY.length;

    const parentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { width: parentWidth } = useResizeObserver(parentRef);
    // Layout state
    const [layout, setLayout] = useState({
        columns: 0,
        rows: 0,
        gap: 12,
    });
    const [containerDimensions, setContainerDimensions] = useState({
        width: 0,
        height: 500,
    });
    const [boxes, setBoxes] = useState<BoxData[]>([]);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const expandedSize = { width: 2, height: 2 };

    const calculateLayout = useCallback(
        () => {
            if (!containerRef.current || !parentRef.current || !parentWidth) {
                return;
            }

            // Responsive gap and padding based on parent width (not window width)
            let gap: number;
            if (parentWidth <= 320) {
                gap = 6;
            } else if (parentWidth <= 480) {
                gap = 8;
            } else if (parentWidth <= 768) {
                gap = 10;
            } else {
                gap = 12;
            }

            const columns = Math.max(
                1,
                Math.floor(parentWidth / (BOX_SIZE + gap))
            );

            const rows = Math.ceil(BOX_COUNT / columns);

            const containerWidth = (BOX_SIZE + gap) * columns - gap;
            const containerHeight = (BOX_SIZE + gap) * rows - gap;

            if (
                columns === layout.columns &&
                rows === layout.rows &&
                gap === layout.gap
            ) {
                return;
            }

            setLayout({ columns, rows, gap });
            setContainerDimensions({
                width: containerWidth,
                height: containerHeight,
            });
        },
        // eslint-disable-next-line
        [parentWidth, BOX_COUNT, BOX_SIZE]
    );

    const calculateBoxPosition = useCallback(
        (index: number): Position => {
            const row = Math.floor(index / layout.columns);
            const col = index % layout.columns;

            const isRightSide = col >= layout.columns / 2;
            const isBottomSide = row >= layout.rows / 2;

            if (isRightSide && isBottomSide) {
                const right =
                    (layout.columns - col - 1) * (BOX_SIZE + layout.gap);
                const bottom =
                    (layout.rows - row - 1) * (BOX_SIZE + layout.gap);
                return {
                    isRightSide: true,
                    isBottomSide: true,
                    originalPosition: { bottom, right },
                    currentPosition: { bottom, right },
                };
            } else if (isRightSide && !isBottomSide) {
                const right =
                    (layout.columns - col - 1) * (BOX_SIZE + layout.gap);
                const top = row * (BOX_SIZE + layout.gap);
                return {
                    isRightSide: true,
                    isBottomSide: false,
                    originalPosition: { top, right },
                    currentPosition: { top, right },
                };
            } else if (!isRightSide && isBottomSide) {
                const left = col * (BOX_SIZE + layout.gap);
                const bottom =
                    (layout.rows - row - 1) * (BOX_SIZE + layout.gap);
                return {
                    isRightSide: false,
                    isBottomSide: true,
                    originalPosition: { bottom, left },
                    currentPosition: { bottom, left },
                };
            } else {
                const left = col * (BOX_SIZE + layout.gap);
                const top = row * (BOX_SIZE + layout.gap);
                return {
                    isRightSide: false,
                    isBottomSide: false,
                    originalPosition: { top, left },
                    currentPosition: { top, left },
                };
            }
        },
        [layout, BOX_SIZE]
    );

    const initializeBoxes = useCallback(() => {
        const newBoxes: BoxData[] = Array.from(
            { length: BOX_COUNT },
            (_, i) => {
                const position = calculateBoxPosition(i);

                return {
                    id: i,
                    ref: React.createRef<HTMLDivElement>(),
                    ...position,
                };
            }
        );

        setBoxes(newBoxes);
    }, [calculateBoxPosition, BOX_COUNT]);

    const animateToPositions = useCallback(
        (targetPositions: {
            [key: number]: {
                isRightSide: boolean;
                isBottomSide: boolean;
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
                width?: number;
                height?: number;
            };
        }) => {
            setIsAnimating(true);

            const timeline = gsap.timeline({
                defaults: {
                    ease: "bounce.out",
                },
                onComplete: () => setIsAnimating(false),
            });

            Object.entries(targetPositions).forEach(([index, position]) => {
                const boxIndex = parseInt(index);
                const box = boxes[boxIndex];
                if (!box?.ref.current) {
                    return;
                }

                // Calculate x position based on left/right values
                let targetX: number;
                if (position.isRightSide && position.right !== undefined) {
                    targetX =
                        containerDimensions.width -
                        position.right -
                        (position.width || BOX_SIZE);
                } else if (
                    !position.isRightSide &&
                    position.left !== undefined
                ) {
                    targetX = position.left;
                } else {
                    return;
                }

                // Calculate y position based on top/bottom values
                let targetY: number;
                if (position.isBottomSide && position.bottom !== undefined) {
                    targetY =
                        containerDimensions.height -
                        position.bottom -
                        (position.height || BOX_SIZE);
                } else if (
                    !position.isBottomSide &&
                    position.top !== undefined
                ) {
                    targetY = position.top;
                } else {
                    return;
                }

                // eslint-disable-next-line
                const props: Record<string, any> = {
                    x: targetX,
                    y: targetY,
                    width: position.width || BOX_SIZE,
                    height: position.height || BOX_SIZE,
                };

                timeline.to(box.ref.current, props, 0);
            });

            return timeline;
        },
        [boxes, BOX_SIZE, containerDimensions.width, containerDimensions.height]
    );

    const expandBox = useCallback(
        (boxIndex: number) => {
            if (isAnimating) {
                return;
            }

            const boxRow = Math.floor(boxIndex / layout.columns);
            const boxCol = boxIndex % layout.columns;

            const expandedBox = boxes[boxIndex];
            const isRightSide = expandedBox.isRightSide;
            const isBottomSide = expandedBox.isBottomSide;

            const expandedPixelWidth =
                expandedSize.width * BOX_SIZE +
                (expandedSize.width - 1) * layout.gap;

            const expandedPixelHeight =
                expandedSize.height * BOX_SIZE +
                (expandedSize.height - 1) * layout.gap;

            const horizontalDisplacement =
                (expandedSize.width - 1) * (BOX_SIZE + layout.gap);

            const verticalDisplacement =
                (expandedSize.height - 1) * (BOX_SIZE + layout.gap);

            const targetPositions: {
                [key: number]: {
                    isRightSide: boolean;
                    isBottomSide: boolean;
                    top?: number;
                    bottom?: number;
                    left?: number;
                    right?: number;
                    width?: number;
                    height?: number;
                };
            } = {};

            boxes.forEach((box, index) => {
                const currentRow = Math.floor(index / layout.columns);
                const currentCol = index % layout.columns;

                let newTop: number | undefined;
                let newBottom: number | undefined;
                let newLeft: number | undefined;
                let newRight: number | undefined;

                // Set initial positions based on box positioning type
                if (box.isBottomSide) {
                    newBottom = box.originalPosition.bottom;
                } else {
                    newTop = box.originalPosition.top;
                }

                if (box.isRightSide) {
                    newRight = box.originalPosition.right;
                } else {
                    newLeft = box.originalPosition.left;
                }

                if (index === boxIndex) {
                    // Expanding box
                    targetPositions[index] = {
                        isRightSide: box.isRightSide,
                        isBottomSide: box.isBottomSide,
                        ...(box.isBottomSide
                            ? { bottom: newBottom }
                            : { top: newTop }),
                        ...(box.isRightSide
                            ? { right: newRight }
                            : { left: newLeft }),
                        width: expandedPixelWidth,
                        height: expandedPixelHeight,
                    };
                    return;
                }

                const isSameRow = currentRow === boxRow;
                const isBelow = currentRow > boxRow;
                const isAbove = currentRow < boxRow;
                const isRight = currentCol > boxCol;
                const isLeft = currentCol < boxCol;

                // Handle horizontal displacement for boxes in the same row
                if (isSameRow) {
                    if (isRightSide && isLeft) {
                        if (box.isRightSide) {
                            newRight! += horizontalDisplacement;
                        } else {
                            newLeft! -= horizontalDisplacement;
                        }
                    }

                    if (!isRightSide && isRight) {
                        if (box.isRightSide) {
                            newRight! -= horizontalDisplacement;
                        } else {
                            newLeft! += horizontalDisplacement;
                        }
                    }
                }

                // Handle vertical displacement for boxes in affected columns
                const inAffectedColRange = isRightSide
                    ? currentCol <= boxCol &&
                      currentCol > boxCol - expandedSize.width
                    : currentCol >= boxCol &&
                      currentCol < boxCol + expandedSize.width;

                if (inAffectedColRange) {
                    if (isBottomSide && isAbove) {
                        if (box.isBottomSide) {
                            newBottom! += verticalDisplacement;
                        } else {
                            newTop! -= verticalDisplacement;
                        }
                    }

                    if (!isBottomSide && isBelow) {
                        if (box.isBottomSide) {
                            newBottom! -= verticalDisplacement;
                        } else {
                            newTop! += verticalDisplacement;
                        }
                    }
                }

                targetPositions[index] = {
                    isRightSide: box.isRightSide,
                    isBottomSide: box.isBottomSide,
                    ...(box.isBottomSide
                        ? { bottom: newBottom }
                        : { top: newTop }),
                    ...(box.isRightSide
                        ? { right: newRight }
                        : { left: newLeft }),
                };
            });

            animateToPositions(targetPositions);
        },
        // eslint-disable-next-line
        [boxes, layout, isAnimating, animateToPositions, BOX_SIZE]
    );

    const collapseAll = useCallback(() => {
        const targetPositions: {
            [key: number]: {
                isRightSide: boolean;
                isBottomSide: boolean;
                top?: number;
                bottom?: number;
                left?: number;
                right?: number;
                width?: number;
                height?: number;
            };
        } = {};
        boxes.forEach((box, index) => {
            targetPositions[index] = {
                isRightSide: box.isRightSide,
                isBottomSide: box.isBottomSide,
                ...(box.isBottomSide
                    ? { bottom: box.originalPosition.bottom }
                    : { top: box.originalPosition.top }),
                ...(box.isRightSide
                    ? { right: box.originalPosition.right }
                    : { left: box.originalPosition.left }),
                width: BOX_SIZE,
                height: BOX_SIZE,
            };
        });

        animateToPositions(targetPositions);
    }, [boxes, animateToPositions, BOX_SIZE]);

    const handleToggleBox = (index: number) => {
        if (isAnimating) {
            return;
        }

        if (index === expandedIndex) {
            collapseAll();
            setExpandedIndex(null);
        } else {
            expandBox(index);
            setExpandedIndex(index);
        }
    };

    // Initialize and setup
    useLayoutEffect(() => {
        calculateLayout();
    }, [calculateLayout]);

    useEffect(() => {
        setExpandedIndex(null);
        collapseAll();
    }, [layout.columns, collapseAll]);

    useEffect(() => {
        if (layout.columns > 0) {
            initializeBoxes();
        }
    }, [layout, initializeBoxes]);

    // Set initial positions using GSAP
    useEffect(() => {
        boxes.forEach((box) => {
            if (box.ref.current) {
                const initialX = box.isRightSide
                    ? containerDimensions.width -
                      box.currentPosition.right -
                      BOX_SIZE
                    : box.currentPosition.left;

                const initialY = box.isBottomSide
                    ? containerDimensions.height -
                      box.currentPosition.bottom -
                      BOX_SIZE
                    : box.currentPosition.top;

                gsap.set(box.ref.current, {
                    x: initialX,
                    y: initialY,
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                });
            }
        });
    }, [
        boxes,
        containerDimensions.width,
        containerDimensions.height,
        BOX_SIZE,
    ]);

    return (
        <div ref={parentRef} className="grid place-content-center pb-10">
            <div
                ref={containerRef}
                className="relative overflow-hidden"
                style={{
                    width: `${containerDimensions.width}px`,
                    height: `${containerDimensions.height}px`,
                }}
            >
                {boxes.map((box, index) => {
                    const Icon = TECHNOLOGIES_ARRAY[index].Icon;
                    const defaultIconColor =
                        TECHNOLOGIES_ARRAY[index].defaultIconColor;

                    return (
                        <div
                            key={box.id}
                            ref={box.ref}
                            onClick={() => handleToggleBox(index)}
                            className="bg-dock-background absolute cursor-pointer rounded-2xl p-10"
                            style={{
                                width: `${BOX_SIZE}px`,
                                height: `${BOX_SIZE}px`,
                            }}
                        >
                            <div className="relative h-full w-full">
                                <div className="flex justify-between">
                                    <Icon
                                        size={40}
                                        color={defaultIconColor}
                                        className="z-50"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillSections;
