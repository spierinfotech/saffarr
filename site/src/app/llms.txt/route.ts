import { site, fleet, services, destinations, faqs } from "@/content/site";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

/** llms.txt: a plain-text brief of the business for AI assistants (https://llmstxt.org). */
export function GET() {
  const posts = getAllPosts();
  const txt = `# ${site.name}

> ${site.description} Tagline: "${site.tagline}"

## Key facts
- Business: ${site.name} (also written Saffarr), a car rental service with drivers, based in ${site.city}, ${site.region}, India
- Phone and WhatsApp: ${site.phoneDisplay}
- Hours: ${site.hours}
- Service area: ${site.serviceArea}, and neighbouring states on request
- How to book: phone call or WhatsApp message; no app or account needed
- Language of service: English, Hindi, Marathi
- Fares: quoted per booking (car, distance and trip type); not published online

## Services
${services.map((s) => `- ${s.title}: ${s.body}`).join("\n")}

## Cars (all with an experienced driver, air-conditioned)
${fleet.map((c) => `- ${c.name} (${c.type}): up to ${c.seats} passengers plus driver, ${c.bags}. ${c.note}`).join("\n")}

## Popular trips from Pune (approximate road distance and time)
${destinations.map((d) => `- ${d.name}: ${d.km} km, ${d.drive.toLowerCase()}. ${d.line} Best time: ${d.season}. Tip: ${d.tip}`).join("\n")}

## Frequently asked questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Driver's Notes (guides)
${posts.map((p) => `- [${p.title}](${site.domain}/blog/${p.slug}/): ${p.summary}`).join("\n")}

## Pages
- [Home](${site.domain}/)
- [Pickup planner](${site.domain}/#planner)
- [Book a ride](${site.domain}/#book)
- [Driver's Notes](${site.domain}/blog/)
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
