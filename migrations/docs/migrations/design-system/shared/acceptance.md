# Shared Acceptance Criteria

A migration is complete only when all of the following are true.

## 0. Execution Discipline

- The route was executed in phases, not as one giant unvalidated diff.
- The app remained runnable at the end of each committed phase.
- If the project is large and broad shell, overlay, or shared-component rewrites were in scope, a smoke safety net existed before those rewrites began.

## 1. Dependencies

- The repo installs `@atomazing-org/design-system`.
- Compatible peer runtimes are present for `@mui/material`, `@mui/icons-material` when needed, `@emotion/react`, and `@emotion/styled`.

## 2. Theme Source Of Truth

- The app root is wrapped with `ThemeProviderWrapper` or an approved thin wrapper around it.
- There is no second competing root `ThemeProvider`.
- Theme selection and dark-mode state do not live in a parallel app-specific source of truth unless it only mirrors design-system state.
- Preset selection is exposed through one explicit app-level theme module, not hidden across generic constants passthrough files.

## 3. Legacy MUI Removal

- `package.json` does not contain `@material-ui/*`.
- App source does not import `@material-ui/*`.

## 4. Token Adoption

- Forbidden legacy token imports and identifiers for the selected route are removed.
- Main UI surfaces use `theme.palette` instead of hardcoded project token files.
- Main typography uses MUI variants or `theme.typography`.
- Visible app text is rendered through `Typography` or approved text-owning MUI APIs, not as raw JSX text in layout wrappers.
- Every `Typography` used by the consumer declares an explicit `variant`.
- Interactive labels rendered through `Button`, `ToggleButton`, `MenuItem`, `Chip`, or `Alert` use `Typography component="span"` with an explicit variant when they render visible text.
- Zero-value wrapper components that merely rename stock MUI primitives or surfaces are removed or collapsed into thin MUI wrappers with real behavior.
- Zero-value surface wrappers that merely forward to MUI `Card`, `Paper`, or similar components are removed.
- Large inline `sx` objects are not left in migrated consumer components; substantial styling is extracted into local `styled(...)` components declared in the same file near the bottom.
- Consumer styling does not rely on decorative gradients, direct shadow styling, or palette alpha suffix hacks in normal app surfaces.
- If the app keeps a preview-only exception such as a theme swatch, that exception is documented and allowlisted explicitly in the repo-local design-contract gate.

## 5. Runtime Startup Health

- The app starts with the repo's normal dev or start command.
- The first route opens successfully in a real browser.
- Browser console startup errors are fixed before closeout.
- Startup warnings caused by the migration are fixed before closeout, not merely recorded.
- Duplicate runtime singleton warnings for `react`, `react-dom`, `@emotion/react`, or `@emotion/styled` are resolved with bundler or runtime alignment.
- Module-scope code does not depend on browser APIs, storage, or i18n locale activation before app initialization.
- Core application shell layout is preserved after migration.
- On desktop layouts, structural regions such as sidebar or menu stay in their intended column and page content stays in its own content region.
- On mobile layouts, stacked navigation and scroll containers still behave as before.
- Route roots and primary page containers still fill the intended workspace or content pane; the migration does not leave partial-width page shells, collapsed dashboards, or unused work areas.
- Shared padded containers such as app-owned cards, page roots, and shell content panes do not overflow horizontally because of `width: 100%` under content-box sizing.
- The application background is still owned by the active preset; root shells and page wrappers do not hardcode a competing page-level background over it.
- Shared UI primitives do not regress into placeholder wrappers or empty visual shells; cards, dialogs, drawers, charts, filters, and nav controls still render usable spacing, hierarchy, and interaction states.
- Shared legends, compact filters, chips, segmented controls, and metric badges remain visually aligned with the active preset; the migration does not replace them with ad hoc chip chrome that fights the preset.
- Analytics dashboards and metric surfaces keep a clear typographic split between labels and values, and dashboard cards do not drift into accidental full-width spans or mismatched gap patterns on desktop layouts.
- Shared base primitives that map directly to MUI are implemented with MUI components or thin wrappers around them, not hand-rolled substitutes built from generic nodes.
- Shared overlays rendered as dialogs, drawers, or bottom sheets expose stable `aria-labelledby` and `aria-describedby` semantics.
- Shared overlay close actions are labeled, and decorative handles or chrome are hidden from assistive technology when they carry no state.
- Search overlays that own keyboard-filtered results expose `combobox` and `listbox` semantics instead of generic wrapper markup.
- Browser event listeners introduced or touched during migration are registered in effects with cleanup rather than render paths or module scope.
- If smoke or test mode disables auth redirect, the migration provides a deterministic role-bearing user so protected routes can be validated as real screens instead of fallback routes.
- Automated route checks validate at least one protected content page in addition to shell boot.
- Automated route checks validate at least one stable overlay interaction when the migration touches shared overlay infrastructure.
- Touched localized copy, fixtures, and mocks render readable text; the migration does not leave mojibake, replacement characters, or broken non-Latin strings in the shipped UI or smoke-visible test data.
- Repeated workflow pages that share the same structural shell use a shared layout contract instead of duplicating the page shell across roles.
- The migration does not leave new circular chunk warnings from local app barrel re-exports when direct local imports are the safer option.

## 6. Quality Gates

- `npm test` passes when the repo has tests.
- `npm run build` passes.
- `npm run lint` passes when it is part of the repo's normal gate. If baseline lint is already red for unrelated files, record that baseline explicitly and keep the migration diff green.
- `npm run test:smoke` or the repo's equivalent smoke or e2e route gate passes when the repo provides that check for shell, protected routes, overlays, or other runtime-critical flows touched by the migration.
- `npm run lint:style-contract` passes when the repo provides a local style-contract or styleless-UI gate.
- `npm run lint:design-contract` passes when the repo provides a design-token or design-contract check.
- `npm run lint:design-contract` catches decorative gradient or shadow drift, palette alpha suffix hacks, and unapproved visual-token exceptions when the repo provides that gate.
- `npm run lint:typography-contract` passes when the repo provides a typography contract check.
- Consumer-owned build warnings caused by asset config drift or oversized local chunks are fixed rather than silenced.
- If a remaining build warning comes from an upstream third-party toolchain package, the migration report names that package and warning explicitly.
- Route-specific and shared migration gates pass through scripts or equivalent manual checks.
