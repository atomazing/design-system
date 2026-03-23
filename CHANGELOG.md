# Changelog

## 3.7.2

### Summary

Release hardens the v3 public contract around a preset-first theming surface,
customizable persistence keys, and publish-ready ESM packaging.

### Added

- `ThemeProviderWrapper` now accepts `settingsStorageKey` so multiple apps on one
  origin can persist theme settings independently
- built-in BPM/strong neon presets are exposed through
  `@atomazing-org/design-system/presets`
- default preset typography was refined for Cyrillic-first application surfaces

### Changed

- publish build now ships ESM artifacts plus generated runtime stubs for
  declaration-only runtime references
- root package exports now include `default` conditions for `.` and `/presets`
- migration pack remains bundled with the published package and validated via
  `check:migration-readiness`

### Breaking changes

- root API was intentionally slimmed down; demo/app-level exports such as
  `DialogBtn`, `Loading`, `PathName`, and `ErrorBoundary` were removed
- generic app/browser/time helpers such as `displayGreeting`, `timeAgo`,
  `getSystemInfo`, and `useResponsiveDisplay` were removed from the root import
- raw built-in theme constants are no longer exported from the root import;
  consume presets from `@atomazing-org/design-system/presets`
- legacy typography exports were removed from the public surface:
  `muiTypography`, `typographyVariants`, `src/styles/typography`, and
  `src/models/typography`
- app-specific keyframe exports such as `logoutAnimation` and
  `installAppAnimation` were removed from the root import

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
