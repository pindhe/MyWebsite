"use client";

import { useState } from "react";
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

const projectTypes = [
  "Website Development",
  "Mobile App",
  "UI/UX Design",
  "Backend / API",
  "AI Solutions",
  "Consultation",
  "Other",
];

type FormStatus = "idle" | "sending" | "sent" | "error";

const inputClass = "theme-input glass h-12 w-full px-4 text-sm";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    projectType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      `Project Type: ${form.projectType || "Not specified"}`,
      `Subject: ${form.subject}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[Portfolio] ${form.subject}`
    )}&body=${encodeURIComponent(body)}`;

    await new Promise((r) => setTimeout(r, 800));
    window.location.href = mailto;

    setStatus("sent");
    setForm({ name: "", email: "", phone: "", subject: "", projectType: "", message: "" });
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-surface/30">
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-medium text-slate-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+252 63 000 0000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="mb-1.5 block text-xs font-medium text-slate-400">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={cn(inputClass, "cursor-pointer appearance-none")}
                  >
                    <option value="" className="bg-surface-deep">
                      Select a service
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-surface-deep">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Subject <span className="text-purple-light">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry / Collaboration"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-400">
                  Message <span className="text-purple-light">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
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
                    Opening your email client — message ready to send!
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">
                    Your message opens in your default email app
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
