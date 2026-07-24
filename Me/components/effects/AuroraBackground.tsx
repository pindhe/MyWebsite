"use client";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 hero-gradient-bg" />
      <div className="aurora-orb aurora-orb-purple absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple/20 blur-[100px] md:blur-[120px]" />
      <div className="aurora-orb aurora-orb-blue absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[80px] md:blur-[100px]" />
    </div>
  );
}
