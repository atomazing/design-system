# Changelog

## Unreleased

### Packaging cleanup (v2.x)

- publish build is now ESM-only artifacts (`.js` + `.d.ts`) to match `exports`
- sourcemaps are disabled by default in release builds (opt-in with `SOURCEMAP=1`)
- removed broken `migration:validate` script (legacy migration automation scripts were removed)
- removed unused `@emotion/css` peer dependency
- kept `darkModeOptions` in the root public API (`@atomazing-org/design-system`)

### Root API slimming (v3.0, breaking)

- removed demo/app-level components from the root API (`DialogBtn`, `Loading`, `PathName`, `ErrorBoundary`)
- removed generic app/browser/time helpers from the root API (for example `displayGreeting`, `timeAgo`, `getSystemInfo`, `useResponsiveDisplay`)
- removed raw built-in theme constants from the root API (`editorialClassic`, `modernMinimal`, `neoGlass`, `retroTerminal`, `warmEarth`)
- built-in presets remain available via `@atomazing-org/design-system/presets`
- `darkModeOptions` remains available from the root import
- removed app-specific keyframe exports from the root API (`logoutAnimation`, `installAppAnimation`)

## 2.0.0

### Summary

Major v2 release of `@atomazing-org/design-system` with a preset-first theme contract, ESM-only packaging, and a documented migration route system.

### Breaking changes

- Package is ESM-only (`type: module`, no CommonJS `require` export conditions)
- Legacy public theme model exports removed from the public API:
  - `NamedThemeOptions`
  - `ThemeModeBackground`
- Built-in preset ids are stable slugs (for example `editorial-classic`, `warm-earth`)
- Dark mode supports only `light | dark | system` (`auto` removed)
- Persisted settings shape is now v2-only:
  - `{ "themeId": "<slug>", "darkMode": "light|dark|system" }`
- Legacy localStorage payloads are not migrated (invalid/legacy payloads reset to defaults)

### Migration guidance

- Read the v2 migration notes: `docs/design-system/migration-v2.md`
- Choose a route in `migrations/docs/migrations/design-system/README.md`
- Repo canonical routes:
  - `mui4-to-latest`
  - `greenfield`
  - `adopt-existing` (also covers backlog Phase 14 / `mui5-6-to-v7`)

### Verification (repo)

- `npm run lint`
- `npm test`
- `npm run build`
- `npm run smoke:esm`
