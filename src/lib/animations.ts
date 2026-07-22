import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;
const splitRegistry = new WeakMap<HTMLElement, SplitText>();

export function revertSplitText(element: HTMLElement | null | undefined) {
  if (!element) return;
  const existing = splitRegistry.get(element);
  if (existing) {
    existing.revert();
    splitRegistry.delete(element);
  }
}

/**
 * Replay when the section enters the viewport (scroll down or up),
 * but never reverse on leave — so content stays visible while reading.
 */
export const REPLAY: ScrollTrigger.Vars = {
  toggleActions: "restart none restart none",
};

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Skip heavy SplitText / scrub animations on small screens to protect mobile FPS. */
export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

export function shouldReduceAnimation(): boolean {
  return prefersReducedMotion() || isMobileViewport();
}

function showImmediately(target: gsap.TweenTarget) {
  gsap.set(target, { opacity: 1, y: 0, x: 0, yPercent: 0, clearProps: "transform" });
}

/** Hero / section headline: masked line reveal */
export function splitLinesReveal(
  element: HTMLElement | null,
  opts: {
    delay?: number;
    stagger?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars | false;
  } = {}
) {
  if (!element) return null;
  registerGsap();
  revertSplitText(element);

  if (shouldReduceAnimation()) {
    showImmediately(element);
    return null;
  }

  const { delay = 0, stagger = 0.1, duration = 1.0, scrollTrigger } = opts;

  const split = SplitText.create(element, {
    type: "lines",
    linesClass: "line",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) => {
      const tweenVars: gsap.TweenVars = {
        yPercent: 100,
        duration,
        stagger,
        delay,
        ease: "expo.out",
      };

      if (scrollTrigger !== false) {
        tweenVars.scrollTrigger = {
          trigger: element,
          start: "top 85%",
          ...REPLAY,
          ...(scrollTrigger || {}),
        };
      }

      return gsap.from(self.lines, tweenVars);
    },
  });

  splitRegistry.set(element, split);
  return split;
}

/** Word stagger for supporting copy */
export function splitWordsReveal(
  element: HTMLElement | null,
  opts: {
    delay?: number;
    scrollTrigger?: ScrollTrigger.Vars | false;
  } = {}
) {
  if (!element) return null;
  registerGsap();
  revertSplitText(element);

  if (shouldReduceAnimation()) {
    showImmediately(element);
    return null;
  }

  const { delay = 0, scrollTrigger } = opts;

  const split = SplitText.create(element, {
    type: "words",
    wordsClass: "word",
    autoSplit: true,
    onSplit: (self) => {
      const tweenVars: gsap.TweenVars = {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.03,
        delay,
        ease: "power3.out",
      };

      if (scrollTrigger !== false) {
        tweenVars.scrollTrigger = {
          trigger: element,
          start: "top 88%",
          ...REPLAY,
          ...(scrollTrigger || {}),
        };
      }

      return gsap.from(self.words, tweenVars);
    },
  });

  splitRegistry.set(element, split);
  return split;
}

/** Fade/slide up for blocks — replays on re-entry, stays visible afterward */
export function revealUp(
  targets: gsap.TweenTarget,
  trigger: Element | null,
  opts: {
    stagger?: number;
    y?: number;
    x?: number;
    delay?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  if (!trigger) return;
  registerGsap();

  if (shouldReduceAnimation()) {
    showImmediately(targets);
    return;
  }

  gsap.fromTo(
    targets,
    { y: opts.y ?? 48, x: opts.x ?? 0, opacity: 0 },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration: opts.duration ?? 0.9,
      stagger: opts.stagger ?? 0.12,
      delay: opts.delay ?? 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start: opts.start ?? "top 80%",
        ...REPLAY,
      },
    }
  );
}

export { gsap, ScrollTrigger };
