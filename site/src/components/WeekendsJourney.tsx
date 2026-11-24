"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { destinations, whatsappLink } from "@/content/site";

type Gsap = typeof import("gsap").default;

/**
 * The ten weekends as one drive you scroll through. The stage stays pinned to the
 * screen while ten invisible "stops" scroll past underneath it: each stop that reaches
 * the middle of the screen becomes the trip on show, and the next trip's card grows
 * into the whole frame. Next / previous and the upcoming cards scroll to a stop rather
 * than swapping the slide, so the scroll position, the address (#lonavala) and the
 * trip on screen always agree.
 */
export function WeekendsJourney() {
  const [index, setIndex] = useState(0);
  const shown = useRef(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const stops = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRef = useRef<{ progress: (n: number) => void } | null>(null);
  const gsapRef = useRef<Gsap | null>(null);
  const reduceRef = useRef(false);
  const n = destinations.length;
  const d = destinations[index];
  const upcoming = [1, 2, 3].map((k) => destinations[index + k]).filter(Boolean);

  // Show trip `next`, growing the next card into the frame when moving forward by one.
  const show = useCallback((next: number) => {
    const prev = shown.current;
    if (next === prev) return;
    shown.current = next;
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

    const card = next === prev + 1 ? (firstCardRef.current?.querySelector("[data-card-img]") as HTMLElement | null) : null;
    const cRect = card?.getBoundingClientRect();
    const tl = gsap.timeline({
      onComplete: () => {
        setIndex(next);
        requestAnimationFrame(() => {
          overlay.remove();
          if (content) gsap.fromTo(content.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", stagger: 0.05 });
        });
      },
    });
    if (content) tl.to(content.children, { opacity: 0, y: -14, duration: 0.24, ease: "power2.in", stagger: 0.02 }, 0);
    if (cRect) {
      gsap.set(overlay, { left: cRect.left - fRect.left, top: cRect.top - fRect.top, width: cRect.width, height: cRect.height });
      tl.to(overlay, { left: 0, top: 0, width: fRect.width, height: fRect.height, duration: 0.75, ease: "expo.inOut" }, 0);
    } else {
      gsap.set(overlay, { inset: 0, opacity: 0 });
      tl.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
    }
    tweenRef.current = tl;
  }, []);

  // The stop that has reached the middle of the screen is the trip on show.
  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    import("gsap").then((m) => (gsapRef.current = m.default));
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let at = 0;
      stops.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= mid) at = i;
      });
      show(at);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [show]);

  const driveTo = (i: number) => {
    const target = stops.current[Math.max(0, Math.min(n - 1, i))];
    target?.scrollIntoView({ behavior: reduceRef.current ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="relative bg-night text-paper" style={{ height: `${n * 100}svh` }}>
      {/* The pinned stage. */}
      <div
        ref={frameRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Trip on show"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            driveTo(index + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            driveTo(index - 1);
          }
        }}
        className="sticky top-0 z-10 h-[100svh] overflow-hidden focus-visible:outline-offset-[-6px]"
      >
        {/* SWAP: the client's own trip photos. */}
        <img key={d.id} src={d.image} alt={d.imageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgb(8_10_18/0.52)]" />

        {/* progress line: fills as you drive through the ten */}
        <div className="absolute bottom-16 left-[var(--gutter)] top-28 z-10 hidden w-[3px] bg-paper/25 md:block" aria-hidden>
          <div className="w-full bg-headlight transition-[height] duration-700 ease-[var(--ease-out)]" style={{ height: `${((index + 1) / n) * 100}%` }} />
        </div>

        <div className="wrap relative z-10 grid h-full content-end gap-8 pb-[max(56px,9vh)] pt-28 md:pl-[calc(var(--gutter)+36px)] lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div ref={contentRef} aria-live="polite" className="max-w-[820px]">
            <p className="text-[15px] font-semibold text-paper/80 tnum">
              Trip {index + 1} of {n} · {d.tag}
            </p>
            <h2 className="title-mid mt-2 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] leading-[0.95] tracking-[-0.03em]">{d.name}</h2>
            <p className="numerals mt-2 text-[clamp(3rem,min(6.5vw,10vh),6.5rem)] leading-[0.9] text-headlight">
              {d.km} km<span className="sr-only"> from Pune</span>
            </p>
            <p className="mt-4 max-w-[50ch] text-[clamp(1.0625rem,1.5vw,1.3125rem)]">{d.line}</p>
            <p className="mt-2 text-[1rem] text-paper/85">
              {d.drive} · Best time: {d.season}
            </p>
            <p className="mt-6 max-w-[60ch] text-[clamp(1.0625rem,1.6vw,1.375rem)] font-semibold">
              <span className="subtitle">{d.tip}</span>
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={whatsappLink(`Hi Saffarr Travels, I'd like to plan a trip from Pune to ${d.name}.`)} className="btn btn-light">
                Plan this trip
              </a>
              <a href="#book" className="link" data-destination={d.name}>
                Book a car for it
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <ul className="hidden gap-3 lg:flex lg:flex-col">
              {upcoming.map((u, k) => (
                <li key={u.id}>
                  <button
                    ref={k === 0 ? firstCardRef : undefined}
                    type="button"
                    onClick={() => driveTo(index + 1 + k)}
                    className="group flex w-full items-center gap-4 text-left"
                    aria-label={`Drive to ${u.name}`}
                  >
                    <span data-card-img className="relative block h-[88px] w-[132px] shrink-0 overflow-hidden">
                      <img src={u.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.375rem] leading-tight">{u.short}</span>
                      <span className="block text-[15px] text-paper/80 tnum">{u.km} km</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => driveTo(index - 1)}
                disabled={index === 0}
                className="grid size-14 place-items-center rounded-full bg-paper text-ink transition-[transform,opacity] active:scale-95 disabled:opacity-30"
                aria-label="Previous trip"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20V5M6 11l6-6 6 6" /></svg>
              </button>
              <button
                type="button"
                onClick={() => driveTo(index + 1)}
                disabled={index === n - 1}
                className="grid size-14 place-items-center rounded-full bg-headlight text-ink transition-[transform,opacity] active:scale-95 disabled:opacity-30"
                aria-label="Next trip"
              >
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 4v15M6 13l6 6 6-6" /></svg>
              </button>
              <span className="text-[15px] font-semibold text-paper/85">{index < n - 1 ? "Scroll for the next trip" : "Last stop"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* The stops: one screen of scroll per trip, laid under the stage (absolute, so the pinned stage never
          runs past the end of this block). Each has the trip's id, so /weekends/#shirdi opens Shirdi. */}
      {destinations.map((x, i) => (
        <div
          key={x.id}
          id={x.id}
          ref={(el) => {
            stops.current[i] = el;
          }}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-[100svh]"
          style={{ top: `${i * 100}svh` }}
        />
      ))}
    </div>
  );
}
