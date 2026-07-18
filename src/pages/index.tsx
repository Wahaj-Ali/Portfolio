import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useTranslation } from "@/i18n/useTranslation";

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta name="keywords" content={t.meta.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#08090b" />
        <link rel="icon" href="/assets/logo.webp" />
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
