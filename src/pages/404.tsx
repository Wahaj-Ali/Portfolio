import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="display text-[var(--accent)]">404</h1>
      <p className="text-[var(--muted)]">This page could not be found.</p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
