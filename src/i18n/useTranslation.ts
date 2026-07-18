import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { isRtlLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export function useTranslation() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = useMemo(() => getDictionary(locale), [locale]);
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      router.push(router.pathname, router.asPath, { locale: newLocale, scroll: false });
    },
    [locale, router]
  );

  return {
    t,
    locale,
    dir,
    isRtl: dir === "rtl",
    setLocale,
  };
}
