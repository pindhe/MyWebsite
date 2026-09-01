import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const runtime = "edge";
export const alt = `${siteConfig.shortName} Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoData = await fetch(new URL("../public/logo.jpg", import.meta.url)).then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1e1b4b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={logoData as unknown as string}
          width={160}
          height={160}
          style={{ borderRadius: 24, marginBottom: 28 }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            background: "linear-gradient(90deg, #8B5CF6, #A855F7, #60A5FA)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.shortName}
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 16 }}>
          Software Engineer · Full Stack Developer · UI/UX Designer
        </div>
      </div>
    ),
    { ...size }
  );
}
