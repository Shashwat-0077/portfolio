"use client";

import { create } from "zustand";

interface AnimationState {
    isDockAnimating: boolean;
    isCursorDisabled: boolean;
    isTransitioning: boolean;
    setDockAnimating: (animating: boolean) => void;
    setCursorDisabled: (disabled: boolean) => void;
    setTransitioning: (transitioning: boolean) => void;
    reset: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    isDockAnimating: false,
    isCursorDisabled: false,
    isTransitioning: false,
    setDockAnimating: (animating) => set({ isDockAnimating: animating }),
    setCursorDisabled: (disabled) => set({ isCursorDisabled: disabled }),
    setTransitioning: (transitioning) =>
        set({ isTransitioning: transitioning }),
    reset: () =>
        set({
            isDockAnimating: false,
            isCursorDisabled: false,
            isTransitioning: false,
        }),
}));
