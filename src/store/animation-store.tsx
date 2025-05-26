"use client";

import { create } from "zustand";

interface AnimationState {
    isDockAnimating: boolean;
    isCursorDisabled: boolean;
    isTransitioning: boolean;
    setCursorDisabled: (disabled: boolean) => void;
    setDockAnimating: (animating: boolean) => void;
    setTransitioning: (transitioning: boolean) => void;
    reset: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    isDockAnimating: false,
    isCursorDisabled: false,
    isTransitioning: false,
    setCursorDisabled: (disabled) => set({ isCursorDisabled: disabled }),
    setDockAnimating: (animating) => set({ isDockAnimating: animating }),
    setTransitioning: (transitioning) =>
        set({ isTransitioning: transitioning }),

    reset: () =>
        set({
            isDockAnimating: false,
            isCursorDisabled: false,
            isTransitioning: false,
        }),
}));
