import React from "react";
import { useTranslation } from "@/i18n/useTranslation";

const StatsStrip: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className="stats-strip grid grid-cols-2 lg:grid-cols-4 gap-px border border-[var(--line)] bg-[var(--line)] mb-10"
      aria-label="Career highlights"
    >
      {t.hero.stats.map((stat) => (
        <div key={stat.label} className="stats-strip__item bg-[var(--bg)] px-4 py-5 sm:px-5 sm:py-6">
          <p className="text-[var(--step-2)] sm:text-[var(--step-3)] font-semibold tracking-tight text-[var(--fg)] leading-none">
            {stat.value}
          </p>
          <p className="label mt-3 text-[var(--muted)] normal-case tracking-[0.08em]">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
