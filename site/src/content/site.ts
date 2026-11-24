/**
 * Saffarr Travels — all editable site content lives here.
 *
 * Anything marked SAMPLE or PLACEHOLDER must be confirmed or replaced by the
 * client before launch. Never put invented prices, trip counts, ratings or
 * customer quotes here.
 */

export const site = {
  name: "Saffarr Travels",
  shortName: "Saffarr",
  tagline: "On time. On first-name terms.",
  domain: "https://saffarr.com",
  description:
    "Saffarr Travels is a Pune car rental service with experienced drivers for airport transfers, corporate travel and outstation trips across Maharashtra. Book by phone or WhatsApp.",
  phoneDisplay: "+91 99609 59254",
  phoneE164: "+919960959254",
  whatsappNumber: "919960959254",
  city: "Pune",
  region: "Maharashtra",
  country: "IN",
  // PLACEHOLDER: client to supply the street address and PIN code.
  streetAddress: "",
  postalCode: "",
  hours: "Open 24 hours, 7 days a week",
  serviceArea: "Pune and all of Maharashtra",
  // PLACEHOLDER: add real customer photos (square, 160px+) to show the face row in the hero.
  customerPhotos: [] as string[],
  social: {
    instagram: "",
    facebook: "",
  },
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { href: "/#story", label: "Our story" },
  { href: "/#fleet", label: "Cars" },
  { href: "/weekends/", label: "Weekends" },
  { href: "/blog/", label: "Driver's Notes" },
  { href: "/#faq", label: "Questions" },
];

/* ------------------------------------------------------------------ */
/* Leave-by planner. Distances and times are approximate road figures. */
/* ------------------------------------------------------------------ */

export type AirportId = "pnq" | "bom";

export const airports: { id: AirportId; name: string; short: string; bufferMin: number }[] = [
  { id: "pnq", name: "Pune Airport (Lohegaon)", short: "Pune Airport", bufferMin: 15 },
  { id: "bom", name: "Mumbai Airport (T1 / T2)", short: "Mumbai Airport", bufferMin: 45 },
];

export const pickupAreas: {
  id: string;
  name: string;
  pnq: { km: number; min: number };
  bom: { km: number; min: number };
}[] = [
  { id: "hinjewadi", name: "Hinjewadi", pnq: { km: 28, min: 60 }, bom: { km: 150, min: 195 } },
  { id: "wakad", name: "Wakad", pnq: { km: 25, min: 55 }, bom: { km: 148, min: 190 } },
  { id: "baner", name: "Baner", pnq: { km: 20, min: 45 }, bom: { km: 155, min: 200 } },
  { id: "kothrud", name: "Kothrud", pnq: { km: 20, min: 50 }, bom: { km: 158, min: 210 } },
  { id: "koregaon-park", name: "Koregaon Park", pnq: { km: 9, min: 25 }, bom: { km: 168, min: 225 } },
  { id: "viman-nagar", name: "Viman Nagar", pnq: { km: 5, min: 15 }, bom: { km: 172, min: 230 } },
  { id: "kharadi", name: "Kharadi", pnq: { km: 9, min: 20 }, bom: { km: 175, min: 240 } },
  { id: "magarpatta", name: "Magarpatta / Hadapsar", pnq: { km: 14, min: 35 }, bom: { km: 175, min: 240 } },
];

