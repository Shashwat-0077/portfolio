"use client";

import { create } from "zustand";

interface PreloaderState {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const usePreloaderStore = create<PreloaderState>((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
}));
