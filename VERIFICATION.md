# Verification — 17 September 2026

The production website was run locally and checked in Chromium on desktop and mobile.

## Automated checks

- Production client and SSR builds, followed by TypeScript checks.
- Four reservation tests covering future dates, leap days, invalid dates, past Beirut times, opening-hour boundaries, integer party sizes, timezone midnight and seasonal offsets.
- HTTP 200 for Home, Menu, deep-linked Menu, Visit, Preview Notes, robots.txt, sitemap.xml and manifest; HTTP 404 for an unknown route.
- One H1 and noindex/nofollow on each main HTML route.
- 299 unique menu IDs; all 89 checked original/featured/poster/social image assets return nonempty responses.
- Both hero video variants support byte-range responses for browser playback.

## Browser checks

- Desktop 1280px, mobile 320px and 390px, and tablet 768px checked for horizontal overflow across the verification sessions.
- Food/Drinks counts 87/212, Burger category 8, accent-insensitive “entrecote” search 13, empty results, clear filters, and switching menu types after searching.
- Dish deep links, full-resolution detail image, Escape/close button, background scroll lock and restored keyboard focus.
- Mobile navigation opens and dismisses with Escape.
- Required date and fractional guest count validation; valid four-guest enquiry produces the correct WhatsApp number and encoded date/time. Editing inputs clears the prepared message. No message was sent.
- FAQ expansion, hero pause/play, desktop/mobile video selection, offscreen pause, and responsive photo loading.
- No browser errors in the tested flows.
- Earlier source audit compared all 299 rendered names/prices/descriptions with the captured official menu, with zero mismatches after whitespace normalization.

## Fixes made

- Removed unused editor styling from the site payload: CSS reduced from about 370 kB to 27 kB (about 93%).
- Replaced four oversized menu thumbnail downloads (0.49–0.93 MB each) with 6–10 kB thumbnails; full-resolution originals remain in dish details.
- Added responsive 800/1200/2400px featured photos.
- Fixed stale search filters, router-aware dish links, dialog focus/scroll handling and mobile navigation dismissal.
- Added current Beirut-time reservation validation, including past times and invalid calendar dates.
- Fixed social asset paths and included the main pages in the sitemap.
- Replaced the private-runner template CI with standard GitHub Actions checks. Build runs before typechecking so generated route types exist on clean checkouts.

## Limits

Reduced-motion, save-data, slow-network and failed-video fallbacks were reviewed in source; no network-throttling simulation, screen-reader audit, Lighthouse score, Safari/Firefox pass or public-host performance guarantee is claimed. Restaurant confirmation is still needed for the business details listed in UPDATE-GUIDE.md.
