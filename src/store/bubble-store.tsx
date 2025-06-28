"use client";

// store/bubbleStore.ts
import { create } from "zustand";

interface BubbleStore {
    expandedBubbleId: string | null;
    setExpandedBubble: (id: string | null) => void;
}

export const useBubbleStore = create<BubbleStore>((set) => ({
    expandedBubbleId: null,
    setExpandedBubble: (id) => set({ expandedBubbleId: id }),
}));
