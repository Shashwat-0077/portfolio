// types/realtime.ts

export interface UseSupabaseRealtimeOptions {
    tableName: string;
    fallbackInterval?: number;
    retryAttempts?: number;
    retryDelay?: number;
}

export interface UseSupabaseRealtimeReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    isRealtime: boolean;
    refetch: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TableData<T = any> {
    data: T | null;
    loading: boolean;
    error: string | null;
    isRealtime: boolean;
    lastUpdated: number;
}

export interface ChannelManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel: any;
    subscribers: Set<string>;
    fallbackInterval: NodeJS.Timeout | null;
    retryTimeout: NodeJS.Timeout | null;
    retryCount: number;
    options: {
        fallbackInterval: number;
        retryAttempts: number;
        retryDelay: number;
    };
}

// Predefined data types for convenience hooks
export interface NowPlayingData {
    id: string;
    title: string;
    artist: string;
    artwork: string;
    duration: string;
    genre: string;
    url: string;
    updated_at: string;
}

export interface LearningData {
    id: string;
    topic: string;
    note: string;
    resource_link: string;
    tags: string;
    updated_at: string;
}

export interface WakatimeStatsData {
    id: string;
    total_time: string;
    top_language: string;
    editor: string;
    os: string;
    hash: string;
    updated_at: string;
}

export interface LatestCommitData {
    id: string;
    message: string;
    url: string;
    repo_name: string;
    commit_at: string;
    hash: string;
    updated_at: string;
}
