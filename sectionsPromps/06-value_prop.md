# APLAI Value Prop Prompt Pack

## Section Snapshot

- `SECTION_ID`: `value_prop`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Why is this valuable and why does it work?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/valuePropSection.ts`
  - `examples/next-app-router/src/components/aplai/valueProposition.ts`
- `Frozen Shared Contracts`:
  - `shared valueProposition.ts`
  - `scrollToSection("how_it_works")`

## Why This Section Comes Third

- This is the first section where the main failure mode is semantic overloading.
- The live section currently tries to carry value proposition, pillar explanation, proof stack, risk reversal, promise boundaries, and transition in one surface.
- It also shares content DNA with the hero, so careless rewriting can split the page into two competing promises.
- The right outcome here is not "more persuasive copy". The right outcome is one clearer value narrative with supporting proof placed in the correct hierarchy.

## Working Diagnosis

- The section currently mixes at least four layers of meaning:
  - core value thesis
  - three value pillars
  - proof stack
  - risk and boundaries
- The first screen of the section is not weak, but the full section becomes dense fast.
- Proof and risk framing are useful, but they currently compete too directly with the pillars.
- Boundaries are important for credibility, but they should not feel like a second main story.
- The bridge CTA to `how_it_works` is correct and should stay stable.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/valuePropSection.ts`
7. `examples/next-app-router/src/components/aplai/valueProposition.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `value_prop`.
- Do not change `section id`.
- Do not break the shared `valueProposition.ts` contract without explicitly stating it.
- Do not break `scrollToSection("how_it_works")`.
- Do not turn this section into a mechanism section, FAQ section, or guarantees section.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- If a problem can be solved by reducing first-level density, do that before inventing more layout.
- Keep the section aligned with the hero promise instead of creating a second competing promise.

---

## Prompt 1. Section Audit

```md
You are auditing only the `value_prop` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.

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
  - where the section mixes value and proof too closely
  - where risk framing competes with the main thesis
  - whether the pillars carry too much text density
  - whether boundaries belong too high in hierarchy
  - whether the section duplicates hero too much or not enough

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Value Narrative Compression

```md
You are working only on the `value_prop` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one value narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Thesis
- One main thesis the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - pillar detail
  - proof stack
  - risk reversal
  - promise boundaries

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `hero`
  - `mechanism`
  - `guarantees`
  - `how_it_works`

### New Reading Formula
- Express the new logic as:
  - thesis
  - pillar support
  - proof support
  - credibility boundary
  - transition

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Pillar Density Cleanup

```md
You are working only on the `value_prop` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the three value pillars faster to scan without weakening their meaning.

Respond strictly in this format:

### Pillar Audit
- For each current pillar:
  - what is essential
  - what is repetitive
  - what is too detailed for first-level reading

### Pillar Field Priority
- Rank these for first-level visibility:
  - title
  - promise
  - outcome
  - language bullets
  - trustLayer

### What Becomes Supporting
- Which pillar fields should move below the first scan layer.

### Recommended Pillar Shape
- Define the ideal structure of one pillar:
  - what comes first
  - what supports it
  - what can be shorter
  - what should be optional or secondary

### Duplication Check
- Which ideas are being repeated across pillars and should stop repeating.

### Reading Speed Check
- Why the new pillar model is easier to scan on desktop and mobile.

Do not propose code.
Do not remove meaningful differentiation between pillars.
Do not turn pillars into generic marketing claims.
```

---

## Prompt 4. Proof And Risk Placement

```md
You are working only on the `value_prop` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how proof, risk reversal, and promise boundaries should support the section without becoming equal-weight narratives.

Respond strictly in this format:

### Proof Role
- What proof must do in this section.

### Risk Role
- What risk reversal must do in this section.

### Boundary Role
- What promise boundaries must do in this section.

### What Stays In This Section
- Which proof and risk elements should remain here.

### What Must Be Demoted
- Which elements should become quieter supporting details.

### What Must Not Dominate
- Which elements must not compete with the main value thesis.

### Recommended Order
- Exact order of:
  - pillars
  - proof
  - risk
  - boundaries
  - CTA transition

### Why This Order Works
- Explain why this order fits `value_prop` specifically.

Do not propose code.
Do not move shared contracts without explicit justification.
Do not let proof start a second narrative.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `value_prop` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section body
- North-star line
- 3 pillars:
  - title
  - promise
  - supporting line
- Proof block summary
- Risk or boundary support summary
- Bridge CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one main value thesis only
  - pillars do not overload the first scan
  - proof supports rather than competes
  - risk framing does not become a second story
  - the section does not duplicate `mechanism` or `guarantees`

Do not propose code.
Prefer clarity, hierarchy, and credibility over volume.
Do not expand the section just because the source pack contains many useful details.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `value_prop` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/06-value_prop.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `value_prop` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/valuePropSection.ts`
- `examples/next-app-router/src/components/aplai/valueProposition.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="value_prop"`.
- Preserve the shared `valueProposition.ts` contract unless the task absolutely requires editing it.
- Preserve `scrollToSection("how_it_works")`.
- Do not add more CTA paths.
- Do not change route structure.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and local structure, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and structure.

### What Stayed Frozen
- Which shared and routing contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer value narrative
  - pillars are easier to scan
  - proof is still present but quieter
  - CTA still routes to `how_it_works`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts identify the real UX problem: semantic overload, not weak messaging.
- Then they compress the section into one value narrative.
- Then they reduce pillar density.
- Then they place proof and risk in a supporting role.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
