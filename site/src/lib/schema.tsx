import { site, fleet, faqs, destinations, services } from "@/content/site";

/** Structured data for search engines and AI answer engines. Facts only; no prices or ratings. */

const orgId = `${site.domain}/#business`;

export function businessSchema() {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  };
  if (site.streetAddress) address.streetAddress = site.streetAddress;
  if (site.postalCode) address.postalCode = site.postalCode;
  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "LocalBusiness"],
    "@id": orgId,
    name: site.name,
    alternateName: [site.shortName, "Safar Travels", "Safaarr"],
    slogan: site.tagline,
    description: site.description,
    url: site.domain,
    telephone: site.phoneE164,
    image: `${site.domain}/assets/pune-airport-front-view2-2025.webp`,
    address,
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "State", name: "Maharashtra" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "reservations",
      availableLanguage: ["English", "Hindi", "Marathi"],
      areaServed: "IN",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cars with driver",
      itemListElement: fleet.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${c.name} with driver`,
          description: `${c.type}, up to ${c.seats} passengers plus driver, air-conditioned. ${c.note}`,
        },
      })),
    },
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body, areaServed: site.serviceArea },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    url: site.domain,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function destinationsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 10 places to visit in Maharashtra by road from Pune",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: destinations.length,
    itemListElement: destinations.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "TouristDestination",
        name: d.name,
        description: `${d.line} About ${d.km} km from Pune by road (${d.drive.toLowerCase()}). Best time: ${d.season}. Driver's tip: ${d.tip}`,
        image: `${site.domain}${d.image}`,
        touristType: d.tag,
      },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
