import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { focusAreas } from "@/data/portfolioData";
import { registerGsap, splitLinesReveal, splitWordsReveal, revealUp } from "@/lib/animations";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      document.fonts.ready.then(() => {
        splitLinesReveal(titleRef.current);
        splitWordsReveal(leadRef.current, { delay: 0.1 });
      });
      revealUp(bodyRef.current?.querySelectorAll(".about-block") || [], sectionRef.current, {
        y: 36,
        stagger: 0.12,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="section-pad border-t border-[var(--line-soft)] bg-[var(--surface)]">
      <p className="label mb-4">About</p>
      <h2 ref={titleRef} className="headline text-[var(--fg)] mb-10 max-w-[18ch]">
        Ideas into production-ready software.
      </h2>

      <p ref={leadRef} className="text-[var(--step-2)] font-medium tracking-tight text-[var(--fg)] max-w-3xl mb-12 leading-snug">
        I&apos;m a Full-Stack AI Engineer with 3+ years building modern web apps, SaaS platforms,
        AI-powered products, and business automation systems.
      </p>

      <div ref={bodyRef} className="flex flex-col gap-14 max-w-5xl">
        <div className="about-block opacity-0 grid md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">
            My path started with a Bachelor&apos;s in Electrical Computer Engineering — a foundation in
            problem-solving and system design. Since then I&apos;ve worked with startups, agencies, and
            clients across countries, shipping products in construction, insurance, marketing,
            healthcare, e-commerce, and AI content generation.
          </p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">
            I like problems that need more than code: architecture, multi-service integrations,
            workflow automation, and AI experiences that create real business value — from planning
            through deployment and ongoing maintenance.
          </p>
        </div>

        <div className="about-block opacity-0">
          <p className="label mb-5">What I do</p>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {focusAreas.map((item) => (
              <li
                key={item}
                className="pl-4 relative text-[var(--fg)] text-[var(--step-0)] before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-2 before:h-px before:bg-[var(--accent)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-block opacity-0 border border-[var(--line)] bg-[var(--bg)] p-6 md:p-8">
          <p className="label mb-4 text-[var(--accent)]">Highlight</p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed mb-4">
            Built a construction operations automation platform that monitored jobs, contacted field
            workers via SMS and AI phone calls, tracked responses, escalated issues, and gave admins
            full visibility in one dashboard — plus CV annotation tools for human-in-the-loop review
            of AI-extracted drawing data.
          </p>
          <p className="text-[var(--muted)] text-[var(--step-0)] leading-relaxed">
            Also shipped an AI video generation SaaS that created faceless videos and auto-published
            to YouTube, TikTok, and Instagram with email and publishing workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
