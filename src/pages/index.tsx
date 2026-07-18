import Head from "next/head";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Wahaj Ali | Full-Stack AI Engineer</title>
        <meta
          name="description"
          content="Wahaj Ali — Full-Stack AI Engineer with 3+ years building SaaS platforms, AI-powered products, and business automation systems."
        />
        <meta name="keywords" content="Full-Stack, AI Engineer, Next.js, React, Node.js, OpenAI, SaaS, Portfolio" />
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
