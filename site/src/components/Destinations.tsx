"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { destinations, whatsappLink } from "@/content/site";
import { Chapter } from "./Chapter";

type Gsap = typeof import("gsap").default;

/**
 * 07:45 — arrived. Ten weekends from Pune as a card-to-hero slider: the next
 * destination's card grows into the whole frame; the line on the left fills as
 * you go. All ten are also listed in plain text underneath.
 */
export function Destinations() {
  const [index, setIndex] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const tweenRef = useRef<{ progress: (n: number) => void } | null>(null);
  const gsapRef = useRef<Gsap | null>(null);
  const reduceRef = useRef(false);
  const n = destinations.length;
  const d = destinations[index];
  const upcoming = [1, 2, 3].map((k) => destinations[(index + k) % n]);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("gsap").then((m) => (gsapRef.current = m.default));
  }, []);

  const go = useCallback(
    (target: number, viaCard: boolean) => {
      const next = ((target % n) + n) % n;
      const gsap = gsapRef.current;
      const frame = frameRef.current;
      tweenRef.current?.progress(1); // interruptible: finish the running move, then start the new one
      if (!gsap || !frame || reduceRef.current) {
        setIndex(next);
        return;
      }
      const content = contentRef.current;
      const fRect = frame.getBoundingClientRect();
      const overlay = document.createElement("div");
      overlay.className = "absolute z-[5] overflow-hidden pointer-events-none";
      const img = document.createElement("img");
      img.src = destinations[next].image;
      img.alt = "";
      img.className = "h-full w-full object-cover";
      overlay.appendChild(img);
      frame.appendChild(overlay);

      const card = firstCardRef.current?.querySelector("[data-card-img]") as HTMLElement | null;
      const cRect = viaCard && card ? card.getBoundingClientRect() : null;
      const tl = gsap.timeline({
        onComplete: () => {
          setIndex(next);
          requestAnimationFrame(() => {
            overlay.remove();
            if (content) gsap.fromTo(content.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 });
          });
        },
      });
      if (content) tl.to(content.children, { opacity: 0, y: -14, duration: 0.28, ease: "power2.in", stagger: 0.02 }, 0);
      if (cRect) {
        gsap.set(overlay, { left: cRect.left - fRect.left, top: cRect.top - fRect.top, width: cRect.width, height: cRect.height });
        tl.to(overlay, { left: 0, top: 0, width: fRect.width, height: fRect.height, duration: 0.85, ease: "expo.inOut" }, 0);
      } else {
        gsap.set(overlay, { inset: 0, opacity: 0 });
        tl.to(overlay, { opacity: 1, duration: 0.55, ease: "power2.out" }, 0);
      }
      tweenRef.current = tl;
    },
    [n],
  );

  const start = useRef<{ x: number; y: number } | null>(null);

  return (
    <Chapter id="weekends" tone="day" time="07:45" stop="Arrived" labelledBy="weekends-title">
      <div className="wrap pt-[var(--chapter)] pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,0.75fr)] lg:items-end" data-reveal>
          <h2 id="weekends-title" className="h-chapter">Ten weekends from Pune.</h2>
          <p className="lede">The trips we&rsquo;re asked for most, with the distance and a tip from the people who drive them.</p>
        </div>
      </div>

      <div
        ref={frameRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Top 10 places to visit in Maharashtra"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1, true);
          if (e.key === "ArrowLeft") go(index - 1, false);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") start.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const s = start.current;
          start.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.3) go(index + (dx < 0 ? 1 : -1), dx < 0);
        }}
        className="relative isolate min-h-[min(100svh,900px)] overflow-hidden bg-night text-paper touch-pan-y focus-visible:outline-offset-[-6px]"
      >
        {/* SWAP: the client's own trip photos. */}
        <img key={d.id} src={d.image} alt={d.imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(8_10_18/0.5)]" />

        <div className="absolute left-[var(--gutter)] top-16 bottom-16 z-10 hidden w-[3px] bg-paper/25 md:block" aria-hidden>
          <div className="w-full bg-headlight transition-[height] duration-700 ease-[var(--ease-out)]" style={{ height: `${((index + 1) / n) * 100}%` }} />
        </div>

        <div className="wrap relative z-10 grid min-h-[min(100svh,900px)] gap-10 py-16 md:pl-[calc(var(--gutter)+36px)] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div ref={contentRef} aria-live="polite" className="max-w-[820px] self-end">
            <h3 className="font-display title-mid text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">{d.name}</h3>
            <p className="numerals mt-4 text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] text-headlight">
              {d.km} km<span className="sr-only"> from Pune</span>
            </p>
            <p className="mt-5 max-w-[50ch] text-[clamp(1.125rem,1.5vw,1.3125rem)]">{d.line}</p>
            <p className="mt-3 text-[1.0625rem] opacity-85">
              {d.drive} · Best time: {d.season} · {d.tag}
            </p>
            <p className="mt-8 max-w-[60ch] text-[clamp(1.125rem,1.6vw,1.375rem)] font-semibold">
              <span className="subtitle">{d.tip}</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={whatsappLink(`Hi Saffarr Travels, I'd like to plan a trip from Pune to ${d.name}.`)} className="btn btn-light">
                Plan this trip
              </a>
              <a href="#book" className="link" data-destination={d.name}>
                Book a car for it
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ul className="flex gap-3 overflow-hidden lg:flex-col">
              {upcoming.map((u, k) => (
                <li key={u.id} className={k > 0 ? "hidden sm:block" : ""}>
                  <button
                    ref={k === 0 ? firstCardRef : undefined}
                    type="button"
                    onClick={() => go(index + 1 + k, k === 0)}
                    className="group flex w-full items-center gap-4 text-left"
                    aria-label={`Show ${u.name}`}
                  >
                    <span data-card-img className="relative block h-[70px] w-[104px] shrink-0 overflow-hidden lg:h-[88px] lg:w-[132px]">
                      <img src={u.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.375rem] leading-tight">{u.short}</span>
                      <span className="block text-[15px] opacity-80 tnum">{u.km} km</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => go(index - 1, false)} className="grid size-14 place-items-center rounded-full bg-paper text-ink active:scale-95 transition-transform" aria-label="Previous destination">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => go(index + 1, true)} className="grid size-14 place-items-center rounded-full bg-headlight text-ink active:scale-95 transition-transform" aria-label="Next destination">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
              </button>
              <span className="text-[15px] font-semibold tnum opacity-85">
                {index + 1} of {n}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap pt-12 pb-[var(--chapter)]">
        <h3 className="text-[1.375rem] font-bold">All ten, at a glance</h3>
        <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-5">
          {destinations.map((x, i) => (
            <li key={x.id}>
              <button
                type="button"
                onClick={() => {
                  go(i, false);
                  frameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group text-left"
              >
                <span className="block font-display text-[1.5rem] leading-tight group-hover:underline decoration-headlight">{x.name}</span>
                <span className="block text-[15px] opacity-75 tnum">
                  {x.km} km · {x.drive.replace("About ", "about ")}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-[15px] opacity-70">Distances and drive times are approximate and depend on route and traffic.</p>
      </div>
    </Chapter>
  );
}
