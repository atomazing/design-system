# Verification Checklist

## Before Editing

- Read `../../AGENTS.md`.
- Read `../README.md`.
- Identify which ownership zone is changing.

## Before Merge

- Confirm doc links are valid.
- Confirm archive files do not point to removed starter docs.
- Confirm removed archive naming was not reintroduced.
- Confirm each landing section still respects content and CTA budget.
- Confirm no AI-assisted layout pass introduced new sections, extra surface layers, or competing focal points.
- Run `pnpm run lint`, `pnpm run build`, and `pnpm run test:e2e`.

## Before Release

- Complete the manual QA pass on key routes.
- Verify the exported `dist/` output.
- Re-check metadata and brand consistency after any brand change.
- Confirm the landing still passes the visual contract from `docs/landing-template-rules.md` after any content migration.
