import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { getExperienceItems, type ExperienceItem } from "@/data/portfolioData";
import { gsap, registerGsap, splitLinesReveal, revertSplitText, ScrollTrigger, REPLAY } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const Journey: React.FC = () => {
  const { t, locale } = useTranslation();
  const experienceData = useMemo(() => getExperienceItems(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

      if (!listRef.current || !lineRef.current) {
        return () => {
          cancelled = true;
          revertSplitText(titleRef.current);
        };
      }

      const rows = gsap.utils.toArray<HTMLElement>(".exp-row", listRef.current);

      gsap.set(rows, { clearProps: "transform" });

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
            end: "bottom 20%",
            scrub: 0.85,
          },
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        rows.forEach((row) => {
          const node = row.querySelector(".exp-node");
          const bullets = row.querySelectorAll(".exp-bullet");
          const company = row.querySelector(".exp-company");

          gsap.fromTo(
            row,
            { y: 64, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                end: "top 55%",
                scrub: 0.75,
              },
            }
          );

          if (company) {
            gsap.fromTo(
              company,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top 88%",
                  end: "top 58%",
                  scrub: 0.7,
                },
              }
            );
          }

          if (bullets.length) {
            gsap.fromTo(
              bullets,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.06,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top 82%",
                  end: "top 48%",
                  scrub: 0.65,
                },
              }
            );
          }

          if (node) {
            gsap.fromTo(
              node,
              { scale: 0.4, opacity: 0.4 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top 90%",
                  end: "top 55%",
                  scrub: 0.6,
                },
              }
            );
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        rows.forEach((row) => {
          const node = row.querySelector(".exp-node");
          const bullets = row.querySelectorAll(".exp-bullet");

          gsap.fromTo(
            row,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                toggleActions: "play none none none",
              },
            }
          );

          if (bullets.length) {
            gsap.fromTo(
              bullets,
              { y: 12, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.55,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 88%",
                  toggleActions: "play none none none",
                },
              }
            );
          }

          if (node) {
            gsap.fromTo(
              node,
              { scale: 0.5, opacity: 0.5 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 92%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        });

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          rows.forEach((row) => {
            const rect = row.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
              gsap.set(row, { opacity: 1, y: 0 });
              gsap.set(row.querySelectorAll(".exp-bullet"), { opacity: 1, y: 0 });
              gsap.set(row.querySelector(".exp-node"), { opacity: 1, scale: 1 });
            }
          });
        });
      });

      return () => {
        cancelled = true;
        revertSplitText(titleRef.current);
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [locale, t.journey.title], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} id="experience" className="section-pad border-t border-[var(--line-soft)]">
      <p className="label mb-4">{t.journey.label}</p>
      <h2 key={locale} ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[12ch]">
        {t.journey.title}
      </h2>
      <p className="body-lg mb-16">{t.journey.subtitle}</p>

      <div ref={listRef} className="timeline-list relative max-w-4xl pl-8 md:pl-14">
        <div className="timeline-rail absolute left-[7px] md:left-[15px] top-3 bottom-3 w-px bg-[var(--line)]">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-top bg-[var(--accent)]"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          {experienceData.map((exp: ExperienceItem, index) => (
            <article
              key={exp.id}
              className="exp-row relative border border-[var(--line)] bg-[var(--surface)] p-6 md:p-9"
              style={{ opacity: 0 }}
            >
              <span className="exp-node timeline-node absolute -left-[2.05rem] md:-left-[3.15rem] top-9 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_0_4px_var(--accent-dim)]" />

              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p className="label mb-2 text-[var(--accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="exp-company text-[var(--step-2)] font-semibold tracking-tight">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
