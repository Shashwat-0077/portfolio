// stores/realtimeStore.ts

import { create } from "zustand";

import { supabase } from "@/lib/supabase";
import type {
    TableData,
    ChannelManager,
    UseSupabaseRealtimeOptions,
} from "@/types/realtime-types";

export interface RealtimeStore {
    tables: Record<string, TableData>;
    channels: Record<string, ChannelManager>;
    subscribers: Record<string, Set<() => void>>;

    // Actions
    subscribe: (tableKey: string, callback: () => void) => () => void;
    setTableData: (tableKey: string, data: Partial<TableData>) => void;
    initializeTable: (
        tableKey: string,
        options: UseSupabaseRealtimeOptions
    ) => void;
    cleanup: (tableKey: string) => void;
    refetchTable: (tableKey: string, tableName: string) => Promise<void>;
}

export const useRealtimeStore = create<RealtimeStore>((set, get) => ({
    tables: {},
    channels: {},
    subscribers: {},

    subscribe: (tableKey: string, callback: () => void) => {
        const state = get();
        const currentSubscribers = state.subscribers[tableKey] || new Set();
        currentSubscribers.add(callback);

        set({
            subscribers: {
                ...state.subscribers,
                [tableKey]: currentSubscribers,
            },
        });

        // Return unsubscribe function
        return () => {
            const newState = get();
            const subs = newState.subscribers[tableKey];
            if (subs) {
                subs.delete(callback);
                if (subs.size === 0) {
                    // No more subscribers, cleanup
                    newState.cleanup(tableKey);
                }
            }
        };
    },

    setTableData: (tableKey: string, data: Partial<TableData>) => {
        const state = get();
        const currentData = state.tables[tableKey] || {
            data: null,
            loading: true,
            error: null,
            isRealtime: false,
            lastUpdated: 0,
        };

        const newTableData = {
            ...currentData,
            ...data,
            lastUpdated: Date.now(),
        };

        set({
            tables: {
                ...state.tables,
                [tableKey]: newTableData,
            },
        });

        // Notify all subscribers
        const subscribers = state.subscribers[tableKey];
        if (subscribers) {
            subscribers.forEach((callback) => callback());
        }
    },

    initializeTable: async (
        tableKey: string,
        options: UseSupabaseRealtimeOptions
    ) => {
        const state = get();

        // If already initialized, don't do it again
        if (state.channels[tableKey]) {
            return;
        }

        const {
            tableName,
            fallbackInterval = 30000,
            retryAttempts = 3,
            retryDelay = 2000,
        } = options;

        // Initialize table data
        state.setTableData(tableKey, {
            data: null,
            loading: true,
            error: null,
            isRealtime: false,
        });

        // Fetch initial data - get the first (and only) row
        try {
            const { data: fetchedData, error: fetchError } = await supabase
                .from(tableName)
                .select("*")
                .limit(1)
                .single();

            if (fetchError) {
                throw new Error(fetchError.message);
            }

            state.setTableData(tableKey, {
                data: fetchedData,
                loading: false,
                error: null,
            });
        } catch (err) {
            state.setTableData(tableKey, {
                loading: false,
                error:
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch initial data",
            });
        }

        // Setup channel manager
        const channelManager: ChannelManager = {
            channel: null,
            subscribers: new Set(),
            fallbackInterval: null,
            retryTimeout: null,
            retryCount: 0,
            options: { fallbackInterval, retryAttempts, retryDelay },
        };

        set({
            channels: {
                ...state.channels,
                [tableKey]: channelManager,
            },
        });

        // Setup realtime connection (imported from utils)
        const { setupRealtimeForTable } = await import(
            "@/utils/realtime-helpers"
        );
        setupRealtimeForTable(tableKey, tableName);
    },

    cleanup: (tableKey: string) => {
        const state = get();
        const channelManager = state.channels[tableKey];

        if (channelManager) {
            // Cleanup channel
            if (channelManager.channel) {
                channelManager.channel.unsubscribe();
            }

            // Clear intervals and timeouts
            if (channelManager.fallbackInterval) {
                clearInterval(channelManager.fallbackInterval);
            }
            if (channelManager.retryTimeout) {
                clearTimeout(channelManager.retryTimeout);
            }
        }

        // Remove from store
        const { [tableKey]: _removedChannel, ...remainingChannels } =
            state.channels;
        const { [tableKey]: _removedTable, ...remainingTables } = state.tables;
        const { [tableKey]: _removedSubscribers, ...remainingSubscribers } =
            state.subscribers;

        set({
            channels: remainingChannels,
            tables: remainingTables,
            subscribers: remainingSubscribers,
        });
    },

    refetchTable: async (tableKey: string, tableName: string) => {
        const state = get();

        state.setTableData(tableKey, { loading: true, error: null });

        try {
            const { data: fetchedData, error: fetchError } = await supabase
                .from(tableName)
                .select("*")
                .limit(1)
                .single();

            if (fetchError) {
                throw new Error(fetchError.message);
            }

            state.setTableData(tableKey, {
                data: fetchedData,
                loading: false,
                error: null,
            });
        } catch (err) {
            state.setTableData(tableKey, {
                loading: false,
                error:
                    err instanceof Error ? err.message : "Failed to fetch data",
            });
        }
    },
}));
