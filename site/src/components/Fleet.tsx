"use client";

import Image from "next/image";
import { useState } from "react";
import { fleet, whatsappLink } from "@/content/site";
import { Chapter } from "./Chapter";

type Car = (typeof fleet)[number];

const MAX = Math.max(...fleet.map((c) => c.seats));

/** The smallest car that seats everyone. */
function bestFit(n: number) {
  return fleet.find((c) => c.seats >= n)?.id ?? fleet[fleet.length - 1].id;
}

/**
 * 07:00 — daylight, and the cars are waiting in the yard. Tell us how many are
 * travelling: the seats fill up in each car, the smallest one that fits gets the
 * "Your car" marking, and the ones that are too small step back.
 */
export function Fleet() {
  const [count, setCount] = useState(1);
  const pick = bestFit(count);

  return (
    <Chapter id="fleet" tone="day" time="07:00" stop="Daylight" labelledBy="fleet-title">
      <div className="wrap py-[var(--chapter)]">
        <div data-reveal>
          <h2 id="fleet-title" className="h-chapter">Pick the car by the occasion.</h2>
          <p className="lede mt-6 !max-w-[56ch]">
            Three cars, each with an experienced driver and air-conditioning. Tell us how many of you are travelling and we&rsquo;ll park the right one at your door.
          </p>
        </div>

        {/* How many of you? */}
        <fieldset className="mt-[clamp(32px,3.5vw,52px)] flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal>
          <legend className="float-left mr-2 font-display text-[clamp(1.375rem,2vw,1.75rem)] leading-tight">How many of you?</legend>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: MAX }, (_, i) => i + 1).map((n) => (
              <label key={n} className="cursor-pointer">
                <input type="radio" name="fleet-count" value={n} checked={count === n} onChange={() => setCount(n)} className="peer sr-only" />
                <span className="numerals grid size-12 place-items-center rounded-full border-2 border-ink text-[1.375rem] transition-colors duration-200 hover:bg-ink/10 peer-checked:!bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                  {n}
                </span>
                <span className="sr-only">{n === 1 ? "1 passenger" : `${n} passengers`}</span>
              </label>
            ))}
          </div>
          <p className="text-[1.0625rem] font-semibold" aria-live="polite">
            {count === 1 ? "Just you" : `${count} of you`}, plus the driver.{" "}
            <span className="font-normal">Best fit: {fleet.find((c) => c.id === pick)?.name}.</span>
          </p>
        </fieldset>

        {/* The yard: three parking bays on asphalt, painted lines between them. */}
        {/* The yellow shows through the 4px gaps as painted bay lines, only between bays that are showing. */}
        <ul className="mt-8 grid gap-1 bg-headlight text-paper md:grid-cols-3" aria-label="Our cars">
          {fleet.map((c, i) => (
            <Bay key={c.id} car={c} index={i} count={count} isPick={pick === c.id} />
          ))}
        </ul>
      </div>
    </Chapter>
  );
}

function Bay({ car: c, index, count, isPick }: { car: Car; index: number; count: number; isPick: boolean }) {
  const fits = c.seats >= count;
  return (
    <li
      className={`relative flex-col bg-ink p-6 pt-5 transition-opacity duration-500 md:p-7 md:pt-6 ${
        fits ? "flex" : "hidden md:flex md:opacity-40"
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <span aria-hidden className="numerals text-[2.5rem] leading-none text-headlight">
          0{index + 1}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[14px] font-bold transition-colors duration-300 ${
            isPick ? "bg-headlight text-ink" : "border-2 border-paper/30 text-paper/80"
          }`}
        >
          {isPick ? "Your car" : fits ? "Also fits" : `Seats ${c.seats}`}
        </span>
      </div>

      <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-night">
        {/* SWAP: the client's own photo of this car. */}
        <Image src={c.image} alt={c.imageAlt} fill sizes="(min-width:768px) 32vw, 100vw" className="object-cover" />
      </div>

      <h3 className="title-mid mt-6 font-display text-[clamp(1.75rem,2.4vw,2.375rem)] leading-[1.02] tracking-[-0.02em]">{c.occasion}</h3>
      <p className="mt-1 text-[1.0625rem] font-semibold text-headlight">{c.name}</p>

      <div className="mt-5 flex items-center gap-5">
        <SeatMap rows={c.rows} filled={Math.min(count, c.seats)} />
        <p className="text-[1rem] leading-snug">
          <span className="font-bold">{c.seats} passengers</span> plus driver
          <br />
          {c.type} · {c.bags} · AC
        </p>
      </div>

      <p className="mt-5 max-w-[42ch] text-[1.0625rem] text-paper/85">{c.note}</p>
      <p className="mt-3 text-[15px] text-paper/70">
        Fares:{" "}
        {c.fares.airport || c.fares.local || c.fares.outstation
          ? [c.fares.airport && `airport ${c.fares.airport}`, c.fares.local && `local ${c.fares.local}`, c.fares.outstation && `outstation ${c.fares.outstation}`]
              .filter(Boolean)
              .join(" · ")
          : "quoted per trip"}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
        <a href="#book" className={`btn btn-light ${isPick ? "" : "!bg-paper"}`} data-car={c.id}>
          Book the {c.short}
        </a>
        <a href={whatsappLink(`Hi Saffarr Travels, what's the fare for the ${c.name}?`)} className="link">
          Ask the fare
        </a>
      </div>
    </li>
  );
}

/** Top-down seat plan, front row at the top: the driver's seat is solid, passenger seats fill as the count goes up. */
function SeatMap({ rows, filled }: { rows: number[]; filled: number }) {
  const S = 12; // seat size
  const G = 5; // gap
  const W = 3 * S + 2 * G + 12;
  const H = rows.length * (S + G) - G + 22;
  let n = 0;
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="h-[86px] w-auto shrink-0">
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
      {rows.map((count, r) => {
        const y = 11 + r * (S + G);
        const xs = count === 3 ? [6, 6 + S + G, 6 + 2 * (S + G)] : [6, 6 + 2 * (S + G)];
        return xs.map((x, k) => {
          const isDriver = r === 0 && k === 1; // right-hand drive
          const seatIdx = isDriver ? -1 : n++;
          const on = !isDriver && seatIdx < filled;
          return (
            <rect
              key={`${r}-${k}`}
              x={x}
              y={y}
              width={S}
              height={S}
              rx="3"
              className="transition-[fill] duration-300"
              fill={isDriver ? "var(--paper)" : on ? "var(--headlight)" : "transparent"}
              stroke={isDriver ? "var(--paper)" : "currentColor"}
              strokeOpacity={isDriver || on ? 1 : 0.55}
              strokeWidth="2"
            />
          );
        });
      })}
    </svg>
  );
}
