"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-display wordmark text-[28px] leading-none tracking-[-0.01em] ${className}`}>Saffarr</span>;
}

/**
 * A quiet bar: the wordmark, the drive clock, a few links and one action.
 * Its colour follows the sky of the chapter underneath.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Pages with their own booking form (the weekends guide) book on the spot instead of leaving for the home page.
  const bookHref = usePathname()?.startsWith("/weekends") ? "#book" : "/#book";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-fg transition-[background-color,padding] duration-500 ${
        scrolled || open ? "bg-[var(--bg)] py-3" : "py-5"
      }`}
    >
      <div className="wrap grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link href="/" aria-label="Saffarr Travels, home" className="justify-self-start">
          <Wordmark />
          <span className="sr-only"> Travels</span>
        </Link>

        <div id="drive-clock-wrap" aria-hidden className="flex items-baseline gap-3 justify-self-center">
          <span id="drive-clock" className="numerals text-[28px] leading-none sm:text-[32px]">
            04:30
          </span>
          <span id="drive-stop" className="hidden whitespace-nowrap text-[14px] font-semibold opacity-75 lg:inline xl:hidden min-[1500px]:inline">
            Pickup at your door
          </span>
        </div>

        <div className="flex items-center gap-6 justify-self-end">
          <nav aria-label="Main" className="hidden xl:block whitespace-nowrap">
            <ul className="flex items-center gap-6 text-[15px] font-semibold">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="opacity-85 hover:opacity-100 hover:underline decoration-headlight">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`tel:${site.phoneE164}`} className="hidden md:inline xl:hidden 2xl:inline whitespace-nowrap text-[15px] font-bold tnum hover:underline decoration-headlight">
            {site.phoneDisplay}
          </a>
          <Link href={bookHref} className="btn btn-light !min-h-[44px] !px-5 !py-3 text-[15px]">
            Book
          </Link>
          <button
            type="button"
            className="xl:hidden -mr-2 p-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="size-7" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 8h18M3 16h12" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="xl:hidden h-[calc(100dvh-68px)] overflow-y-auto">
        <ul className="wrap flex flex-col pt-10 pb-12">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} onClick={() => setOpen(false)} className="block py-2 font-display text-[2.75rem] leading-[1.1] tracking-[-0.02em]">
                {n.label}
              </Link>
            </li>
          ))}
          <li className="mt-10">
            <a href={`tel:${site.phoneE164}`} className="text-[22px] font-bold tnum">
              {site.phoneDisplay}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
