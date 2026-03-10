# APLAI Roadmap Prompt Pack

## Section Snapshot

- `SECTION_ID`: `roadmap`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `What happens after the pilot?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/roadmapSection.ts`
- `Frozen Shared Contracts`:
  - `scrollToSection("final_cta")`

## Why This Section Comes After FAQ

- By the time the visitor reaches `roadmap`, the promise, proof, guarantees, and clarifications should already be in place.
- That makes this section relatively isolated: it does not need to carry primary trust or qualification work anymore.
- Its risk is different from earlier sections. It can easily become either a vague future-vision block or an internal product backlog disguised as a landing section.
- The right outcome here is one clear story about how the result can evolve after the pilot, with a credible next-step bridge to `final_cta`.

## Working Diagnosis

- The live section already has a clean top-level structure:
  - lead
  - three roadmap lanes
  - disclaimer
  - CTA bridge
- The main risk is semantic drift, not layout failure.
- The three lanes are useful, but they can read like a feature inventory unless one clear growth narrative frames them.
- The disclaimer is important for credibility, but it should not cancel the momentum of the section.
- The CTA note is correct, but it must connect roadmap thinking back to an action the visitor can take now.
- This section should answer "what becomes possible after the first result?" It should not try to sell the whole platform vision or promise a fixed enterprise roadmap.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/roadmapSection.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `roadmap`.
- Do not change `section id`.
- Preserve `scrollToSection("final_cta")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on post-pilot trajectory, not on current proof, guarantees, or form logistics.
- Do not turn this section into a speculative product roadmap with hard promises.
- Do not turn this section into an internal backlog dump.
- If the problem can be solved by reducing density and clarifying lane roles, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `roadmap` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.

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
  - whether the section tells one growth story or just lists future items
  - whether the three lanes are equally useful or uneven
  - whether the lead and disclaimer pull in opposite directions
  - whether the CTA note clearly connects future trajectory back to present action
  - whether the section risks feeling too abstract after FAQ

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Post-Pilot Narrative Compression

```md
You are working only on the `roadmap` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one post-pilot growth narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Roadmap Thesis
- One main trajectory claim the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - lane detail
  - disclaimer nuance
  - CTA note

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `value_prop`
  - `trust_showcase`
  - `guarantees`
  - `final_cta`

### New Reading Formula
- Express the new logic as:
  - first result
  - controlled expansion
  - enterprise trajectory
  - caveat
  - next-step bridge

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Lane Hierarchy Cleanup

```md
You are working only on the `roadmap` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the roadmap lanes easier to scan and more clearly sequential without turning them into a feature matrix.

Respond strictly in this format:

### Lane Audit
- For each current lane:
  - what is essential
  - what is repetitive
  - what is too detailed for first-level reading

### Lane Relationship
- Explain whether the lanes should feel:
  - strictly sequential
  - progressive but flexible
  - illustrative rather than literal

### What Stays In Lane Form
- Which ideas deserve lane-level treatment.

### What Becomes Supporting
- Which lane details should move below the first scan layer.

### Recommended Lane Shape
- Define the ideal structure of one lane:
  - title role
  - item count
  - level of specificity
  - what must remain concrete

### Duplication Check
- Which ideas are repeated across lanes and should stop repeating.

Do not propose code.
Do not turn the lanes into generic strategy slogans.
Do not let them read like an engineering backlog.
```

---

## Prompt 4. Disclaimer And CTA Bridge Hierarchy

```md
You are working only on the `roadmap` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the disclaimer and CTA bridge should support the roadmap without weakening momentum.

Respond strictly in this format:

### Disclaimer Role
- What the disclaimer must do in this section.

### CTA Note Role
- What the CTA note must do in this section.

### CTA Role
- What `scrollToSection("final_cta")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - lead
  - roadmap lanes
  - CTA note
  - disclaimer
  - CTA

### Why This Order Works
- Explain why this order fits `roadmap` specifically.

Do not propose code.
Do not let the disclaimer cancel the section's momentum.
Do not let the CTA feel disconnected from the roadmap story.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `roadmap` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the roadmap section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Lane 1:
  - title
  - items
- Lane 2:
  - title
  - items
- Lane 3:
  - title
  - items
- CTA note
- Disclaimer
- CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one post-pilot narrative only
  - lanes feel sequential and credible
  - the section does not become a feature backlog
  - the disclaimer stays credible but quiet
  - the CTA clearly routes toward `final_cta`
  - the section does not duplicate `final_cta` or `value_prop`

Do not propose code.
Prefer clarity, trajectory, and credibility over volume.
Do not expand the section just because many future possibilities exist.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `roadmap` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/18-roadmap.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `roadmap` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/roadmapSection.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="roadmap"`.
- Preserve `scrollToSection("final_cta")`.
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
- Which routing and CTA contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer post-pilot narrative
  - lanes are easier to scan
  - the disclaimer is still present but quieter
  - the CTA still routes to `final_cta`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: roadmap drift, not lack of content.
- Then they compress the section into one post-pilot narrative.
- Then they clean up the lane hierarchy.
- Then they place the disclaimer and CTA bridge in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
