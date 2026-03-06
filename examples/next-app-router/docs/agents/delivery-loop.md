# Delivery Loop

Use this sequence when changing the starter:

1. Explore the current source files and identify the ownership zone being changed.
2. Update starter content and copy first.
3. Update brand assets or brand text if the change affects naming or marks.
4. Update theme pack selection or theme policy docs if presets are involved.
5. Update routes or route navigation if route behavior changes.
6. Update starter docs so the docs pack stays current.
7. Run command checks from `verification.md`.
8. Run manual QA from `manual-qa-policy.md`.

## Anti-Regression Rules

- Do not add business-domain docs to the starter.
- Do not restore meta copy that narrates the layout or route structure back to the user.
- Do not hand-style primary surfaces locally when the preset should own that styling.
- Do not move starter-local source-of-truth back into root docs.
