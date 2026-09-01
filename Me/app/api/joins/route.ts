import { NextResponse } from "next/server";
import { getJoinCount, incrementJoinCount } from "@/lib/joins-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COOKIE = "pindhe_joined";

function hasJoined(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  return new RegExp(`(?:^|;\\s*)${COOKIE}=1(?:;|$)`).test(cookie);
}

function withJoinCookie(body: unknown, joined: boolean) {
  const res = NextResponse.json(body);
  if (joined) {
    res.cookies.set(COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export async function GET(request: Request) {
  try {
    const count = await getJoinCount();
    return NextResponse.json({ count, joined: hasJoined(request) });
  } catch {
    return NextResponse.json({ count: 1, joined: false });
  }
}

export async function POST(request: Request) {
  try {
    const count = await getJoinCount();
    if (hasJoined(request)) {
      return withJoinCookie({ count, joined: true }, true);
    }
    const next = await incrementJoinCount();
    return withJoinCookie({ count: next, joined: true }, true);
  } catch {
    return NextResponse.json({ count: 1, joined: false }, { status: 500 });
  }
}
