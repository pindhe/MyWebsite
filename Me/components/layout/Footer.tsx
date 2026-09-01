import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { navLinks, siteConfig } from "@/lib/config";

const socials = [
  { icon: Github, href: siteConfig.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="theme-footer py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="inline-flex" aria-label={siteConfig.shortName}>
              <BrandLogo size={52} />
            </a>
            <p className="mt-3 text-sm text-slate-400">{siteConfig.bio.slice(0, 100)}...</p>
          </div>
          <div>
            <h3 className="font-heading font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-purple-light">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold">Follow</h3>
            <div className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass text-slate-400 hover:text-purple-light"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--border-default)] pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
