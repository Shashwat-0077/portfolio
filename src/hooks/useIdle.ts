import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";

import { off, on } from "@/lib/utils";

const defaultEvents = [
    "mousemove",
    "mousedown",
    "resize",
    "keydown",
    "touchstart",
    "wheel",
];
const oneMinute = 60e3;

interface UseIdleOptions {
    initialState?: boolean;
    events?: string[];
    enabled?: boolean;
}

const useIdle = (
    ms: number = oneMinute,
    {
        initialState = false,
        events = defaultEvents,
        enabled = true,
    }: UseIdleOptions = {}
): boolean => {
    const [state, setState] = useState<boolean>(initialState);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        let mounted = true;
        // eslint-disable-next-line
        let timeout: any;
        let localState: boolean = state;

        const set = (newState: boolean) => {
            if (mounted) {
                localState = newState;
                setState(newState);
            }
        };

        const onEvent = throttle(50, () => {
            if (localState) {
                set(false);
            }

            clearTimeout(timeout);
            timeout = setTimeout(() => set(true), ms);
        });

        const onVisibility = () => {
            if (!document.hidden) {
                onEvent();
            }
        };

        for (let i = 0; i < events.length; i++) {
            on(window, events[i], onEvent);
        }
        on(document, "visibilitychange", onVisibility);

        timeout = setTimeout(() => set(true), ms);

        return () => {
            mounted = false;
            for (let i = 0; i < events.length; i++) {
                off(window, events[i], onEvent);
            }
            off(document, "visibilitychange", onVisibility);
            clearTimeout(timeout);
        };

        // eslint-disable-next-line
    }, [ms, events, enabled]);

    return state;
};

export default useIdle;
