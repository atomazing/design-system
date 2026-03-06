---
project_name: 'design-system'
user_name: 'Lenovo'
date: '2026-03-03T16:41:26.7558640+03:00'
sections_completed: ['technology_stack']
existing_patterns_found: 12
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- Package: `@atomazing-org/design-system` `2.0.1`
- Package manager: `pnpm@9.14.4` with workspace support
- Language/runtime target: TypeScript `5.8.3`, ESM-only package output, build target `es2018`
- UI stack: React `19.2.4`, React DOM `19.2.4`, MUI `7.3.8`, Emotion `11.14.x`
- Build: `tsup` `8.5.0` generating ESM bundles and `.d.ts` files into `dist/`
- Testing: Vitest `2.1.3`
- Linting/formatting: ESLint `9.13.0`, Prettier `3.6.2`, `@atomazing-org/eslint-config` `3.6.0`
- Canonical consumers: `examples/react-app` (Vite) and `examples/next-app-router` (Next.js App Router SSR)
- Published entry points: root export and `./presets`

## Critical Implementation Rules

_Discovery complete. Awaiting rule generation phase._
