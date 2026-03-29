import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Settle <onboarding@resend.dev>",
      to: "hi@settlewithai.com",
      subject: `New lead from settlewithai.com: ${email}`,
      text: `New contact form submission.\n\nEmail: ${email}\nSubmitted: ${new Date().toISOString()}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send" },
      { status: 500 }
    );
  }
}
