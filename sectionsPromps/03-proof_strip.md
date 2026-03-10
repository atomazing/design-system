# APLAI Proof Strip Prompt Pack

## Section Snapshot

- `SECTION_ID`: `proof_strip`
- `Section Type`: `embedded`
- `Isolation`: `Embedded`
- `Parent`: `hero`
- `Primary Question`: `Is the promise measurable?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/proofStrip.ts`
  - `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
  - `examples/next-app-router/src/components/aplai/valueProposition.ts`
- `Frozen Shared Contracts`:
  - `hero layout`
  - `hero proof surface`
  - `trust badge mapping`

## Why This File Is Different

- `proof_strip` is not a standalone landing section in the live page.
- It is an embedded proof unit inside the hero and is blocked as an independent migration target unless someone explicitly chooses an extraction path.
- The right outcome here is not a standalone redesign. The right outcome is a controlled refinement of the embedded proof surface so it supports the hero promise without starting a second narrative.
- Every prompt in this file must treat `hero` as the parent source of truth.

## Working Diagnosis

- The embedded unit already does an important job: it turns the hero promise into something measurable and repeatable.
- The main risk is not missing content. It is weight and scope:
  - too much explanation and the proof surface competes with the hero copy
  - too many visible metrics and trust cues and it starts reading like a second section
  - too much density and it breaks first-screen fit
- The metrics are useful because they anchor the 1-5-60 claim.
- The trust badges and trust line are also useful, but they must remain supporting cues.
- The proof surface should answer "is this measurable and repeatable?" It should not re-explain value proposition, trust showcase, or mechanism.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/proofStrip.ts`
7. `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
8. `examples/next-app-router/src/components/aplai/valueProposition.ts`

Mandatory constraints for all prompts in this file:

- Work only on embedded unit `proof_strip`.
- Treat `hero` as the parent section.
- Do not redesign `proof_strip` as a standalone landing section.
- Preserve the `hero` first-screen fit contract.
- Preserve the current hero proof surface role inside the right-side hero area.
- Preserve trust badge mapping.
- Do not add new sections.
- Do not add decorative surfaces.
- Do not let the proof unit become a second long-form column inside the hero.
- If a problem can be solved by reducing density, do that before changing structure.

---

## Prompt 1. Embedded Audit

```md
You are auditing only the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.

Your task: perform a strict UX audit of the current embedded unit without proposing code.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Parent:
- Frozen Contracts:

### Function
- One sentence: what single job this embedded unit should perform inside the hero.

### 3-5 Second Takeaway
- What the visitor should understand in 3-5 seconds from this proof surface.

### Current Strengths
- What already works and should be preserved.

### Current Problems
- Only specific UX issues:
  - whether the proof surface competes too much with the hero promise
  - whether the metrics are easy enough to scan
  - whether the rail title, section title, and section lead are too verbose together
  - whether trust badges and trust line are correctly weighted
  - whether the unit risks breaking first-screen fit

### Keep Frozen
- Which parent and rendering contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose extraction yet.
```

---

## Prompt 2. Parent Boundary Check

```md
You are working only on the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.
Then use the result of Prompt 1 as required input.

Your task: define the correct relationship between the hero promise and the proof surface.

Respond strictly in this format:

### Parent Question
- What one question the hero answers.

### Embedded Question
- What one question `proof_strip` answers inside that hero.

### What The Embedded Unit Must Do
- Its exact job for the hero.

### What The Embedded Unit Must Not Do
- What would wrongly make it act like a second hero or a second section.

### Relationship To `value_prop`
- Explain how `proof_strip` should avoid duplicating `value_prop`.

### Extraction Decision
- Choose one:
  - keep embedded
  - extraction not justified
  - extraction may be justified later but not now

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Proof Claim And Metric Cleanup

```md
You are working only on the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the measurable proof cues faster to scan without weakening their meaning.

Respond strictly in this format:

### Claim Audit
- For the current rail title, section title, and section lead:
  - what is essential
  - what is repetitive
  - what is too long for a hero-side proof surface

### Metric Audit
- For the current metrics:
  - what is essential
  - what is repetitive
  - what should remain visible at first glance

### Recommended Weight
- Choose the correct priority among:
  - section title
  - metric values
  - metric labels
  - section lead

### What Becomes Supporting
- Which proof-strip fields should move below the first scan layer.

### Duplication Check
- Which ideas repeat between the hero promise and the proof strip and should stop repeating.

Do not propose code.
Do not remove the measurable core of 1-5-60.
```

---

## Prompt 4. Trust Cue And First-Screen Hierarchy

```md
You are working only on the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how trust badges, trust line, and overall proof-surface density should support the hero without harming first-screen readability.

Respond strictly in this format:

### Trust Badge Role
- What the trust badges must do in this embedded unit.

### Trust Line Role
- What the trust line must do in this embedded unit.

### What Stays In First Scan
- Which proof-strip elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - rail title
  - section title
  - section lead
  - metrics
  - trust badges
  - trust line

### Why This Order Works
- Explain why this order fits the embedded hero proof surface specifically.

### First-Screen Guardrail
- State the non-negotiable rules for keeping this unit compatible with hero fit and hero readability.

Do not propose code.
Do not let the trust cues become the main story.
Do not let the proof unit become a second long-form column.
```

---

## Prompt 5. Final Embedded Rewrite

```md
You are working only on the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the embedded proof unit as a content and UX output before code.

Respond strictly in this format:

### Final Unit Goal
- One paragraph describing what the embedded proof strip should achieve after the redesign.

### Rewritten Content
- Rail title
- Section title
- Section lead
- Metrics:
  - value
  - label
- Trust badges
- Trust line

### Keep But Demote
- Which content remains in the unit but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete at first glance.

### Mobile Order
- Exact order of proof-surface content on mobile.

### Quality Check
- Verify:
  - the unit stays embedded
  - the proof claim stays measurable
  - the hero remains the primary narrative
  - the proof unit does not duplicate `value_prop`
  - the unit still fits the hero's first-screen discipline

Do not propose code.
Prefer concise proof and scan speed over extra explanatory copy.
Do not expand the unit just because more supporting detail exists elsewhere.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the embedded `proof_strip` unit inside the `hero` section of the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/03-proof_strip.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of the embedded proof strip with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/proofStrip.ts`
- `examples/next-app-router/src/components/aplai/HeroProofSurface.tsx`
- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve embedded placement inside the hero.
- Preserve the hero proof surface role.
- Preserve trust badge mapping.
- Preserve compatibility with hero first-screen fit.
- Do not turn this into a standalone section.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and local proof-surface structure, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in embedded proof content and structure.

### What Stayed Frozen
- Which parent, rendering, and mapping contracts were preserved.

### Validation
- Confirm:
  - the unit remains embedded in the hero
  - the proof surface is easier to scan
  - the hero remains the primary narrative
  - trust badge mapping is preserved
  - first-screen readability is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: embedded proof competition, not missing information.
- Then they define the parent-child boundary with the hero.
- Then they compress the proof claim and metric hierarchy.
- Then they place trust cues in the correct supporting role.
- Then they create a final rewritten embedded version.
- Only after that do they move into implementation.
