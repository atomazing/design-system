# APLAI Who Its For Prompt Pack

## Section Snapshot

- `SECTION_ID`: `who_its_for`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Who is this for and what changes for them?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/icpPack.ts`
- `Frozen Shared Contracts`:
  - `getPreferredCtaTarget()`
  - `existing CTA target ids`

## Why This Section Comes Second

- This is the first section where the main problem is not weak content but mixed hierarchy.
- It currently tries to do audience framing, qualification, talking points, and CTA routing at the same time.
- The section is a strong test for prompt discipline because it is not isolated from shared CTA targets.
- A good result here is not "more information". A good result is clearer audience fit with less first-level competition.

## Working Diagnosis

- The live section mixes at least five jobs in one surface:
  - business framing
  - technical framing
  - primary roles
  - additional roles
  - qualification and must-have talking points
- Primary and secondary audiences are rendered with similar visual weight.
- The section risks answering "who is this for", "what should we believe", and "where should we click" at the same time.
- `AudienceSegmentBlock` is dense by default because every segment includes scenario, focus, triggers, objection, and CTA.
- CTA routing is meaningful and must remain stable even if the structure becomes much simpler.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/icpPack.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `who_its_for`.
- Do not change `section id`.
- Do not break `getPreferredCtaTarget()`.
- Do not rename existing CTA target ids.
- Do not turn the section into a value proposition section, proof section, or FAQ section.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- If a problem can be solved by reducing first-level density, do that before inventing more layout.
- Preserve the idea that different audiences may route to different next steps, but do not let CTA routing dominate the section.

---

## Prompt 1. Section Audit

```md
You are auditing only the `who_its_for` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.

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
  - where the section mixes too many jobs
  - where primary and secondary audiences compete
  - whether qualification belongs here at first level
  - whether must-have talking points belong here at first level
  - whether CTA signals are too distributed

### Keep Frozen
- Which contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Audience Hierarchy Reset

```md
You are working only on the `who_its_for` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.
Then use the result of Prompt 1 as required input.

Your task: define the correct hierarchy of audiences for this section.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Primary Audience
- Which audience should own the first reading path.
- Why this audience deserves primary focus.

### Secondary Audience
- Which audience can stay visible but should be quieter.

### Supporting Audience
- Which audience should not sit on the first scan layer.

### What Moves Out Of First-Level Hierarchy
- Which elements should stop competing at top level:
  - business layer
  - technical layer
  - qualification
  - must-haves
  - secondary role cards

### New Section Logic
- Express the new logic as:
  - framing
  - primary fit
  - supporting fit
  - transition

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium section cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Segment Density Cleanup

```md
You are working only on the `who_its_for` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: reduce segment-level density so each audience block reads faster.

Respond strictly in this format:

### Segment Audit
- For each audience segment type now rendered:
  - what is useful
  - what is overloaded
  - what is duplicated across segments

### Segment Fields Priority
- Rank these fields for first-level visibility:
  - title
  - scenario
  - focus
  - triggers
  - objection
  - CTA

### What Becomes Supporting
- Which fields should move below the first scan layer.

### Recommended Segment Shape
- Define the ideal structure of one audience block:
  - what comes first
  - what supports it
  - what can be collapsed or demoted
  - where CTA belongs

### Duplication Check
- Which repeated meanings should stop appearing in multiple segment blocks.

### Reading Speed Check
- Why the new segment model is easier to scan on both desktop and mobile.

Do not propose code.
Do not invent new product claims.
Keep the section about fit, not proof.
```

---

## Prompt 4. Structure Rebuild

```md
You are working only on the `who_its_for` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: propose a new UX structure for the section from top to bottom without visual redesign.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Isolation:

### Proposed Structure
- Top-to-bottom order of blocks.
- For each block specify:
  - role
  - primary / supporting / transition
  - what the visitor should understand there

### Audience Order
- Exact order of audiences in the section and why.

### CTA Logic
- How CTA routing should remain meaningful without taking over the section.
- Why the section should preserve audience-specific next steps.

### Desktop Reading Flow
- How the section should read on desktop.

### Mobile-First Order
- Exact block order on mobile.

### What Gets Smaller
- Which current blocks, labels, or lists should become quieter or shorter.

### What Stays Unchanged
- Which current ideas are already correct and should survive the redesign.

Do not propose code.
Do not add new sections.
Do not remove audience differentiation entirely.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `who_its_for` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section subtitle
- Framing block
- Primary audience blocks
- Secondary audience blocks
- CTA wording logic

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one main question only
  - one dominant audience reading path
  - no equal competition between all roles
  - CTA routing still makes sense
  - the section does not duplicate value_prop or guarantees

Do not propose code.
Prefer clarity and fit over volume.
Do not expand the section just because the source pack contains many useful details.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `who_its_for` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/05-who_its_for.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `who_its_for` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/icpPack.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="who_its_for"`.
- Preserve `getPreferredCtaTarget()`.
- Preserve current CTA target ids.
- Do not add more CTA paths.
- Do not change route structure.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and block order, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and structure.

### What Stayed Frozen
- Which routing and section contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer audience narrative
  - primary and secondary audiences no longer compete equally
  - CTA routing still maps correctly
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts identify the real UX problem: mixed hierarchy, not lack of content.
- Then they reset audience priority.
- Then they reduce segment-level density.
- Then they define the new top-to-bottom structure.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
