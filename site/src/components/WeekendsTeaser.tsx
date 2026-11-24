import Link from "next/link";
import { destinations } from "@/content/site";
import { Chapter } from "./Chapter";

/**
 * 07:45 — arrived. On the home page the ten weekends are a doorway: four of the
 * trips as pictures and all ten as quick links into the scroll-through page.
 */
export function WeekendsTeaser() {
  const featured = destinations.slice(0, 4);
  return (
    <Chapter id="weekends" tone="day" time="07:45" stop="Arrived" labelledBy="weekends-title">
      <div className="wrap py-[var(--chapter)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6" data-reveal>
          <div>
            <h2 id="weekends-title" className="h-chapter">Ten weekends from Pune.</h2>
            <p className="lede mt-6 !max-w-[54ch]">The trips we&rsquo;re asked for most, with the distance and a tip from the people who drive them.</p>
          </div>
          <Link href="/weekends/" className="btn btn-ink">
            Drive through all ten
          </Link>
        </div>

        <ul className="mt-[clamp(36px,4vw,64px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {featured.map((d) => (
            <li key={d.id}>
              <Link href={`/weekends/#${d.id}`} className="group relative block aspect-[3/4] overflow-hidden bg-night text-paper">
                {/* SWAP: the client's own trip photos. */}
                <img src={d.image} alt={d.imageAlt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.05]" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-[rgb(8_10_18/0.55)]" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="numerals block text-[2.5rem] leading-none text-headlight">{d.km} km</span>
                  <span className="title-mid mt-2 block font-display text-[1.5rem] leading-tight">{d.name}</span>
                  <span className="mt-1 block text-[15px] text-paper/85">{d.drive} · {d.tag}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav aria-label="All ten weekend trips" className="mt-8 flex flex-wrap gap-2">
          {destinations.map((d) => (
            <Link key={d.id} href={`/weekends/#${d.id}`} className="rounded-full border-2 border-ink px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-ink hover:text-paper">
              {d.short} <span className="tnum opacity-60">{d.km} km</span>
            </Link>
          ))}
        </nav>
      </div>
    </Chapter>
  );
}
