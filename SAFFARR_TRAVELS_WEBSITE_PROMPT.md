# Prompt — Saffarr Travels One-Page Website (Story-Led)

**Role:** You are a senior brand designer and frontend developer. Build a modern, creative, single-page scrolling website with tasteful animations and a lightweight blogging system for **Saffarr Travels**, a Pune-based car rental service (cars with experienced drivers). Language: **English only.**

---

## 1. The story (read this first — every design decision serves it)

**Brand truth:** Saffarr Travels started with one car. It grew into a fleet because customers kept asking for the same driver again. People don't come back for the car — they come back for the person driving it. Customers consistently praise two things: **skilled, dependable driving** and **warm, talkative drivers** who make them feel **like family**.

**Who it's for:** Primarily **corporate travellers** and **airport runs** (Pune Airport and Mumbai Airport via the Expressway), plus weekend and outstation trips across Maharashtra.

**The tension we answer:** Ride apps made travel easy but anonymous — unknown drivers, last-minute cancellations, surge pricing, 4 a.m. anxiety about missing a flight. Saffarr Travels is the opposite: professional-grade reliability with a familiar face.

**Tagline:** **"On time. On first-name terms."**
- "On time" = punctuality and driving skill (for corporate and airport customers).
- "On first-name terms" = warmth, the talkative driver, being treated like family.

**Name & meaning:** Brand name **Saffarr** (always this exact spelling); full business name **Saffarr Travels**. It comes from *safar*, "journey" in Hindi/Urdu, a word understood across India. The doubled letters ("ff", "rr") stretch the word out: the journey is meant to be enjoyed, not rushed through. Brand idea: *every safar is personal*. The name stands for the journey; the drivers make it personal ("on first-name terms").
- Wordmark: "Saffarr" set large in the display face, with "Travels" as a small secondary lockup. The doubled "ff" and "rr" can carry a subtle motion detail (e.g., the letters stretch slightly like a road on hover or load).
- Copy can use "safar" naturally, e.g., "Your safar starts at 4:30 a.m." Use it sparingly, not in every headline.

**Narrative device:** The whole page reads as **one journey from pickup to drop** — it opens at 4:30 a.m. before an airport run and ends with "Book your ride."

**Voice & copy tone:** Warm, confident, plain English, a little wit. Short sentences. Speak like a trusted driver, not a corporation. Never use "best / cheapest / No.1" or lowest-price claims.

**Refuse the category formula:** No stock photos of a lone white car on a highway, no red "24/7 Cheapest Taxi" banners, no Wikipedia-style tourist text, no cluttered price tables.

---

## 2. Brand & visual direction

- **Business name:** Saffarr Travels
- **Phone:** **+91 99609 59254** — always a clickable `tel:+919960959254` link.
- **WhatsApp:** `https://wa.me/919960959254?text=Hi%20Saffarr%20Travels%2C%20I%20want%20to%20book%20a%20ride`
- **Mood:** Pre-dawn calm → warm daylight. Premium yet human; feels like a well-told story, not a booking portal.
- **Palette (CSS variables, with dark mode):**
  - Night ink (pre-dawn) `#0E1726`
  - Headlight amber / chai gold accent `#F2A541`
  - Sahyadri green `#1F4D3A`
  - Warm paper background `#FAF6EF`
  - Charcoal text `#1C1C1C`
- **Typography:** An expressive display face for headings (e.g., Fraunces or Clash Display) + a clean sans for body (e.g., Inter or Manrope). Big, confident headline scale.
- **Design principles:** Generous whitespace, strong grid with intentional breaks, layered/overlapping images and cards, rounded cards, subtle film grain, clear hierarchy, WCAG AA contrast, mobile-first.
- **Photography (stock for now, real later):** Choose **human moments**, not car glamour shots — airport curb at dawn, a driver holding the door, chai stop on the Mumbai–Pune Expressway, rain on a car window in the Sahyadri, a laptop on a back seat, a family at a viewpoint. **Every image slot must be a clearly named, swappable placeholder** (e.g., `/images/drivers/driver-1.jpg`, `/images/hero/dawn-pickup.jpg`) with a code comment `<!-- REPLACE WITH REAL PHOTO -->` so the client's real photos drop in later without redesign.

