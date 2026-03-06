# Common Migration Regressions

Use this document as a fast lookup when a migrated consumer app "builds fine"
but still looks or behaves wrong at runtime.

For each regression class below:

- confirm the symptom on a real route
- fix the structural cause, not only the visible symptom
- add or tighten smoke or lint coverage when the regression is likely to return

## Startup Crash On First Route

Symptom:

- app opens to a blank page, hard crash, or startup error in the browser console

Common causes:

- module-scope i18n work before locale activation
- module-scope `window`, `document`, `navigator`, or storage access
- broken root provider wiring

Fix:

- move browser-only or locale-dependent work into runtime-safe component or hook code
- verify the root uses the intended provider stack

Catch it with:

- real browser startup check
- smoke route that fails on console or page errors

## Duplicate React Or Emotion Runtime

Symptom:

- startup warning about duplicated `react`, `react-dom`, `@emotion/react`, or `@emotion/styled`

Common causes:

- bundler dedupe or singleton-sharing not aligned after migration

Fix:

- align bundler runtime resolution with dedupe, aliasing, or singleton-sharing

Catch it with:

- browser startup check
- migration closeout report that records warnings by exact package

## Workspace Does Not Fill The Content Region

Symptom:

- page content collapses into partial-width cards
- dashboard or form area leaves empty workspace

Common causes:

- route roots or page containers lost flex growth, `min-width`, or `min-height`

Fix:

- restore the shared shell and page-root layout contract

Catch it with:

- shell smoke check on a real content route

## Right Edge Overflow On Desktop

Symptom:

- content protrudes past the visible right edge
- horizontal scrolling appears unexpectedly

Common causes:

- `width: 100%` plus internal padding under content-box sizing
- shell content panes or page roots forced wider than the workspace

Fix:

- use `box-sizing: border-box` on shared padded full-width containers
- remove forced width where it is not needed

Catch it with:

- overflow assertion on the shared content pane
- overflow assertion on at least one routed page root

## Dashboard Metrics Lose Hierarchy

Symptom:

- metric labels, values, and helper text read like one text level
- numbers no longer stand out from titles

Common causes:

- label and value typography share the same effective size and weight
- broad card cleanup flattened the text hierarchy

Fix:

- restore distinct label, value, and helper text scales
- keep metric emphasis explicit instead of relying on defaults

Catch it with:

- smoke assertion on computed metric label vs value emphasis
- visual QA on analytics or dashboard routes

## Dashboard Card Falls Into Full-Width Row

Symptom:

- one analytics or dashboard card drops onto its own row on desktop
- gaps between dashboard cards become inconsistent

Common causes:

- stale `gridColumn: 1 / -1`
- mixed grid gap contracts between dashboard panels

Fix:

- remove accidental full-width spans
- keep one explicit grid template and gap rhythm per dashboard surface

Catch it with:

- smoke assertion on desktop card alignment

## Overlay Semantics Drift

Symptom:

- dialog or drawer still opens, but labels, descriptions, or close controls are wrong or missing

Common causes:

- wrapper refactor dropped stable ids
- decorative overlay chrome was left visible to assistive tech
- searchable overlay uses generic markup instead of `combobox` or `listbox`

Fix:

- restore stable `aria-labelledby` and `aria-describedby`
- label close actions
- restore proper overlay search semantics

Catch it with:

- smoke coverage through stable overlay entrypoints

## Compact Controls Drift Away From The Preset

Symptom:

- legends, chips, segmented filters, or compact badges look like app-local chrome instead of preset-aligned UI

Common causes:

- consumer restyling replaced neutral shared composition with ad hoc chip-like surfaces

Fix:

- rebuild compact controls from neutral MUI composition such as `Stack`, markers, and `Typography`

Catch it with:

- visual QA on charts, segmented controls, and compact summary areas

## Mojibake Or Broken Non-Latin Text

Symptom:

- Cyrillic or other non-Latin copy renders as broken symbols or replacement characters

Common causes:

- encoding-sensitive rewrites
- bulk replacements across localized files

Fix:

- keep touched files in UTF-8
- restore corrupted copy from a valid source

Catch it with:

- mojibake scan
- real-route verification of localized text

## Consumer Build Warning Left Unowned

Symptom:

- build stays noisy and nobody knows whether the app or an upstream package owns the warning

Common causes:

- stale asset globs
- oversized local chunks
- local barrel import cycles
- upstream toolchain warning misclassified as app debt

Fix:

- fix consumer-owned warnings in the app
- record upstream-only warnings by exact package and file

Catch it with:

- final build review during closeout
