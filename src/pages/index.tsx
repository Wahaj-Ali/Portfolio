import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n/useTranslation";
import { getAbsoluteUrl, getSiteOrigin, OG_IMAGE_PATH } from "@/lib/site";

export default function Home() {
  const { t, locale } = useTranslation();
  const router = useRouter();
  const siteOrigin = getSiteOrigin(typeof window !== "undefined" ? window.location.origin : undefined);
  const pageUrl = getAbsoluteUrl(router.asPath || "/", siteOrigin);
  const ogImage = getAbsoluteUrl(OG_IMAGE_PATH, siteOrigin);

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08090b" />
        <link rel="icon" href="/assets/logo.webp" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={t.meta.ogImageAlt} />
        <meta property="og:locale" content={locale} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={t.meta.ogImageAlt} />
      </Head>

      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Journey />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
