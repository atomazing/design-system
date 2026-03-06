# Migration And Agent Entry Points

This folder ships migration guidance and AI-facing instructions with
`@atomazing-org/design-system`.

## Source Of Truth

- `AGENTS.md`
- `migrations/skills/design-system-consumer-agent/SKILL.md`
- `migrations/skills/design-system-migration-agent/SKILL.md`
- `migrations/docs/migrations/design-system/README.md`
- `migrations/docs/migrations/design-system/shared/WORKING-RULES.md`

## What Ships With The Package

- working rules for application repositories
- route-based migration docs and shared gates
- AI skills for standard adoption and migration-heavy adoption
- a concrete `adopt-existing` case study in `routes/adopt-existing/AEROCRM-EXAMPLE.md`

## Which Entry Point To Use

- standard integration or maintenance:
  - `migrations/skills/design-system-consumer-agent/SKILL.md`
- route-based migration:
  - `migrations/skills/design-system-migration-agent/SKILL.md`

## When To Prefer Migration

Use route-based migration instead of ad hoc edits when the target app has:

- `@material-ui/*`
- a custom token or theme layer
- multiple theme providers or persistence stores
- a broad request to standardize the UI foundation on this package

## Notes

- `migrations/scripts/*` is optional legacy automation.
- The docs and skills are the source of truth for AI-driven migration work.
- Migration closeout now requires a real app startup check, not only lint/test/build.
- Run `pnpm run check:migration-readiness` before migration work to validate the
  local migration pack contract (routes, specs, shared docs, and gitignore rules).
