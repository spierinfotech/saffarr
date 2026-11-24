import Image from "next/image";
import { Chapter } from "./Chapter";

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </>
  );
}

/** 04:45 — blue hour on the empty road. One headlight in the fog: where it started. */
export function Story() {
  return (
    <Chapter id="story" tone="blueHour" time="04:45" stop="On the road" labelledBy="story-title">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[48svh] overflow-hidden lg:order-2 lg:min-h-full">
          <Image
            src="/assets/sunrise-ride-58821650.webp"
            alt="A single headlight on a country road in thick dawn fog"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
            data-parallax
          />
        </div>
        <div className="wrap flex flex-col justify-center py-[var(--chapter)] lg:pl-[var(--gutter)] lg:pr-[6vw]">
          <h2 id="story-title" className="h-chapter !text-[clamp(2.25rem,4.4vw,4.75rem)]" data-reveal>
            <span className="block">It started with one car.</span>
          </h2>
          <div data-words className="mt-12 max-w-[32ch] font-display text-[clamp(1.375rem,2.1vw,2rem)] leading-[1.2] tracking-[-0.01em]">
            <p>
              <Words text="One sedan, one driver, and airport runs before the city woke up." />
            </p>
            <p className="mt-6">
              <Words text="People came back and asked for the same driver: the one who drove well and treated them like family." />
            </p>
            <p className="mt-6">
              <Words text="So we grew one familiar face at a time." />
            </p>
          </div>
          <p className="mt-12 max-w-[44ch] text-[1.0625rem] opacity-80" data-reveal>
            <span>
              The name comes from <em className="not-italic font-bold opacity-100">safar</em>, a journey. The drivers make it personal.
            </span>
          </p>
        </div>
      </div>
    </Chapter>
  );
}
