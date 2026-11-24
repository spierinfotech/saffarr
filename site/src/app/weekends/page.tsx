import type { Metadata } from "next";
import Link from "next/link";
import { destinations, site } from "@/content/site";
import { Chapter } from "@/components/Chapter";
import { WeekendsJourney } from "@/components/WeekendsJourney";
import { Book } from "@/components/Book";
import { JsonLd, destinationsSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Ten weekends from Pune: top 10 places to visit in Maharashtra by car",
  description:
    "Lonavala, Mahabaleshwar, Shirdi, Alibaug, Matheran, Nashik, Ellora and Ajanta, Kolhapur, Ganpatipule and Tadoba: distance from Pune, drive time, best season and a driver's tip for each, with a car and driver from Saffarr Travels.",
  alternates: { canonical: "/weekends/" },
};

/** 07:45 — arrived. The ten weekend trips, one screen of scroll per trip, then the full list and the booking form. */
export default function WeekendsPage() {
  return (
    <>
      <JsonLd
        data={[
          destinationsSchema(),
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
              { "@type": "ListItem", position: 2, name: "Ten weekends from Pune", item: `${site.domain}/weekends/` },
            ],
          },
        ]}
      />

      <Chapter tone="day" time="07:45" stop="Arrived" labelledBy="weekends-title">
        {/* at least 62% of the screen tall, so the dark drive below never sits at the sky line (55%) on load and turns the intro dark */}
        <div className="wrap min-h-[62svh] pt-40 pb-[clamp(48px,5vw,80px)]">
          <h1 id="weekends-title" className="display rise-1 text-[clamp(2.75rem,6.6vw,7rem)]">Ten weekends from Pune.</h1>
          <p className="lede rise-2 mt-6 !max-w-[56ch]">
            The trips we&rsquo;re asked for most, with the distance, the drive time and a tip from the people who drive them. Scroll to drive through all ten, or jump straight to one.
          </p>
          <nav aria-label="Jump to a trip" className="rise-3 mt-8 flex flex-wrap gap-2">
            {destinations.map((d, i) => (
              <a key={d.id} href={`#${d.id}`} className="rounded-full border-2 border-current px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]">
                <span className="tnum opacity-60">{String(i + 1).padStart(2, "0")}</span> {d.short}
              </a>
            ))}
          </nav>
        </div>
      </Chapter>

      <Chapter tone="night" time="08:30" stop="On the road" labelledBy="journey-title">
        <h2 id="journey-title" className="sr-only">The ten trips, one at a time</h2>
        <WeekendsJourney />
      </Chapter>

      <Chapter tone="day" time="10:00" stop="All ten" labelledBy="glance-title">
        <div className="wrap py-[var(--chapter)]">
          <h2 id="glance-title" className="h-chapter">All ten, at a glance.</h2>
          <ol className="mt-[clamp(36px,4vw,64px)] grid gap-x-10 gap-y-10 md:grid-cols-2">
            {destinations.map((d, i) => (
              <li key={d.id} className="border-t-4 border-ink pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="title-mid font-display text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.08]">
                    <span className="numerals mr-3 opacity-50">{String(i + 1).padStart(2, "0")}</span>
                    {d.name}
                  </h3>
                  <span className="numerals shrink-0 text-[1.5rem]">{d.km} km</span>
                </div>
                <p className="mt-3 text-[1.0625rem]">{d.line}</p>
                <p className="mt-2 text-[15px] opacity-75">
                  {d.drive} from Pune · Best time: {d.season} · {d.tag}
                </p>
                <p className="mt-3 text-[1.0625rem]">
                  <span className="font-semibold">Driver&rsquo;s tip:</span> {d.tip}
                </p>
                <a href={`#${d.id}`} className="link mt-4 inline-block text-[15px]">
                  See it on the drive
                </a>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[15px] opacity-70">Distances and drive times are approximate and depend on route and traffic.</p>
          <p className="mt-4 text-[1.0625rem]">
            <Link href="/" className="link">Back to Saffarr Travels</Link>
          </p>
        </div>
      </Chapter>

      <Book />
    </>
  );
}