---

## 3. Page structure — the journey (one scrollable page, sticky nav with anchor links)

### 0. Sticky header
Wordmark "Saffarr" (with "Travels" as a smaller lockup) left. Links: Story, Services, Fleet, Drivers, Destinations, Driver's Notes, Book. Right: "Call +91 99609 59254" button. Turns translucent with blur and shrinks on scroll. Mobile: hamburger with animated drawer.

### 1. Hero — "4:30 a.m."
- Full-viewport pre-dawn scene: quiet Pune street or airport curb, headlights glowing, the car already waiting. Subtle animated headlight glow / slow parallax.
- Small time stamp detail: "4:30 a.m. · Pickup confirmed."
- **Headline:** "On time. On first-name terms."
- **Subline:** "Airport runs, corporate travel and weekend trips across Maharashtra — with drivers who know the road, and remember your name."
- **CTAs:** "Book your ride" (scrolls to booking) and "Call now" (tel link).
- **Social proof beside the CTA:** a small row of 3–4 overlapping circular customer photos plus a short line such as "Trusted by __ travellers across Pune". Keep the number as a placeholder until the client gives the real figure; never invent it. Photos are swappable placeholders.
- Trust strip: "Pune Airport & Mumbai Airport transfers · Corporate accounts · Outstation trips · Available 24/7"

### 2. Our story — "It started with one car."
- Scroll animation: a single car icon that multiplies into a small fleet as the user scrolls (pinned section).
- Copy (three short beats):
  1. "It started with one car and one driver."
  2. "Customers didn't just come back. They asked for the same driver."
  3. "So we grew — one familiar face at a time."

### 3. What we do — services
Three cards, each tied to a real moment:
- **Airport transfers** — "Your flight is at 6. We're outside at 4:30." Pune Airport (Lohegaon) and Mumbai Airport via the Expressway; flight tracking and waiting time noted as features.
- **Corporate travel** — "Client meetings, offsites, daily office runs." Monthly/corporate accounts, GST invoices, punctual pickups across Hinjewadi, Kharadi, Magarpatta, Baner, Viman Nagar.
- **Outstation & weekend trips** — "Lonavala, Mahabaleshwar, Shirdi — and back, rested."

### 4. The fleet — chosen by occasion, not specs
Present cars in a premium showroom style (car on a soft gradient pedestal, slides in on scroll, gentle 3D tilt on hover). Lead with the occasion, then the specs as chips.
- **Maruti Swift Dzire — "The solo airport run."** Sedan · 4 passengers + driver · AC · 2 bags. For airport drops, business travellers, city rides.
- **Maruti XL6 — "The team offsite."** Premium MPV · 6 passengers + driver · AC · captain seats. For small teams and families.
- **Toyota Innova Crysta — "The client visit."** Premium MUV · 7 passengers + driver · AC · generous luggage space. For leadership travel, client pickups, long outstation trips.

Each card: spec chips with icons, "Starting from ₹__/km" (placeholder — do not invent prices), tabs for **Airport / Local / Outstation** price placeholders, buttons "Book this car" (pre-selects vehicle in form) and "Call".

### 5. Meet the drivers — the heart of the site
- Heading: "The people behind the wheel."
- 3–4 driver profile cards (placeholder names and photos, clearly marked for replacement): name, years driving, favourite route, "Ask him about…" line (e.g., "Ask him about the best misal in Pune"), languages spoken (Marathi, Hindi, English).
- Card flips or expands on hover/tap to show a short quote from the driver.
- Line beneath: "Skilled on the road. Easy to talk to. That's the whole idea."

