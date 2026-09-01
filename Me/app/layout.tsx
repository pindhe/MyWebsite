import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/config";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4fb" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.shortName} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.bio,
  keywords: [
    "Nour Hassan",
    "Full Stack Developer",
    "Software Engineer",
    "UI/UX Designer",
    "Hargeisa",
    "Somaliland",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: `${siteConfig.shortName} — Software Engineer & Full Stack Developer`,
    description: siteConfig.bio,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.shortName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.shortName} — Portfolio`,
    description: siteConfig.bio,
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  icons: { icon: "/icon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hargeisa",
    addressCountry: "Somaliland",
  },
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

const themeScript = `
(function(){
  try {
    var k='eng-pindhe-theme';
    var s=localStorage.getItem(k);
    var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
    var t=s==='light'||s==='dark'?s:(d?'dark':'light');
    document.documentElement.classList.add(t);
    document.documentElement.dataset.theme=t;
    document.documentElement.style.colorScheme=t;
    var m=document.querySelector('meta[name="theme-color"]');
    if(m) m.setAttribute('content', t==='dark'?'#050816':'#f6f4fb');
  } catch(e) { document.documentElement.classList.add('dark'); }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
