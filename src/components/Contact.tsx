import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, splitLinesReveal, revealUp } from "@/lib/animations";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      document.fonts.ready.then(() => splitLinesReveal(titleRef.current));
      revealUp(contentRef.current, sectionRef.current, { y: 40 });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="contact" className="section-pad border-t border-[var(--line-soft)]">
      <p className="label mb-4">Contact</p>
      <h2 ref={titleRef} className="headline text-[var(--fg)] mb-6 max-w-[18ch]">
        Have a project? Let&apos;s talk.
      </h2>
      <p className="body-lg mb-14">
        Looking for a full-stack or AI-powered product partner? Tell me about the problem — I&apos;ll help turn it into software that ships.
      </p>

      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 opacity-0">
        <div className="lg:col-span-4 space-y-8">
          <div>
            <p className="label mb-2">Email</p>
            <a
              href="mailto:wahaj.ali96@yahoo.com"
              className="text-[var(--step-1)] font-medium text-[var(--fg)] hover:text-[var(--accent)] transition-colors break-all"
            >
              wahaj.ali96@yahoo.com
            </a>
          </div>
        </div>

        <form
          action="https://formspree.io/f/xayklnzr"
          method="POST"
          className="lg:col-span-8 flex flex-col gap-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="label">Name</span>
              <input
                name="name"
                required
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="label">Email</span>
              <input
                type="email"
                name="email"
                required
                className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors placeholder:text-[var(--muted)]/40"
                placeholder="you@domain.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="label">Message</span>
            <textarea
              name="message"
              required
              rows={4}
              className="bg-transparent border-b border-[var(--line)] py-3 text-[var(--fg)] outline-none focus:border-[var(--accent)] transition-colors resize-none placeholder:text-[var(--muted)]/40"
              placeholder="Tell me about the project..."
            />
          </label>
          <button type="submit" className="btn-primary self-start mt-2">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
