import Image from "next/image";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { Chapter } from "./Chapter";

/**
 * 10:30 — Driver's Notes: the road, written down. Three entries from the driver's
 * logbook side by side, each with its entry number, date and route type.
 */
export function NotesTeaser() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <Chapter id="notes" tone="day" time="10:30" stop="Driver's Notes" labelledBy="notes-title">
      <div className="wrap py-[var(--chapter)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6" data-reveal>
          <div>
            <h2 id="notes-title" className="h-chapter">Driver&rsquo;s Notes.</h2>
            <p className="lede mt-6 !max-w-[52ch]">Maharashtra as our drivers know it: routes, timings, food stops, and the right season for each trip.</p>
          </div>
          <Link href="/blog/" className="btn btn-ink">
            Read all the notes
          </Link>
        </div>

        <ol className="mt-[clamp(36px,4vw,64px)] grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3" data-reveal>
          {posts.map((p, i) => (
            <li key={p.slug} className="group border-t-4 border-ink pt-5">
              <Link href={`/blog/${p.slug}/`} className="flex h-full flex-col">
                <div className="flex items-baseline justify-between gap-4 text-[15px] font-semibold">
                  <span>
                    <span className="numerals text-[1.75rem] leading-none">{String(i + 1).padStart(2, "0")}</span>
                    <span className="ml-3">{p.category}</span>
                  </span>
                  <time dateTime={p.date} className="opacity-75">
                    {formatDate(p.date)}
                  </time>
                </div>
                <div className="relative mt-5 aspect-[4/3] overflow-hidden bg-ink/10">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width:1024px) 31vw, (min-width:768px) 48vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="title-mid mt-6 font-display text-[clamp(1.5rem,2vw,1.875rem)] leading-[1.08] tracking-[-0.015em] decoration-headlight decoration-[3px] underline-offset-4 group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-3 text-[1.0625rem]">{p.excerpt}</p>
                <p className="mt-auto pt-5 text-[15px] font-semibold">
                  {p.readMinutes} min read <span aria-hidden>→</span>
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Chapter>
  );
}
