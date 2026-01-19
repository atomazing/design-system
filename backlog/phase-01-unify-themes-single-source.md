# Phase 01 — Unify Theme Overrides via `themes` (Single Source of Truth)

This phase updates **@atomazing-org/design-system** (a React library built on MUI v7 + Emotion) so that **theme customization has exactly one entry point**:
- `themes: Array<ThemeOptions & { name: string }>`
- `themeOverrides` is removed completely
- legacy `themes` format is removed completely (breaking change; consuming apps will be updated separately)

The library uses `tsup` for builds and `npm run lint` / `npm run build` / `vitest` for quality gates fileciteturn3file0.

---

## Scope Rules (Hard Constraint)

Only changes in the following areas are allowed:

- `src/context/**` (ThemeProviderWrapper and its related context hooks/types)
- `src/styles/**` (createCustomTheme signature + implementation and any required theme utils)
- `src/models/**` and `src/styles/muiAugmentations.d.ts` **only if required** for typing correctness
- `src/index.ts` and folder-level `index.ts` re-exports **only if required** by public API changes
- `README.MD` (documentation + migration section)

**No other files may be changed.**  
If any unrelated formatting or refactoring is needed, it must be a separate phase.

---

## Goal

### What we want
1. `themes` is the **only** mechanism to extend/override the theme.
2. Each theme is fully expressive: `palette`, `typography`, `components`, `shape`, `shadows`, etc.
3. Theme selection remains name-based and continues to persist in `localStorage` under `"appSettings"`.
4. Provider controls `palette.mode` (dark/system) — overrides must not break mode control.
5. SSR safety is preserved (no `window` / `document` / `localStorage` at module scope).

### What we remove
- `themeOverrides` prop and all code paths referencing it.
- Legacy `themes` structure (`primaryColor`, `secondaryColor`, `background`, etc.).

---

## Definition of Done

- [ ] `themeOverrides` removed from code, types, exports, and docs
- [ ] `themes` typed as `Array<ThemeOptions & { name: string }>` and used as the single source of truth
- [ ] No legacy `themes` support remains
- [ ] Provider-controlled `mode` always wins over overrides
- [ ] No browser API access at module scope (SSR safe)
- [ ] README updated with new API and migration notes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] (Optional but recommended) `npm run test` passes (if tests exist / are quick)
- [ ] Scope diff audit passes (only allowed files changed)

---

## Step-by-step Checklist (Single Phase)

### Step 1 — Identify current API surface and affected modules
- [ ] Locate `ThemeProviderWrapper.tsx` and confirm:
  - Where `themes` comes from and how it is used
  - How theme selection is persisted (`appSettings.theme`)
  - How `themeOverrides` is merged into the final theme
- [ ] Locate `createCustomTheme` implementation and all call sites
- [ ] Locate any exported types/interfaces for provider props and theme helpers

**Output:** a short note (in PR description or commit message) listing all impacted files.

---

### Step 2 — Change `themes` contract to fully expressive theme options
Implement a new type:

```ts
export type NamedThemeOptions = ThemeOptions & { name: string };
```

Update provider props:

```ts
themes?: NamedThemeOptions[];
```

Rules:
- [ ] `name` is required
- [ ] No legacy fields allowed
- [ ] `themes` is optional; there must be a default theme if it is not provided

**Output:** TypeScript compiles with new prop type.

---

### Step 3 — Remove `themeOverrides` completely
- [ ] Remove `themeOverrides` from props typing
- [ ] Remove any forwarding of `themeOverrides` into `createCustomTheme`
- [ ] Remove any docs mentioning `themeOverrides`
- [ ] Ensure there are no remaining imports/usages

**Repo check (scope-limited):** Search for `themeOverrides` and verify only historical references (none) remain.

---

### Step 4 — Refactor `createCustomTheme` to accept ThemeOptions overrides
Change signature to accept overrides:

```ts
createCustomTheme(mode: PaletteMode, overrides?: ThemeOptions): Theme
```

Implementation requirements:
- [ ] Build the **base design-system theme** first
- [ ] Deep-merge base options with `overrides`
- [ ] Enforce provider-controlled mode:
  - `palette.mode` must equal `mode` argument regardless of overrides
- [ ] Preserve existing custom palette tokens and augmentation types

Notes:
- If you currently construct palette using internal tokens (brand/neutral/accent/muted), keep that behavior in the base theme.
- `overrides` should be treated as consumer-provided `ThemeOptions` applied on top.

---

### Step 5 — Update ThemeProviderWrapper to build theme from selected `themes[]`
Selection must remain name-based (persisted string):
- [ ] Keep `theme` in settings as `string`
- [ ] Select by `themes.find((t) => t.name === themeName)`
- [ ] Fallback order:
  1) found by name
  2) first element in `themes`
  3) library-provided default theme `{ name: "Default", ... }`

Building the theme:
- [ ] Strip `name` before passing into `createCustomTheme`:

```ts
const { name, ...overrides } = selectedTheme;
const muiTheme = createCustomTheme(mode, overrides);
```

SSR safety:
- [ ] Do not read localStorage at module scope
- [ ] Read/write `appSettings` only in effects or guarded blocks (`typeof window !== "undefined"`)

---

### Step 6 — Update documentation (README.MD)
- [ ] Update `ThemeProviderWrapper` props:
  - `themes?: Array<ThemeOptions & { name: string }>`
- [ ] Add minimal example (palette primary)
- [ ] Add advanced example (components overrides)
- [ ] Add migration snippet (breaking change):
  - old legacy `themes` removed
  - `themeOverrides` removed

**Keep docs concise and factual.**

---

### Step 7 — Quality gates and scope audit
Run locally:
- [ ] `npm run lint` fileciteturn3file0
- [ ] `npm run build` fileciteturn3file0
- [ ] (Optional) `npm run test` fileciteturn3file0

Scope audit:
- [ ] Confirm only files within allowed scope changed
- [ ] If anything outside scope changed, revert it immediately

---

## Expected Public API After This Phase

### ThemeProviderWrapper props (relevant part)
```ts
type NamedThemeOptions = ThemeOptions & { name: string };

type ThemeProviderWrapperProps = {
  themes?: NamedThemeOptions[];
  // existing props unchanged (e.g., children, initial theme selection behavior, etc.)
};
```

### Example: minimal theme preset
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: "Blue",
      palette: {
        primary: { main: "#3B82F6" },
      },
    },
  ]}
/>
```

### Example: full theme preset with component overrides
```tsx
<ThemeProviderWrapper
  themes={[
    {
      name: "BrandA",
      palette: {
        primary: { main: "#00A3FF" },
        background: { default: "#F7FAFF", paper: "#FFFFFF" },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: { textTransform: "none" },
          },
        },
      },
    },
  ]}
/>
```

---

## Notes / Risks / Mitigations

### Breaking change risk
- Removing legacy `themes` and `themeOverrides` is a breaking change.
- Mitigation: you will update consuming apps manually.

### Mode enforcement
- Risk: consumer passes `palette.mode` in overrides and accidentally breaks dark/system.
- Mitigation: enforce mode in `createCustomTheme` after merge.

### SSR safety
- Risk: reading localStorage during module evaluation.
- Mitigation: guard reads/writes and keep storage interaction inside effects.

---

## Completion Statement

This phase is complete when:
- the old customization split is gone,
- `themes` is the single source of truth,
- builds/lints pass,
- and the docs describe the new API with a migration note.
