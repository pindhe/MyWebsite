import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nour Hassan — Portfolio",
    short_name: "Nour Hassan",
    description: "Software Engineer & Full Stack Developer Portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#7C3AED",
    icons: [
      { src: "/logo.jpg", sizes: "192x192", type: "image/jpeg" },
      { src: "/logo.jpg", sizes: "512x512", type: "image/jpeg" },
    ],
  };
}
