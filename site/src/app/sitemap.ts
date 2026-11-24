import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.date ?? "2026-11-24";
  return [
    { url: `${site.domain}/`, lastModified: "2026-11-24", changeFrequency: "monthly", priority: 1 },
    { url: `${site.domain}/blog/`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${site.domain}/blog/${p.slug}/`,
      lastModified: p.updated ?? p.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
