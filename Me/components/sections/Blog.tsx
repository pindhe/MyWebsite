"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { blogPosts } from "@/lib/config";
import { cn } from "@/lib/utils";

const categoryColors: Record<string, string> = {
  Programming: "from-blue-600/80 to-blue-400/80",
  "UI/UX": "from-pink-600/80 to-pink-400/80",
  AI: "from-violet-600/80 to-violet-400/80",
  Career: "from-amber-600/80 to-amber-400/80",
};

export function Blog() {
  return (
    <section id="blog" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Blog"
          title="Latest Articles"
          subtitle="Tech tips, programming insights, AI trends, and career advice from my journey."
        />

        <div className="mb-8 flex items-center justify-center gap-2 text-sm text-slate-400">
          <BookOpen className="h-4 w-4 text-purple-light" />
          <span>{blogPosts.length} articles · Updated regularly</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard className="group flex h-full flex-col !p-0 overflow-hidden">
                <div
                  className={cn(
                    "h-2 bg-gradient-to-r",
                    categoryColors[post.category] ?? "from-purple to-purple-bright"
                  )}
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-block w-fit rounded-full bg-purple/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-purple-light">
                    {post.category}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold leading-snug group-hover:text-purple-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> {post.date}
                    </span>
                    {"readTime" in post && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-purple-light opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
