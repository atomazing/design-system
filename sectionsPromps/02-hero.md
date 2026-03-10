# APLAI Hero Prompt Pack

## Section Snapshot

- `SECTION_ID`: `hero`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `What is this and what result do I get?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/messageMap.ts`
  - `examples/next-app-router/src/components/aplai/proofStrip.ts`
  - `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
  - `examples/next-app-router/src/components/aplai/valueProposition.ts`
- `Frozen Shared Contracts`:
  - `handlePrimaryCta(sectionId)`
  - `scrollToSection("demo")`
  - `embedded proof_strip`

## Why This Section Comes Last Among The Core Rewrite Set

- This section owns the first impression and the primary promise of the landing.
- It is tightly coupled to first-screen fit, the embedded proof surface, and the shared value language that also appears in `value_prop`.
- A premature rewrite here can easily make the page worse by turning the hero into a dense summary of the entire landing.
- The right outcome is not a bigger or "stronger" hero. The right outcome is a tighter first-screen entry with one promise, one short explanation, one dominant action, and one supporting proof surface.

## Working Diagnosis

- The live hero is already closer to the target than several downstream sections.
- The main risk is not structural chaos, but drift:
  - promise duplication with `value_prop`
  - proof surface becoming a second story
  - too much explanatory text creeping into the first screen
  - CTA competition overtaking the primary action
- The current hero has the right ingredients:
  - eyebrow cue
  - headline
  - short summary
  - primary CTA
  - secondary CTA to demo
  - embedded proof surface
- Any redesign must preserve compactness first. If density becomes a problem, text must shrink before layout grows.
- This section should answer "what is this and why should I continue?" It should not explain the whole mechanism or the full pilot model.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/messageMap.ts`
7. `examples/next-app-router/src/components/aplai/proofStrip.ts`
8. `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
9. `examples/next-app-router/src/components/aplai/valueProposition.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `hero`.
- Do not change `section id`.
- Preserve `handlePrimaryCta("hero")`.
- Preserve `scrollToSection("demo")`.
- Treat `proof_strip` as an embedded unit inside the hero, not as a standalone section.
- Preserve the focused first-screen height contract.
- Do not add new sections.
- Do not increase CTA path count.
- Do not add decorative surfaces.
- Do not let the proof surface become a second narrative inside the hero.
- Do not duplicate the main job of `value_prop`.
- If content is too tall, cut text before relaxing the first-screen fit discipline.

---

## Prompt 1. Section Audit

```md
You are auditing only the `hero` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.

Your task: perform a strict UX audit of the current section without proposing code.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Isolation:
- Frozen Contracts:

### Function
- One sentence: what single job this section should perform in the funnel.

### 3-5 Second Takeaway
- What the visitor should understand in 3-5 seconds.

### Current Strengths
- What already works and should be preserved.

### Current Problems
- Only specific UX issues:
  - whether the promise is clear enough on first read
  - whether the summary duplicates or weakens the headline
  - whether the proof surface competes too much
  - whether the secondary CTA competes too directly with the primary CTA
  - whether the hero risks overlapping too much with `value_prop`
  - whether first-screen fit is at risk if content grows

### Keep Frozen
- Which contracts and layout constraints must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Promise Compression

```md
You are working only on the `hero` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the hero into one clear promise and one clear next action.

Respond strictly in this format:

### Core Section Question
- What one question the hero must answer.

### Main Promise
- One primary promise the hero should communicate.

### Supporting Explanation
- What the short summary must add without repeating the headline.

### What Moves Out Of The Hero
- Which ideas should stay mostly in downstream sections:
  - detailed value explanation
  - mechanism
  - enterprise maturity proof
  - risk reversal
  - pilot scope

### Relationship To `value_prop`
- Explain how the hero promise should lead into `value_prop` without duplicating it.

### New Reading Formula
- Express the new logic as:
  - eyebrow cue
  - promise
  - short explanation
  - primary action
  - supporting proof cue

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Embedded Proof Boundary Check

