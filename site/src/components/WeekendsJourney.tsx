"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { destinations, whatsappLink } from "@/content/site";

type Gsap = typeof import("gsap").default;
type LenisLike = { scrollTo: (target: number, opts?: { duration?: number; lock?: boolean; force?: boolean; immediate?: boolean; onComplete?: () => void }) => void };

const STEP_SECONDS = 0.9; // how long one trip-to-trip scroll takes
const QUIET_MS = 220; // wheel/trackpad momentum must go quiet this long before the next step

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
  const wrapRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const busy = useRef(false);
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
    indexRef.current = next;
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

  // Scroll exactly to stop i. While it runs, further wheel/swipe input is ignored, so one
  // gesture (however long) moves one trip.
  const driveTo = useCallback(
    (i: number, onDone?: () => void) => {
      const el = stops.current[Math.max(0, Math.min(n - 1, i))];
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      if (Math.abs(top - window.scrollY) < 2) {
        onDone?.(); // already there (the scroll engine would never report completion)
      } else if (lenis && !reduceRef.current) {
        // Safety net: if the engine never reports back, still free the input after the move.
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          onDone?.();
        };
        setTimeout(finish, STEP_SECONDS * 1000 + 500);
        lenis.scrollTo(top, { duration: STEP_SECONDS, lock: true, force: true, onComplete: finish });
      } else {
        window.scrollTo({ top, behavior: "auto" });
        onDone?.();
      }
    },
    [n],
  );

  // One trip per gesture. Inside the pinned drive, a wheel turn or a swipe of any length
  // moves to the next or previous stop; past the first or last trip, the page scrolls on
  // normally so you can leave the drive.
  useEffect(() => {
    let lastInput = 0;
    let touchY: number | null = null;

    const pinned = () => {
      const w = wrapRef.current;
      if (!w) return false;
      const r = w.getBoundingClientRect();
      return r.top <= 2 && r.bottom >= window.innerHeight - 2;
    };

    // Release the lock only once the scroll has finished AND the momentum has gone quiet.
    const release = () => {
      const wait = () => {
        if (performance.now() - lastInput < QUIET_MS) setTimeout(wait, 60);
        else busy.current = false;
      };
      wait();
    };

    // Is the page sitting exactly on the trip on show? If not (we have just scrolled into the
    // drive), the first move settles on that trip instead of skipping past it.
    const aligned = () => {
      const el = stops.current[indexRef.current];
      return !el || Math.abs(el.getBoundingClientRect().top) <= 4;
    };

    const step = (dir: 1 | -1, e: Event) => {
      const at = indexRef.current;
      const target = aligned() ? at + dir : at;
      if (target < 0 || target > n - 1) return false; // let the page scroll out of the drive
      e.preventDefault();
      e.stopPropagation(); // keep the smooth-scroll engine from also moving the page
      if (busy.current) return true;
      busy.current = true;
      driveTo(target, release);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 2 || !pinned()) return;
      lastInput = performance.now();
      if (busy.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      step(e.deltaY > 0 ? 1 : -1, e);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || !pinned()) return;
      const dy = touchY - (e.touches[0]?.clientY ?? touchY);
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      const at = indexRef.current;
      // Hold the page still inside the drive (the swipe is turned into one step on release),
      // but let it move when the swipe leads out past the first or last trip.
      if (at + dir >= 0 && at + dir <= n - 1) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY === null) return;
      const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY);
      touchY = null;
      if (Math.abs(dy) < 40 || !pinned() || busy.current) return;
      lastInput = performance.now();
      step(dy > 0 ? 1 : -1, e);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!pinned() || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const down = ["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey;
      const up = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (busy.current) {
        e.preventDefault();
        return;
      }
      lastInput = 0;
      step(down ? 1 : -1, e);
    };

    // Arriving at the drive with a fast scroll: the smooth-scroll momentum would carry the page
    // several trips in. Catch it at the edge and land exactly on the first (or, coming back up,
    // the last) trip.
    let prevTop = wrapRef.current?.getBoundingClientRect().top ?? 0;
    let prevBottom = wrapRef.current?.getBoundingClientRect().bottom ?? 0;
    const onScrollEdge = () => {
      const w = wrapRef.current;
      if (!w) return;
      const r = w.getBoundingClientRect();
      const vh = window.innerHeight;
      if (!busy.current && prevTop > 2 && r.top <= 2 && r.bottom > vh) {
        busy.current = true;
        driveTo(0, release);
      } else if (!busy.current && prevBottom < vh - 2 && r.bottom >= vh - 2 && r.top < 0) {
        busy.current = true;
        driveTo(n - 1, release);
      }
      prevTop = r.top;
      prevBottom = r.bottom;
    };

    // In-page links to a trip (#matheran from the chips or the list) drive straight there;
    // the lock keeps the edge catch above from stopping them at the first trip.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const i = a ? destinations.findIndex((x) => `#${x.id}` === a.getAttribute("href")) : -1;
      if (i < 0) return;
      e.preventDefault();
      e.stopPropagation();
      history.replaceState(null, "", `#${destinations[i].id}`);
      busy.current = true;
      lastInput = 0;
      driveTo(i, release);
    };

    window.addEventListener("scroll", onScrollEdge, { passive: true });
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScrollEdge);
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [driveTo, n]);

  return (
    <div ref={wrapRef} className="relative bg-night text-paper" style={{ height: `${n * 100}svh` }}>
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
          // cancel the page-wide 80px header offset for links: a trip link should land exactly on its stop
          style={{ top: `${i * 100}svh`, scrollMarginTop: "-80px" }}
        />
      ))}
    </div>
  );
}
