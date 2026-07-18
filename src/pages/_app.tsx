import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat, Noto_Sans_Arabic } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SkipLink from "@/components/SkipLink";
import { isRtlLocale } from "@/i18n/config";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const isRtl = isRtlLocale(locale || "en");

  useEffect(() => {
    const lang = locale || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl, locale]);

  return (
    <div
      className={`${montserrat.variable} ${notoSansArabic.variable} ${
        isRtl ? notoSansArabic.className : montserrat.className
      }`}
    >
      <SkipLink />
      <Component {...pageProps} />
    </div>
  );
}
