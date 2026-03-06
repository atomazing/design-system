# Starter Template Delivery Board

| Area | Purpose | Current Owner Files | Status | Protected By |
| --- | --- | --- | --- | --- |
| Landing shell | product-style starter entry route | `src/app/page.tsx`, `src/components/home/GuidedStarterFlow.tsx` | Active | `tests/starter-home.spec.ts`, `pnpm run build` |
| Header navigation | route access and brand lockup | `src/components/ui/AppHeader.tsx`, `src/content/starterFlow.ts` | Active | `tests/starter-home.spec.ts` |
| Brand system | icon, logo, wordmark, metadata | `src/app/icon.svg`, `src/components/ui/StarterLogo.tsx`, `src/components/ui/StarterWordmark.tsx`, `src/app/layout.tsx` | Active | manual QA, `pnpm run build` |
| Presets page | preset pack overview | `src/app/presets/page.tsx`, `src/theme/exampleThemes.ts` | Active | `pnpm run build` |
| Theme controls | preset and mode selection | `src/app/debug/theme/page.tsx`, `src/components/theme/ThemeControls.tsx` | Active | `tests/theme-and-ssr.spec.ts` |
| State diagnostics | effective theme inspection | `src/app/debug/state/page.tsx`, `src/components/theme/ThemeSnapshotCard.tsx` | Active | `tests/theme-and-ssr.spec.ts` |
| Showcase | surface review | `src/app/showcase/page.tsx`, `src/components/showcase/SurfaceCards.tsx` | Active | `pnpm run build`, manual QA |
| Static output | export diagnostics | `src/app/ssr/page.tsx`, `tools/export-static-to-dist.mjs` | Active | `tests/theme-and-ssr.spec.ts`, `pnpm run build` |
| Verification coverage | lint, build, e2e checks | `tests/`, `package.json`, `docs/agents/verification.md` | Active | `pnpm run lint`, `pnpm run build`, `pnpm run test:e2e` |