### 6. Weekends from Pune — Top 10 places in Maharashtra
- Heading: "Where our drivers would take you this weekend."
- **Layout: full-width card-to-hero destination slider** (a contained section, not the page hero):
  - The active destination fills the section as a full-bleed background photo with a dark gradient for legibility.
  - Left side: large outlined numeral (01–10), destination name in the display serif, a 1–2 line description, approx. distance & drive time from Pune, best season, category tag, the **"Driver's tip"** line, and two buttons: "Plan this trip on WhatsApp" (opens WhatsApp with the destination prefilled) and "Book a car" (pre-fills destination in the booking form).
  - Right side: a stack of 2–3 smaller cards previewing the next destinations (photo, name, tag).
  - **Signature transition:** on "next", the first preview card scales up and expands into the full background (shared-element / FLIP-style animation, ~700 ms ease-in-out), the text crossfades with a short upward stagger, and the remaining cards shift up to fill the gap. "Previous" reverses it.
  - Controls: round prev/next arrow buttons under the cards; keyboard arrows and swipe on mobile.
  - **Vertical progress line** on the left edge in the amber accent, filling as you move through the slides, with a "01 / 10" counter.
  - Optional autoplay (about 6 s per slide) that pauses on hover, focus or touch.
  - Mobile: the preview cards become a small horizontal row under the text; swipe to change slide.

  | # | Place | Tag | Driver's tip (sample copy) |
  |---|---|---|---|
  | 01 | Lonavala & Khandala | Hill station | "Leave by 6 a.m. to beat the Expressway traffic." |
  | 02 | Mahabaleshwar & Panchgani | Hill station | "Strawberry season is Dec–Mar. Stop at Wai on the way." |
  | 03 | Shirdi | Pilgrimage | "Go on a weekday for a calmer darshan." |
  | 04 | Alibaug | Beach | "Time Kolaba Fort with low tide — you can walk across." |
  | 05 | Matheran | Hill station | "No cars inside — we drop you at Dasturi point." |
  | 06 | Nashik & Trimbakeshwar | Pilgrimage & vineyards | "Temple in the morning, vineyards after lunch." |
  | 07 | Ajanta & Ellora Caves | Heritage | "Ellora is closed Tuesdays, Ajanta Mondays — plan around it." |
  | 08 | Kolhapur | Heritage & food | "Mahalaxmi darshan, then Panhala Fort, then Tambda Rassa." |
  | 09 | Ganpatipule | Beach & temple | "The Konkan coastal road is the drive itself." |
  | 10 | Tadoba Andhari Tiger Reserve | Wildlife | "Our long-haul favourite — book safari slots well ahead." |

  (Verify distances, timings and closure days before publishing.)

### 7. Driver's Notes — the blog
- Homepage section: "Driver's Notes — Maharashtra, as our drivers know it." Latest 3–4 posts as cards (cover, category, title, excerpt, read time, date, "Read more").
- **Blogging system:**
  - Posts as Markdown/MDX with frontmatter (`title, slug, date, author, category, tags, cover, excerpt`) — or a headless CMS (Sanity / Decap CMS) so the owner can publish without code.
  - `/blog` listing page: category filters (Airport Tips, Weekend Getaways, Monsoon Drives, Pilgrimage, Food Stops, Corporate Travel), search, pagination.
  - `/blog/[slug]` post page: reading-progress bar, table of contents, share buttons (WhatsApp, LinkedIn, copy link), related posts, and an end CTA "Want this route? Book your ride."
  - SEO per post: meta tags, Open Graph image, JSON-LD `BlogPosting`.
- Seed 3 sample posts:
  1. "Pune to Mumbai Airport: How Early Should You Really Leave?"
  2. "5 Monsoon Drives Near Pune (and Where to Stop for Chai)"
  3. "Shirdi in a Day from Pune: A Driver's Plan"

