# Product Completion Status — ip

Canonical branch: `portfolio-improvements-2026-08`

Product boundary: Vercel Geo IP localization example derivative. It demonstrates request geolocation/localization behavior; it must not fabricate location when deployment metadata is unavailable.

## Core tasks

| ID | Status | Task |
| --- | --- | --- |
| T01 | DONE | Reproduce current Vercel build failure |
| T02 | DONE | Replace removed `@vercel/examples-ui/transpile` subpath with built-in Next `transpilePackages` |
| T03 | DONE | Add regression contract for supported package-transpilation config |
| T04 | DONE | Stop fabricating United States when GeoIP country is absent |
| T05 | DONE | Sanitize locale/country route segments before rewriting |
| T06 | DONE | Render unavailable country state without a fake flag/greeting |
| T07 | DONE | Add regression contract for truthful missing-geolocation behavior |
| T08 | IN PROGRESS | Bootstrap a deterministic npm lockfile through guarded CI |
| T09 | BLOCKED | Execute exact-head TypeScript/build after GitHub runner allocation |
| T10 | BLOCKED | Exact-head Vercel/browser smoke after a new deployment is accepted |

## Improvements

| ID | Status | Improvement |
| --- | --- | --- |
| I01 | DONE | Next config uses supported public framework configuration |
| I02 | DONE | GeoIP absence is represented as `unknown` rather than `us` |
| I03 | DONE | Accept-Language input is normalized to a bounded safe path segment |
| I04 | DONE | Country input is normalized to a bounded safe path segment |
| I05 | DONE | Unknown location omits flag asset lookup |
| I06 | DONE | Unknown location has explicit explanatory UI |
| I07 | PARTIAL | Direct dependencies still use `latest`/`canary` tags until guarded lock bootstrap lands |
| I08 | IN PROGRESS | Guarded workflow generates lockfile, frozen-installs, typechecks and builds before committing it |
| I09 | PARTIAL | Framework/dependency versions should be converted from tags to pinned supported ranges after exact install evidence exists |
| I10 | BLOCKED | Responsive/localization QA requires exact-head hosted preview |

## Product features

| ID | Status | Feature |
| --- | --- | --- |
| F01 | DONE | Root request rewrites into localized country route |
| F02 | DONE | Vercel GeoIP country is shown when supplied |
| F03 | DONE | Locale dictionary fallback remains available |
| F04 | DONE | Missing GeoIP produces truthful unavailable state |
| F05 | DONE | Country flag is shown only for a known country code |
| F06 | PARTIAL | IPv4/IPv6 display is not part of this inherited example despite repository name |
| F07 | DEFERRED WITH REASON | Persistent IP logging is intentionally not introduced |
| F08 | DEFERRED WITH REASON | Third-party geolocation fallback is not added without privacy/product requirements |
| F09 | PARTIAL | Accessibility/performance requires hosted browser verification |
| F10 | BLOCKED | Production promotion requires exact-head build/deploy evidence and explicit approval |

## Verification evidence

Vercel deployment `dpl_EanTz6Q6eyTWEZKFDvNVVFiNc6qR` failed before application build because `next.config.js` required `@vercel/examples-ui/transpile`, a package subpath no longer exported by the installed dependency. The branch now uses Next's supported `transpilePackages` configuration.

Source inspection also found the middleware silently defaulted missing `req.geo.country` to `us`; that trust defect is fixed with an explicit `unknown` route/UI state.

Guarded bootstrap run `34979188331` was created for the current branch but completed before any job was allocated (`jobs=[]`). Therefore no lockfile, TypeScript or production-build PASS is claimed yet.

No merge, production promotion, geolocation logging, credential mutation, billing action or destructive operation has been performed.
