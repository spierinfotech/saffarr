import type { Metadata } from "next";
import { getAllPosts, categories } from "@/lib/posts";
import { BlogIndex } from "@/components/BlogIndex";
import { Chapter } from "@/components/Chapter";
import { JsonLd } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Driver's Notes: road trips, airport tips and travel guides from Pune",
  description:
    "Driver's Notes by Saffarr Travels: practical guides to airport runs, monsoon drives, pilgrimages and weekend trips from Pune, written by people who drive the routes every week.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts().map(({ html: _html, toc: _toc, ...meta }) => meta);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Driver's Notes",
          url: `${site.domain}/blog/`,
          publisher: { "@id": `${site.domain}/#business` },
          blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.domain}/blog/${p.slug}/`, datePublished: p.date })),
        }}
      />
      <Chapter tone="day" time="10:30" stop="Driver's Notes" labelledBy="notes-title">
        <div className="wrap pt-44 pb-16">
          <h1 id="notes-title" className="display text-[clamp(3rem,8.6vw,9.5rem)] rise-1">Driver&rsquo;s Notes.</h1>
          <p className="lede mt-8 rise-2">Maharashtra as our drivers know it: routes, timings, food stops, and the right season for every trip from Pune.</p>
        </div>
        <BlogIndex posts={posts} categories={categories} />
      </Chapter>
    </>
  );
}
