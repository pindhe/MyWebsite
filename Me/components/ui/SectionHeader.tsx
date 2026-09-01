interface SectionHeaderProps {
  tag: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ tag, title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={centered ? "mx-auto mb-16 max-w-2xl text-center" : "mb-16"}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-title gradient-text">{title}</h2>
      {subtitle && <p className="theme-text-muted mt-4 text-lg">{subtitle}</p>}
    </div>
  );
}
