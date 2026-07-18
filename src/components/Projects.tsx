import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { sideProjects, freelanceProjects, Project } from "@/data/portfolioData";
import { gsap, revealUp, splitLinesReveal, registerGsap, REPLAY } from "@/lib/animations";
import { GithubIcon } from "@/components/Icons";

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<"side" | "freelance">("side");

  const projects = category === "side" ? sideProjects : freelanceProjects;

  useGSAP(
    () => {
      registerGsap();
      document.fonts.ready.then(() => {
        splitLinesReveal(titleRef.current);
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!listRef.current) return;
      registerGsap();

      const rows = listRef.current.querySelectorAll(".project-row");
      const thumbs = listRef.current.querySelectorAll(".project-thumb");

      gsap.set(rows, { clearProps: "all" });

      revealUp(rows, listRef.current, { stagger: 0.1, y: 40, x: -16 });

      gsap.fromTo(
        thumbs,
        { clipPath: "inset(100% 0 0 0)", scale: 1.06 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.05,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
            ...REPLAY,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [category] }
  );

  return (
    <section ref={sectionRef} id="projects-sec" className="section-pad border-t border-[var(--line-soft)]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
        <div>
          <p className="label mb-4">Selected work</p>
          <h2 ref={titleRef} className="headline text-[var(--fg)]">
            Recent projects
          </h2>
        </div>

        <div className="flex gap-2">
          {(["side", "freelance"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setCategory(key)}
              className={`px-4 py-2 text-[var(--step--1)] tracking-[var(--tracking-label)] uppercase font-semibold border transition-colors duration-300 ${
                category === key
                  ? "bg-[var(--accent)] text-[#08090b] border-[var(--accent)]"
                  : "border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)]"
              }`}
            >
              {key === "side" ? "Side" : "Freelance"}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="flex flex-col">
        {projects.map((project: Project, index) => (
          <article
            key={project.uniqueId}
            className="project-row group grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-start md:items-center py-8 border-t border-[var(--line)] last:border-b opacity-0"
          >
            <span className="label text-[var(--muted)] pt-1">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-col md:flex-row md:items-center gap-5 min-w-0">
              <div className="project-thumb relative w-full md:w-44 h-32 overflow-hidden bg-[var(--surface)] shrink-0">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="180px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-[var(--step-2)] font-semibold tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[var(--muted)] text-[var(--step--1)] mt-2 line-clamp-2 max-w-xl">
                  {project.description}
                </p>
                <p className="mt-3 text-[var(--step--1)] text-[var(--muted)] tracking-wide">
                  {project.techs.join(" · ")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-self-end">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !px-3 !py-2"
              >
                Live
              </a>
              {project.source && (
                <a
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !px-3 !py-2 inline-flex items-center gap-1.5"
                  aria-label={`${project.title} GitHub`}
                >
                  <GithubIcon size={14} />
                  Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
