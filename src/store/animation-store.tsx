"use client";

import { create } from "zustand";

interface AnimationState {
    isCompatible: boolean;
    isDockAnimating: boolean;
    isCursorDisabled: boolean;
    isTransitioning: boolean;
    isIdealAnimationEnabled: boolean;
    setCompatible: (compatible: boolean) => void;
    setCursorDisabled: (disabled: boolean) => void;
    setDockAnimating: (animating: boolean) => void;
    setTransitioning: (transitioning: boolean) => void;
    setIdealAnimationEnabled: (enabled: boolean) => void;
    reset: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    isCompatible: false,
    isDockAnimating: false,
    isCursorDisabled: false,
    isTransitioning: false,
    isIdealAnimationEnabled: false,
    // Actions
    setCompatible: (compatible) => set({ isCompatible: compatible }),
    setCursorDisabled: (disabled) => set({ isCursorDisabled: disabled }),
    setDockAnimating: (animating) => set({ isDockAnimating: animating }),
    setTransitioning: (transitioning) =>
        set({ isTransitioning: transitioning }),
    setIdealAnimationEnabled: (enabled) =>
        set({ isIdealAnimationEnabled: enabled }),

    reset: () =>
        set({
            isDockAnimating: false,
            isCursorDisabled: false,
            isTransitioning: false,
        }),
}));
