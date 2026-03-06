# Route: adopt-existing

Use this route when the target app already runs on modern MUI and needs to adopt
or normalize `@atomazing-org/design-system` without a legacy Material UI v4 jump.

## Use This Route When

- the project already depends on `@mui/material`
- the project already has a theme setup, token layer, or design-system usage to normalize
- the migration is about aligning an existing app, not bootstrapping a new one

## Target Outcome

- `ThemeProviderWrapper` is the only app-level source of truth for theme state
- old design-system integration points are removed or normalized
- token usage moves toward `theme.*`
- the app boots cleanly after migration, not just compiles

Use `../../shared/phases.md` as the canonical step-by-step phase checklist, then
apply the route-specific requirements below.

## Large-Project Execution Model

- keep the app runnable at the end of every phase
- keep one main change class per phase:
  - dependency alignment
  - root theme unification
  - runtime cleanup
  - shared infrastructure
  - token and wrapper cleanup
  - domain waves
  - final gate pass
- do not mix shell rewrites, broad token cleanup, and bundler hygiene changes into one unvalidated batch
- checkpoint each phase with a commit or equivalent rollback point before continuing

## Required Workflow (Phases)

1. Inventory and segmentation
   - map current design-system usage, theme entrypoints, local token modules, shared shell code, shared overlays, and protected routes
   - split the repo into shared-infrastructure scope plus domain migration waves
2. Baseline and safety net
   - run the normal validation commands that exist in the repo
   - record pre-existing red checks separately from migration defects
   - add or tighten smoke coverage for:
     - the application shell
     - at least one protected content route when route guards exist
     - at least one stable overlay interaction when overlays are in scope
3. Update dependencies
   - add or upgrade `@atomazing-org/design-system`
   - ensure peer runtimes are compatible
   - align adjacent runtime packages before moving deeper into UI cleanup
4. Align provider wiring and public API usage
   - connect `ThemeProviderWrapper` at the app root
   - remove competing root theme providers unless they are thin wrappers around the design system
   - replace removed or old root imports
   - stop deep-importing design-system internals
   - remove parallel theme state when it conflicts with design-system state
   - move preset selection into one explicit app-level theme module instead of leaving it split across generic constants passthrough files
5. Runtime boot cleanup
   - start the app with the repo's normal dev/start command
   - open the first route in a real browser
   - fix startup console errors before continuing
   - fix migration-caused startup warnings before continuing
   - specifically resolve duplicated runtime singleton warnings for `react`, `react-dom`, `@emotion/react`, and `@emotion/styled`
   - remove module-scope code that depends on browser APIs, storage, or i18n locale activation
   - move browser event listeners such as `beforeinstallprompt` or `matchMedia` subscriptions into effects with cleanup
   - if smoke or test mode disables auth redirect, seed a deterministic user with enough roles to exercise protected routes
6. Shared infrastructure stabilization
   - verify the structural app shell still matches the pre-migration layout on desktop and mobile
   - verify the app background still comes from the selected preset and is not replaced by a hardcoded app-shell or page-wrapper background
   - if a layout container is simplified or rewritten, explicitly preserve its `display`, column or row template, `min-width`, `min-height`, `overflow`, and scroll behavior
   - if shared containers combine `width: 100%` with internal padding, normalize them with explicit `box-sizing: border-box` or remove the forced width so the content pane does not overflow horizontally
   - if shell workspaces, route wrappers, or page roots were touched, verify the main content still fills the available content region instead of collapsing into partial-width cards or broken dashboard stacks
   - audit compact shared UI such as chart legends, chips, segmented filters, and metric badges for preset drift; if they now read as ad hoc chip chrome, rebuild them with neutral MUI composition
   - if analytics dashboards or metric cards were touched, keep label and value typography clearly separated and make sure dashboard cards do not inherit accidental full-width spans or inconsistent gap rhythms on desktop
   - restore shared overlays with stable dialog semantics:
     - dialogs, drawers, and bottom sheets should wire `aria-labelledby` and `aria-describedby`
     - close buttons should keep explicit accessible labels
     - decorative overlay handles should stay hidden from assistive tech
   - if an overlay owns keyboard-filtered search results, expose `combobox` and `listbox` semantics instead of generic wrapper markup
   - inspect shared UI primitives for placeholder regressions:
     - empty `Box` or `Stack` shells where charts or progress bars used to render
     - pass-through wrappers that dropped padding, borders, hover states, or sizing
     - simplified nav, dialog, drawer, and card components that no longer preserve spacing or alignment
     - root shells or route wrappers that set `background` or `backgroundColor` and hide the preset background
