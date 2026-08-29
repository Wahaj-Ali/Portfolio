import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/animations";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/useTranslation";
import { NAV_BAR_HEIGHT, RESUME_PATH } from "@/lib/site";

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

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("projects-sec");
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

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

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_BAR_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      };

      if (open) {
        setOpen(false);
        window.setTimeout(scrollToTarget, 420);
      } else {
        scrollToTarget();
      }
    },
    [open]
  );

  const linkClass = (id: string) =>
    `site-nav__link${activeId === id ? " site-nav__link--active nav-link-active" : ""}`;

  return (
    <>
      <header className="site-nav">
        <div className="site-nav__inner">
          <a
            href="#headline-sec"
            onClick={(e) => go(e, "headline-sec")}
            className="site-nav__wordmark"
          >
            {t.hero.nameFirst} {t.hero.nameSecond}
            <span className="site-nav__wordmark-dot">.</span>
          </a>

          <div className="site-nav__desktop">
            <nav className="site-nav__links" aria-label="Primary">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  className={linkClass(link.id)}
                  aria-current={activeId === link.id ? "true" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher compact className="site-nav__lang" />
            <a href={RESUME_PATH} download className="site-nav__pill">
              {t.nav.resume}
            </a>
          </div>

          <div className="site-nav__mobile">
            <LanguageSwitcher compact />
            <button
              ref={btnRef}
              type="button"
              className="site-nav__menu-btn"
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
          style={{ paddingInline: "var(--gutter)", paddingTop: `${NAV_BAR_HEIGHT + 16}px`, paddingBottom: "3rem" }}
          aria-label="Mobile"
        >
          {links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => go(e, link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
              className={`group flex items-baseline gap-4 text-[clamp(2.4rem,11vw,4.5rem)] font-semibold tracking-tight leading-none ${
                activeId === link.id ? "text-[var(--accent-amber)]" : "text-[var(--fg)]"
              }`}
            >
              <span className="label text-[var(--accent-amber)] w-8 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="group-hover:text-[var(--accent-amber)] transition-colors duration-300">
                {link.label}
              </span>
            </a>
          ))}

          <a
            href={RESUME_PATH}
            download
            className="site-nav__pill w-fit mt-4"
          >
            {t.nav.resume}
          </a>

          <div className="mt-8">
            <LanguageSwitcher />
          </div>

          <p className="label mt-6 text-[var(--muted)]">{t.nav.tagline}</p>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
