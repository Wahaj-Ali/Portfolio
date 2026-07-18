import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { getFocusAreas } from "@/data/portfolioData";
import { registerGsap, splitLinesReveal, splitWordsReveal, revertSplitText, revealUp } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const About: React.FC = () => {
  const { t, locale } = useTranslation();
  const focusAreas = useMemo(() => getFocusAreas(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        splitLinesReveal(titleRef.current);
        splitWordsReveal(leadRef.current, { delay: 0.1 });
      });

      revealUp(bodyRef.current?.querySelectorAll(".about-block") || [], sectionRef.current, {
        y: 36,
        stagger: 0.12,
      });

      return () => {
        cancelled = true;
        revertSplitText(titleRef.current);
        revertSplitText(leadRef.current);
      };
    },
    { scope: sectionRef, dependencies: [locale, t.about.title, t.about.lead], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} id="about" className="section-pad border-t border-[var(--line-soft)] bg-[var(--surface)]">
      <p className="label mb-4">{t.about.label}</p>
      <h2 key={locale} ref={titleRef} className="headline text-[var(--fg)] mb-10 max-w-[18ch]">
        {t.about.title}
      </h2>

      <p key={locale} ref={leadRef} className="text-[var(--step-2)] font-medium tracking-tight text-[var(--fg)] max-w-3xl mb-12 leading-snug">
        {t.about.lead}
      </p>

      <div ref={bodyRef} className="flex flex-col gap-14 max-w-5xl">
        <div className="about-block opacity-0 grid md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">{t.about.paragraph1}</p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">{t.about.paragraph2}</p>
        </div>

        <div className="about-block opacity-0">
          <p className="label mb-5">{t.about.whatIDo}</p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {focusAreas.map((item) => (
              <li
                key={item}
                className="list-marker-start relative text-[var(--fg)] text-[var(--step-0)] before:content-[''] before:absolute before:top-[0.7em] before:w-2 before:h-px before:bg-[var(--accent)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-block opacity-0 border border-[var(--line)] bg-[var(--bg)] p-6 md:p-8">
          <p className="label mb-4 text-[var(--accent)]">{t.about.highlight}</p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed mb-4">{t.about.highlightP1}</p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">{t.about.highlightP2}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
