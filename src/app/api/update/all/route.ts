"server-only";

export const runtime = "edge";

interface GitHubEvent {
    type: string;
    repo: { name: string };
    payload: {
        commits: { sha: string; message: string }[];
    };
    created_at: string;
}

interface WakaTimeResponse {
    data?: Array<{
        grand_total?: { text: string };
        languages?: Array<{ name: string }>;
        editors?: Array<{ name: string }>;
        operating_systems?: Array<{ name: string }>;
    }>;
}

interface UpdateResult {
    success: boolean;
    error?: string;
}

export async function GET(): Promise<Response> {
    const startTime = Date.now();
    console.log("🚀 Cron job started at:", new Date().toISOString());

    try {
        // Step 1: Fetch both APIs concurrently with timeout
        const fetchWithTimeout = (
            url: string,
            options: RequestInit,
            timeout = 4000
        ) => {
            return Promise.race([
                fetch(url, options),
                new Promise<never>((_, reject) =>
                    setTimeout(() => reject(new Error("Timeout")), timeout)
                ),
            ]);
        };

        const [githubRes, wakatimeRes] = await Promise.allSettled([
            fetchWithTimeout(
                `https://api.github.com/users/${process.env.GITHUB_USERNAME}/events/public`,
                {
                    headers: {
                        "User-Agent": "supabase-sync",
                        Accept: "application/vnd.github+json",
                    },
                }
            ),
            fetchWithTimeout(
                "https://wakatime.com/api/v1/users/current/summaries?range=Today",
                {
                    headers: {
                        Authorization: `Basic ${btoa(process.env.WAKATIME_API_KEY!)}`,
                    },
                }
            ),
        ]);

        // Step 2: Process GitHub data
        let commitData = null;
        if (githubRes.status === "fulfilled" && githubRes.value.ok) {
            const events: GitHubEvent[] = await githubRes.value.json();
            const push = events.find(
                (e) => e.type === "PushEvent" && e.payload.commits.length > 0
            );

            if (push) {
                const latestCommit = push.payload.commits[0];
                commitData = {
                    id: "default",
                    message: latestCommit.message,
                    repo_name: push.repo.name,
                    url: `https://github.com/${push.repo.name}/commit/${latestCommit.sha}`,
                    commit_at: new Date(push.created_at).toISOString(),
                };
            }
        }

        // Step 3: Process WakaTime data
        let wakatimeData = null;
        if (wakatimeRes.status === "fulfilled" && wakatimeRes.value.ok) {
            const json: WakaTimeResponse = await wakatimeRes.value.json();
            const summary = json.data?.[0];

            wakatimeData = {
                id: "default",
                total_time: summary?.grand_total?.text ?? "0 secs",
                top_language: summary?.languages?.[0]?.name ?? "Unknown",
                editor: summary?.editors?.[0]?.name ?? "Unknown",
                os: summary?.operating_systems?.[0]?.name ?? "Unknown",
            };
        }

        // Step 4: Update Supabase tables concurrently
        const updatePromises: Promise<UpdateResult>[] = [];

        if (commitData) {
            updatePromises.push(
                fetch(
                    `${process.env.SUPABASE_URL}/rest/v1/latest_commit?on_conflict=id`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            apikey: process.env.SUPABASE_KEY!,
                            Authorization: `Bearer ${process.env.SUPABASE_KEY!}`,
                            Prefer: "resolution=merge-duplicates",
                        },
                        body: JSON.stringify(commitData),
                    }
                ).then(async (res) => ({
                    success: res.ok,
                    error: res.ok
                        ? undefined
                        : `GitHub update failed: ${await res.text()}`,
                }))
            );
        }

        if (wakatimeData) {
            updatePromises.push(
                fetch(
                    `${process.env.SUPABASE_URL}/rest/v1/wakatime_stats?on_conflict=id`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            apikey: process.env.SUPABASE_KEY!,
                            Authorization: `Bearer ${process.env.SUPABASE_KEY!}`,
                            Prefer: "resolution=merge-duplicates",
                        },
                        body: JSON.stringify(wakatimeData),
                    }
                ).then(async (res) => ({
                    success: res.ok,
                    error: res.ok
                        ? undefined
                        : `WakaTime update failed: ${await res.text()}`,
                }))
            );
        }

        // Step 5: Wait for all updates and collect results
        const updateResults = await Promise.allSettled(updatePromises);

        const results = {
            github: {
                fetched: githubRes.status === "fulfilled" && githubRes.value.ok,
                hasCommit: !!commitData,
                updated: false,
                error: null as string | null,
            },
            wakatime: {
                fetched:
                    wakatimeRes.status === "fulfilled" && wakatimeRes.value.ok,
                hasData: !!wakatimeData,
                updated: false,
                error: null as string | null,
            },
        };

        // Process update results
        updateResults.forEach((result, index) => {
            const isGithub = commitData && index === 0;
            const isWakatime =
                wakatimeData && (commitData ? index === 1 : index === 0);

            if (result.status === "fulfilled") {
                if (isGithub) {
                    results.github.updated = result.value.success;
                    results.github.error = result.value.error || null;
                } else if (isWakatime) {
                    results.wakatime.updated = result.value.success;
                    results.wakatime.error = result.value.error || null;
                }
            } else {
                if (isGithub) {
                    results.github.error =
                        result.reason?.message || "Update failed";
                } else if (isWakatime) {
                    results.wakatime.error =
                        result.reason?.message || "Update failed";
                }
            }
        });

        // Step 6: Determine response
        const hasErrors = results.github.error || results.wakatime.error;
        const hasUpdates = results.github.updated || results.wakatime.updated;

        if (hasErrors && !hasUpdates) {
            return new Response(
                JSON.stringify({
                    message: "❌ All updates failed",
                    details: results,
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        if (hasErrors) {
            return new Response(
                JSON.stringify({
                    message: "⚠️ Partial success - some updates failed",
                    details: results,
                }),
                {
                    status: 207,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        if (!hasUpdates) {
            return new Response(
                JSON.stringify({
                    message: "ℹ️ No updates needed",
                    details: results,
                }),
                {
                    status: 204,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const response = JSON.stringify({
            message: "✅ All data synced successfully",
            details: results,
            executionTime: `${Date.now() - startTime}ms`,
        });

        console.log(
            "✅ Cron job completed successfully in",
            Date.now() - startTime,
            "ms"
        );

        return new Response(response, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: "❌ Unexpected error occurred",
                error: error instanceof Error ? error.message : "Unknown error",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
