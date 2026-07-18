export const locales = ["en", "ur", "es", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ur: "اردو",
  es: "Español",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ur", "ar"];

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
