import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, splitLinesReveal, revertSplitText, revealUp } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";

const Contact: React.FC = () => {
  const { t, locale } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      let cancelled = false;

      document.fonts.ready.then(() => {
        if (cancelled) return;
        splitLinesReveal(titleRef.current);
      });
      revealUp(contentRef.current, sectionRef.current, { y: 40 });

      return () => {
        cancelled = true;
        revertSplitText(titleRef.current);
      };
    },
    { scope: sectionRef, dependencies: [locale, t.contact.title], revertOnUpdate: true }
  );

  return (
    <section ref={sectionRef} id="contact" className="section-pad border-t border-[var(--line-soft)]">
      <p className="label mb-4">{t.contact.label}</p>
      <h2 key={locale} ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[18ch]">
        {t.contact.title}
      </h2>
      <p className="body-lg mb-14">{t.contact.subtitle}</p>

      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 opacity-0">
        <div className="lg:col-span-4 space-y-8">
          <div>
            <p className="label mb-2">{t.contact.email}</p>
            <a
              href="mailto:wahaj.ali96@yahoo.com"
              className="text-[var(--step-1)] font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors break-all"
            >
              wahaj.ali96@yahoo.com
            </a>
          </div>
        </div>

        <form
          action="https://formspree.io/f/xayklnzr"
          method="POST"
          className="lg:col-span-8 flex flex-col gap-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="label">{t.contact.name}</span>
              <input
                name="name"
                required
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40"
                placeholder={t.contact.namePlaceholder}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label">{t.contact.email}</span>
              <input
                type="email"
                name="email"
                required
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40"
                placeholder={t.contact.emailPlaceholder}
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="label">{t.contact.message}</span>
            <textarea
              name="message"
              required
              rows={4}
              className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--muted)]/40"
              placeholder={t.contact.messagePlaceholder}
            />
          </label>
          <button type="submit" className="btn-primary self-start mt-2">
            {t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
