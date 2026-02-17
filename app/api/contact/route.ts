import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sanitize HTML to prevent XSS attacks
function sanitizeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate field types and lengths
    if (typeof data.name !== "string" || data.name.trim().length === 0 || data.name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (typeof data.email !== "string" || !isValidEmail(data.email) || data.email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (typeof data.message !== "string" || data.message.trim().length === 0 || data.message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeHTML(data.name.trim());
    const sanitizedEmail = sanitizeHTML(data.email.trim());
    const sanitizedMessage = sanitizeHTML(data.message.trim());

    // Send email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "richardskinnermail@gmail.com",
      subject: "New message from Thai Visa Checklist",
      html: `
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