```md
You are working only on the `hero` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: define the correct role of the embedded `proof_strip` so it strengthens the promise without becoming a second value proposition.

Respond strictly in this format:

### Parent-Child Relationship
- Explain how `proof_strip` should behave inside `hero`.

### What The Proof Surface Must Do
- Its exact job in the hero.

### What The Proof Surface Must Not Do
- What would wrongly make it behave like a separate section.

### Duplication Check
- Which current ideas overlap between:
  - `messageMap.hero`
  - `proofStrip.ts`
  - `valueProposition.ts`

### Recommended Weight
- Choose one:
  - supporting evidence surface
  - equal visual counterweight
  - compact measurable cue

### Boundary Decision
- State whether the proof surface should feel:
  - clearly secondary to the promise
  - equal in attention but not equal in meaning
  - quieter on mobile than on desktop

### Frozen Contract Check
- Confirm what must remain untouched about the embedded contract.

Do not propose code.
Do not redesign `proof_strip` as a standalone section.
Do not let the proof block start a second narrative inside the hero.
```

---

## Prompt 4. First-Screen Density And CTA Hierarchy

```md
You are working only on the `hero` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how headline, summary, CTA pair, and proof surface should fit within the focused first-screen contract without competing for attention.

Respond strictly in this format:

### Primary Focus
- What must dominate the first screen.

### Secondary Focus
- What may support it without competing.

### CTA Role
- What `handlePrimaryCta("hero")` must do here.

### Demo CTA Role
- What `scrollToSection("demo")` must do here.

### What Stays In First Scan
- Which hero elements deserve first-level visibility.

### What Must Stay Short
- Which content elements must remain compressed to preserve first-screen fit.

### Recommended Order
- Exact order of:
  - eyebrow
  - headline
  - summary
  - primary CTA
  - secondary CTA
  - proof surface

### Why This Order Works
- Explain why this order fits `hero` specifically.

### Viewport Guardrail
- State the non-negotiable rules for preserving the first-screen height contract.

Do not propose code.
Do not add extra explanatory blocks.
Do not relax first-screen fit just to preserve more copy.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `hero` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the hero should achieve after the redesign.

### Rewritten Content
- Eyebrow primary
- Eyebrow secondary
- Headline
- Summary
- Primary CTA label
- Secondary CTA label
- Proof surface role summary

### Keep But Demote
- Which content remains in the hero but must feel quieter.

### Move Out Of First Scan
- Which content should no longer compete on the first screen.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one primary promise only
  - one dominant action only
  - proof supports instead of competing
  - the hero does not duplicate `value_prop`
  - the section can still fit the focused first-screen contract

Do not propose code.
Prefer speed of comprehension over extra nuance.
Do not expand the hero just because downstream sections also contain related proof and value language.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `hero` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/02-hero.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `hero` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/messageMap.ts`
- `examples/next-app-router/src/components/aplai/proofStrip.ts`
- `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
- `examples/next-app-router/src/components/aplai/valueProposition.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="hero"`.
- Preserve `handlePrimaryCta("hero")`.
- Preserve `scrollToSection("demo")`.
- Preserve embedded `proof_strip` ownership inside the hero.
- Preserve the focused first-screen height contract.
- Do not add more CTA paths.
- Do not split this into new sections.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and local structure, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and structure.

### What Stayed Frozen
- Which routing, CTA, and first-screen contracts were preserved.

### Validation
- Confirm:
  - the hero has one clearer promise
  - the primary CTA remains dominant
  - the demo CTA still works
  - embedded `proof_strip` still behaves as embedded
  - the hero still fits within the viewport
  - the hero content does not overflow its own height
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: first-screen drift, not missing content.
- Then they compress the hero to one promise.
- Then they define the correct role of embedded `proof_strip`.
- Then they enforce first-screen density and CTA hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
