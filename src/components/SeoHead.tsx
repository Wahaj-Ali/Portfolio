import Head from "next/head";
import { locales } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import {
  buildPersonJsonLd,
  getCanonicalUrl,
  getLocalePath,
  OG_LOCALE_MAP,
} from "@/lib/seo";
import {
  CONTACT_EMAIL,
  getAbsoluteUrl,
  getGscVerification,
  getSiteOrigin,
  OG_IMAGE_PATH,
  SOCIAL_LINKS,
} from "@/lib/site";

interface SeoHeadProps {
  t: Dictionary;
  locale: string;
}

export default function SeoHead({ t, locale }: SeoHeadProps) {
  const siteOrigin = getSiteOrigin(typeof window !== "undefined" ? window.location.origin : undefined);
  const canonicalUrl = getCanonicalUrl(locale, siteOrigin);
  const ogImage = getAbsoluteUrl(OG_IMAGE_PATH, siteOrigin);
  const gscVerification = getGscVerification();

  const jsonLd = buildPersonJsonLd({
    name: t.hero.name,
    jobTitle: t.hero.role,
    description: t.meta.description,
    url: canonicalUrl,
    image: ogImage,
    email: CONTACT_EMAIL,
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.upwork],
  });

  return (
    <Head>
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <meta name="keywords" content={t.meta.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#08090b" />
      <link rel="icon" href="/assets/logo.webp" />
      <link rel="canonical" href={canonicalUrl} />

      {locales.map((loc) => (
        <link
          key={loc}
          rel="alternate"
          hrefLang={loc}
          href={getAbsoluteUrl(getLocalePath(loc), siteOrigin)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={getAbsoluteUrl("/", siteOrigin)} />

      {gscVerification && <meta name="google-site-verification" content={gscVerification} />}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={t.meta.ogImageAlt} />
      <meta property="og:locale" content={OG_LOCALE_MAP[locale as keyof typeof OG_LOCALE_MAP] || locale} />
      {locales
        .filter((loc) => loc !== locale)
        .map((loc) => (
          <meta key={loc} property="og:locale:alternate" content={OG_LOCALE_MAP[loc]} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={t.meta.ogImageAlt} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </Head>
  );
}
