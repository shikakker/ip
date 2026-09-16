# ip — IP / Edge Utility Modernization Roadmap

The repository contains a Next.js/TypeScript application with middleware and library code. IP-derived behavior requires careful privacy and proxy-awareness.

## 10 tasks

1. Document which request headers/middleware signals are used to derive or display IP-related information.
2. Handle trusted proxy/CDN headers explicitly and avoid blindly trusting arbitrary forwarded headers.
3. Define behavior for IPv4, IPv6, localhost, missing values and malformed addresses.
4. Minimize IP logging/storage and document whether any value is persisted or sent to third parties.
5. Add tests for middleware parsing, proxy scenarios and representative IPv4/IPv6 inputs.
6. Add user-facing unavailable/error states rather than fabricating a fallback IP value.
7. Add CI for lint, type-check, tests and production build.
8. Audit `.npmrc`, dependencies and current edge-runtime compatibility before framework upgrades.
9. Improve accessibility, responsive presentation and copy explaining that network IP is not equivalent to precise physical location or identity.
10. Position the project as an edge/network utility experiment with verified behavior, not a tracking/security platform unless those capabilities are actually implemented.

## Portfolio value

A compact technical case for edge middleware and network-aware UX when privacy limitations are clearly stated.