/** How early to reach the terminal before departure, in minutes. */
export const checkInLead = { domestic: 120, international: 180 };

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  {
    id: "airport",
    sign: "Airport",
    direction: "up-right",
    title: "Airport transfers",
    time: "04:00",
    when: "Pickup for a 6 a.m. flight",
    trip: "Airport",
    stops: ["Pune Airport", "Mumbai T1 and T2", "Flight tracked"],
    line: "Your flight is at six. We're outside at four.",
    body: "Pickups and drops for Pune Airport, and Mumbai Airport via the Expressway. Share your flight number and we plan the pickup around it, including the 4 a.m. ones.",
  },
  {
    id: "corporate",
    sign: "Corporate",
    direction: "right",
    title: "Corporate travel",
    time: "08:45",
    when: "At the office gate before the 9:30 meeting",
    trip: "Office / local",
    stops: ["Hinjewadi", "Kharadi", "Magarpatta", "Baner", "Company billing"],
    line: "Client meetings, offsites and daily office runs.",
    body: "Punctual cars for teams in Hinjewadi, Kharadi, Magarpatta, Baner and Viman Nagar. Ask us about regular bookings and billing for your company.",
  },
  {
    id: "outstation",
    sign: "Outstation",
    direction: "up",
    title: "Outstation and weekend trips",
    time: "05:30",
    when: "Saturday, out before the Expressway fills up",
    trip: "Outstation",
    stops: ["Lonavala", "Mahabaleshwar", "Shirdi", "Back the same night"],
    line: "Lonavala, Mahabaleshwar, Shirdi, and back, rested.",
    body: "One-day and multi-day trips anywhere in Maharashtra with a driver who knows the route, the ghats and the good chai stops.",
  },
];

/* ------------------------------------------------------------------ */
/* Fleet. Fares are null until the client supplies them.               */
/* ------------------------------------------------------------------ */

export const fleet = [
  {
    id: "dzire",
    name: "Maruti Swift Dzire",
    short: "Dzire",
    occasion: "The solo airport run",
    type: "Sedan",
    seats: 4,
    rows: [2, 3],
    bags: "2 bags",
    note: "Quiet, light and quick through city traffic. Right for one or two people and a flight to catch.",
    image: "/assets/maruti-suzuki-dzire-vxi-vvt-front.webp",
    imageAlt: "White Maruti Swift Dzire sedan, front three-quarter view",
    fares: { airport: null as string | null, local: null as string | null, outstation: null as string | null },
  },
  {
    id: "xl6",
    name: "Maruti XL6",
    short: "XL6",
    occasion: "The team offsite",
    type: "Premium MPV",
    seats: 5,
    rows: [2, 2, 2],
    bags: "3 bags",
    note: "Captain seats in the middle row, so five passengers arrive without a squeeze. Good for small teams and families.",
    image: "/assets/maruti-suzuki-xl6-front.webp",
    imageAlt: "White Maruti XL6 MPV, front three-quarter view",
    fares: { airport: null as string | null, local: null as string | null, outstation: null as string | null },
  },
  {
    id: "crysta",
    name: "Toyota Innova Crysta",
    short: "Crysta",
    occasion: "The client visit",
    type: "Premium MUV",
    seats: 6,
    rows: [2, 2, 3],
    bags: "4 bags",
    note: "The long-distance car: room for six, their luggage, and a comfortable ride over five hours of road.",
    image: "/assets/toyota-innova-crysta-2-4-z-front.webp",
    imageAlt: "Toyota Innova Crysta MUV, front three-quarter view",
    fares: { airport: null as string | null, local: null as string | null, outstation: null as string | null },
  },
];

/* ------------------------------------------------------------------ */
/* Drivers. SAMPLE profiles — replace names, years and photos.          */
/* ------------------------------------------------------------------ */

export const drivers = [
  {
    name: "Sandeep", // SAMPLE
    years: "12 years driving", // SAMPLE
    route: "Pune to Mumbai Airport, before sunrise", // SAMPLE
    askAbout: "where to stop for vada pav at Khandala", // SAMPLE
    languages: "Marathi, Hindi, English",
    photo: "",
  },
  {
    name: "Mahesh", // SAMPLE
    years: "9 years driving", // SAMPLE
    route: "Varandha Ghat in the monsoon", // SAMPLE
    askAbout: "the old forts along the Konkan road", // SAMPLE
    languages: "Marathi, Hindi",
    photo: "",
  },
  {
    name: "Imran", // SAMPLE
    years: "7 years driving", // SAMPLE
    route: "Hinjewadi office runs, every weekday", // SAMPLE
    askAbout: "the fastest way out of Hinjewadi at 6 p.m.", // SAMPLE
    languages: "Hindi, English, Marathi",
    photo: "",
  },
];

