# Route Map

## `/`

- Purpose: canonical landing entrypoint.
- Owns: the starter landing experience and full-screen section flow.
- Do not: turn it into a dashboard or add domain-specific process artifacts.
- Do not add dashboard-style density.
- Do not add more than one primary story per screen.
- Do not introduce competing proof blocks.
- The hero should remain the strongest entrypoint moment.

## `/presets`

- Purpose: list the current preset pack and establish visual direction.
- Owns: preset labels and starter-facing preset overview.
- Do not: turn it into a second theme debugger.
- Keep it as a decision surface, not a deep diagnostic page.
- Content should stay list-driven and easy to scan.

## `/debug/theme`

- Purpose: expose preset and dark mode controls.
- Owns: theme selection UI and persistence testing.
- Do not: treat it as a business workflow screen without renaming and reframing it.
- These controls remain diagnostics and controls.
- Keep copy terse and utility-first.

## `/debug/state`

- Purpose: expose the selected and effective theme state.
- Owns: diagnostics for theme, dark mode, and resolved palette behavior.
- Do not: overload it with unrelated runtime diagnostics.
- This route remains diagnostics and controls.
- Do not evolve it into a business workflow screen without reframing.
- Keep copy terse and utility-first.

## `/showcase`

- Purpose: review core UI surfaces inside the active preset.
- Owns: a surface audit view for visual QA.
- Do not: treat it as a feature showcase for business-domain content.
- This route may expose more UI variety, but it should still use restrained typographic roles.
- It should demonstrate surfaces, not become a second landing.

## `/ssr`

- Purpose: verify static export output behavior.
- Owns: the stable build timestamp diagnostic.
- Do not: treat it as a server-data route.
- Keep it minimal and diagnostic.
- Do not turn it into a content-heavy explainer.

## `/start`

- Purpose: compatibility redirect to `/`.
- Owns: a single redirect and nothing else.
- Do not: add permanent page content unless this route is intentionally repurposed.

## AI Placement Constraints By Route

- `/` optimizes for narrative clarity.
- `/presets` optimizes for choice clarity.
- `/debug/*` optimizes for operational clarity.
- `/showcase` optimizes for audit clarity.
- `/ssr` optimizes for build confidence.
