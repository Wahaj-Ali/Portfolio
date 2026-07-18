import React, { useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { registerGsap, splitLinesReveal, revertSplitText, revealUp } from "@/lib/animations";
import { useTranslation } from "@/i18n/useTranslation";
import { FORMSPREE_ENDPOINT, getCalendlyUrl } from "@/lib/site";

type FormStatus = "idle" | "sending" | "success" | "error";

const Contact: React.FC = () => {
  const { t, locale } = useTranslation();
  const calendlyUrl = getCalendlyUrl();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

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

          {calendlyUrl && (
            <div>
              <p className="label mb-2">{t.contact.bookCall}</p>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center gap-2"
              >
                <Calendar size={16} aria-hidden />
                {t.contact.bookCall}
              </a>
            </div>
          )}

          <div className="space-y-4 border-t border-[var(--line-soft)] pt-8">
            <p className="availability-badge w-fit" aria-label={t.contact.availability}>
              <span className="availability-badge__dot" aria-hidden />
              {t.contact.availability}
            </p>
            <p className="text-[var(--muted)] text-[var(--step--1)]">{t.contact.timezone}</p>
            <p className="text-[var(--muted)] text-[var(--step--1)]">{t.contact.responseTime}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-8 flex flex-col gap-6" noValidate>
          <div className="grid sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="label">{t.contact.name}</span>
              <input
                name="name"
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40 disabled:opacity-50"
                placeholder={t.contact.namePlaceholder}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label">{t.contact.email}</span>
              <input
                type="email"
                name="email"
                required
                disabled={status === "sending"}
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40 disabled:opacity-50"
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
              disabled={status === "sending"}
              className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--muted)]/40 disabled:opacity-50"
              placeholder={t.contact.messagePlaceholder}
            />
          </label>

          <div className="flex flex-col gap-3 self-start mt-2">
            <button type="submit" className="btn-primary" disabled={status === "sending"}>
              {status === "sending" ? t.contact.sending : t.contact.send}
            </button>

            {status === "success" && (
              <p className="text-[var(--step--1)] text-[#6ecf8e]" role="status">
                {t.contact.formSuccess}
              </p>
            )}
            {status === "error" && (
              <p className="text-[var(--step--1)] text-[#e07a7a]" role="alert">
                {t.contact.formError}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
