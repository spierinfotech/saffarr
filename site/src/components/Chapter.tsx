/** Sky colours for each hour of the drive (hex, so the sky controller can tween them). */
export const sky = {
  night: { bg: "#0a0c18", fg: "#f2f0ea" },
  blueHour: { bg: "#141c3a", fg: "#f2f0ea" },
  dawn: { bg: "#e2703a", fg: "#111318" },
  ghat: { bg: "#15291c", fg: "#f2f0ea" },
  day: { bg: "#e9ece6", fg: "#111318" },
} as const;

export type Sky = keyof typeof sky;

/**
 * One stop on the drive. `time` (HH:MM, may run past 24:00 for "tomorrow")
 * feeds the on-screen clock; `stop` is what the clock says underneath.
 */
export function Chapter({
  id,
  tone,
  time,
  stop,
  className = "",
  labelledBy,
  children,
}: {
  id?: string;
  tone: Sky;
  time: string;
  stop: string;
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
}) {
  const s = sky[tone];
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-chapter
      data-time={time}
      data-stop={stop}
      data-bg={s.bg}
      data-fg={s.fg}
      className={`chapter ${className}`}
      style={{ ["--sky" as string]: s.bg, ["--ink-on" as string]: s.fg }}
    >
      {children}
    </section>
  );
}
