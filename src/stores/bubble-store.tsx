"use client";

// store/bubbleStore.ts
import { create } from "zustand";

interface BubbleStore {
    expandedBubbleId: string | null;
    setExpandedBubble: (id: string | null) => void;
    isCurrentBubbleExpanded: (id: string) => boolean;
}

export const useBubbleStore = create<BubbleStore>((set, get) => ({
    expandedBubbleId: null,
    setExpandedBubble: (id) => set({ expandedBubbleId: id }),
    isCurrentBubbleExpanded: (id) => get().expandedBubbleId === id,
}));
