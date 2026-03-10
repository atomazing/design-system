# APLAI Header Prompt Pack

## Section Snapshot

- `SECTION_ID`: `header`
- `Section Type`: `shell`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Where can the user navigate and how can they switch theme?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/scrollJourney.ts`
  - `examples/next-app-router/src/components/theme/HeaderThemeSwitch.tsx`
- `Frozen Shared Contracts`:
  - `NAV_ITEMS`
  - `activeSectionId`
  - `handlePrimaryCta(sectionId)`
  - `--starter-header-height`

## Why This Section Comes After The Core Content Pass

- `header` is not just another content section. It is a sticky shell that affects navigation, first-screen readability, theme switching, and the main CTA path.
- Its main UX risk is coordination, not copy alone:
  - desktop nav
  - mobile section menu
  - active section feedback
  - theme settings entry
  - primary CTA
  - live header-height measurement
- The right outcome here is a calmer shell that helps the visitor orient and act without competing with the hero.
- This section must stay useful across desktop and mobile while preserving first-screen fit and shared runtime behavior.

## Working Diagnosis

- The current header already does many important things correctly:
  - sticky shell
  - clear brand cue
  - desktop section nav
  - mobile menu with current-section label
  - theme settings access
  - primary CTA
  - skip link
- The main risk is competition for attention, especially on smaller screens.
- The header must remain useful without feeling like a second hero or a control panel.
- The active section state is valuable, but it should support orientation rather than dominate the shell.
- The theme switch is a valid app-level affordance, but it should stay utility-level.
- The live `--starter-header-height` contract is non-negotiable because the hero depends on it for focused first-screen fit.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/scrollJourney.ts`
7. `examples/next-app-router/src/components/theme/HeaderThemeSwitch.tsx`

Mandatory constraints for all prompts in this file:

- Work only inside section `header`.
- Treat it as a `shell` section, not a standalone marketing section.
- Preserve `NAV_ITEMS`.
- Preserve `activeSectionId`.
- Preserve `handlePrimaryCta("header")`.
- Preserve live `--starter-header-height` measurement behavior.
- Preserve sticky header behavior.
- Preserve the mobile navigation menu pattern.
- Preserve the theme-switch access pattern.
- Do not add new sections.
- Do not add decorative surfaces.
- Keep the header from competing with the hero.
- If mobile fit or first-screen readability is at risk, reduce shell density before changing larger structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `header` shell in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/01-header.md`.

Your task: perform a strict UX audit of the current section without proposing code.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Isolation:
- Frozen Contracts:

### Function
- One sentence: what single job this shell should perform for the page.

### 3-5 Second Takeaway
- What the visitor should understand in 3-5 seconds.

### Current Strengths
- What already works and should be preserved.

### Current Problems
- Only specific UX issues:
  - whether the header competes too much with the hero
  - whether desktop nav and actions are balanced correctly
  - whether the mobile trigger label is helpful enough
  - whether the theme switch has the right weight
  - whether the primary CTA is correctly emphasized
  - whether sticky behavior and height measurement create any reading risk

### Keep Frozen
- Which state, routing, and layout contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Shell Role Compression

```md
You are working only on the `header` shell in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/01-header.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the header into one shell narrative with one dominant utility role.

Respond strictly in this format:

### Core Section Question
- What one question the header must answer.

### Main Shell Role
- One sentence describing the primary job of the header.

### Supporting Logic
- What should support that role without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - brand line
  - active-section label
  - theme switch
  - primary CTA
  - sticky shell chrome

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `hero`
  - `final_cta`
  - `trust_showcase`

### New Reading Formula
- Express the new logic as:
  - brand cue
  - orientation
  - action access
  - utility controls

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium shell cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Navigation And Active-State Cleanup

```md
You are working only on the `header` shell in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/01-header.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the desktop nav, mobile menu trigger, and active section state easier to understand without breaking the current shell contract.

Respond strictly in this format:

### Navigation Role
- What `NAV_ITEMS` must do in the header.

### Active State Role
- What `activeSectionId` must do for orientation.

### Desktop Nav Weight
- How prominent desktop nav should feel relative to brand and actions.

### Mobile Trigger Role
- What the mobile trigger must communicate before it opens the menu.

### What Must Stay Stable
- Confirm what must remain untouched about:
  - `NAV_ITEMS`
  - active-section feedback
  - the mobile menu pattern

### What Must Not Happen
- Which navigation behaviors would weaken the shell.

Do not propose code.
Do not remove current-section feedback.
Do not turn the header into a dense app toolbar.
```

---

## Prompt 4. Theme Switch, CTA, And Height Contract Hierarchy

```md
You are working only on the `header` shell in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/01-header.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the theme switch, primary CTA, and live header-height behavior should coexist without compromising first-screen readability.

Respond strictly in this format:

### Theme Switch Role
- What `HeaderThemeSwitch` must do here.

### Primary CTA Role
- What `handlePrimaryCta("header")` must do here.

### Height Contract Role
- What `--starter-header-height` measurement must guarantee for the page.

### What Stays In First Scan
- Which shell elements deserve first-level visibility.

### What Becomes Supporting
- Which shell elements should stay quieter.

### Recommended Order
- Exact order of:
  - brand
  - navigation
  - mobile trigger
  - theme switch
  - primary CTA

### Why This Order Works
- Explain why this order fits `header` specifically.

### First-Screen Guardrail
- State the non-negotiable rules for preserving hero readability under the sticky header.

Do not propose code.
Do not let theme switching compete with the main CTA.
Do not let header growth compromise first-screen readability.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `header` shell in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/01-header.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the header should achieve after the redesign.

### Rewritten Content
- Brand label
- Brand supporting label
- Desktop nav label strategy
- Mobile trigger label strategy
- Primary CTA label
- Theme-switch role summary

### Keep But Demote
- Which content remains in the shell but must feel quieter.

### Move Out Of First Scan
- Which shell elements should no longer compete on first glance.

### Mobile Order
- Exact order of header blocks on mobile.

### Quality Check
- Verify:
  - the header stays shell-first
  - the hero remains the visual priority
  - nav remains usable on desktop and mobile
  - the primary CTA remains clear
  - theme switching stays accessible but secondary
  - first-screen height discipline can still be preserved

Do not propose code.
Prefer calm orientation and action access over extra branding or utility noise.
Do not expand the shell just because more controls could fit there.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `header` shell in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/01-header.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `header` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/scrollJourney.ts`
- `examples/next-app-router/src/components/theme/HeaderThemeSwitch.tsx`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `NAV_ITEMS`.
- Preserve `activeSectionId`.
- Preserve `handlePrimaryCta("header")`.
- Preserve live `--starter-header-height` measurement behavior.
- Preserve sticky header behavior.
- Preserve the mobile menu pattern.
- Preserve theme-switch access.
- Do not add new sections.
- Do not add decorative surfaces.
- If the problem can be solved through shell hierarchy and density cleanup, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in shell content and hierarchy.

### What Stayed Frozen
- Which nav, state, CTA, and height contracts were preserved.

### Validation
- Confirm:
  - the header is calmer and more utility-focused
  - desktop and mobile navigation still work
  - active-section feedback still works
  - the primary CTA still works
  - theme switch remains accessible
  - first-screen readability is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: shell competition, not missing controls.
- Then they compress the header into one utility-shell role.
- Then they clean up navigation and active-state hierarchy.
- Then they place theme switch, CTA, and height behavior in the correct balance.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
