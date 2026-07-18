import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/animations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/useTranslation";
import { RESUME_PATH } from "@/lib/site";

const SECTION_IDS = ["projects-sec", "about", "experience", "contact"] as const;

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const links = useMemo(
    () => [
      { label: t.nav.work, id: "projects-sec" },
      { label: t.nav.about, id: "about" },
      { label: t.nav.journey, id: "experience" },
      { label: t.nav.contact, id: "contact" },
    ],
    [t.nav.about, t.nav.contact, t.nav.journey, t.nav.work]
  );

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("projects-sec");
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size === 0) return;

        const next = Array.from(visible.entries()).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (next) setActiveId(next);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.overflow = "hidden";
      root.dataset.menuOpen = "true";
    } else {
      root.style.overflow = "";
      delete root.dataset.menuOpen;
    }
    return () => {
      root.style.overflow = "";
      delete root.dataset.menuOpen;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const firstLink = linksRef.current?.querySelector("a");
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        btnRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menu) return;

      const focusables = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useGSAP(() => {
    registerGsap();
    const menu = menuRef.current;
    const linkEls = linksRef.current?.querySelectorAll("a");
    if (!menu) return;

    gsap.set(menu, {
      autoAlpha: 0,
      clipPath: "circle(0% at calc(100% - 1.75rem) 1.75rem)",
    });
    if (linkEls?.length) gsap.set(linkEls, { y: 48, opacity: 0 });
  }, []);

  useEffect(() => {
    registerGsap();
    const menu = menuRef.current;
    const linkEls = linksRef.current?.querySelectorAll("a");
    if (!menu) return;

    const origin = "calc(100% - 1.75rem) 1.75rem";

    if (open) {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(menu, {
        autoAlpha: 1,
        clipPath: `circle(160% at ${origin})`,
        duration: 0.85,
      });
      if (linkEls?.length) {
        tl.to(
          linkEls,
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.45"
        );
      }
    } else {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      if (linkEls?.length) {
        tl.to(linkEls, { y: 24, opacity: 0, duration: 0.28, stagger: 0.04 }, 0);
      }
      tl.to(
        menu,
        {
          clipPath: `circle(0% at ${origin})`,
          autoAlpha: 0,
          duration: 0.55,
        },
        linkEls?.length ? "-=0.05" : 0
      );
    }
  }, [open]);

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (open) {
      setOpen(false);
      window.setTimeout(scrollToTarget, 420);
    } else {
      scrollToTarget();
    }
  }, [open]);

  const navLinkClass = (id: string) =>
    `transition-colors duration-300 ${
      activeId === id ? "nav-link-active text-[var(--fg)]" : "link-quiet"
    }`;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[200] transition-colors duration-500 ${
          scrolled && !open
            ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line-soft)]"
            : "bg-transparent"
        }`}
      >
        <div
          className="flex items-center justify-between relative z-[210] gap-4"
          style={{ paddingInline: "var(--gutter)", paddingBlock: "1.15rem" }}
        >
          <a
            href="#headline-sec"
            onClick={(e) => go(e, "headline-sec")}
            className="text-[1.05rem] font-semibold tracking-tight text-[var(--fg)]"
          >
            Wahaj<span className="text-[var(--accent)]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <nav
              className="flex items-center gap-1 text-[var(--step--1)] tracking-[var(--tracking-label)] uppercase font-medium"
              aria-label="Primary"
            >
              {links.map((link, i) => (
                <React.Fragment key={link.id}>
                  {i > 0 && (
                    <span className="text-[var(--muted)] px-2 select-none" aria-hidden>
                      ·
                    </span>
                  )}
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => go(e, link.id)}
                    className={navLinkClass(link.id)}
                    aria-current={activeId === link.id ? "true" : undefined}
                  >
                    {link.label}
                  </a>
                </React.Fragment>
              ))}
            </nav>
            <a href={RESUME_PATH} download className="link-quiet hidden lg:inline-flex">
              {t.nav.resume}
            </a>
            <LanguageSwitcher compact />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher compact />
            <button
              ref={btnRef}
              type="button"
              className="label text-[var(--fg)] relative z-[210] min-w-[3.5rem] text-end"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.menu}
        className="fixed inset-0 z-[100] md:hidden bg-[var(--bg)] invisible opacity-0"
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(72% 52% at 86% 4%, rgba(125, 163, 192, 0.08), transparent 62%)",
          }}
        />

        <nav
          ref={linksRef}
          className="relative h-full flex flex-col justify-center gap-5 sm:gap-7"
          style={{ paddingInline: "var(--gutter)", paddingTop: "5rem", paddingBottom: "3rem" }}
          aria-label="Mobile"
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => go(e, link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`group flex items-baseline gap-4 text-[clamp(2.4rem,11vw,4.5rem)] font-semibold tracking-tight leading-none ${
                activeId === link.id ? "text-[var(--accent)]" : "text-[var(--fg)]"
              }`}
            >
              <span className="label text-[var(--accent)] w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="group-hover:text-[var(--accent)] transition-colors duration-300">
                {link.label}
              </span>
            </a>
          ))}

          <a
            href={RESUME_PATH}
            download
            className="group flex items-baseline gap-4 text-[clamp(1.4rem,6vw,2rem)] font-semibold tracking-tight leading-none text-[var(--fg)] mt-4"
          >
            <span className="label text-[var(--accent)] w-8 shrink-0">
              {String(links.length + 1).padStart(2, "0")}
            </span>
            <span className="group-hover:text-[var(--accent)] transition-colors duration-300">{t.nav.resume}</span>
          </a>

          <p className="label mt-10 text-[var(--muted)]">{t.nav.tagline}</p>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
