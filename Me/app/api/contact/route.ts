import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length < 8 || message.length > 4000) {
    return NextResponse.json({ ok: false, error: "Please write a longer message." }, { status: 400 });
  }

  const to = siteConfig.email;
  const subject = `Portfolio message from ${name}`;
  const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!sent.ok) {
        throw new Error("Resend failed");
      }
      return NextResponse.json({ ok: true });
    }

    const submitted = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!submitted.ok) {
      throw new Error("Mail delivery failed");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send the message. Please email me directly." },
      { status: 502 }
    );
  }
}