/* ------------------------------------------------------------------ */
/* Top 10 places. Distances and times from Pune are approximate.        */
/* ------------------------------------------------------------------ */

export const destinations = [
  {
    id: "lonavala",
    name: "Lonavala and Khandala",
    short: "Lonavala",
    km: 66,
    drive: "About 1.5 hours",
    season: "June to September for the waterfalls",
    tag: "Hill station",
    line: "Monsoon waterfalls, ghat views and chikki, an hour and a half from Pune.",
    tip: "Leave by 6 a.m. and you're past the Expressway toll before the weekend traffic.",
    image: "/assets/lonavala-khandala-ghat-panoramio.webp",
    imageAlt: "Green hills and road at Khandala Ghat near Lonavala",
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar and Panchgani",
    short: "Mahabaleshwar",
    km: 120,
    drive: "About 3 hours",
    season: "October to March; strawberries December to March",
    tag: "Hill station",
    line: "Valley viewpoints, Venna Lake and strawberry farms on the Sahyadri tableland.",
    tip: "Stop at Wai on the way up. The ghat after it is easier on a full stomach.",
    image: "/assets/valley-view-mahabaleshwar-3.webp",
    imageAlt: "Forested valley view from Mahabaleshwar",
  },
  {
    id: "shirdi",
    name: "Shirdi",
    short: "Shirdi",
    km: 185,
    drive: "About 4.5 hours",
    season: "All year; October to March is most comfortable",
    tag: "Pilgrimage",
    line: "The Sai Baba temple town, an easy day trip with an early start.",
    tip: "Go on a weekday. The darshan queue is far shorter than on Thursdays and weekends.",
    image: "/assets/snsi-sainagar-shirdi-railway-station.webp",
    imageAlt: "Sainagar Shirdi railway station building under a blue sky",
  },
  {
    id: "alibaug",
    name: "Alibaug",
    short: "Alibaug",
    km: 140,
    drive: "About 3.5 hours",
    season: "October to March",
    tag: "Beach",
    line: "Konkan beaches and Kolaba Fort, standing in the sea off the town.",
    tip: "Check the tide table. At low tide you can walk across to Kolaba Fort.",
    image: "/assets/kolaba-fort-alibag-4661951691.webp",
    imageAlt: "Kolaba Fort walls in the sea off Alibag",
  },
  {
    id: "matheran",
    name: "Matheran",
    short: "Matheran",
    km: 120,
    drive: "About 3 hours",
    season: "October to May",
    tag: "Hill station",
    line: "Asia's only automobile-free hill station, with red earth paths and a toy train.",
    tip: "Cars stop at Dasturi Naka. We drop you there and you walk or ride in.",
    image: "/assets/western-ghats-matheran.webp",
    imageAlt: "Western Ghats cliffs seen from Matheran",
  },
  {
    id: "nashik",
    name: "Nashik and Trimbakeshwar",
    short: "Nashik",
    km: 210,
    drive: "About 5 hours",
    season: "October to March; harvest season January to March",
    tag: "Pilgrimage and vineyards",
    line: "The Trimbakeshwar Jyotirlinga in the morning and vineyards after lunch.",
    tip: "Temple first, while it's cool. The vineyards are better in the afternoon light anyway.",
    image: "/assets/trimbakeshwar-temple-nashik-maharashtra-1.webp",
    imageAlt: "Carved stone shikhara of Trimbakeshwar temple near Nashik",
  },
  {
    id: "ellora",
    name: "Ellora and Ajanta Caves",
    short: "Ellora",
    km: 260,
    drive: "About 5.5 hours to Ellora",
    season: "June to March",
    tag: "Heritage",
    line: "Rock-cut temples and painted caves, both UNESCO World Heritage Sites.",
    tip: "Ellora is closed on Tuesdays and Ajanta on Mondays. Plan the two days around that.",
    image: "/assets/ellora-caves-india-kailasanatha-temple-2.webp",
    imageAlt: "The rock-cut Kailasa temple at Ellora",
  },
  {
    id: "kolhapur",
    name: "Kolhapur",
    short: "Kolhapur",
    km: 230,
    drive: "About 4.5 hours",
    season: "All year",
    tag: "Heritage and food",
    line: "The Mahalaxmi temple, Panhala Fort and the city's famous tambda rassa.",
    tip: "Darshan, then Panhala, then lunch. Ask for the rassa medium if you're new to it.",
    image: "/assets/the-kolhapur-mahalaxmi-temple-an-ancient-hindu.webp",
    imageAlt: "Carved stone exterior of the Mahalaxmi temple in Kolhapur",
  },
  {
    id: "ganpatipule",
    name: "Ganpatipule",
    short: "Ganpatipule",
    km: 330,
    drive: "About 7 hours",
    season: "October to March",
    tag: "Beach and temple",
    line: "A beach temple on the Konkan coast, with the drive along the shore as part of the trip.",
    tip: "Take the coastal road for the last stretch. It's slower and worth every minute.",
    image: "/assets/shree-ganpatipule-mandir-52534199545.webp",
    imageAlt: "Shree Ganpatipule temple with its red walls and white shikhara",
  },
  {
    id: "tadoba",
    name: "Tadoba Andhari Tiger Reserve",
    short: "Tadoba",
    km: 720,
    drive: "About 13 hours; split it over two days",
    season: "October to June; core zones close for the monsoon",
    tag: "Wildlife",
    line: "Maharashtra's best-known tiger reserve, deep in the Vidarbha forests.",
    tip: "Book safari slots online well ahead. They sell out before the hotel rooms do.",
    image: "/assets/tadoba-tiger-trail.webp",
    imageAlt: "Red dirt safari trail through dry forest in Tadoba",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ — written answer-first so people and AI assistants can quote it. */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "How do I book a car with Saffarr Travels?",
    a: "Call +91 99609 59254 or send a WhatsApp message with your pickup point, destination, date, time and number of passengers. We confirm the car and driver on the same call or chat. There is no app and no account to create.",
  },
  {
    q: "How early should I leave Pune for Mumbai Airport?",
    a: "Plan on about 3.5 to 4 hours of driving from most of Pune, plus the time your airline asks you to arrive before departure (usually 2 hours for domestic and 3 hours for international flights). For a 9 a.m. domestic flight from Mumbai, that means a pickup between 2:30 and 3 a.m. Tell us your flight time and pickup area and we will suggest the exact time.",
  },
  {
    q: "Which cars can I rent?",
    a: "Three cars, all with a driver: the Maruti Swift Dzire sedan for up to 4 passengers, the Maruti XL6 for up to 5, and the Toyota Innova Crysta for up to 6. Every car comes with an experienced driver; we do not rent self-drive cars.",
  },
  {
    q: "Do you do airport pickups and drops at night?",
    a: "Yes. We work 24 hours a day, 7 days a week, and early-morning airport runs are a large part of what we do. Share your flight number when you book so the driver can follow any delay.",
  },
  {
    q: "Can I ask for a quiet ride?",
    a: "Yes. Our drivers are known for being easy to talk to, but if you need to take calls or sleep, choose \"Quiet ride, please\" when you book and your driver will keep conversation to a minimum.",
  },
  {
    q: "Do you take corporate and regular bookings?",
    a: "Yes. We drive teams across Pune's business districts, including Hinjewadi, Kharadi, Magarpatta, Baner and Viman Nagar, for meetings, client visits, offsites and daily office travel. Call us to discuss regular bookings and billing for your company.",
  },
  {
    q: "How much does a trip cost?",
    a: "Fares depend on the car, the distance and the type of trip (airport, local or outstation), so we quote each booking before you confirm. Call or WhatsApp for today's fare, and ask what it includes (tolls, parking, driver allowance on outstation trips).",
  },
  {
    q: "Which places do you drive to?",
    a: "Anywhere in Maharashtra and to neighbouring states on request. Popular trips from Pune include Lonavala, Mahabaleshwar, Shirdi, Alibaug, Matheran, Nashik, Ellora and Ajanta, Kolhapur, Ganpatipule and Tadoba.",
  },
];
