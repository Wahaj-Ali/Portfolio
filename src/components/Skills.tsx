import React, { useRef } from "react";
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
import { skillCards, SkillCategory } from "@/data/portfolioData";
import { gsap, registerGsap, splitLinesReveal, REPLAY } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  cloud: Cloud,
  puzzle: Puzzle,
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      document.fonts.ready.then(() => splitLinesReveal(titleRef.current));

      if (!gridRef.current) return;

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
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="skills" className="section-pad border-t border-[var(--line-soft)] bg-[var(--surface)]">
      <p className="label mb-4">Capabilities</p>
      <h2 ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[16ch]">
        Skills & tools
      </h2>
      <p className="body-lg mb-14">
        End-to-end delivery — frontend, backend, data, AI, cloud, and the integrations that tie products together.
      </p>

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
