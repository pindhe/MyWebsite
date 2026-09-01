import { NextResponse } from "next/server";
import { addJoinCount, getJoinCount } from "@/lib/joins-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStore = { "Cache-Control": "no-store, must-revalidate" };

export async function GET() {
  try {
    const count = await getJoinCount();
    return NextResponse.json({ count }, { headers: noStore });
  } catch {
    return NextResponse.json({ count: 0 }, { headers: noStore });
  }
}

export async function POST(request: Request) {
  try {
    let add = 1;
    try {
      const body = (await request.json()) as { add?: number };
      if (typeof body.add === "number" && Number.isFinite(body.add)) {
        add = body.add;
      }
    } catch {
      add = 1;
    }
    const count = await addJoinCount(add);
    return NextResponse.json({ count }, { headers: noStore });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 500, headers: noStore });
  }
}
