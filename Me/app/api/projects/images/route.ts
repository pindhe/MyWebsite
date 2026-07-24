import { NextResponse } from "next/server";
import { projects } from "@/lib/config";
import { fetchAllProjectImages } from "@/lib/github-project-images";

export const revalidate = 3600;

export async function GET() {
  try {
    const repos = projects.map((p) => p.repo);
    const images = await fetchAllProjectImages(repos);
    return NextResponse.json({ images, updatedAt: new Date().toISOString() });
  } catch {
    return NextResponse.json({ images: {}, updatedAt: null }, { status: 200 });
  }
}
