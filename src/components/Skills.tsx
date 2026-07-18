import React, { useRef, useMemo } from "react";
import {
  Layout,
  Server,
  Database,
  Sparkles,
  Cloud,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { getSkillCategories, type SkillCategory } from "@/data/portfolioData";
import { gsap, registerGsap, splitLinesReveal, revertSplitText, REPLAY } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  cloud: Cloud,
  puzzle: Puzzle,
};

const Skills: React.FC = () => {
  const { t, locale } = useTranslation();
  const skillCards = useMemo(() => getSkillCategories(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        splitLinesReveal(titleRef.current);
      });

      if (!gridRef.current) return () => {
        cancelled = true;
        revertSplitText(titleRef.current);
      };

      const blocks = gridRef.current.querySelectorAll(".skill-block");
      const pills = gridRef.current.querySelectorAll(".skill-pill");

      gsap.fromTo(
        blocks,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            ...REPLAY,
          },
        }
      );

      gsap.fromTo(
        pills,
        { y: 16, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 72%",
            ...REPLAY,
          },
        }
      );

      return () => {
        cancelled = true;
        revertSplitText(titleRef.current);
      };
    },
    { scope: sectionRef, dependencies: [locale, t.skills.title], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} id="skills" className="section-pad border-t border-[var(--line-soft)] bg-[var(--surface)]">
      <p className="label mb-4">{t.skills.label}</p>
      <h2 key={locale} ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[16ch]">
        {t.skills.title}
      </h2>
      <p className="body-lg mb-14">{t.skills.subtitle}</p>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {skillCards.map((category: SkillCategory, index) => {
          const Icon = iconMap[category.icon] || Layout;
          return (
            <div
              key={category.id}
              className="skill-block opacity-0 group border border-[var(--line)] bg-[var(--bg)] p-6 md:p-7 hover:border-[var(--accent)]/50 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--line)]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="inline-flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--line)] text-[var(--accent)] group-hover:bg-[var(--accent-dim)] transition-colors duration-300">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-[var(--step-0)] md:text-[var(--step-1)] font-semibold tracking-tight truncate">
                    {category.title}
                  </h3>
                </div>
                <span className="label text-[var(--accent)] shrink-0 ml-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="skill-pill opacity-0 px-3 py-1.5 border border-[var(--line)] text-[var(--step--1)] text-[var(--muted)] font-medium tracking-wide hover:text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
