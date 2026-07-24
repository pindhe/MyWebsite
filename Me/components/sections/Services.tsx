"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Globe,
  Smartphone,
  Server,
  Brain,
  Cloud,
  Plug,
  Database,
  MessageSquare,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/lib/config";

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Globe,
  Smartphone,
  Server,
  Brain,
  Cloud,
  Plug,
  Database,
  MessageSquare,
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Services"
          title="What I Offer"
          subtitle="End-to-end digital solutions — from design and development to deployment and consultation."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <GlassCard key={service.title} delay={i * 0.06} className="group relative !p-0 overflow-hidden">
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple/15 text-purple-light transition-all group-hover:bg-purple group-hover:text-white group-hover:shadow-glow">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold group-hover:text-purple-light transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.description}</p>
                  {"features" in service && service.features && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.features.map((f: string) => (
                        <li
                          key={f}
                          className="rounded-full border border-purple/15 bg-purple/5 px-2.5 py-0.5 text-[10px] font-medium text-purple-light"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border-t border-white/5 px-6 py-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors group-hover:text-purple-light"
                  >
                    Get started <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-purple/20 bg-gradient-to-r from-purple/20 via-purple/10 to-blue-600/10 p-8 text-center sm:p-10"
        >
          <h3 className="font-heading text-2xl font-bold">Ready to start your project?</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
            Let&apos;s discuss your ideas and turn them into a powerful digital product.
          </p>
          <a href="#contact" className="btn-primary mt-6 inline-flex">
            <MessageSquare className="h-5 w-5" /> Contact Me
          </a>
        </motion.div>
      </div>
    </section>
  );
}
