"use client";

import { useState } from "react";
import { Plus, Github, Mail, MessageCircle, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const links = [
  { icon: Github, href: siteConfig.github, label: "GitHub", className: "from-slate-700 to-slate-900" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp", className: "from-green-500 to-green-700" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn", className: "from-blue-600 to-blue-800" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email", className: "from-purple to-purple-bright" },
];

export function SocialFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {open &&
        links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === "Email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            style={{ animationDelay: `${i * 40}ms` }}
            className={cn(
              "fab-link fab-link-open bg-gradient-to-br",
              link.className
            )}
            aria-label={link.label}
            onClick={() => setOpen(false)}
          >
            <link.icon className="h-5 w-5" />
          </a>
        ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fab-btn"
        aria-label={open ? "Close menu" : "Open social links"}
        aria-expanded={open}
      >
        <Plus
          className={cn("h-7 w-7 transition-transform duration-150", open && "fab-icon-open")}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}
