# Saffarr Travels — design system ("The 4:30 Drive")

The home page is one drive, told like a film. A clock in the header advances as you scroll, from a 04:30 pickup to arrival and round to tomorrow's 04:30, and the page sky changes with the hour. Tokens live in `src/app/globals.css`; chapter skies in `src/components/Chapter.tsx`.

## The sky, by chapter

| Chapter | Clock | Sky | Ink |
|---|---|---|---|
| Pickup at your door (hero) | 04:30 | night `#0a0c18` | paper `#f0f1ee` |
| It started with one car / Planner | 04:45–05:05 | blue hour `#141c3a` | paper |
| Three roads (services) | 05:40 | dawn `#e2703a` | ink `#111318` |
| Chai at the top of the ghat (drivers) | 06:20 | ghat green `#15291c` | paper |
| Cars, Weekends, Notes, Questions | 07:00–11:15 | day haze `#e9ece6` | ink |
| The morning after (quote) | 09:00 | dawn | ink |
| Tomorrow, 04:30? (booking) + footer | 28:30 → 04:30 | night | paper |

Action colour: headlight `#ffb03b` (primary buttons, the planner's answer, the slider's distance and progress line, focus ring, link underlines on hover).

With JavaScript, chapters turn transparent and `MotionLayer` tweens `--bg`/`--fg` on `<html>`; without it, each chapter paints its own sky.

## Type

Two families, self-hosted via `next/font`:
**Rajdhani** (Indian Type Foundry; squared letters like station boards and dashboards) for the wordmark and big titles only;
**Barlow** (drawn from highway signs and number plates) for everything else.

- Big titles (`.display`, `.h-chapter`) and wordmark (`.wordmark`): Rajdhani 700, tracking −0.015em, leading ~0.92.
- Mid titles (`.h-mid`, `.title-mid`): Barlow 800. Statements (`font-display` utility): Barlow 600.
- Clock and big numbers (`.numerals`): Barlow 800, tabular figures.
- Body: 400, normal width, 18px / 1.55.

## Components

- **Buttons:** fully round; `btn-light` (headlight) and `btn-ink`. Secondary actions are underlined text links (`.link`).
- **Planner:** a sentence with inline selects (`.inline-field`); the answer is a giant headlight-coloured time.
- **Subtitles** (`.subtitle`): film-subtitle bars for the drivers' lines and driver's tips.
- **Fields** (`.field`): underline-only inputs. **Toggles** (`.toggle`): the choice is the words themselves (trip type; "Up for a chat" / "Quiet ride, please").
- **Slider:** card-to-hero expansion, interruptible; headlight progress line on the left.

## Motion

- Header clock interpolates between chapters' `data-time`; the stop name changes per chapter.
- Sky colour tween per chapter (0.9s).
- "It started with one car": words light up as you scroll (`[data-words]`).
- Entrances on `[data-reveal]` children; parallax on `[data-parallax]` photos; slow drift on hero photos.
- `prefers-reduced-motion`: no smooth scroll, no entrances or parallax; clock and sky change instantly; the slider crossfades.

## Imagery

Openly licensed photographs and one old aquatint, credited in the footer (`src/content/credits.json`). Each slot is marked `SWAP` for the client's own photos.
