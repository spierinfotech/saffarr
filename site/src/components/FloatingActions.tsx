import { site, whatsappLink } from "@/content/site";

/** Phones only: call and WhatsApp within a thumb's reach. */
export function FloatingActions() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 bg-night pb-[env(safe-area-inset-bottom)] text-[1.0625rem] font-bold">
      <a href={`tel:${site.phoneE164}`} className="flex items-center justify-center py-4 bg-headlight text-ink active:bg-[var(--headlight-press)]">
        Call now
      </a>
      <a href={whatsappLink("Hi Saffarr Travels, I want to book a ride")} className="flex items-center justify-center py-4 text-paper active:bg-blue-hour">
        WhatsApp
      </a>
    </div>
  );
}
