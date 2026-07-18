import Link from "next/link";
import { useTranslation } from "@/i18n/useTranslation";

export default function Custom404() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="display text-[var(--accent)]">404</h1>
      <p className="text-[var(--muted)]">{t.notFound.message}</p>
      <Link href="/" className="btn-primary">
        {t.notFound.backHome}
      </Link>
    </div>
  );
}
