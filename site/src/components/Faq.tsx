import { faqs, site, whatsappLink } from "@/content/site";
import { Chapter } from "./Chapter";

/**
 * 11:15 — questions people ask before booking. Left: the title and a straight line to a
 * person (stays in view on desktop). Right: numbered answers. Answers stay in the HTML
 * for search and AI assistants.
 */
export function Faq() {
  return (
    <Chapter id="faq" tone="day" time="11:15" stop="Before you book" labelledBy="faq-title">
      <div className="wrap grid gap-12 pt-8 pb-[var(--chapter)] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5" data-reveal>
          <div className="lg:sticky lg:top-[112px]">
            <h2 id="faq-title" className="h-chapter">Before you book.</h2>
            <p className="lede mt-6">The questions people ask us most, answered the way we&rsquo;d answer them on the phone.</p>

            <div className="mt-10 bg-ink p-7 text-paper">
              <p className="text-[1.0625rem] font-semibold">Still not sure? Ask a person.</p>
              <a href={`tel:${site.phoneE164}`} className="numerals mt-3 block text-[clamp(1.875rem,2.8vw,2.5rem)] leading-none hover:text-headlight">
                {site.phoneDisplay}
              </a>
              <p className="mt-2 text-[15px] text-paper/75">{site.hours}</p>
              <a href={whatsappLink("Hi Saffarr Travels, I have a question before booking.")} className="btn btn-light mt-6">
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {faqs.map((f, i) => (
            <li key={f.q} className="border-b-2 border-ink/15 first:border-t-2">
              <details className="faq group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-5 py-6">
                  <span aria-hidden className="numerals w-9 shrink-0 pt-0.5 text-[1.25rem] opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="flex-1 text-[clamp(1.25rem,1.8vw,1.625rem)] font-bold leading-[1.2] decoration-headlight decoration-[3px] underline-offset-4 group-hover:underline">
                    {f.q}
                  </h3>
                  <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 size-7 shrink-0 transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 4v16M4 12h16" />
                  </svg>
                </summary>
                <p className="max-w-[62ch] pb-7 pl-14 pr-12 text-[1.125rem]">{f.a}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </Chapter>
  );
}
