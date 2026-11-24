"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

const PAGE = 6;
const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function BlogIndex({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter(
      (p) => (cat === "All" || p.category === cat) && (!term || [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase().includes(term)),
    );
  }, [posts, cat, q]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE));
  const shown = filtered.slice((page - 1) * PAGE, page * PAGE);

  return (
    <div className="wrap pb-[var(--chapter)]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-x-6 gap-y-2 font-display text-[1.625rem] leading-tight">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setPage(1);
              }}
              className={`transition-opacity ${cat === c ? "opacity-100 underline decoration-headlight decoration-2 underline-offset-[0.25em]" : "opacity-45 hover:opacity-80"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="block lg:w-[340px]">
          <span className="block text-[15px] font-semibold opacity-80">Search the notes</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Shirdi, monsoon, airport"
            className="field"
          />
        </label>
      </div>

      {shown.length === 0 ? (
        <div className="mt-20">
          <p className="h-mid">No notes match that yet.</p>
          <p className="mt-3 text-[1.1875rem]">Try another word, or ask our drivers directly. They know more than the blog does.</p>
        </div>
      ) : (
        <ul className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p, i) => (
            <li key={p.slug} className={i % 3 === 1 ? "xl:pt-20" : ""}>
              <article className="group">
                <Link href={`/blog/${p.slug}/`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={p.cover} alt={p.coverAlt} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                  </div>
                  <h2 className="mt-6 font-display text-[2rem] leading-[1.02] tracking-[-0.02em] group-hover:underline decoration-headlight decoration-2">{p.title}</h2>
                  <p className="mt-3 text-[1.0625rem]">{p.excerpt}</p>
                  <p className="mt-3 text-[15px] opacity-70">
                    {p.category} · {p.readMinutes} min read · <time dateTime={p.date}>{fmt(p.date)}</time>
                  </p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Pages" className="mt-16 flex items-center gap-4 font-display text-[1.75rem]">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} type="button" aria-current={page === n ? "page" : undefined} onClick={() => setPage(n)} className={page === n ? "underline decoration-headlight" : "opacity-50"}>
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
