import React from "react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/Icons";
import { useTranslation } from "@/i18n/useTranslation";
import { SOCIAL_LINKS } from "@/lib/site";

const socials = [
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: GithubIcon },
  { href: SOCIAL_LINKS.upwork, label: "Upwork", Icon: UpworkIcon },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
];

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--line-soft)] py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <p className="text-[var(--muted)] text-[var(--step--1)]">
        © {year} {t.hero.name}. {t.footer.rights}
      </p>

      <div className="flex items-center gap-5">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
