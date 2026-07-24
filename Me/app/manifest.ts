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
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
