# Muu Grill House — review preview
Built 17 September 2026. This is an unpublished, noindex restaurant concept for review.
## Build and run locally
First run `cd app && bun install --frozen-lockfile && bun run build`, then return to the repository root. With Node.js 22 or newer: `node preview.mjs`. Open http://127.0.0.1:4187. It binds only to localhost.
## Edit and rebuild
`cd app && bun install --frozen-lockfile && bun run build`
React 19, TypeScript, TanStack Start, native CSS. Higgsfield project fdfd8b44-5002-458b-897e-ccb1a9ec48c9.
## Content files
- app/src/data/restaurant.ts: verified contact facts and destination links.
- app/src/data/menu.json: all 299 source entries, 26 categories (87 food; 212 drinks). Raw spelling, descriptions and decimal prices retained. Update here then rebuild.
- app/src/routes/index.tsx: editorial Home content.
- app/src/components/muu-visit.tsx: visit information and reservation enquiry.
- app/src/muu.css: brand tokens, responsive layout and motion.
- app/public/assets/menu: 70 optimized official photos.
- app/public/assets/hero-*: Higgsfield campaign loop and poster variants.
Do not infer currency from restaurant location. Current menu UI preserves source values without a currency symbol. After explicit currency confirmation, update price formatting in muu-menu.tsx and remove pending copy.
## Sources and verification
Official menu: https://menu.omegasoftware.ca/muugrillhouseandbar
Official profile: https://linktr.ee/Muugrillhouse
Instagram: https://www.instagram.com/muugrillhouse/
WhatsApp Order Now destination verified from official Linktree: https://wa.me/96170320232
Address: The Village, Dbayeh, Lebanon. Published hours noon–midnight daily. Instagram lists pet friendly.
Menu photos originate at https://s3.eu-central-1.amazonaws.com/act.omegapos.com/OmegaCloud/178126/SalesItems/ followed by each item's image value. Local WebP copies are optimized versions.
Logo: https://ugc.production.linktr.ee/a2c7d1c0-5e0a-4de3-86ea-9c4fcb2d6c95_348bdd49fb98a4852a97eb726a4a972d-tplv-tiktokx-cropcenter-1080-1080.jpeg . Original retained; surrounding whitespace cropped for header.
Hero reference: official australian-entrecote dish (source filename australina-entrecoteeeeeee.jpg). Higgsfield generated a campaign still and a 7-second cinematic food film, not a rendering of the restaurant interior. The final poster comes from the final video. No stock venue images or fabricated testimonials.
Higgsfield still generation a410f1c4-969e-47df-9786-32eb54b1ecba; video b876f808-3e45-470e-b9aa-210f62649221.
Design inspiration: supplied Pinterest https://pin.it/3Xphontj2 ; Awwwards Amici https://www.awwwards.com/sites/amici ; 21st.dev interactive hover button. Inspiration only, no third-party design code or images copied.
## Owner confirmations before official launch
1. Currency and current prices. Four champagne entries listed at 0.00 display Ask for price. BTL JAMESON 10.00 and BTL GLENLIVET 12Y 17.50 need reconfirmation. Shrimp Salad description is incomplete in source.
2. Exact official Google Maps pin, parking and accessibility details. Until then directions request goes to verified WhatsApp.
3. Delivery/pickup eligibility, zones, fees, minimums, payment and hours. No cart or checkout enabled; Ask About Delivery is the available flow.
4. Approved restaurant interior photographs; no venue gallery fabricated.
5. Choose the official hosting destination and domain before public launch. The GitHub repository stores the source; it does not deploy the site automatically.
6. On approved official launch: verify final URL/canonical/social image in app-meta.json, decide whether to remove preview notice and noindex in __root.tsx and robots[.]txt.ts, then verify all public routes.
## Behaviors
Reservation form validates date, time and party size and prepares an editable WhatsApp handoff. It does not book or send messages.
Hero is muted and inline, has a pause control, pauses out of view or when document hidden, and keeps posters for reduced motion/save-data/slow-network or video failures. Natural page scrolling.
All menu items open native dialog details; search covers food and drinks including accents. Zero prices never display as free.

## HD imagery revision
Hero rebuilt with Higgsfield as a 10-second 1920×1080 turntable loop. Four featured stills are 2400×1792, saved as high-quality WebP in app/public/assets/hq and reused in matching menu details. Remaining menu photographs retain source quality. Playback resumes when returning to the foreground or viewport unless manually paused or reduced-motion/data-saving is active.
