# Geo IP Localization — Vercel / Next.js Example

Historical Next.js Edge Middleware experiment based on the Vercel examples repository.

The project detects request geolocation / language context at the edge, rewrites the home route to a localized country page, loads a small translation dictionary, and displays a country flag / localized greeting.

This is an **adapted Vercel example**, not a standalone geolocation product.

## Architecture

```text
GET /
  |
  v
Next.js Middleware
  |
  +-- req.geo.country
  +-- Accept-Language header
  |
  v
rewrite -> /<locale>/<country>
  |
  v
localized page + flag + dictionary
```

## Middleware behavior

`middleware.ts` runs only for `/` and derives:

```text
country = req.geo?.country || "us"
locale  = first Accept-Language value || "en-US"
```

It then rewrites the request to:

```text
/<locale>/<country>
```

without changing the URL shown to the visitor.

## Localized page

`pages/[locale]/[country].tsx` uses blocking fallback generation and loads a dictionary through the local `lib/api` abstraction.

The page presents:

- localized title / subtitle / greeting;
- the resolved locale;
- a country flag;
- a world-map background;
- a link to Vercel edge-header documentation.

## Important historical Vercel API caveat

The code comments state that `req.geo` availability depended on Vercel plan / runtime behavior at the time this example was created.

Next.js and Vercel geolocation APIs have changed across versions. If reviving this example, verify the current request / geolocation API rather than assuming historical `NextRequest.geo` behavior is still supported unchanged.

The package also uses:

```text
next: canary
react: latest
@vercel/examples-ui: latest
```

so dependency resolution today may produce a stack very different from the original working version.

For reproducibility, pin compatible historical versions or migrate the code to current Next.js / Vercel conventions.

## Privacy boundary

Country / locale detection can be useful for localization, but location-derived personalization should remain proportional to the product need.

A production application should avoid claiming exact user location when only coarse IP geolocation is available and should document any analytics / storage of location information separately.

## Tech stack

- Next.js
- React
- TypeScript
- Next.js Middleware / Edge runtime concepts
- Tailwind CSS
- `@vercel/examples-ui`

## Local development

```bash
git clone https://github.com/shikakker/ip.git
cd ip
npm install
npm run dev
```

Build / start:

```bash
npm run build
npm start
```

Local development may not reproduce production IP geolocation automatically because edge-provider geolocation metadata is normally injected by the hosting platform.

## Upstream provenance

`package.json` declares:

```text
https://github.com/vercel/examples.git
```

as the repository origin.

Preserve the upstream MIT license and required notices when redistributing derived code.

## Current status

**Historical Vercel Edge geolocation / localization example.** The repository is useful as an experiment with middleware rewrites, request metadata, i18n dictionaries, and edge-personalized rendering; it should not be presented as an original geolocation platform.

## License

The package declares MIT. Verify the corresponding upstream Vercel example license / notices for the exact source version.