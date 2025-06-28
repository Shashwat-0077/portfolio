"use client";

import { create } from "zustand";

interface PreloaderState {
    isComplete: boolean;
    hasShown: boolean;
    setComplete: (complete: boolean) => void;
    setHasShown: (shown: boolean) => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
    isComplete: false,
    hasShown: false,
    setComplete: (complete) => set({ isComplete: complete }),
    setHasShown: (shown) => set({ hasShown: shown }),
}));
