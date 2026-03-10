import { sql } from "@vercel/postgres";

export type ImmigrationDashLeaderboardEntry = {
  id: string;
  countryCode: string;
  countryName: string;
  score: number;
  createdAt: string;
};

type SaveLeaderboardEntryInput = {
  countryCode: string;
  countryName: string;
  score: number;
};

const HAS_DATABASE = Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL);

export class LeaderboardStorageNotConfiguredError extends Error {
  constructor() {
    super("Leaderboard storage is not configured.");
    this.name = "LeaderboardStorageNotConfiguredError";
  }
}

function normalizeEntry(value: unknown): ImmigrationDashLeaderboardEntry | null {
  if (!value || typeof value !== "object") return null;

  const candidate = value as Partial<ImmigrationDashLeaderboardEntry>;
  const id = typeof candidate.id === "string" ? candidate.id.trim() : "";
  const countryCode = typeof candidate.countryCode === "string" ? candidate.countryCode.trim().toUpperCase() : "";
  const countryName = typeof candidate.countryName === "string" ? candidate.countryName.trim() : "";
  const score = Number(candidate.score);
  const createdAtValue =
    typeof candidate.createdAt === "string" || candidate.createdAt instanceof Date
      ? new Date(candidate.createdAt).toISOString()
      : "";

  if (!id || !countryCode || !countryName || !Number.isFinite(score) || score < 0 || !createdAtValue) {
    return null;
  }

  return {
    id,
    countryCode,
    countryName,
    score: Math.round(score),
    createdAt: createdAtValue,
  };
}

function ensureLeaderboardStorage() {
  if (!HAS_DATABASE) {
    throw new LeaderboardStorageNotConfiguredError();
  }
}

async function ensureLeaderboardTable() {
  ensureLeaderboardStorage();

  await sql`
    CREATE TABLE IF NOT EXISTS immigration_dash_leaderboard (
      id UUID PRIMARY KEY,
      country_code TEXT NOT NULL,
      country_name TEXT NOT NULL,
      score INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

export async function saveImmigrationDashLeaderboardEntry(input: SaveLeaderboardEntryInput) {
  await ensureLeaderboardTable();

  const record: ImmigrationDashLeaderboardEntry = {
    id: crypto.randomUUID(),
    countryCode: input.countryCode.trim().toUpperCase(),
    countryName: input.countryName.trim(),
    score: Math.max(0, Math.round(input.score)),
    createdAt: new Date().toISOString(),
  };

  await sql`
    INSERT INTO immigration_dash_leaderboard (id, country_code, country_name, score, created_at)
    VALUES (${record.id}, ${record.countryCode}, ${record.countryName}, ${record.score}, ${record.createdAt});
  `;

  return {
    ...record,
    storage: "postgres" as const,
  };
}

export async function getImmigrationDashTopLeaderboardEntries(limit = 10) {
  await ensureLeaderboardTable();

  const { rows } = await sql<{
    id: string;
    countryCode: string;
    countryName: string;
    score: number;
    createdAt: string | Date;
  }>`
    SELECT
      id,
      country_code AS "countryCode",
      country_name AS "countryName",
      score,
      created_at AS "createdAt"
    FROM immigration_dash_leaderboard
    ORDER BY score DESC, created_at ASC
    LIMIT ${limit};
  `;

  return rows
    .map((row) => normalizeEntry(row))
    .filter((entry): entry is ImmigrationDashLeaderboardEntry => entry !== null);
}
