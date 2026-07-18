# Wahaj Ali — Portfolio

Personal portfolio for **Wahaj Ali** (Scorpion Dev): full-stack engineer, AI integrations, and freelance work. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **GSAP**.

**Live site:** [scorpion-dev.vercel.app](https://scorpion-dev.vercel.app)

---

## Features

- **i18n** — English, Urdu, Spanish, Arabic (RTL for Urdu/Arabic)
- **SEO** — sitemap, robots.txt, canonical URLs, hreflang, JSON-LD Person schema
- **Accessibility** — skip link, keyboard nav, reduced-motion support, focus management
- **Performance** — optimized hero image, Next.js Image (AVIF/WebP), lighter fonts, mobile-aware GSAP

---

## Lighthouse scores (production build)

Audited with [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/) against `next build && next start` (July 2026).

| Category        | Mobile | Desktop |
|-----------------|--------|---------|
| Performance     | **81** | **100** |
| Accessibility   | **97** | **93**  |
| Best Practices  | **100**| **100** |
| SEO             | **100**| **100** |

**Core Web Vitals (mobile):** CLS 0 · LCP ~4.4s · TBT ~240ms

### Performance notes

- Hero image compressed to `public/assets/bg-hero.webp` (~79KB at 960px; was 524KB at 1800px)
- GSAP SplitText, parallax scrub, and clip-path reveals are **disabled on mobile** (`max-width: 767px`) and when `prefers-reduced-motion` is set
- Montserrat / Noto Sans Arabic limited to weights **500** and **600** only
- Project thumbnails use responsive `sizes` and lazy loading

---

## Project structure

```
src/
  components/     UI sections (Hero, Projects, About, …)
  data/           Portfolio content + i18n merge helpers
  i18n/           Locales and translation hook
  lib/            animations, SEO, site config
  pages/          Next.js routes + API (robots, sitemap)
public/assets/    Images, resume, OG image
```

---

## Deploy

Deploy to [Vercel](https://vercel.com). Submit `https://your-domain/sitemap.xml` in Google Search Console when ready.

---

## License

Private portfolio project.
