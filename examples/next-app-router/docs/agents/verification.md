# Verification

Use these checks for starter changes.

## Required Commands

- `pnpm run lint`
  Proves ESLint and TypeScript stay green for the starter app.
- `pnpm run build`
  Runs `prebuild`, rebuilds the root library, executes `next build`, and exports
  static output into `dist/`.
- `pnpm run test:e2e`
  Verifies the landing flow, theme persistence, and static diagnostics routes.

## Doc Sanity Checks

- `rg -n "examples/next-app-router/docs/features/bmad-next-app-router-apla[i]|examples/next-app-router/docs/decisions/bmad-next-app-router-apla[i]|examples/next-app-router/docs/debt/bmad-next-app-router-apla[i]|examples/next-app-router/docs/features/reviews|examples/next-app-router/docs/features/ops" ../../backlog/06_next-app-router-aplai`
- `rg -n "bmad-next-app-router-apla[i]|apla[i]-landing|APL[A]I" ..`
- `rg -n "Guided landing flo[w]|Story progres[s]|Final payof[f]" ..`

The first check ensures archive files no longer depend on removed starter docs.
The second check ensures removed archive naming does not come back into starter docs
or source. The third check ensures banned meta-copy phrases do not return to visible
UI. Matches in tests are acceptable only as negative assertions.

## Merge Blockers

- failed `lint`, `build`, or `test:e2e`
- broken local doc links
- restored removed archive naming in starter docs or source
- archive files that still reference removed starter docs
