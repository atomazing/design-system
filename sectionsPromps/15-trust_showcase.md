# APLAI Trust Showcase Prompt Pack

## Section Snapshot

- `SECTION_ID`: `trust_showcase`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Does this look like a mature solution?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/trustShowcase.ts`
  - `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
  - `examples/next-app-router/src/components/aplai/socialProof.ts`
- `Frozen Shared Contracts`:
  - `embedded social_proof`
  - `scrollToSection("final_cta")`
  - `scrollToSection("guarantees")`

## Why This Section Comes Fourth

- This is the first trust-heavy section where the main problem is not missing proof, but too many proof types competing on one surface.
- The live section currently mixes embedded social proof, usage contexts, maturity proof, safe signals, disclosure, and CTA branching.
- It is not safe to redesign this section as if it were fully isolated because it owns the embedded `social_proof` unit and two existing CTA routes.
- The right outcome here is one clearer maturity narrative that supports conversion without becoming a second mini-landing inside the page.

## Working Diagnosis

- The section currently mixes at least five layers of meaning:
  - embedded social proof
  - usage contexts
  - maturity proof
  - safe signals and disclosure
  - CTA branching
- The visitor gets multiple entry points instead of one clear first read.
- The contexts are useful, but they compete with the maturity proof block instead of supporting it.
- The disclosure is necessary for credibility, but it currently sits too close to the main proof content and risks feeling like a second risk section.
- The dual CTA pattern may remain valid, but it needs clearer hierarchy so the section still reads as one maturity decision rather than two competing next steps.
- This section should answer "is this credible enough to continue?" and not try to explain every trust-related artifact at the same weight.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/trustShowcase.ts`
7. `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
8. `examples/next-app-router/src/components/aplai/socialProof.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `trust_showcase`.
- Do not change `section id`.
- Treat `social_proof` as an embedded unit inside `trust_showcase`, not as a standalone section.
- Do not break `scrollToSection("final_cta")`.
- Do not break `scrollToSection("guarantees")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Do not turn this section into a guarantees section, hero section, or final CTA section.
- If the problem can be solved by reducing first-level density, do that before adding more internal structure.
- Keep one maturity narrative. Proof must support the main message instead of creating a second story.

---

## Prompt 1. Section Audit

```md
You are auditing only the `trust_showcase` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.

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
  - where embedded `social_proof` competes with the main trust story
  - where contexts and maturity proof feel like parallel narratives
  - whether safe signals are too visible or correctly supporting
  - whether disclosure sits too high in hierarchy
  - whether the two CTA exits compete too directly

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Trust Narrative Compression

```md
You are working only on the `trust_showcase` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one maturity and trust narrative with one dominant claim.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Trust Claim
- One main maturity claim the section should communicate.

### Supporting Logic
- What should support the claim without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - embedded social proof
  - usage contexts
  - proof layers
  - safe signals
  - disclosure
  - secondary CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `value_prop`
  - `guarantees`
  - `final_cta`
  - `faq`

### New Reading Formula
- Express the new logic as:
  - trust cue
  - maturity claim
  - proof support
  - safe disclosure
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

## Prompt 3. Embedded Social Proof Boundary Check

```md
You are working only on the `trust_showcase` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: define the correct role of the embedded `social_proof` unit so it supports the section without becoming a separate section inside it.

Respond strictly in this format:

### Parent-Child Relationship
- Explain how `social_proof` should behave inside `trust_showcase`.

### What Social Proof Must Do
- Its exact job in the section.

### What Social Proof Must Not Do
- What would wrongly make it behave like a standalone trust section.

### Duplication Check
- Which current ideas overlap between:
  - `social_proof.items`
  - trust contexts
  - maturity proof

### Recommended Weight
- Choose one:
  - opener only
  - supporting cue
  - footer-level proof

### Boundary Decision
- State whether the embedded unit should stay:
  - above the main trust block
  - inside the main trust block
  - visually quieter than the main trust block

### Frozen Contract Check
- Confirm what must remain untouched about the embedded contract.

Do not propose code.
Do not redesign `social_proof` as a standalone section.
Do not invent extraction work unless the current section truly cannot function without it.
```

---

## Prompt 4. Proof, Disclosure, And CTA Hierarchy

```md
You are working only on the `trust_showcase` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how contexts, maturity proof, safe signals, disclosure, and CTA routing should support one trust narrative without becoming equal-weight blocks.

Respond strictly in this format:

### Context Role
- What the usage contexts must do in this section.

### Maturity Proof Role
- What the proof line and proof layers must do in this section.

### Safe Signal Role
- What the safe signals must do in this section.

### Disclosure Role
- What the disclosure must do in this section.

### CTA Role
- What the primary and secondary CTA should do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - embedded social proof
  - contexts
  - maturity proof
  - safe signals
  - disclosure
  - CTA block

### Why This Order Works
- Explain why this order fits `trust_showcase` specifically.

Do not propose code.
Do not let disclosure become a second risk section.
Do not let CTA branching overpower the maturity narrative.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `trust_showcase` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section body
- Embedded social proof treatment
- Contexts summary
- Maturity proof summary
- Safe signal summary
- Disclosure line
- Primary CTA label
- Secondary CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one maturity narrative only
  - `social_proof` supports instead of competing
  - contexts do not become a second story
  - disclosure stays credible but quiet
  - CTA hierarchy is clear
  - the section does not duplicate `guarantees` or `final_cta`

Do not propose code.
Prefer clarity, credibility, and reading order over proof volume.
Do not expand the section just because the source files contain many trust assets.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `trust_showcase` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/15-trust_showcase.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `trust_showcase` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/trustShowcase.ts`
- `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
- `examples/next-app-router/src/components/aplai/socialProof.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="trust_showcase"`.
- Preserve embedded `social_proof` ownership inside `trust_showcase`.
- Preserve `scrollToSection("final_cta")`.
- Preserve `scrollToSection("guarantees")`.
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
- Which shared and routing contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer maturity narrative
  - embedded `social_proof` still behaves as embedded
  - proof is easier to scan
  - disclosure is still present but quieter
  - CTA still routes to `final_cta` and `guarantees`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX problem: trust density and mixed proof roles.
- Then they compress the section into one maturity narrative.
- Then they define the correct role of embedded `social_proof`.
- Then they place contexts, proof, disclosure, and CTA in the right hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
