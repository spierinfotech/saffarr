"use client";

import { useMemo, useState } from "react";
import { airports, pickupAreas, checkInLead, whatsappLink, type AirportId } from "@/content/site";
import { Chapter } from "./Chapter";

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fmt(mins: number) {
  const m = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return {
    clock: `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`,
    spoken: `${h12}:${String(mm).padStart(2, "0")} ${h < 12 ? "a.m." : "p.m."}`,
    prevDay: mins < 0,
  };
}
function dur(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
}

/**
 * 05:05 — the live thing. Say where you are and when you fly, as a sentence;
 * the answer comes back as the time your driver should be at the door.
 */
export function Planner() {
  const [area, setArea] = useState("hinjewadi");
  const [airport, setAirport] = useState<AirportId>("bom");
  const [flight, setFlight] = useState("07:30");
  const [kind, setKind] = useState<"domestic" | "international">("domestic");

  const r = useMemo(() => {
    const a = pickupAreas.find((p) => p.id === area)!;
    const ap = airports.find((x) => x.id === airport)!;
    const leg = a[airport];
    return { a, ap, leg, pickup: fmt(toMinutes(flight) - checkInLead[kind] - leg.min - ap.bufferMin) };
  }, [area, airport, flight, kind]);

  const message = `Hi Saffarr Travels, I need a drop from ${r.a.name} to ${r.ap.name} for a ${kind} flight at ${flight}. Suggested pickup: ${r.pickup.spoken}.`;

  return (
    <Chapter id="planner" tone="blueHour" time="05:05" stop="Planning your pickup" labelledBy="planner-title">
      <div className="wrap py-[var(--chapter)]">
        <h2 id="planner-title" className="h-chapter" data-reveal>
          <span className="block">When do we pick you up?</span>
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-16 max-w-[1200px] font-display text-[clamp(1.75rem,3.7vw,3.5rem)] leading-[1.35] tracking-[-0.015em]"
          aria-label="Pickup time planner"
        >
          I&rsquo;m in{" "}
          <label className="sr-only" htmlFor="pl-area">Pickup area</label>
          <select id="pl-area" value={area} onChange={(e) => setArea(e.target.value)} className="inline-field">
            {pickupAreas.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          , flying from{" "}
          <label className="sr-only" htmlFor="pl-airport">Airport</label>
          <select id="pl-airport" value={airport} onChange={(e) => setAirport(e.target.value as AirportId)} className="inline-field">
            {airports.map((ap) => (
              <option key={ap.id} value={ap.id}>{ap.id === "pnq" ? "Pune" : "Mumbai"}</option>
            ))}
          </select>{" "}
          at{" "}
          <label className="sr-only" htmlFor="pl-time">Departure time</label>
          <input id="pl-time" type="time" value={flight} onChange={(e) => setFlight(e.target.value || "07:30")} className="inline-field tnum w-[4.9em] [field-sizing:content] supports-[field-sizing:content]:w-auto" />{" "}
          on a{" "}
          <label className="sr-only" htmlFor="pl-kind">Flight type</label>
          <select id="pl-kind" value={kind} onChange={(e) => setKind(e.target.value as "domestic" | "international")} className="inline-field">
            <option value="domestic">domestic</option>
            <option value="international">international</option>
          </select>{" "}
          flight.
        </form>

        <div className="mt-12 grid gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-end lg:gap-16" aria-live="polite">
          <div>
            <p className="numerals text-headlight text-[clamp(7rem,24vw,22rem)] leading-[0.8]">{r.pickup.clock}</p>
          </div>
          <div className="max-w-[36ch] pb-4">
            <p className="h-mid !text-[clamp(1.625rem,2.4vw,2.25rem)]">Your driver at the door{r.pickup.prevDay ? ", the night before" : ""}.</p>
            <p className="mt-5 text-[1.125rem] opacity-85">
              {r.leg.km} km and about {dur(r.leg.min)} on the road, {r.ap.bufferMin} minutes of buffer, and {kind === "domestic" ? "2 hours" : "3 hours"} at the airport before you fly. Road times are approximate; your driver confirms when you book.
            </p>
            <a href={whatsappLink(message)} className="btn btn-light mt-8">
              Book this pickup on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
