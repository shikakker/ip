# Geo IP Localization — Vercel / Next.js Example

A maintained adaptation of the Vercel examples Geo/IP localization demo.

The project reads Vercel's coarse country request header plus `Accept-Language`, rewrites `/` to a localized route, loads a small translation dictionary, and renders the resolved locale/country with a country flag when location metadata is available.

This is an **adapted Vercel example**, not a standalone IP intelligence product and not a source of precise user location.

## Request flow

```text
GET /
  |
  v
Next.js Proxy (`proxy.ts`)
  |-- x-vercel-ip-country -> normalized country or `unknown`
  |-- Accept-Language     -> normalized locale or `en-us`
  v
rewrite -> /<locale>/<country>
  |
  v
pages/[locale]/[country].tsx
  |-- dictionary
  |-- coarse country state
  |-- flag when country metadata exists
```

Missing country metadata fails closed to `unknown`; the UI reports that location is unavailable instead of fabricating a default country.

## Stack

- Next.js 16.3.5
- React 19.3.0
- TypeScript 5.9.2
- Node.js 22
- Tailwind CSS
- `@vercel/examples-ui` 2.0.4
- Vercel request headers / Proxy rewrite

Runtime dependencies are pinned to stable releases and committed in `package-lock.json`.

## Development

```bash
git clone https://github.com/shikakker/ip.git
cd ip
npm ci
npm run dev
```

Quality gates:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev --audit-level=high
```

Or run the local aggregate code check:

```bash
npm run check
```

GitHub Actions repeats install, regression tests, production dependency audit, typecheck, zero-warning lint, and production build on Node 22.

## Local geolocation behavior

Vercel injects `x-vercel-ip-country` in its hosted request environment. Local development normally does not have that header, so the application intentionally renders the `unknown`/location-unavailable path unless you exercise the request boundary in an equivalent environment.

`Accept-Language` is treated as request metadata rather than a verified user preference. Both locale and country path segments are normalized before they are used for the rewrite.

## Privacy boundary

The application uses only coarse provider-supplied country metadata for localization. It does not claim street-level or exact location. If this example is extended with analytics or durable user data, collection and retention of location-derived metadata should be documented explicitly.

## Upstream provenance

`package.json` retains `https://github.com/vercel/examples.git` as the upstream repository reference. Preserve the upstream MIT license and required notices when redistributing derived code.

## Deployment

The repository is linked to a Vercel project, but production promotion/domain changes are intentionally separate from code hardening. Verify an exact-head preview before promoting changes.

## License

MIT, subject to the corresponding upstream Vercel example notices.
