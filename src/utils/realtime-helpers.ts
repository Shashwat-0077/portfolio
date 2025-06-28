// utils/realtimeHelpers.ts

import { supabase } from "@/lib/supabase";
import { useRealtimeStore } from "@/stores/realtime-store";

export const setupRealtimeForTable = (tableKey: string, tableName: string) => {
    const store = useRealtimeStore.getState();
    const channelManager = store.channels[tableKey];

    if (!channelManager || channelManager.channel) {
        return;
    }

    console.log(`[${tableKey}] Setting up realtime connection...`);

    const channel = supabase
        .channel(`${tableKey}_changes`)
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: tableName,
            },
            async (payload) => {
                console.log(`[${tableKey}] Realtime update received:`, payload);

                if (payload.eventType === "DELETE") {
                    store.setTableData(tableKey, { data: null, error: null });
                } else {
                    store.setTableData(tableKey, {
                        data: payload.new,
                        error: null,
                    });
                }
            }
        )
        .subscribe((status) => {
            console.log(`[${tableKey}] Realtime status:`, status);

            if (status === "SUBSCRIBED") {
                console.log(`[${tableKey}] Realtime connected successfully`);
                store.setTableData(tableKey, { isRealtime: true });
                stopFallbackPolling(tableKey);
                // Reset retry count
                const currentManager =
                    useRealtimeStore.getState().channels[tableKey];
                if (currentManager) {
                    currentManager.retryCount = 0;
                }
            } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                console.error(
                    `[${tableKey}] Realtime connection failed:`,
                    status
                );
                handleRealtimeFailure(tableKey, tableName);
            }
        });

    // Update channel in manager
    const currentState = useRealtimeStore.getState();
    const currentManager = currentState.channels[tableKey];
    if (currentManager) {
        currentManager.channel = channel;
    }
};

export const startFallbackPolling = (tableKey: string, tableName: string) => {
    const store = useRealtimeStore.getState();
    const channelManager = store.channels[tableKey];

    if (!channelManager || channelManager.fallbackInterval) {
        return;
    }

    console.log(
        `[${tableKey}] Starting fallback polling every ${channelManager.options.fallbackInterval}ms`
    );

    store.setTableData(tableKey, { isRealtime: false });

    channelManager.fallbackInterval = setInterval(async () => {
        try {
            const { data: fetchedData, error: fetchError } = await supabase
                .from(tableName)
                .select("*")
                .limit(1)
                .single();

            if (fetchError) {
                throw new Error(fetchError.message);
            }

            store.setTableData(tableKey, {
                data: fetchedData,
                error: null,
            });
        } catch (err) {
            store.setTableData(tableKey, {
                error:
                    err instanceof Error ? err.message : "Failed to fetch data",
            });
        }
    }, channelManager.options.fallbackInterval);
};

export const stopFallbackPolling = (tableKey: string) => {
    const store = useRealtimeStore.getState();
    const channelManager = store.channels[tableKey];

    if (channelManager && channelManager.fallbackInterval) {
        clearInterval(channelManager.fallbackInterval);
        channelManager.fallbackInterval = null;
        console.log(`[${tableKey}] Stopped fallback polling`);
    }
};

export const handleRealtimeFailure = (tableKey: string, tableName: string) => {
    const store = useRealtimeStore.getState();
    const channelManager = store.channels[tableKey];

    if (!channelManager) {
        return;
    }

    channelManager.retryCount++;

    if (channelManager.retryCount <= channelManager.options.retryAttempts) {
        console.log(
            `[${tableKey}] Retrying realtime connection (${channelManager.retryCount}/${channelManager.options.retryAttempts}) in ${channelManager.options.retryDelay}ms...`
        );

        channelManager.retryTimeout = setTimeout(() => {
            const currentManager =
                useRealtimeStore.getState().channels[tableKey];
            if (currentManager && currentManager.channel) {
                currentManager.channel.unsubscribe();
                currentManager.channel = null;
                setupRealtimeForTable(tableKey, tableName);
            }
        }, channelManager.options.retryDelay);
    } else {
        console.log(
            `[${tableKey}] Max retry attempts reached, falling back to polling`
        );
        store.setTableData(tableKey, { isRealtime: false });
        startFallbackPolling(tableKey, tableName);
    }
};
