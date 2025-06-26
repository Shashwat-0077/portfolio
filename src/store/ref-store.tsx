// stores/useGlobalTimeout.ts
import { create } from "zustand";

type TimeoutStore = {
    timeoutId: NodeJS.Timeout | null;
    setTimeoutId: (id: NodeJS.Timeout) => void;
    clearGlobalTimeout: () => void;
};

export const useGlobalTimeout = create<TimeoutStore>((set, get) => ({
    timeoutId: null,
    setTimeoutId: (id) => {
        const prevId = get().timeoutId;
        if (prevId) {
            clearTimeout(prevId);
        }
        set({ timeoutId: id });
    },
    clearGlobalTimeout: () => {
        const id = get().timeoutId;
        if (id) {
            clearTimeout(id);
        }
        set({ timeoutId: null });
    },
}));