7. Token, typography, and wrapper cleanup
   - replace legacy token files and hardcoded theme values with `theme.palette`, `theme.typography`, and design-system contracts
   - normalize visible text so headings, body copy, helper text, and compact labels use explicit `Typography` variants instead of raw JSX text
   - wrap raw text inside `Button`, `ToggleButton`, `MenuItem`, `Chip`, and `Alert` with `Typography component="span"`
   - add explicit `variant` to every `Typography` and choose variants semantically instead of relying on defaults
   - replace consumer-owned substitute primitives with MUI equivalents when the code only reimplements a stock MUI control such as `IconButton`, `FormLabel`, `FormHelperText`, or `Skeleton`
   - remove zero-value wrappers that only rename stock MUI primitives or surfaces without adding meaningful behavior
   - remove zero-value surface wrappers that only forward to MUI `Card`, `Paper`, or similar components without adding real behavior
   - replace palette alpha suffix hacks with theme helpers such as `alpha()`
   - if consumer surfaces use app-owned gradient washes, decorative shadows, or other preset-competing chrome, simplify them back to standard MUI surfaces unless the component is an intentional preset-preview exception
   - if raw visual token drift is broad, add or tighten a repo-local design-contract lint or script gate and keep it green
   - if the repo has no typography contract check and text regressions are widespread, add a small lint or script gate so future migrations cannot reintroduce raw text or variantless typography
   - if the repo keeps a design-contract lint, expand it to catch decorative gradients, direct shadow styling, palette alpha suffix hacks, and any file-local allowlist drift
   - if codemods, bulk replacements, or file rewrites touched localized copy, keep files in UTF-8, scan for mojibake or replacement characters, and verify at least one real localized route renders readable text
8. Shared workflow extraction and bundler hygiene
   - if multiple pages share the same workflow shell, extract a shared layout contract and keep role-specific differences in header or section composition
   - if local barrels introduce circular chunk warnings for app internals, replace those imports with direct local module imports
   - if Workbox or PWA config references assets that the app does not actually emit, align the glob patterns with the real static files instead of leaving the warning in place
   - if Vite reports oversized local chunks, add targeted `manualChunks` or lazy boundaries before considering any warning-limit change
9. Domain waves
   - migrate feature areas after shared infrastructure is stable
   - keep each wave small enough to validate independently
   - re-run the relevant smoke and route checks after each wave before moving on
10. Re-run the shared gates and route checks
   - lint, tests, and build where available
   - browser startup verification
   - verify smoke checks cover page content on protected routes, not only the surrounding shell
   - verify smoke coverage still includes stable entrypoints for shell-critical overlays such as notifications or command palette when overlay infrastructure changed

## Common Failure Modes

- removed or no-longer-public root imports still referenced from app code
- module-scope i18n translation calls before locale activation
- module-scope `window`, `document`, `navigator`, or storage access
- duplicate Emotion or React runtime copies in Vite, Next.js, or module federation setups
- preset selection hidden behind generic constants passthrough layers instead of one explicit app theme module
- structural layout containers replaced with plain wrappers that drop grid or flex behavior
- lost `min-width`, `min-height`, or `overflow` constraints that previously kept sidebar and content regions stable
- shared padded containers keep `width: 100%` under content-box sizing, so the workspace silently protrudes past the visible right edge
- route roots or page containers lose fill behavior, so the workspace shows partial-width cards, collapsed analytics grids, or unused content area
- analytics metric labels and values collapse to the same text scale, so dashboard numbers no longer stand out from titles or helper text
- dashboard cards keep an old `gridColumn: 1 / -1` or mixed gap contract, so one analytics panel falls onto its own row while neighboring cards use a different rhythm
- protected routes only tested in guest mode, so smoke checks exercise `NotFound` instead of real product screens
- shared charts, cards, drawers, or segmented controls reduced to pass-through wrappers or empty placeholder nodes
- compact legends, analytics chips, metric badges, or segmented filters drift into consumer-owned chip chrome that visibly fights the preset
- root app containers hardcode their own page background and visually cancel the active preset background
- dialogs, drawers, or bottom sheets lose semantic labeling during wrapper refactors
- browser event listeners attach from render flow and duplicate behavior across rerenders
- search overlays filter results visually but expose no combobox or listbox semantics
- raw JSX text left inside app layout wrappers, buttons, chips, or menu items after refactors
- `Typography` used without an explicit semantic `variant`, which makes text hierarchy drift across screens
- zero-value wrapper components preserved even though they only rename stock MUI controls
- zero-value surface wrappers preserved even though direct MUI `Card` or `Paper` usage would be clearer
- app-owned gradient or shadow chrome left on consumer surfaces after the design system already defines surface character
- palette alpha suffix hacks such as `${theme.palette.primary.main}1a` left in shared styling instead of `alpha()`
- codemods or encoding fixes leave mojibake, replacement characters, or broken non-Latin text in screens, fixtures, or mock data
- repeated workflow pages keep copied layout shells instead of sharing one structural contract
- local barrel re-exports create circular chunk warnings for app internals during build
- stale Workbox or PWA asset globs point to files the app does not emit
- oversized local vendor or app chunks are left unresolved even though targeted chunk splitting is possible

