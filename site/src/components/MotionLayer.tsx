"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fmt(min: number) {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/**
 * The drive's motion layer:
 *  - the clock in the header: advances from 04:30 as you scroll, chapter by chapter
 *  - the sky: the page colour follows the hour of each chapter
 *  - entrances for [data-reveal] children, word-by-word light-up for [data-words]
 *  - Lenis smooth scrolling
 * Reduced motion keeps the clock and sky (as instant changes) and drops the rest.
 */
export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clockEl = document.getElementById("drive-clock");
    const stopEl = document.getElementById("drive-stop");
    const wrapEl = document.getElementById("drive-clock-wrap");
    if (wrapEl) wrapEl.hidden = chapters.length === 0;
    let current = -1;
    let cleanup = () => {};

    const tickClock = () => {
      if (!chapters.length) return;
      const mid = window.scrollY + window.innerHeight * 0.55;
      let i = 0;
      for (let k = 0; k < chapters.length; k++) if (chapters[k].offsetTop <= mid) i = k;
      const a = chapters[i];
      const b = chapters[i + 1];
      let t = toMin(a.dataset.time!);
      if (b) {
        const span = b.offsetTop - a.offsetTop;
        const p = Math.min(1, Math.max(0, (mid - a.offsetTop) / span));
        t = t + (toMin(b.dataset.time!) - t) * p;
      }
      if (clockEl) clockEl.textContent = fmt(t);
      if (i !== current) {
        current = i;
        if (stopEl) stopEl.textContent = a.dataset.stop ?? "";
        setSky(a.dataset.bg!, a.dataset.fg!);
      }
    };

    let setSky = (bg: string, fg: string) => {
      root.style.setProperty("--bg", bg);
      root.style.setProperty("--fg", fg);
    };

    if (chapters.length) root.classList.add("sky-live");

    if (reduce) {
      tickClock();
      window.addEventListener("scroll", tickClock, { passive: true });
      return () => {
        window.removeEventListener("scroll", tickClock);
        root.classList.remove("sky-live");
      };
    }

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      root.classList.add("motion-ok");

      setSky = (bg, fg) => gsap.to(root, { "--bg": bg, "--fg": fg, duration: 0.9, ease: "power2.out", overwrite: true });

      const lenis = new Lenis({ lerp: 0.11, anchors: true }); // the header offset comes from scroll-padding-top in the CSS
      // Shared so sections that step the scroll themselves (the Weekends drive) can move it smoothly.
      (window as Window & { __lenis?: typeof lenis }).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", tickClock);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const triggers: ScrollTrigger[] = [];
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((g) =>
        triggers.push(
          ScrollTrigger.create({
            trigger: g,
            start: "top 86%",
            once: true,
            onEnter: () => gsap.to(g.children, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
          }),
        ),
      );
      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((block) => {
        const words = block.querySelectorAll(".w");
        const tween = gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: block, start: "top 78%", end: "bottom 45%", scrub: 0.6 },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const tween = gsap.fromTo(
          el,
          { yPercent: -5, scale: 1.14 },
          { yPercent: 5, scale: 1.14, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      ScrollTrigger.refresh();
      current = -1;
      tickClock();

      cleanup = () => {
        triggers.forEach((t) => t.kill());
        gsap.ticker.remove(raf);
        delete (window as Window & { __lenis?: unknown }).__lenis;
        lenis.destroy();
        root.classList.remove("motion-ok", "sky-live");
        root.style.removeProperty("--bg");
        root.style.removeProperty("--fg");
      };
    })();

    window.addEventListener("resize", tickClock);
    tickClock();
    return () => {
      window.removeEventListener("resize", tickClock);
      cleanup();
    };
  }, [pathname]);

  return null;
}
