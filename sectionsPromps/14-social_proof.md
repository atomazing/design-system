# APLAI Social Proof Prompt Pack

## Section Snapshot

- `SECTION_ID`: `social_proof`
- `Section Type`: `embedded`
- `Isolation`: `Embedded`
- `Parent`: `trust_showcase`
- `Primary Question`: `Is there any external trust signal?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/socialProof.ts`
  - `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
  - `examples/next-app-router/src/components/aplai/trustShowcase.ts`
- `Frozen Shared Contracts`:
  - `parent trust_showcase`
  - `APLAI_SOCIAL_PROOF.enabled`
  - `APLAI_SOCIAL_PROOF.linkLabel`

## Why This File Is Different

- `social_proof` is not a standalone landing section in the live page.
- It is an embedded unit inside `trust_showcase` and is blocked as an independent migration target unless someone explicitly chooses an extraction path.
- The right outcome here is not a standalone redesign. The right outcome is a controlled refinement of the embedded social-proof cue so it supports the trust narrative without becoming a separate section.
- Every prompt in this file must treat `trust_showcase` as the parent source of truth.

## Working Diagnosis

- The embedded unit already does a useful job: it gives a quick external-trust cue before the main maturity block.
- The main risk is not missing content. It is duplication and weight:
  - the contexts in `social_proof.items` overlap with the larger trust contexts below
  - the block can feel redundant if it repeats what the parent already says
  - if it becomes too detailed, it starts acting like a standalone section
- The title, subtitle, and chips are useful because they provide a fast-trust scan.
- The `linkLabel` is also important because it is reused by the parent section for a secondary CTA.
- This unit should answer "is there any external validation at all?" It should not carry the full maturity story or the risk-reversal story.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/socialProof.ts`
7. `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
8. `examples/next-app-router/src/components/aplai/trustShowcase.ts`

Mandatory constraints for all prompts in this file:

- Work only on embedded unit `social_proof`.
- Treat `trust_showcase` as the parent section.
- Do not redesign `social_proof` as a standalone landing section.
- Preserve the `APLAI_SOCIAL_PROOF.enabled` gate.
- Preserve `APLAI_SOCIAL_PROOF.linkLabel` behavior unless an explicit parent-level decision is made.
- Do not add new sections.
- Do not add decorative surfaces.
- Do not let the embedded unit become a second trust narrative before the main parent block.
- If a problem can be solved by reducing duplication and density, do that before changing structure.

---

## Prompt 1. Embedded Audit

```md
You are auditing only the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.

Your task: perform a strict UX audit of the current embedded unit without proposing code.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Parent:
- Frozen Contracts:

### Function
- One sentence: what single job this embedded unit should perform inside `trust_showcase`.

### 3-5 Second Takeaway
- What the visitor should understand in 3-5 seconds from this social-proof cue.

### Current Strengths
- What already works and should be preserved.

### Current Problems
- Only specific UX issues:
  - whether the embedded unit duplicates the parent trust contexts too directly
  - whether the title and subtitle are concise enough
  - whether the items are helpful enough as fast-scanning cues
  - whether the unit is weighted correctly relative to the main trust block
  - whether `linkLabel` reflects the parent CTA logic clearly enough

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
You are working only on the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.
Then use the result of Prompt 1 as required input.

Your task: define the correct relationship between `trust_showcase` and the embedded social-proof cue.

Respond strictly in this format:

### Parent Question
- What one question the parent `trust_showcase` answers.

### Embedded Question
- What one question `social_proof` answers inside that parent.

### What The Embedded Unit Must Do
- Its exact job for `trust_showcase`.

### What The Embedded Unit Must Not Do
- What would wrongly make it act like a separate trust section.

### Relationship To Parent Contexts
- Explain how `social_proof.items` should differ from the fuller trust contexts below.

### Extraction Decision
- Choose one:
  - keep embedded
  - extraction not justified
  - extraction may be justified later but not now

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Social Cue And Chip Cleanup

