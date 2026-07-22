import React, { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { getExperienceItems, type ExperienceItem } from "@/data/portfolioData";
import {
  gsap,
  registerGsap,
  revertSplitText,
  revealUp,
  splitLinesReveal,
  ScrollTrigger,
  REPLAY,
  prefersReducedMotion,
} from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const NAV_SCROLL_OFFSET = 96;

function ExperiencePanel({
  exp,
  index,
  panelRef,
}: {
  exp: ExperienceItem;
  index: number;
  panelRef: (el: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={panelRef}
      id={`experience-${exp.id}`}
      className="journey-panel exp-panel border border-[var(--line)] bg-[var(--bg)] p-6 md:p-8 scroll-mt-28"
    >
      <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-[var(--line-soft)]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <p className="label mb-2 text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="text-[var(--step-2)] font-semibold tracking-tight text-[var(--fg)]">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {exp.company}
                </a>
              ) : (
                exp.company
              )}
            </h3>
            <p className="text-[var(--muted)] mt-1.5 font-medium">{exp.role}</p>
          </div>
          <div className="sm:text-right sm-text-end-on-rtl shrink-0 space-y-1">
            <p className="label text-[var(--fg)]">{exp.duration}</p>
            <p className="label">{exp.type}</p>
          </div>
        </div>
      </div>

      <ul className="space-y-3 text-[var(--muted)] text-[var(--step-0)]">
        {exp.bullets.map((bullet, i) => (
          <li
            key={i}
            className="exp-bullet list-marker-start relative before:content-[''] before:absolute before:top-[0.7em] before:w-2 before:h-px before:bg-[var(--accent)]"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

const Journey: React.FC = () => {
  const { t, locale } = useTranslation();
  const items = useMemo(() => getExperienceItems(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToPanel = (index: number) => {
    const el = panelRefs.current[index];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  useGSAP(
    () => {
      registerGsap();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        splitLinesReveal(titleRef.current, {
          duration: 1.15,
          stagger: 0.08,
          scrollTrigger: {
            trigger: titleRef.current || undefined,
            start: "top 88%",
            ...REPLAY,
          },
        });
      });

      const panels = gsap.utils.toArray<HTMLElement>(".journey-panel", panelsRef.current);
      revealUp(panels, panelsRef.current, { stagger: 0.1, y: 40, start: "top 85%" });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 42%",
            end: "bottom 38%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        });
      });

      return () => {
        cancelled = true;
        mm.revert();
        revertSplitText(titleRef.current);
      };
    },
    { scope: sectionRef, dependencies: [locale, t.journey.title, items.length], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} id="experience" className="section-pad border-t border-[var(--line-soft)]">
      <p className="label mb-4">{t.journey.label}</p>
      <h2 key={locale} ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[12ch]">
        {t.journey.title}
      </h2>
      <p className="body-lg mb-14 md:mb-16">{t.journey.subtitle}</p>

      <div className="journey-layout grid grid-cols-1 lg:grid-cols-[minmax(11rem,16rem)_1fr] gap-10 lg:gap-16 max-w-6xl">
        <aside className="hidden lg:block sticky top-28 self-start">
          <div className="journey-rail relative border-t border-[var(--line)]">
            {items.map((exp, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => scrollToPanel(index)}
                  aria-current={isActive ? "step" : undefined}
                  className={`journey-nav-item group relative w-full text-start py-4 border-b border-[var(--line)] transition-colors duration-300 ${
                    isActive ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  <span
                    className={`journey-nav-marker absolute inset-y-3 inset-inline-start-0 w-px transition-colors duration-300 ${
                      isActive ? "bg-[var(--accent)]" : "bg-transparent group-hover:bg-[var(--line)]"
                    }`}
                    aria-hidden
                  />
                  <span className="block ps-4">
                    <span className={`label block mb-1 ${isActive ? "text-[var(--accent)]" : ""}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-[var(--step--1)] font-semibold leading-snug">{exp.company}</span>
                    <span className="label block mt-1.5 opacity-80">{exp.duration}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div ref={panelsRef} className="flex flex-col gap-8 md:gap-10">
          {items.map((exp, index) => (
            <ExperiencePanel
              key={exp.id}
              exp={exp}
              index={index}
              panelRef={(el) => {
                panelRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
