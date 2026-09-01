"use client";

import { useCallback, useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  MessageCircle,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactThanks } from "@/components/ui/ContactThanks";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hint: "Best for detailed inquiries",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.whatsapp,
    hint: "Fastest way to reach me",
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    hint: "Available for remote & local work",
  },
];

const socials = [
  { icon: Github, href: siteConfig.github, label: "GitHub", color: "hover:text-purple-light" },
  { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: MessageCircle, href: siteConfig.whatsapp, label: "WhatsApp", color: "hover:text-green-400" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email", color: "hover:text-purple-light" },
];

type FormStatus = "idle" | "sending" | "sent" | "error";

const inputClass = "theme-input glass h-12 w-full px-4 text-sm";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const closeThanks = useCallback(() => setStatus("idle"), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Send failed");
      }
      setStatus("sent");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send the message.");
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-surface/30">
      <ContactThanks open={status === "sent"} onClose={closeThanks} />
      {/* Background accent */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-purple/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Contact"
          title="Get In Touch"
          subtitle="Have a project in mind? Let's build something exceptional together."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left — Contact info */}
          <div className="space-y-5 lg:col-span-5">
            <GlassCard className="!p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple/20">
                  <MessageCircle className="h-6 w-6 text-purple-light" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">Let&apos;s talk</h3>
                  <p className="text-sm text-slate-400">I&apos;m open to new opportunities</p>
                </div>
              </div>

              <div className="space-y-4">
                {contactMethods.map(({ icon: Icon, label, value, href, hint }) => (
                  <div key={label} className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-white/5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-colors group-hover:bg-purple/25">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="mt-0.5 flex items-center gap-1 text-sm font-medium transition-colors hover:text-purple-light"
                        >
                          {value}
                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium">{value}</p>
                      )}
                      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3">
                <Clock className="h-4 w-4 shrink-0 text-green-400" />
                <p className="text-xs text-slate-300">
                  <span className="font-semibold text-green-400">24h response</span> — usually replies the same day
                </p>
              </div>
            </GlassCard>

            {/* Social links */}
            <GlassCard className="!p-6">
              <p className="mb-4 text-sm font-medium text-slate-400">Connect with me</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("social-link-card", color)}
                  >
                    <Icon className="h-5 w-5" />
                    {label}
                  </a>
                ))}
              </div>
            </GlassCard>

            {/* Quick WhatsApp CTA */}
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-fast flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-shadow hover:shadow-[0_0_40px_rgba(34,197,94,0.45)]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Form */}
          <GlassCard className="lg:col-span-7 !p-6 sm:!p-8">
            <h3 className="font-heading text-xl font-semibold">Send a Message</h3>
            <p className="mt-1 text-sm text-slate-400">Fill out the form and I&apos;ll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="hidden" aria-hidden>
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-400">
                    Full Name <span className="text-purple-light">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-400">
                    Email Address <span className="text-purple-light">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Message <span className="text-purple-light">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={8}
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, timeline, and budget..."
                  className={cn(inputClass, "h-auto resize-none py-3")}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {status === "sent" ? (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    Message sent — I&apos;ll reply to your email.
                  </div>
                ) : status === "error" ? (
                  <p className="text-sm text-red-400">{error}</p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Your message is sent straight to {siteConfig.email}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
