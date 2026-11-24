"use client";

import Image from "next/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import { services } from "@/content/site";
import { Chapter } from "./Chapter";

const photos: Record<string, { src: string; alt: string }> = {
  airport: { src: "/assets/pune-airport-front-view2-2025.webp", alt: "Pune Airport terminal lit up at night" },
  corporate: { src: "/assets/pune-west-skyline-march-2017.webp", alt: "West Pune's towers in the morning haze" },
  outstation: { src: "/assets/malshej-ghat-is-a-mountain-pass-in.webp", alt: "Monsoon clouds over the green hills of Malshej Ghat" },
};

/**
 * 05:40 — sunrise on the Expressway. Three roads, each told by the time we leave.
 * Desktop: the picture holds still while the roads scroll past along a lane line;
 * the road in the middle of the screen lights up and its picture fades in.
 * Phones: one picture per road, no pinning.
 */
export function Roads() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const stops = useRef<(HTMLSpanElement | null)[]>([]);
  const road = useRef<HTMLOListElement>(null);
  const car = useRef<HTMLDivElement>(null);

  // The car drives down the road with the scroll: it holds the middle of the screen,
  // stays on the road, and each stop it reaches lights up and becomes the active road.
  useEffect(() => {
    setReady(true);
    let frame = 0;
    const update = () => {
      frame = 0;
      const ol = road.current;
      const c = car.current;
      if (!ol || !c) return;
      const r = ol.getBoundingClientRect();
      const carH = CAR_LENGTH;
      // keep the whole car and its beam on the road, so the beam never spills into the next section
      const y = Math.min(Math.max(window.innerHeight * 0.62 - r.top - carH, 0), r.height - CAR_SVG_HEIGHT);
      c.style.transform = `translate3d(0, ${y}px, 0)`;
      const nose = y + carH;
      let reached = 0;
      stops.current.forEach((d, i) => {
        if (!d) return;
        const b = d.getBoundingClientRect();
        if (b.top + b.height / 2 - r.top <= nose + 4) reached = i;
      });
      setActive(reached);
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
  }, []);

  return (
    <Chapter id="services" tone="dawn" time="05:40" stop="Sunrise on the Expressway" labelledBy="roads-title">
      <div className="wrap pt-[var(--chapter)]">
        {/* Title and lede share the photo's left edge. */}
        <div data-reveal>
          <h2 id="roads-title" className="h-chapter">Three roads, every day.</h2>
          <p className="lede mt-6 !max-w-[52ch]">Airport runs, office travel and trips out of the city. Each with a driver, each booked on one call.</p>
        </div>

        {/* Phones: jump straight to a road. */}
        <nav aria-label="Jump to a road" className="mt-8 flex flex-wrap gap-2 lg:hidden">
          {services.map((s) => (
            <a key={s.id} href={`#road-${s.id}`} className="rounded-full border-2 border-current px-4 py-2 text-[15px] font-semibold">
              <span className="tnum">{s.time}</span> {s.sign}
            </a>
          ))}
        </nav>
      </div>

      <div className="wrap mt-[clamp(36px,4vw,64px)] pb-[var(--chapter)] lg:grid lg:grid-cols-12 lg:gap-12">
        {/* The still picture (desktop): crossfades to the road in view. */}
        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-[96px] h-[calc(100svh-136px)] min-h-[480px] overflow-hidden bg-night">
            {services.map((s, i) => (
              <Image
                key={s.id}
                src={photos[s.id].src}
                alt={active === i ? photos[s.id].alt : ""}
                fill
                sizes="58vw"
                className={`object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out)] motion-reduce:transition-opacity ${
                  active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                }`}
              />
            ))}
            {/* SWAP: the client's own photos for each road. */}
            {/* Road switcher: all three at a glance; the one in view is lit. */}
            <div role="group" aria-label="Jump to a road" className="absolute inset-x-0 bottom-0 grid grid-cols-3 bg-night text-paper">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-current={active === i ? "true" : undefined}
                  onClick={() => items.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={`px-5 py-4 text-left transition-colors duration-300 focus-visible:outline-offset-[-4px] ${
                    active === i ? "bg-headlight text-ink" : "hover:bg-[rgb(255_255_255/0.08)]"
                  }`}
                >
                  <span className="numerals block text-[clamp(1.75rem,2.4vw,2.5rem)] leading-none">{s.time}</span>
                  <span className="mt-1.5 block text-[15px] font-semibold">{s.sign}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The roads, along a strip of road the car drives down. */}
        <ol ref={road} className="relative lg:col-span-5">
          <div aria-hidden className="absolute left-0 top-0 h-full w-8 rounded-full bg-ink">
            <svg className="absolute left-1/2 top-3 h-[calc(100%-24px)] w-[2px] -translate-x-1/2" preserveAspectRatio="none" viewBox="0 0 2 100">
              <line x1="1" y1="0" x2="1" y2="100" stroke="var(--paper)" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="10 12" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <Car ref={car} />
          {services.map((s, i) => {
            const on = !ready || active === i;
            return (
              <li
                key={s.id}
                ref={(el) => {
                  items.current[i] = el;
                }}
                id={`road-${s.id}`}
                data-road={i}
                className={`relative flex scroll-mt-[96px] flex-col pl-16 py-10 lg:min-h-[calc(100svh-136px)] lg:py-0 lg:transition-opacity lg:duration-500 ${on ? "" : "lg:opacity-35"}`}
              >
                <div className="relative mb-6 aspect-[4/3] overflow-hidden lg:hidden">
                  <Image src={photos[s.id].src} alt={photos[s.id].alt} fill sizes="100vw" className="object-cover" />
                </div>

                <div className="relative">
                  <span
                    aria-hidden
                    ref={(el) => {
                      stops.current[i] = el;
                    }}
                    className={`absolute -left-16 top-1/2 z-[1] size-8 -translate-y-1/2 rounded-full border-[3px] border-ink transition-colors duration-500 ${
                      !ready || active >= i ? "bg-headlight" : "bg-paper"
                    }`}
                  />
                  <p className="numerals text-[clamp(3.5rem,6.5vw,6.5rem)] leading-[0.9]">
                    <span className="sr-only">Leaves at </span>
                    {s.time}
                  </p>
                </div>
                <p className="mt-3 text-[1.0625rem] font-semibold">{s.when}</p>

                <h3 className="h-mid mt-8">{s.title}</h3>
                <p className="mt-3 font-display text-[clamp(1.25rem,1.7vw,1.5rem)] leading-[1.25]">{s.line}</p>
                <p className="mt-4 max-w-[44ch] text-[1.125rem]">{s.body}</p>

                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2 text-[15px] font-semibold" aria-label={`${s.title}: where`}>
                  {s.stops.map((stop) => (
                    <li key={stop} className="rounded-full border-2 border-current px-3 py-1">
                      {stop}
                    </li>
                  ))}
                </ul>

                <a href="#book" data-trip={s.trip} className="btn btn-ink mt-8 self-start">
                  Book this road
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </Chapter>
  );
}

const CAR_LENGTH = 46;
const CAR_SVG_HEIGHT = 150; // car plus headlight beam

/** A white saloon seen from above, nose down, headlights on: the beam lights the road ahead. */
const Car = forwardRef<HTMLDivElement>(function Car(_props, ref) {
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0 z-[2] w-8 will-change-transform">
      <svg viewBox="0 0 32 150" className="block w-8 overflow-visible">
        {/* headlight beam */}
        <polygon points="9,44 23,44 40,140 -8,140" fill="var(--headlight)" fillOpacity="0.32" />
        {/* body */}
        <rect x="6" y="2" width="20" height="42" rx="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
        {/* rear window, roof, windscreen (front is at the bottom) */}
        <rect x="9" y="8" width="14" height="6" rx="2" fill="var(--ink)" fillOpacity="0.75" />
        <rect x="9" y="16" width="14" height="12" rx="2" fill="var(--paper)" stroke="var(--ink)" strokeOpacity="0.25" />
        <rect x="8.5" y="29" width="15" height="8" rx="2.5" fill="var(--ink)" fillOpacity="0.85" />
        {/* tail lights and headlights */}
        <rect x="7.5" y="2.5" width="5" height="2.5" rx="1" fill="#d6332b" />
        <rect x="19.5" y="2.5" width="5" height="2.5" rx="1" fill="#d6332b" />
        <rect x="7.5" y="40.5" width="5" height="2.5" rx="1" fill="var(--headlight)" />
        <rect x="19.5" y="40.5" width="5" height="2.5" rx="1" fill="var(--headlight)" />
      </svg>
    </div>
  );
});
