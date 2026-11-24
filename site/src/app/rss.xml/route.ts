import { getAllPosts } from "@/lib/posts";
import { site } from "@/content/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${site.domain}/blog/${p.slug}/</link>
      <guid>${site.domain}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + "T06:00:00+05:30").toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Driver's Notes by ${esc(site.name)}</title>
    <link>${site.domain}/blog/</link>
    <description>Road trips, airport tips and travel guides from Pune.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
