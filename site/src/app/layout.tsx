import type { Metadata, Viewport } from "next";
import { Barlow, Rajdhani } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { MotionLayer } from "@/components/MotionLayer";
import { JsonLd, businessSchema, websiteSchema } from "@/lib/schema";

// Rajdhani (Indian Type Foundry; squared letters like station boards and dashboards),
// used only for the wordmark and the big titles. Barlow (highway signs, number plates) for everything else.
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-rajdhani",
  display: "swap",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Saffarr Travels | Airport cabs and cars with driver in Pune",
    template: "%s | Saffarr Travels",
  },
  description: site.description,
  keywords: [
    "airport cab Pune",
    "Pune to Mumbai airport cab",
    "corporate car rental Pune",
    "Innova Crysta on rent Pune",
    "outstation cab from Pune",
    "car with driver Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.domain,
    siteName: site.name,
    title: "Saffarr Travels: On time. On first-name terms.",
    description: site.description,
    images: [{ url: "/assets/at-the-start-of-drizzle-in-night.webp", width: 1800, height: 1350, alt: "A Pune street at night in light rain" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0c18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${rajdhani.variable} ${barlow.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Driver's Notes by Saffarr Travels" href="/rss.xml" />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </head>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-light">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingActions />
        <MotionLayer />
      </body>
    </html>
  );
}
