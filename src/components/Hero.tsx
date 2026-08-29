import React, { useRef } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/Icons";
import { ArrowUpRight } from "lucide-react";
import StatsStrip from "@/components/StatsStrip";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  registerGsap,
  revealUp,
  shouldReduceAnimation,
} from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";
import { NAV_BAR_HEIGHT, RESUME_PATH, getCalendlyUrl, SOCIAL_LINKS } from "@/lib/site";

const socials = [
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: GithubIcon },
  { href: SOCIAL_LINKS.upwork, label: "Upwork", Icon: UpworkIcon },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

const Hero: React.FC = () => {
  const { t, locale } = useTranslation();
  const calendlyUrl = getCalendlyUrl();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const duotoneRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const foldRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const reduced = shouldReduceAnimation();

      if (reduced) {
        gsap.set([panelLeftRef.current, panelRightRef.current], { xPercent: 0 });
        gsap.set(duotoneRef.current, { opacity: 0.65 });
        gsap.set(bgRef.current, { scale: 1 });
        gsap.set(dotsRef.current, { opacity: 0 });
        gsap.set(wordmarkRef.current?.children ?? [], { opacity: 1, y: 0 });
      } else {
        gsap.set(bgRef.current, { scale: 1.12 });
        gsap.set(duotoneRef.current, { opacity: 0 });
        gsap.set([panelLeftRef.current, panelRightRef.current], { xPercent: 0 });
        gsap.set(dotsRef.current, { opacity: 1, scale: 1 });
        gsap.fromTo(
          wordmarkRef.current?.children ?? [],
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "expo.out", delay: 0.15 }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.65,
          },
        });

        tl.to(panelLeftRef.current, { xPercent: -100, ease: "none" }, 0)
          .to(panelRightRef.current, { xPercent: 100, ease: "none" }, 0)
          .to(duotoneRef.current, { opacity: 1, ease: "none" }, 0)
          .to(bgRef.current, { scale: 1, ease: "none" }, 0)
          .to(dotsRef.current, { opacity: 0, scale: 0.5, ease: "none" }, 0.35)
          .to(
            wordmarkRef.current?.children ?? [],
            { y: -18, opacity: 0.35, stagger: 0.04, ease: "none" },
            0.55
          );
      }

      revealUp(actionsRef.current, actionsRef.current, { y: 28, start: "top 90%" });

      if (!reduced && portraitRef.current && foldRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { y: 0, rotation: 0 },
          {
            y: -28,
            rotation: 12,
            ease: "none",
            scrollTrigger: {
              trigger: foldRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === scrollRef.current || st.trigger === foldRef.current || st.trigger === actionsRef.current) {
            st.kill();
          }
        });
      };
    },
    {
      scope: sectionRef,
      dependencies: [locale, t.hero.nameFirst, t.hero.statementHighlight],
      revertOnUpdate: true,
    }
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_BAR_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} id="headline-sec" className="hero-cinematic relative">
      <div ref={scrollRef} className="hero-cinematic__scroll">
        <div className="hero-stage">
          <div ref={bgRef} className="hero-stage__bg">
            <Image
              src="/assets/bg-hero.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              quality={82}
              className="object-cover"
            />
          </div>

          <div ref={duotoneRef} className="hero-stage__duotone" aria-hidden />

          <div className="hero-stage__veil" aria-hidden />

          <div ref={panelLeftRef} className="hero-stage__panel hero-stage__panel--left" aria-hidden />
          <div ref={panelRightRef} className="hero-stage__panel hero-stage__panel--right" aria-hidden />

          <div ref={dotsRef} className="hero-stage__dots" aria-hidden>
            <span />
            <span />
          </div>

          <h1 ref={wordmarkRef} className="hero-stage__wordmark">
            <span>{t.hero.nameFirst}</span>
            <span>{t.hero.nameSecond}</span>
          </h1>

          <p className="hero-stage__meta hero-stage__meta--tl label m-0">{t.hero.role}</p>
          <p className="hero-stage__meta hero-stage__meta--tr m-0">{t.hero.foldIndex}</p>
          <p className="hero-stage__meta hero-stage__meta--bl m-0">
            <span className="hero-stage__scroll-line">{t.hero.scrollHint}</span>
          </p>
          <p className="hero-stage__meta hero-stage__meta--br m-0">{t.hero.timezone}</p>
        </div>
      </div>

      <div className="hero-statement">
        <div ref={foldRef} className="hero-statement__fold">
          <span className="hero-statement__index" aria-hidden>
            {t.hero.foldIndex}
          </span>

          <div className="hero-statement__grid">
            <div className="hero-statement__content">
              <p className="label hero-statement__label m-0">{t.hero.statementLabel}</p>

              <p className="hero-statement__text">
                {t.hero.statementBefore}
                <span className="hero-statement__highlight">{t.hero.statementHighlight}</span>
                {t.hero.statementAfter}
              </p>
            </div>

            <div ref={portraitRef} className="hero-statement__portrait" aria-hidden>
              <Image
                src="/assets/bg-hero.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 42vw, 20vw"
                quality={75}
              />
            </div>
          </div>
        </div>

        <div ref={actionsRef} className="hero-statement__actions">
          <StatsStrip />

          <div className="flex flex-wrap gap-3 mt-8 mb-6">
            <button type="button" className="btn-primary" onClick={() => scrollTo("contact")}>
              {t.hero.getInTouch}
            </button>
            {calendlyUrl && (
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t.contact.bookCall}
              </a>
            )}
            <a href={RESUME_PATH} download className="btn-primary">
              {t.hero.downloadResume}
            </a>
            <button type="button" className="btn-ghost" onClick={() => scrollTo("projects-sec")}>
              {t.hero.viewWork}
            </button>
          </div>

          <div className="space-y-2 mb-4 text-[var(--step--1)] text-[var(--muted)]">
            <p>{t.hero.availability}</p>
            <p>{t.hero.responseTime}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line-soft)]">
            <p className="label mb-4 m-0">{t.hero.socialLabel}</p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <span className="social-link__icon" aria-hidden>
                    <Icon size={17} />
                  </span>
                  <span className="social-link__label">{label}</span>
                  <ArrowUpRight size={14} className="social-link__arrow" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
