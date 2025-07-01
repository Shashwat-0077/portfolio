// hooks/useResizeObserver.ts
import { useEffect, useState } from "react";

export function useResizeObserver(ref: React.RefObject<HTMLElement | null>) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref]);

    return size; // { width, height }
}
