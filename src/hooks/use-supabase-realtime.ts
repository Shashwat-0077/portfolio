// hooks/useSupabaseRealtime.ts

import { useState, useEffect, useCallback, useRef } from "react";

import { useRealtimeStore } from "@/stores/realtime-store";
import type {
    LatestCommitData,
    LearningData,
    NowPlayingData,
    UseSupabaseRealtimeOptions,
    UseSupabaseRealtimeReturn,
    WakatimeStatsData,
} from "@/types/realtime-types";

export function useSupabaseRealtime<T>({
    tableName,
    fallbackInterval = 30000,
    retryAttempts = 3,
    retryDelay = 2000,
}: UseSupabaseRealtimeOptions): UseSupabaseRealtimeReturn<T> {
    const tableKey = tableName;
    const [, forceUpdate] = useState({});
    const unsubscribeRef = useRef<(() => void) | null>(null);
    const initializedRef = useRef(false);

    // Get store functions (these are stable references)
    const initializeTable = useRealtimeStore((state) => state.initializeTable);
    const subscribe = useRealtimeStore((state) => state.subscribe);
    const refetchTable = useRealtimeStore((state) => state.refetchTable);

    // Get current table data with a stable selector
    const tableData = useRealtimeStore(
        useCallback((state) => state.tables[tableKey], [tableKey])
    );

    // Stable callback that doesn't change
    const triggerUpdate = useCallback(() => {
        forceUpdate({});
    }, []);

    // Initialize table only once
    useEffect(
        () => {
            if (!initializedRef.current) {
                initializedRef.current = true;

                // Subscribe to store updates
                unsubscribeRef.current = subscribe(tableKey, triggerUpdate);

                // Initialize table if not already done
                if (!tableData) {
                    initializeTable(tableKey, {
                        tableName,
                        fallbackInterval,
                        retryAttempts,
                        retryDelay,
                    });
                }
            }

            return () => {
                if (unsubscribeRef.current) {
                    unsubscribeRef.current();
                    unsubscribeRef.current = null;
                }
            };
        },
        // eslint-disable-next-line
        []
    ); // ✅ Empty dependency array - only run once

    // Stable refetch function
    const refetch = useCallback(async () => {
        await refetchTable(tableKey, tableName);
    }, [refetchTable, tableKey, tableName]);

    return {
        data: (tableData?.data as T) || null,
        loading: tableData?.loading ?? true,
        error: tableData?.error ?? null,
        isRealtime: tableData?.isRealtime ?? false,
        refetch,
    };
}

export function useNowPlaying(): UseSupabaseRealtimeReturn<NowPlayingData> {
    return useSupabaseRealtime<NowPlayingData>({
        tableName: "now_playing",
        fallbackInterval: 10000, // Poll every 10 seconds for music updates
    });
}

export function useLearning(): UseSupabaseRealtimeReturn<LearningData> {
    return useSupabaseRealtime<LearningData>({
        tableName: "learning",
        fallbackInterval: 30000, // Poll every 30 seconds
    });
}

export function useWakatimeStats(): UseSupabaseRealtimeReturn<WakatimeStatsData> {
    return useSupabaseRealtime<WakatimeStatsData>({
        tableName: "wakatime_stats",
        fallbackInterval: 60000, // Poll every minute for coding stats
    });
}

export function useLatestCommit(): UseSupabaseRealtimeReturn<LatestCommitData> {
    return useSupabaseRealtime<LatestCommitData>({
        tableName: "latest_commit",
        fallbackInterval: 30000, // Poll every 30 seconds
    });
}
