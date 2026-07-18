import Link from "next/link";
import { NextPageContext } from "next";
import { useTranslation } from "@/i18n/useTranslation";

interface ErrorProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
  const { t } = useTranslation();
  const message = statusCode
    ? t.error.server.replace("{code}", String(statusCode))
    : t.error.client;

  return (
    <div id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="display text-[var(--accent)]">{statusCode || "Error"}</h1>
      <p className="text-[var(--muted)] text-center max-w-md">{message}</p>
      <Link href="/" className="btn-primary">
        {t.error.backHome}
      </Link>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
