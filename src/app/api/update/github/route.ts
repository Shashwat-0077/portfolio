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

export async function GET(): Promise<Response> {
    try {
        // Step 1: Fetch latest public events from GitHub
        const res = await fetch(
            `https://api.github.com/users/${process.env.GITHUB_USERNAME}/events/public`,
            {
                headers: {
                    "User-Agent": "supabase-github-sync",
                    Accept: "application/vnd.github+json",
                },
            }
        );

        if (!res.ok) {
            return new Response("Failed to fetch GitHub events", {
                status: 500,
            });
        }

        const events: GitHubEvent[] = await res.json();

        // Step 2: Find the most recent PushEvent with commits
        const push = events.find(
            (e) => e.type === "PushEvent" && e.payload.commits.length > 0
        );
        if (!push) {
            return new Response("No recent push events with commits found", {
                status: 204,
            });
        }

        const latestCommit = push.payload.commits[0];

        const commitData = {
            id: "default",
            message: latestCommit.message,
            repo_name: push.repo.name,
            url: `https://github.com/${push.repo.name}/commit/${latestCommit.sha}`,
            commit_at: new Date(push.created_at).toISOString(),
        };

        // Step 3: Upsert into Supabase
        const supabaseRes = await fetch(
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
        );

        if (!supabaseRes.ok) {
            const error = await supabaseRes.text();
            return new Response(`Supabase update failed: ${error}`, {
                status: supabaseRes.status,
            });
        }

        return new Response("✅ GitHub commit updated successfully");
    } catch (error) {
        if (error instanceof Error) {
            return new Response("Error: " + error.message, { status: 500 });
        }

        return new Response("Unknown error occurred", { status: 500 });
    }
}
