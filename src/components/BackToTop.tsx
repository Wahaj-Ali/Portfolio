import React, { useCallback, useEffect, useState } from "react";
import { ChevronUpIcon } from "@/components/Icons";
import { prefersReducedMotion } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const SHOW_AFTER_PX = 480;

const BackToTop: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t.a11y.backToTop}
      className={`fixed bottom-6 end-6 z-[150] flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-[opacity,transform,border-color,color,background-color] duration-300 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#08090b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ChevronUpIcon size={18} aria-hidden />
    </button>
  );
};

export default BackToTop;
