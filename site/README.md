# Saffarr Travels website

One-page site with a blog ("Driver's Notes") for Saffarr Travels, Pune. Next.js 15 (static export), Tailwind CSS 4, GSAP + Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy to Vercel

Push the `site` folder to a Git repository, import it in Vercel (framework: Next.js), and add the domain `saffarr.com`. The build produces a fully static site, so any static host (Netlify, Cloudflare Pages) also works with `npm run build` and the `out` folder.

## Edit content

Everything editable is in **`src/content/site.ts`**:

- **Phone, address, hours:** the `site` object. Add `streetAddress` and `postalCode` when known; they flow into the search-engine data automatically.
- **Fares:** each car's `fares` (`airport`, `local`, `outstation`). Leave as `null` to show "On request", or set a string such as `"₹14/km"`.
- **Drivers:** the `drivers` list. The three current profiles are **samples**; replace names, years, routes and add a `photo` path.
- **Customer photos in the hero:** add image paths to `site.customerPhotos`.
- **Destinations, FAQ, services:** their lists in the same file. Distances and times are approximate.

## Add a blog post

Create a Markdown file in `src/content/posts/`, e.g. `lonavala-in-the-monsoon.md`:

```markdown
---
title: "Your title"
date: "2026-12-01"
author: "Saffarr Travels"
category: "Weekend Getaways"   # one of the categories in src/lib/posts.ts
tags: ["Lonavala", "Monsoon"]
cover: "/assets/your-photo.webp"
coverAlt: "What the photo shows"
excerpt: "One or two sentences for the card."
summary: "A direct, quotable answer in 1–2 sentences. Shown as 'In short' and used by search and AI assistants."
---

**Short answer:** start with the answer, then explain.

## A heading

Text…
```

The post, its page, the sitemap, RSS feed and `llms.txt` all update on the next build.

## Replace stock photos with real ones

Photos live in `public/assets/`. Each place they are used is marked `SWAP` in the components, and each car/destination's `image` is set in `site.ts`. Export real photos as WebP around 1600px wide, update the path, and remove the matching entry from `src/content/credits.json` (which drives the footer's photo credits).

## Search and AI visibility (SEO / AEO / GEO)

- Structured data (JSON-LD): `TaxiService`/`LocalBusiness`, `WebSite`, `FAQPage`, `ItemList` of destinations, `Blog`, `BlogPosting` and `BreadcrumbList` — see `src/lib/schema.tsx`.
- `/llms.txt` is a plain-text brief of the business for AI assistants, generated from `site.ts` and the posts.
- `/robots.txt` explicitly allows search and AI crawlers; `/sitemap.xml` and `/rss.xml` are generated at build.
- Every FAQ answer and blog summary is written answer-first so it can be quoted directly.

## Before launch

- Replace sample driver profiles and confirm the customer quote ("They treated me like family") with the customer's exact words and permission.
- Add fares, street address and PIN code.
- Swap stock photos for the client's own.
- Verify the approximate distances, drive times and closure days.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools, and create a Google Business Profile with the exact name "Saffarr Travels".
