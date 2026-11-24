"use client";

import { useEffect, useRef, useState } from "react";

export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-headlight" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const cls = "link text-[1.0625rem]";
  return (
    <div>
      <p className="text-[15px] font-semibold opacity-75">Share this note</p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        <li><a className={cls} href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener">WhatsApp</a></li>
        <li><a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a className={cls} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener">Facebook</a></li>
        <li>
          <button
            type="button"
            className={cls}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* clipboard unavailable */
              }
            }}
          >
            {copied ? "Link copied" : "Copy link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
