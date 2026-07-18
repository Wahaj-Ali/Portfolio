export const RESUME_PATH = "/assets/resume.pdf";
export const OG_IMAGE_PATH = "/assets/og-image.png";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xayklnzr";

export const SOCIAL_LINKS = {
  github: "https://github.com/Wahaj-Ali",
  linkedin: "https://www.linkedin.com/in/wahaj-ali-",
  upwork:
    "https://www.upwork.com/freelancers/~01c2f8027f66d74cdc?mp_source=share",
} as const;

export const CONTACT_EMAIL = "wahaj.ali96@yahoo.com";

/** Site root URL — set NEXT_PUBLIC_SITE_URL on Vercel (e.g. https://scorpion-dev.vercel.app). */
export function getSiteOrigin(fallbackOrigin = "http://localhost:3000"): string {
  return process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin;
}

export function getAbsoluteUrl(path: string, origin?: string): string {
  const base = (origin || getSiteOrigin()).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Optional Calendly booking URL — set NEXT_PUBLIC_CALENDLY_URL to enable. */
export function getCalendlyUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  return url || null;
}

/** Google Search Console verification token — set NEXT_PUBLIC_GSC_VERIFICATION. */
export function getGscVerification(): string | null {
  const token = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
  return token || null;
}
