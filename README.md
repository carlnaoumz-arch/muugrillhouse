# Muu Grill House

Restaurant website for Muu Grill House at The Village, Dbayeh. Built with React 19, TypeScript and TanStack Start. Includes a rotating HD hero film, a searchable 299-item menu, dish details, and WhatsApp table enquiries.

## Run locally

Requires Bun 1.4.2 and Node.js 22 or newer.

```sh
cd app
bun install --frozen-lockfile
bun run build
cd ..
node preview.mjs
```

Open http://127.0.0.1:4187. The preview server binds to localhost. Set `PORT` to change the port.

For development, run `bun run dev` inside `app`. Run `bun run test` for reservation validation tests. `bun run build` builds both client and server and runs TypeScript checks. GitHub Actions repeats installation, tests and build on pushes and pull requests.

## Content and images

- `app/src/data/menu.json`: 299 entries copied from the official menu, including source descriptions and prices.
- `app/src/data/restaurant.ts`: contact details and verified links.
- `app/src/muu.css`: restaurant design and responsive layouts.
- `app/public/assets/menu`: optimized original restaurant photos.
- `app/public/assets/hq`: Higgsfield hero film and four AI-generated featured interpretations, with responsive photo variants.

AI imagery is based on restaurant references but may differ in plating and details. The four corresponding menu dishes use these interpretations; other menu photos retain the original source imagery. See `asset-sources.json` for provenance.

## Publication status

This is an owner preview with noindex enabled. No public hosting deployment is configured. The enquiry form prepares a WhatsApp message; it does not send it or confirm a booking. Currency, exact map pin, delivery terms, unusual source prices and final launch details still need restaurant confirmation. See [UPDATE-GUIDE.md](UPDATE-GUIDE.md).

Test results and remaining verification limits are documented in [VERIFICATION.md](VERIFICATION.md).
