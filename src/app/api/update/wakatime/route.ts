"server-only";

export const runtime = "edge";

export async function GET(): Promise<Response> {
    try {
        const wakatimeRes = await fetch(
            "https://wakatime.com/api/v1/users/current/summaries?range=Today",
            {
                headers: {
                    Authorization: `Basic ${btoa(process.env.WAKATIME_API_KEY!)}`,
                },
            }
        );

        if (!wakatimeRes.ok) {
            return new Response("Failed to fetch WakaTime data", {
                status: 500,
            });
        }

        const json = await wakatimeRes.json();
        const summary = json.data?.[0];

        const payload = {
            id: "default",
            total_time: summary?.grand_total?.text ?? "0 secs",
            top_language: summary?.languages?.[0]?.name ?? "Unknown",
            editor: summary?.editors?.[0]?.name ?? "Unknown",
            os: summary?.operating_systems?.[0]?.name ?? "Unknown",
        };

        const supabaseRes = await fetch(
            `${process.env.SUPABASE_URL!}/rest/v1/wakatime_stats?on_conflict=id`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apikey: process.env.SUPABASE_KEY!,
                    Authorization: `Bearer ${process.env.SUPABASE_KEY!}`,
                    Prefer: "resolution=merge-duplicates",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!supabaseRes.ok) {
            const error = await supabaseRes.text();
            return new Response(`Supabase error: ${error}`, { status: 500 });
        }

        return new Response("✅ WakaTime data updated", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return new Response("Error: " + error.message, { status: 500 });
        }

        return new Response("Unknown error occurred", { status: 500 });
    }
}
