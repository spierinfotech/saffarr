import Link from "next/link";
import { site, nav, destinations, fleet } from "@/content/site";

/**
 * The end of the drive: a dashed lane line, the site map, then the small print
 * with a way back to the 04:30 start.
 */
export function Footer() {
  return (
    <footer className="bg-night text-paper">
      <div className="wrap pt-4 pb-28 md:pb-10">
        {/* lane line */}
        <svg aria-hidden className="block h-[3px] w-full" preserveAspectRatio="none" viewBox="0 0 100 3">
          <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="var(--headlight)" strokeWidth="3" strokeDasharray="14 12" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="mt-12 grid gap-10 text-[1.0625rem] sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="font-bold">On this site</h2>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link className="text-paper/80 decoration-headlight hover:text-paper hover:underline" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <h2 className="font-bold">Cars with driver</h2>
            <ul className="mt-4 space-y-2 text-paper/80">
              {fleet.map((c) => (
                <li key={c.id}>
                  {c.name}
                  <span className="text-paper/55"> · up to {c.seats} passengers</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="font-bold">Weekends from Pune</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-paper/80 sm:grid-cols-3">
              {destinations.map((d) => (
                <li key={d.id}>{d.short}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6 text-[14px] text-paper/60">
          <p>© 2026 {site.name}, {site.city}. All rights reserved.</p>
          <a href="#top" className="font-semibold text-paper/80 hover:text-headlight">
            Back to the 04:30 start <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