### 8. Testimonials — "Treated me like family."
- Lead quote (large, editorial typography): a placeholder based on the real customer story — *"They treated me like family, not like a booking."* — marked for replacement with the real customer's words and name.
- Auto-sliding carousel of further reviews (placeholders, clearly marked) emphasising punctuality, driving skill, and friendly drivers. Star ratings, customer role (e.g., "Frequent flyer, Hinjewadi").

### 9. Book your ride — the drop-off
- Split layout.
- **Left — booking form:** Name, phone, pickup location, drop/destination, date, time, passengers, service type (Airport / Corporate / Outstation), vehicle (Swift Dzire / XL6 / Innova Crysta), flight number (optional, shown for Airport), message. Validation included.
- **Signature toggle — "How do you like your ride?"**
  - ☕ **Up for a chat**
  - 🎧 **Quiet ride, please** (helper text: "On a call or catching up on sleep? Your driver will keep it quiet.")
- Submit opens WhatsApp with a neatly formatted message including all fields and the chat/quiet preference (optionally also email via Formspree/EmailJS).
- **Right:** Large clickable **+91 99609 59254**, WhatsApp button, "Available 24/7", service area "Pune and all over Maharashtra", corporate account enquiry line, map embed placeholder (Pune).

### 10. Footer
Wordmark + tagline "On time. On first-name terms.", quick links, services, fleet, top destinations, contact details, social icons, "© 2026 Saffarr Travels".

### Floating actions
WhatsApp button (bottom-right) and a sticky "Call now" bar on mobile, with a gentle pulse.

---

## 4. Animation & interaction

- **GSAP + ScrollTrigger** (or Framer Motion) with **Lenis** smooth scroll.
- **Signature motion — the journey line:** a thin road line runs down the page; a small car icon travels along it as the user scrolls, passing each section like a stop on the route. Hero → story → … → booking ("arrived").
- Hero: headlight glow fade-in, time stamp ticks into place, headline revealed word-by-word with a mask.
- Story: pinned section where one car multiplies into the fleet.
- Section reveals: fade-up with stagger; count-up numbers; magnetic hover on primary CTAs; 3D tilt on fleet cards; flip/expand on driver cards; card-to-hero expanding slider for Top 10.
- Light-to-day progression: background subtly warms from pre-dawn ink to warm paper as the user scrolls down.
- Timing 200–600 ms, ease-out curves; animate only `transform`/`opacity`.
- **Respect `prefers-reduced-motion`:** disable parallax, pinning, auto-sliders and the travelling car; the Top 10 slider switches to a simple crossfade.

---

## 5. Technical requirements

- **Stack:** Next.js (App Router) + Tailwind CSS + GSAP/Framer Motion + MDX blog. (Plain HTML/CSS/JS acceptable only if the Markdown-driven blog still works.)
- Fully responsive (360 / 768 / 1024 / 1440 px), no horizontal scroll on mobile.
- Performance: lazy-loaded WebP/AVIF images via `next/image`, Lighthouse 90+, no layout shift.
- **SEO:** semantic HTML, one H1; meta targeting "airport cab Pune", "Pune to Mumbai airport cab", "corporate car rental Pune", "Innova Crysta on rent Pune", "outstation cab from Pune"; JSON-LD `LocalBusiness`/`TaxiService` (name "Saffarr Travels", alternateName "Saffarr", "Safar Travels", "Safaarr") with phone and Pune address placeholder; canonical domain https://saffarr.com; sitemap and robots.txt.
- **Accessibility:** alt text everywhere, keyboard-navigable menus/carousels/toggle, visible focus states, ARIA labels on icon buttons.
- All copy, vehicles, drivers, destinations, testimonials and prices in one editable content/config file.
- Prices remain placeholders (`₹__`) — never invent fares. Testimonials and driver profiles are placeholders until the client provides real ones.

## 6. Deliverable

The complete runnable project: folder structure, all components, 3 seed blog posts, the content config file, and a short README covering: running locally, adding a blog post, updating vehicles/prices/drivers/testimonials, **replacing stock photos with real photos**, and deploying to Vercel or Netlify.