```md
You are working only on the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the social-proof cue faster to scan and less duplicative without weakening trust.

Respond strictly in this format:

### Cue Audit
- For the current title and subtitle:
  - what is essential
  - what is repetitive
  - what is too long for an embedded trust cue

### Item Audit
- For the current `items`:
  - what is essential
  - what overlaps too directly with parent contexts
  - what should remain visible at first glance

### Recommended Weight
- Choose the correct priority among:
  - title
  - subtitle
  - item chips

### What Becomes Supporting
- Which social-proof fields should move below the first scan layer.

### Duplication Check
- Which ideas repeat between `social_proof` and the parent trust section and should stop repeating.

Do not propose code.
Do not remove the external-trust cue entirely.
```

---

## Prompt 4. Parent CTA And Trust Hierarchy

```md
You are working only on the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the social-proof cue and `linkLabel` should support the parent trust section without overpowering the main maturity narrative or the parent CTA hierarchy.

Respond strictly in this format:

### Embedded Cue Role
- What the visible social-proof block must do in the parent section.

### Link Label Role
- What `APLAI_SOCIAL_PROOF.linkLabel` must do when used by the parent section.

### What Stays In First Scan
- Which `social_proof` elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should stay quieter inside the parent section.

### Recommended Order
- Exact order of:
  - social-proof title
  - subtitle
  - item chips
  - parent maturity block
  - parent CTA area

### Why This Order Works
- Explain why this order fits the embedded role inside `trust_showcase`.

### Parent-Child Guardrail
- State the non-negotiable rules for keeping `social_proof` subordinate to the parent trust narrative.

Do not propose code.
Do not let `linkLabel` become disconnected from the parent CTA logic.
Do not let the embedded unit act like the main proof block.
```

---

## Prompt 5. Final Embedded Rewrite

```md
You are working only on the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the embedded social-proof unit as a content and UX output before code.

Respond strictly in this format:

### Final Unit Goal
- One paragraph describing what the embedded social-proof unit should achieve after the redesign.

### Rewritten Content
- Title
- Subtitle
- Items
- `linkLabel`

### Keep But Demote
- Which content remains in the unit but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete at first glance.

### Mobile Order
- Exact order of social-proof content on mobile.

### Quality Check
- Verify:
  - the unit stays embedded
  - it supports rather than duplicates the parent trust narrative
  - chips remain fast to scan
  - `linkLabel` still supports the parent CTA logic
  - the unit does not become a standalone trust section

Do not propose code.
Prefer concise external-trust cues over extra explanatory copy.
Do not expand the unit just because more context exists in the parent files.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the embedded `social_proof` unit inside the `trust_showcase` section of the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/14-social_proof.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of the embedded social-proof unit with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/socialProof.ts`
- `examples/next-app-router/src/components/aplai/trustContentPolicy.ts`
- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/trustShowcase.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve embedded placement inside `trust_showcase`.
- Preserve the `APLAI_SOCIAL_PROOF.enabled` gate.
- Preserve `APLAI_SOCIAL_PROOF.linkLabel` unless the parent CTA logic is intentionally updated with full awareness.
- Do not turn this into a standalone section.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and local embedded structure, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in embedded social-proof content and structure.

### What Stayed Frozen
- Which parent, gating, and CTA-label contracts were preserved.

### Validation
- Confirm:
  - the unit remains embedded in `trust_showcase`
  - the social-proof cue is easier to scan
  - the parent trust narrative remains primary
  - the `enabled` gate is preserved
  - `linkLabel` still supports the parent CTA logic
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: embedded social-proof duplication, not missing trust signals.
- Then they define the parent-child boundary with `trust_showcase`.
- Then they compress the cue and chip hierarchy.
- Then they place `linkLabel` and trust cues in the correct supporting role.
- Then they create a final rewritten embedded version.
- Only after that do they move into implementation.
