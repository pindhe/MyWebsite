"use client";

import { useState } from "react";
import {
  Monitor,
  Server,
  Smartphone,
  Wrench,
  Palette,
  Cpu,
  Users,
  type LucideIcon,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skills } from "@/lib/config";
import { cn } from "@/lib/utils";

const categories: { id: string; label: string; icon: LucideIcon; data: string[] }[] = [
  { id: "engineering", label: "Engineering", icon: Cpu, data: skills.engineering },
  { id: "frontend", label: "Frontend", icon: Monitor, data: skills.frontend },
  { id: "backend", label: "Backend", icon: Server, data: skills.backend },
  { id: "mobile", label: "Mobile", icon: Smartphone, data: skills.mobile },
  { id: "design", label: "Design & Media", icon: Palette, data: skills.design },
  { id: "systems", label: "IT & Systems", icon: Wrench, data: skills.systems },
  { id: "soft", label: "Professional", icon: Users, data: skills.soft },
];

const skillLevels: Record<string, number> = {
  HTML5: 95, CSS3: 92, JavaScript: 90, TypeScript: 88, React: 92, "Next.js": 90,
  "Tailwind CSS": 93, Bootstrap: 85, Python: 88, Django: 82, FastAPI: 85,
  Laravel: 80, PHP: 78, "Node.js": 88, Express: 86, MySQL: 90, PostgreSQL: 85,
  MongoDB: 82, SQLite: 88, "SQL Server": 75, Flutter: 80, "React Native": 78,
  Git: 92, GitHub: 95, Figma: 85, "VS Code": 95, Docker: 75, Firebase: 80,
  Vercel: 90, Render: 82, Linux: 78, AWS: 72, Azure: 70, "Google Cloud": 70,
  Leadership: 88, Communication: 90, "Problem Solving": 92, Teamwork: 88,
  "Time Management": 85, "Critical Thinking": 90,
};

function SkillBar({ name }: { name: string }) {
  const level = skillLevels[name] ?? 80;
  return (
    <div className="group">
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="font-medium text-slate-300 group-hover:text-white">{name}</span>
        <span className="text-xs text-purple-light">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple to-purple-bright transition-[width] duration-700 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const [active, setActive] = useState("engineering");
  const current = categories.find((c) => c.id === active)!;
  const totalSkills = Object.values(skills).flat().length;

  return (
    <section id="skills" className="section-padding bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Skills"
          title="Core Skills & Expertise"
          subtitle="Skills from the CV — software engineering, design, media, IT systems, and professional work."
        />

        {/* Stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Technologies", value: `${totalSkills}+` },
            { label: "Categories", value: `${categories.length}` },
            { label: "Experience", value: "4+ yrs" },
            { label: "Proficiency", value: "Advanced" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className="font-heading text-xl font-bold gradient-text">{s.value}</p>
              <p className="mt-1 text-xs text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Category tabs with icons */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={cn(
                "filter-chip inline-flex items-center gap-2",
                active === cat.id
                  ? "bg-purple text-white shadow-glow"
                  : "glass text-slate-400 hover:text-white"
              )}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div key={active}>
          <GlassCard className="grid gap-5 sm:grid-cols-2">
            {current.data.map((skill) => (
              <SkillBar key={skill} name={skill} />
            ))}
          </GlassCard>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {current.data.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-purple/20 bg-purple/5 px-3 py-1 text-xs font-medium text-purple-light"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
