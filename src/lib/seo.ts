import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getAbsoluteUrl, getSiteOrigin } from "@/lib/site";

export function getLocalePath(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function getCanonicalUrl(locale: string, origin?: string): string {
  const path = locale === defaultLocale || !locales.includes(locale as Locale)
    ? "/"
    : `/${locale}`;
  return getAbsoluteUrl(path, origin);
}

export function generateSitemapXml(origin?: string): string {
  const base = origin || getSiteOrigin();
  const urls = locales
    .map((locale) => getAbsoluteUrl(getLocalePath(locale), base))
    .map(
      (loc) =>
        `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function generateRobotsTxt(origin?: string): string {
  const base = origin || getSiteOrigin();
  const sitemap = getAbsoluteUrl("/sitemap.xml", base);

  return `User-agent: *
Allow: /

Sitemap: ${sitemap}
`;
}

export interface PersonSchemaInput {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  sameAs: string[];
}

export function buildPersonJsonLd(input: PersonSchemaInput): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    url: input.url,
    image: input.image,
    email: input.email,
    sameAs: input.sameAs,
  });
}

export const OG_LOCALE_MAP: Record<Locale, string> = {
  en: "en_US",
  ur: "ur_PK",
  es: "es_ES",
  ar: "ar_SA",
};
