import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { ar } from "@/i18n/locales/ar";
import { en } from "@/i18n/locales/en";
import { es } from "@/i18n/locales/es";
import { ur } from "@/i18n/locales/ur";
import type { Dictionary } from "@/i18n/types";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  ur,
  es,
  ar,
};

export function getDictionary(locale?: string): Dictionary {
  if (locale && isLocale(locale)) {
    return dictionaries[locale];
  }

  return dictionaries[defaultLocale];
}
