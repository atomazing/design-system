# Source Of Truth

This file defines ownership boundaries for the Next.js starter.

## Ownership Matrix

| Zone | Owns | Does Not Own |
| --- | --- | --- |
| Repository root | package API, presets exports, generic migration docs, generic consumer rules, release history | starter-local routing, starter brand map, starter verification runbooks |
| `examples/next-app-router` | current starter rules, route map, content map, brand system, theme wiring, starter verification | historical archive evidence, workflow engine artifacts, generic migration framework |
| `backlog/06_next-app-router-aplai` | historical execution context and provenance only | current starter source of truth |

## Canonical Files By Concern

- Routes: `../customization/route-map.md`
- Content: `../customization/content-map.md`
- Brand: `../customization/brand-system.md`
- Theme pack: `../customization/theme-policy.md`
- Verification: `verification.md` and `../ops/verification-checklist.md`
- Design-system integration contract: `../design-system/contract-v2.md`

## Working Rule

When a starter-local file conflicts with a generic root document, the starter-local
file wins for work inside `examples/next-app-router`.
