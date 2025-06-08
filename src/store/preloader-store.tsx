"use client";

import { create } from "zustand";

interface PreloaderState {
    isLoading: boolean;
    hasShown: boolean;
    setIsLoading: (loading: boolean) => void;
    setHasShown: (shown: boolean) => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
    isLoading: true,
    hasShown: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    setHasShown: (shown) => set({ hasShown: shown }),
}));
