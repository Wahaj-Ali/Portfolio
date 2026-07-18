import React from "react";
import { GithubIcon, LinkedinIcon, UpworkIcon } from "@/components/Icons";

const socials = [
  { href: "https://github.com/Wahaj-Ali", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://www.upwork.com/freelancers/~01c2f8027f66d74cdc?mp_source=share",
    label: "Upwork",
    Icon: UpworkIcon,
  },
  { href: "https://www.linkedin.com/in/wahaj-ali-", label: "LinkedIn", Icon: LinkedinIcon },
];

const Footer: React.FC = () => {
  return (
    <footer
      className="border-t border-[var(--line-soft)] py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <p className="text-[var(--muted)] text-[var(--step--1)]">
        © {new Date().getFullYear()} Wahaj Ali
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
