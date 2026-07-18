import React, { useRef } from "react";
import Image from "next/image";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/Icons";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap, splitLinesReveal, splitWordsReveal, REPLAY } from "@/lib/animations";

const socials = [
  { href: "https://github.com/Wahaj-Ali", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://www.upwork.com/freelancers/~01c2f8027f66d74cdc?mp_source=share",
    label: "Upwork",
    Icon: UpworkIcon,
  },
  { href: "https://www.linkedin.com/in/wahaj-ali-", label: "LinkedIn", Icon: LinkedinIcon },
];

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      document.fonts.ready.then(() => {
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

      gsap.fromTo(
        [actionsRef.current, socialRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          delay: 0.35,
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
    },
    { scope: sectionRef }
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
        {/* Left: copy */}
        <div ref={contentRef} className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
          <p className="label mb-6">Full-Stack AI Engineer</p>

          <h1 ref={brandRef} className="display text-[var(--fg)] max-w-[10ch] mb-8">
            Wahaj Ali
          </h1>

          <p ref={lineRef} className="body-lg mb-10">
            3+ years building scalable web apps, SaaS platforms, and AI-powered automation — from intuitive UIs to robust backends and production deployments.
          </p>

          <div ref={actionsRef} className="flex flex-wrap gap-3 mb-10 opacity-0">
            <button type="button" className="btn-primary" onClick={() => scrollTo("projects-sec")}>
              View work
            </button>
            <button type="button" className="btn-ghost" onClick={() => scrollTo("contact")}>
              Get in touch
            </button>
          </div>

          <div ref={socialRef} className="flex items-center gap-3 opacity-0">
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
        </div>

        {/* Right: bg image */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative h-[42vh] sm:h-[48vh] lg:h-[min(72vh,640px)]">
          <div
            ref={imageRef}
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "inset(0 0 100% 0)" }}
          >
            <Image
              src="/assets/bg.webp"
              alt="Wahaj Ali"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
