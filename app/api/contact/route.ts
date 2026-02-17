import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const data = await request.json();

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "richardskinnermail@gmail.com",
    subject: "New message from website",
    html: `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `,
  });

  return new Response("OK");
}