## Practical Fix Patterns

- import only from `@atomazing-org/design-system` or `@atomazing-org/design-system/presets`
- move browser-only or locale-dependent work out of module scope and into runtime-safe component or hook code
- if the bundler loads duplicate React or Emotion runtimes, add the repo's equivalent of runtime dedupe or singleton sharing
- move preset selection into a dedicated app theme module such as `src/theme/appThemes.ts`
- when refactoring shell components, treat layout wrappers as behavior, not decoration
- if a shell exposes a workspace pane, keep route roots and page containers on explicit flex growth with preserved `min-width`, `min-height`, and width constraints so the page actually fills the workspace
- if a shared card, page root, or shell content container must both fill width and keep internal padding, use `box-sizing: border-box` so the padding does not enlarge the rendered width past the workspace
- seed a deterministic smoke user when route guards would otherwise hide the real target screens
- search for placeholder regressions in shared UI and restore explicit visual contracts before closeout
- if compact legends, chips, or segmented filters drift away from the preset, rebuild them from `Stack`, markers, and `Typography` instead of preserving ad hoc chip styling
- if analytics metrics lose hierarchy, restore distinct label, value, and helper text scales with explicit typography tokens instead of leaving them on one visual level
- if dashboard cards should share one desktop row, remove accidental full-width spans and keep one explicit grid gap contract across all analytics panels
- if a consumer abstraction only restyles a stock MUI primitive, collapse it into a thin MUI wrapper instead of preserving a hand-built substitute
- delete zero-value wrapper components that only rename MUI primitives or surfaces
- delete zero-value surface wrappers that only forward to MUI `Card` or `Paper`
- replace palette suffix hacks with `alpha()` or equivalent theme helpers
- keep decorative gradients and shadow styling out of normal consumer surfaces; if a preview component is the exception, document it and allowlist it explicitly
- keep root shells transparent unless they are true surfaces, so the preset background remains visible
- wire overlay titles and descriptions through stable ids instead of relying on incidental text nodes inside dialogs or drawers
- use labeled close controls and proper `combobox` or `listbox` semantics for search overlays with keyboard navigation
- move browser event subscriptions into effects with cleanup before validating runtime behavior
- add a browser screenshot or visual smoke check for the desktop shell and at least one protected content route before closing the migration
- use stable overlay entrypoints for smoke checks instead of forcing flaky tests through incidental modal access paths
- add an overflow assertion for the desktop content pane and at least one routed page root when shell or page-level layout containers are touched
- add or keep a typography contract check so visible text and action labels cannot regress back to raw text nodes
- add or keep a design-contract check when raw colors, font sizes, radius values, or opacity drift is widespread
- after bulk replacements or encoding-sensitive edits, run a mojibake scan and verify one localized route in a real browser before closing the migration
- extract shared workflow page shells into one layout component and use direct local imports if barrels introduce chunk-cycle warnings
- update Workbox or PWA asset globs to match the actual emitted icon and manifest files
- use targeted vendor chunk groups or additional lazy boundaries to resolve consumer-owned chunk warnings instead of just raising the warning limit

## Example

See `./AEROCRM-EXAMPLE.md` for a full `adopt-existing` migration that includes:

- upgrading an existing consumer from `@atomazing-org/design-system@1.2.9` to `2.0.1`
- replacing an outdated root import
- fixing a startup-breaking Lingui initialization bug
- fixing duplicate Emotion runtime loading in Vite
- restoring a broken desktop `sidebar + content` shell after a layout wrapper regression
- restoring page-root fill behavior after tickets and analytics screens stopped occupying the full workspace
- fixing shared workspace overflow caused by padded full-width containers under content-box sizing
- reworking analytics legend chips that drifted away from the preset into neutral preset-aligned legend composition
- restoring analytics metric hierarchy and removing an accidental full-width dashboard card span so desktop analytics panels align again
- restoring dialog, drawer, and command-palette semantics after overlay wrappers drifted
- repairing broken Cyrillic text and mock data after encoding drift introduced unreadable strings
