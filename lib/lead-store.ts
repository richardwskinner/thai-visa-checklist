import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import { sql } from "@vercel/postgres";

export type PrintLead = {
  firstName: string;
  email: string;
  source: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const PRINT_LEADS_FILE = path.join(DATA_DIR, "print-leads.ndjson");

export async function savePrintLead(lead: PrintLead) {
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    await sql`
      CREATE TABLE IF NOT EXISTS print_leads (
        id UUID PRIMARY KEY,
        first_name TEXT NOT NULL,
        email TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await sql`
      INSERT INTO print_leads (id, first_name, email, source, created_at)
      VALUES (${id}, ${lead.firstName}, ${lead.email}, ${lead.source}, ${createdAt});
    `;

    return {
      id,
      firstName: lead.firstName,
      email: lead.email,
      source: lead.source,
      createdAt,
      storage: "postgres",
    };
  }

  await mkdir(DATA_DIR, { recursive: true });

  const record = {
    id: crypto.randomUUID(),
    firstName: lead.firstName,
    email: lead.email,
    source: lead.source,
    createdAt: new Date().toISOString(),
    storage: "file-fallback",
  };

  await appendFile(PRINT_LEADS_FILE, `${JSON.stringify(record)}\n`, "utf8");

  return record;
}
