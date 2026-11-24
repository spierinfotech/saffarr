import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { Chapter } from "./Chapter";

/** 04:30 — the pickup. A Pune street in the rain, before anyone else is awake. */
export function Hero() {
  return (
    <Chapter tone="night" time="04:30" stop="Pickup at your door" labelledBy="hero-title" className="overflow-hidden">
      <div className="relative isolate flex min-h-[100svh] flex-col justify-end">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* SWAP: the client's own pre-dawn pickup photo. */}
          <Image
            src="/assets/at-the-start-of-drizzle-in-night.webp"
            alt="A Pune street at night in light rain, lit by sodium streetlights"
            fill
            priority
            sizes="100vw"
            className="drift object-cover object-[50%_60%]"
          />
          <div aria-hidden className="absolute inset-0 bg-[rgb(10_12_24/0.45)]" />
          {/* taste-skill-ignore: neutral scrim under text on a photo */}
          <div aria-hidden className={"absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(to_top,#0a0c18_10%,rgb(10_12_24/0))]" /* taste-skill-ignore */} />
        </div>

        <div className="wrap w-full pb-[max(9vh,72px)] pt-36">
          <h1 id="hero-title" className="display rise-1 text-[clamp(2.375rem,7vw,8.75rem)] text-paper">
            On time.
            <br />
            On <span className="whitespace-nowrap">first-name</span> terms.
          </h1>
          <div className="rise-2 mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="lede text-paper">
              Cars with experienced drivers from Pune: airport runs before sunrise, office travel, and weekends in the Sahyadri. The driver knows the road, and remembers your name.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href="/#book" className="btn btn-light">
                Book your ride
              </Link>
              <a href={`tel:${site.phoneE164}`} className="link text-paper tnum text-[1.0625rem]">
                or call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
