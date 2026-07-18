import React from "react";
import { Accessibility, Gauge, Keyboard } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";

const QualityBadges: React.FC = () => {
  const { t } = useTranslation();

  const badges = [
    { Icon: Accessibility, label: t.quality.reducedMotion },
    { Icon: Gauge, label: t.quality.performance },
    { Icon: Keyboard, label: t.quality.keyboard },
  ];

  return (
    <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mt-8" aria-label="Quality and accessibility">
      {badges.map(({ Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 border border-[var(--line)] px-3 py-2 text-[var(--step--1)] text-[var(--muted)] bg-[var(--surface)]/40"
        >
          <Icon size={14} className="shrink-0 text-[var(--accent)]" aria-hidden />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default QualityBadges;
