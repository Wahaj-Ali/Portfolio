import React from "react";
import { localeNames, locales, type Locale } from "@/i18n/config";
import { useTranslation } from "@/i18n/useTranslation";

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = "", compact = false }) => {
  const { locale, setLocale, t } = useTranslation();

  return (
    <label className={`inline-flex flex-col gap-2 ${className}`}>
      {!compact && <span className="label">{t.nav.language}</span>}
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        aria-label={t.nav.language}
        className="bg-transparent border border-[var(--line)] text-[var(--fg)] text-[var(--step--1)] font-semibold tracking-[var(--tracking-label)] uppercase py-2 px-3 outline-none focus:border-[var(--accent)] transition-colors cursor-pointer min-w-[7.5rem]"
      >
        {locales.map((code) => (
          <option key={code} value={code} className="bg-[var(--surface)] text-[var(--fg)]">
            {localeNames[code]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSwitcher;
