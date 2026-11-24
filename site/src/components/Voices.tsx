import { Chapter } from "./Chapter";

/**
 * 09:00 — the morning after. The lead line paraphrases a real customer's story;
 * REPLACE with their exact words and name (with permission) before launch.
 */
export function Voices() {
  return (
    <Chapter tone="dawn" time="09:00" stop="The morning after" labelledBy="voices-title">
      <div className="wrap py-[var(--chapter)]">
        <h2 id="voices-title" className="sr-only">What customers say</h2>
        <figure data-reveal>
          <blockquote className="display text-[clamp(2.5rem,7.4vw,8.5rem)]">
            <p>&ldquo;They treated me like family.&rdquo;</p>
          </blockquote>
          <figcaption className="mt-8 text-[1.1875rem] font-semibold">A Saffarr customer, after a trip with us</figcaption>
        </figure>
        <div className="mt-[clamp(36px,4vw,64px)] grid gap-10 md:grid-cols-2 lg:w-[80%]" data-reveal>
          <p className="font-display text-[clamp(1.5rem,2.3vw,2.125rem)] leading-[1.2]">
            First, the driving: calm on the Expressway, careful in the ghats, on time at four in the morning.
          </p>
          <p className="font-display text-[clamp(1.5rem,2.3vw,2.125rem)] leading-[1.2]">
            The second is the conversation. And that our drivers know when to keep it quiet.
          </p>
        </div>
      </div>
    </Chapter>
  );
}
