import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import SkipLink from "@/components/SkipLink";
import { useTranslation } from "@/i18n/useTranslation";

export default function Home() {
  const { t, locale } = useTranslation();

  return (
    <>
      <SeoHead t={t} locale={locale} />

      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
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
