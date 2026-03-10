import {
  getImmigrationDashTopLeaderboardEntries,
  LeaderboardStorageNotConfiguredError,
  saveImmigrationDashLeaderboardEntry,
} from "@/lib/immigration-dash-leaderboard-store";

const COUNTRY_CODE_RE = /^(?:[A-Z]{2}|OTHER)$/;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const entries = await getImmigrationDashTopLeaderboardEntries(10);
    return Response.json({ entries });
  } catch (error) {
    if (error instanceof LeaderboardStorageNotConfiguredError) {
      return Response.json({ error: "Leaderboard database is not configured." }, { status: 503 });
    }

    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const countryCode = typeof data?.countryCode === "string" ? data.countryCode.trim().toUpperCase() : "";
    const countryName = typeof data?.countryName === "string" ? data.countryName.trim() : "";
    const score = typeof data?.score === "number" ? data.score : Number(data?.score);

    if (!COUNTRY_CODE_RE.test(countryCode) || !countryName || countryName.length > 60 || !Number.isFinite(score) || score < 0) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const entry = await saveImmigrationDashLeaderboardEntry({
      countryCode,
      countryName,
      score,
    });

    const entries = await getImmigrationDashTopLeaderboardEntries(10);

    return Response.json({
      entry,
      entries,
      madeTop10: entries.some((item) => item.id === entry.id),
    });
  } catch (error) {
    if (error instanceof LeaderboardStorageNotConfiguredError) {
      return Response.json({ error: "Leaderboard database is not configured." }, { status: 503 });
    }

    throw error;
  }
}
