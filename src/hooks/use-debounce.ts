import { useCallback, useEffect, useRef, useState } from "react";

type UseDebounceOptions = {
    leading?: boolean;
    trailing?: boolean;
};

export function useDebounce<T>(
    value: T,
    delay: number,
    options: UseDebounceOptions = {}
) {
    const { leading = false, trailing = true } = options;

    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isLeadingCalledRef = useRef(false);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        isLeadingCalledRef.current = false;
    }, []);

    const flush = useCallback(() => {
        cancel();
        setDebouncedValue(value);
    }, [cancel, value]);

    useEffect(() => {
        if (delay <= 0) {
            queueMicrotask(() => setDebouncedValue(value));
            return;
        }

        // Leading call
        if (leading && !isLeadingCalledRef.current) {
            queueMicrotask(() => setDebouncedValue(value));
            isLeadingCalledRef.current = true;
        }

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (trailing) {
                setDebouncedValue(value);
            }
            timeoutRef.current = null;
            isLeadingCalledRef.current = false;
        }, delay);

        return cancel;
    }, [value, delay, leading, trailing, cancel]);

    return {
        debouncedValue,
        cancel,
        flush,
    };
}