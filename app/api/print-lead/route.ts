import { savePrintLead } from "@/lib/lead-store";

export async function POST(request: Request) {
  const data = await request.json();
  const firstName = typeof data?.firstName === "string" ? data.firstName.trim() : "";
  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const source = typeof data?.source === "string" ? data.source.trim() : "unknown";

  if (!firstName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response("Invalid input", { status: 400 });
  }

  await savePrintLead({
    firstName,
    email: email.toLowerCase(),
    source,
  });

  return new Response("OK");
}
