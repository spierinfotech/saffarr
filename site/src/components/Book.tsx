"use client";

import { useEffect, useState } from "react";
import { fleet, site, whatsappLink, destinations } from "@/content/site";
import { Chapter } from "./Chapter";

type Errors = Partial<Record<"name" | "phone" | "pickup" | "date" | "time", string>>;
const tripTypes = ["Airport", "Office / local", "Outstation"];

/** Tomorrow, 04:30 — the drive comes back round to night: book the next one. */
export function Book() {
  const [car, setCar] = useState("");
  const [destination, setDestination] = useState("");
  const [trip, setTrip] = useState(tripTypes[0]);
  const [mood, setMood] = useState<"chat" | "quiet">("chat");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // "Book the Dzire" / "Book a car for it" buttons elsewhere pre-fill this form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-car],[data-destination],[data-trip]");
      if (!el) return;
      if (el.dataset.trip && tripTypes.includes(el.dataset.trip)) setTrip(el.dataset.trip);
      if (el.dataset.car) setCar(el.dataset.car);
      if (el.dataset.destination) {
        setDestination(el.dataset.destination);
        setTrip("Outstation");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Tell us your name.";
    if (v("phone").replace(/\D/g, "").length < 10) next.phone = "A 10-digit mobile number, so your driver can call you.";
    if (!v("pickup")) next.pickup = "Where should we pick you up?";
    if (!v("date")) next.date = "Choose the date.";
    if (!v("time")) next.time = "Choose a pickup time.";
    setErrors(next);
    if (Object.keys(next).length) {
      (e.currentTarget.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null)?.focus();
      return;
    }
    const carName = fleet.find((c) => c.id === v("car"))?.name ?? "Any car that fits";
    const lines = [
      "Hi Saffarr Travels, I'd like to book a ride.",
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      `Trip: ${trip}`,
      `Pickup: ${v("pickup")}`,
      `Drop / destination: ${v("drop") || "-"}`,
      `Date and time: ${v("date")} at ${v("time")}`,
      `Passengers: ${v("passengers")}`,
      `Car: ${carName}`,
      v("flight") ? `Flight: ${v("flight")}` : "",
      `Ride: ${mood === "chat" ? "Up for a chat" : "Quiet ride, please"}`,
      v("message") ? `Note: ${v("message")}` : "",
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`${k}-error`} className="mt-2 block text-[15px] font-semibold text-[#ffb3a7]">
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-error` : undefined });
  const label = "block text-[15px] font-semibold opacity-80";

  return (
    <Chapter id="book" tone="night" time="28:30" stop="Tomorrow's pickup" labelledBy="book-title">
      <div className="wrap py-[var(--chapter)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,0.75fr)] lg:items-end" data-reveal>
          <h2 id="book-title" className="h-chapter">Tomorrow, 04:30?</h2>
          <p className="lede">Book the next drive. Fill this in and WhatsApp opens with everything written out; we reply with the car, the driver and the fare.</p>
        </div>

        <div className="mt-[clamp(36px,4vw,64px)] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <form onSubmit={submit} noValidate className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            <fieldset className="sm:col-span-2">
              <legend className="sr-only">Type of trip</legend>
              <div className="flex flex-wrap gap-x-10 gap-y-2 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.1] tracking-[-0.02em]">
                {tripTypes.map((t) => (
                  <label key={t} className="toggle">
                    <input type="radio" name="trip" value={t} checked={trip === t} onChange={() => setTrip(t)} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label>
              <span className={label}>Your name</span>
              <input name="name" autoComplete="name" className="field" {...aria("name")} />
              {err("name")}
            </label>
            <label>
              <span className={label}>Mobile number</span>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field tnum" {...aria("phone")} />
              {err("phone")}
            </label>
            <label>
              <span className={label}>Pickup from</span>
              <input name="pickup" autoComplete="street-address" placeholder="e.g. Baner, near Balewadi High Street" className="field" {...aria("pickup")} />
              {err("pickup")}
            </label>
            <label>
              <span className={label}>Going to</span>
              <input
                name="drop"
                list="destinations-list"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={trip === "Airport" ? "Pune Airport or Mumbai Airport" : "e.g. Mahabaleshwar"}
                className="field"
              />
              <datalist id="destinations-list">
                <option value="Pune Airport" />
                <option value="Mumbai Airport" />
                {destinations.map((d) => (
                  <option key={d.id} value={d.name} />
                ))}
              </datalist>
            </label>
            <label>
              <span className={label}>Date</span>
              <input name="date" type="date" className="field tnum" {...aria("date")} />
              {err("date")}
            </label>
            <label>
              <span className={label}>Pickup time</span>
              <input name="time" type="time" className="field tnum" {...aria("time")} />
              {err("time")}
            </label>
            <label>
              <span className={label}>Passengers</span>
              <select name="passengers" className="field" defaultValue="1">
                {[1, 2, 3, 4, 5, 6, 7].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label>
              <span className={label}>Car</span>
              <select name="car" className="field" value={car} onChange={(e) => setCar(e.target.value)}>
                <option value="">Any car that fits</option>
                {fleet.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}, up to {c.seats}
                  </option>
                ))}
              </select>
            </label>
            {trip === "Airport" && (
              <label className="sm:col-span-2">
                <span className={label}>Flight number (optional, so we can follow delays)</span>
                <input name="flight" placeholder="e.g. 6E 5321" className="field uppercase" />
              </label>
            )}

            <fieldset className="sm:col-span-2 mt-4">
              <legend className="font-display text-[clamp(1.5rem,2.2vw,2rem)] leading-tight">And the ride itself?</legend>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <label className="toggle">
                  <input type="radio" name="mood" value="chat" checked={mood === "chat"} onChange={() => setMood("chat")} />
                  <span>
                    <strong className="block font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-tight">Up for a chat</strong>
                    <span className="mt-1 block text-[1rem]">Our drivers are good company on a long road.</span>
                  </span>
                </label>
                <label className="toggle">
                  <input type="radio" name="mood" value="quiet" checked={mood === "quiet"} onChange={() => setMood("quiet")} />
                  <span>
                    <strong className="block font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-tight">Quiet ride, please</strong>
                    <span className="mt-1 block text-[1rem]">On a call, or catching up on sleep. Your driver will keep it quiet.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <label className="sm:col-span-2">
              <span className={label}>Anything else?</span>
              <textarea name="message" rows={2} placeholder="Child seat, extra luggage, a stop on the way" className="field resize-none" />
            </label>

            <div className="sm:col-span-2 flex flex-wrap items-center gap-6">
              <button type="submit" className="btn btn-light">
                Send on WhatsApp
              </button>
              {sent && (
                <p role="status" className="text-[1.0625rem]">
                  WhatsApp opened with your booking. Didn&rsquo;t open?{" "}
                  <a className="link" href={`tel:${site.phoneE164}`}>
                    Call {site.phoneDisplay}
                  </a>
                </p>
              )}
            </div>
          </form>

          <aside className="lg:col-span-4 lg:pl-6" aria-label="Contact details">
            <a href={`tel:${site.phoneE164}`} className="block numerals text-[clamp(2.5rem,4vw,3.75rem)] leading-none hover:text-headlight">
              {site.phoneDisplay}
            </a>
            <p className="mt-3 text-[1.0625rem] opacity-80">Rather talk? Call any hour, any day.</p>
            <a href={whatsappLink("Hi Saffarr Travels, I want to book a ride")} className="link mt-6 inline-block text-[1.125rem]">
              Message us on WhatsApp
            </a>
            <dl className="mt-12 grid gap-6 text-[1.0625rem]">
              <div>
                <dt className="opacity-70">Hours</dt>
                <dd className="font-semibold">{site.hours}</dd>
              </div>
              <div>
                <dt className="opacity-70">Based in</dt>
                <dd className="font-semibold">{site.streetAddress || "Pune, Maharashtra"}</dd>
              </div>
              <div>
                <dt className="opacity-70">We drive</dt>
                <dd className="font-semibold">Pune and all of Maharashtra; neighbouring states on request</dd>
              </div>
              <div>
                <dt className="opacity-70">For companies</dt>
                <dd className="font-semibold">Ask about regular bookings and billing for your team</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </Chapter>
  );
}
