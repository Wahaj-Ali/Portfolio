export const RESUME_PATH = "/assets/resume.pdf";
export const OG_IMAGE_PATH = "/assets/og-image.png";

/** Set NEXT_PUBLIC_SITE_URL in production for correct Open Graph URLs. */
export function getSiteOrigin(fallbackOrigin = "http://localhost:3000"): string {
  return process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin;
}

export function getAbsoluteUrl(path: string, origin?: string): string {
  const base = (origin || getSiteOrigin()).replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
