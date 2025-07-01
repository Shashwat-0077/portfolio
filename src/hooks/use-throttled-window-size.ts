// hooks/useThrottledWindowSize.ts
import { useWindowSize } from "react-use";
import { useState, useEffect, useRef } from "react";
import throttle from "lodash.throttle";

export function useThrottledWindowSize(delay: number = 200) {
    const size = useWindowSize(); // { width, height }
    const [throttledSize, setThrottledSize] = useState(size);

    const throttledSetSize = useRef(
        throttle((nextSize: typeof size) => {
            setThrottledSize(nextSize);
        }, delay)
    ).current;

    useEffect(
        () => {
            throttledSetSize(size);
        },
        // eslint-disable-next-line
        [size.width, size.height]
    );

    return throttledSize; // { width, height }
}
