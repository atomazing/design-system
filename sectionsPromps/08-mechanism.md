# APLAI Mechanism Prompt Pack

## Section Snapshot

- `SECTION_ID`: `mechanism`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `Why does this work?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/mechanismSection.ts`
- `Frozen Shared Contracts`:
  - `scrollToSection("architecture")`

## Why This Section Comes After Outcomes

- `mechanism` naturally follows `outcomes`: first the page says what the team gets, then it explains why that result is repeatable.
- The live section is structurally clean, so it is a good isolated candidate for the new prompt system.
- Its real UX risk is semantic drift. It can become too abstract, too technical, or too close to `architecture`.
- The right outcome here is one clear explanation of the operating logic behind APLAI, with fast-scanning mechanism cards and a clean bridge into the architecture section.

## Working Diagnosis

- The current section already has the right basic skeleton:
  - support line
  - lead
  - three mechanism cards
  - bridge CTA
- The support line and lead point to the same thesis, but they can still feel like two variants of one explanation.
- The cards are useful, but they sit on a boundary:
  - too high-level and they feel vague
  - too detailed and they become architecture
- The details help, but they must stay subordinate to the mechanism story.
- The bridge to `architecture` is correct and should remain stable.
- This section should answer "what system makes the result repeatable?" It should not become a step-by-step flow or a deep integration map.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/mechanismSection.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `mechanism`.
- Do not change `section id`.
- Preserve `scrollToSection("architecture")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on mechanism, not on outcomes or full architecture.
- Do not turn this section into a step-by-step process section.
- Do not turn this section into a component inventory.
- If the problem can be solved by tightening copy and card hierarchy, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `mechanism` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.

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
  - whether support line and lead are too repetitive
  - whether the cards explain the mechanism clearly enough
  - whether card details compete too much with card titles
  - whether the section overlaps too much with `outcomes`
  - whether the section drifts too close to `architecture`
  - whether the bridge CTA feels natural

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Mechanism Narrative Compression

```md
You are working only on the `mechanism` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one mechanism narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Mechanism Thesis
- One main explanation the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - support line nuance
  - card details
  - lead explanation
  - bridge CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `outcomes`
  - `how_it_works`
  - `architecture`
  - `value_prop`

### New Reading Formula
- Express the new logic as:
  - mechanism thesis
  - three operating pillars
  - support line
  - bridge

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Card Hierarchy Cleanup

```md
You are working only on the `mechanism` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the mechanism cards faster to scan and more clearly explanatory.

Respond strictly in this format:

### Card Audit
- For each current card:
  - what is essential
  - what is repetitive
  - what sounds too technical for this layer

### Card Relationship
- Explain whether the cards should feel:
  - three equal mechanism pillars
  - one core mechanism plus two supporting pillars

### What Stays In Card Form
- Which ideas deserve card-level treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Card Shape
- Define the ideal structure of one mechanism card:
  - title role
  - summary role
  - detail role

### Duplication Check
- Which ideas are repeated across cards and should stop repeating.

Do not propose code.
Do not turn the cards into generic slogans.
Do not let the cards become an architecture diagram in prose.
```

---

## Prompt 4. Support Line And Bridge Hierarchy

```md
You are working only on the `mechanism` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the support line, lead, and bridge CTA should support the cards without diluting the mechanism story.

Respond strictly in this format:

### Support Line Role
- What the support line must do in this section.

### Lead Role
- What the lead must do in this section.

### Bridge Role
- What `scrollToSection("architecture")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - support line
  - lead
  - mechanism cards
  - bridge CTA

### Why This Order Works
- Explain why this order fits `mechanism` specifically.

Do not propose code.
Do not let the bridge CTA feel like the main event.
Do not let the lead become a second value or outcome section.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `mechanism` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the mechanism section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Support line
- Mechanism card 1:
  - title
  - summary
  - detail if needed
- Mechanism card 2:
  - title
  - summary
  - detail if needed
- Mechanism card 3:
  - title
  - summary
  - detail if needed
- Bridge CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one mechanism thesis only
  - cards are clearly explanatory
  - the section does not duplicate `outcomes`
  - the section does not become `architecture`
  - the bridge clearly routes toward `architecture`

Do not propose code.
Prefer clarity and causal explanation over abstract claims.
Do not expand the section just because more technical detail is available.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `mechanism` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/08-mechanism.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `mechanism` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/mechanismSection.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="mechanism"`.
- Preserve `scrollToSection("architecture")`.
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
  - the section has one clearer mechanism narrative
  - cards are easier to scan
  - bridge CTA still routes to `architecture`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: semantic drift between outcomes and architecture.
- Then they compress the section into one mechanism narrative.
- Then they clean up the card hierarchy.
- Then they place the support line and bridge in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
