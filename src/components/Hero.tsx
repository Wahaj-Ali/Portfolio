import React, { useRef } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/Icons";
import StatsStrip from "@/components/StatsStrip";
import QualityBadges from "@/components/QualityBadges";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, splitLinesReveal, splitWordsReveal, revertSplitText, shouldReduceAnimation, REPLAY } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";
import { RESUME_PATH, getCalendlyUrl, SOCIAL_LINKS } from "@/lib/site";

const socials = [
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: GithubIcon },
  { href: SOCIAL_LINKS.upwork, label: "Upwork", Icon: UpworkIcon },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

const Hero: React.FC = () => {
  const { t, locale } = useTranslation();
  const calendlyUrl = getCalendlyUrl();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const reachRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;

        splitLinesReveal(brandRef.current, {
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current || undefined,
            start: "top 80%",
            ...REPLAY,
          },
        });
        splitWordsReveal(lineRef.current, {
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current || undefined,
            start: "top 80%",
            ...REPLAY,
          },
        });
      });

      if (shouldReduceAnimation()) {
        gsap.set(
          [metaRef.current, statsRef.current, actionsRef.current, reachRef.current, socialRef.current, imageRef.current],
          { opacity: 1, y: 0, yPercent: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }
        );
      } else {
        gsap.fromTo(
          [metaRef.current, statsRef.current, actionsRef.current, reachRef.current, socialRef.current],
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              ...REPLAY,
            },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.35,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              ...REPLAY,
            },
          }
        );

        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => {
        cancelled = true;
        revertSplitText(brandRef.current);
        revertSplitText(lineRef.current);
      };
    },
    { scope: sectionRef, dependencies: [locale, t.hero.bio, t.hero.name], revertOnUpdate: true }
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="headline-sec"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ paddingInline: "var(--gutter)", paddingTop: "6rem", paddingBottom: "clamp(3rem, 6vw, 4.5rem)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[calc(100svh-8rem)]">
        <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          <div ref={metaRef} className="flex flex-wrap items-center gap-3 mb-6 opacity-0">
            <p className="label m-0">{t.hero.role}</p>
            <span className="availability-badge" aria-label={t.hero.availability}>
              <span className="availability-badge__dot" aria-hidden />
              {t.hero.availability}
            </span>
          </div>

          <h1 key={locale} ref={brandRef} className="display text-[var(--fg)] max-w-[10ch] mb-8">
            {t.hero.name}
          </h1>

          <p key={locale} ref={lineRef} className="body-lg mb-8">
            {t.hero.bio}
          </p>

          <div ref={statsRef} className="opacity-0">
            <StatsStrip />
          </div>

          <div ref={actionsRef} className="flex flex-wrap gap-3 mb-8 opacity-0">
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

          <div ref={reachRef} className="space-y-2 mb-2 opacity-0 text-[var(--step--1)] text-[var(--muted)]">
            <p>{t.hero.timezone}</p>
            <p>{t.hero.responseTime}</p>
          </div>

          <div ref={socialRef} className="opacity-0">
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-11 h-11 border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <QualityBadges />
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 relative h-[42vh] sm:h-[48vh] lg:h-[min(72vh,640px)]">
          <div
            ref={imageRef}
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 0 100% 0)" }}
          >
            <Image
              src="/assets/bg-hero.webp"
              alt={t.hero.imageAlt}
              fill
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 100vw, 640px"
              quality={80}
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
