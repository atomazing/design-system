# APLAI Outcomes Prompt Pack

## Section Snapshot

- `SECTION_ID`: `outcomes`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `What does the team get next?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/outcomesSection.ts`
- `Frozen Shared Contracts`:
  - `scrollToSection("how_it_works")`

## Why This Section Comes Next

- `outcomes` is a strong isolated candidate, so it is a good next step after the heavier trust and conversion sections are already covered.
- The live section is structurally clean, but it sits on a dangerous boundary between value promise and mechanism.
- If handled poorly, it can become either a generic benefits section or a partial duplicate of `how_it_works`.
- The right outcome here is one concrete answer to "what the team gets next" with fast-scanning cards and a clean bridge into the mechanism section.

## Working Diagnosis

- The current section already has a sensible skeleton:
  - support line
  - short lead
  - three outcome cards
  - bridge CTA
- The main risk is semantic overlap, not missing structure.
- The support line and lead currently point in the right direction, but they can still feel like two versions of the same idea.
- The three cards are useful, but they can drift toward describing components instead of clearly framed outcomes.
- The details on the cards are helpful, but they must stay subordinate to the team-level result.
- This section should answer "what do we get out of this immediately?" It should not explain why it works or how the pipeline operates.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/outcomesSection.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `outcomes`.
- Do not change `section id`.
- Preserve `scrollToSection("how_it_works")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on concrete outcomes, not mechanism.
- Do not turn this section into a second `value_prop`.
- Do not turn this section into a feature inventory.
- If the problem can be solved by tightening copy and card hierarchy, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `outcomes` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.

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
  - whether the cards describe outcomes clearly enough
  - whether card details compete too much with card titles
  - whether the section overlaps with `value_prop`
  - whether the bridge to `how_it_works` feels natural

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Outcome Narrative Compression

```md
You are working only on the `outcomes` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one concrete outcome narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Outcome Thesis
- One main team-level result the section should communicate.

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
  - `value_prop`
  - `mechanism`
  - `how_it_works`
  - `final_cta`

### New Reading Formula
- Express the new logic as:
  - tangible result
  - concrete outcome set
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
You are working only on the `outcomes` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the outcome cards faster to scan and more clearly outcome-oriented.

Respond strictly in this format:

### Card Audit
- For each current card:
  - what is essential
  - what is repetitive
  - what sounds like implementation detail instead of outcome

### Card Relationship
- Explain whether the cards should feel:
  - three equal outcomes
  - one core outcome plus two supporting outcomes

### What Stays In Card Form
- Which ideas deserve card-level treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Card Shape
- Define the ideal structure of one outcome card:
  - title role
  - summary role
  - detail role

### Duplication Check
- Which ideas are repeated across cards and should stop repeating.

Do not propose code.
Do not turn the cards into generic benefit slogans.
Do not let the cards become technical component labels.
```

---

## Prompt 4. Support Line And Bridge Hierarchy

```md
You are working only on the `outcomes` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the support line, lead, and bridge CTA should support the cards without diluting the main outcome message.

Respond strictly in this format:

### Support Line Role
- What the support line must do in this section.

### Lead Role
- What the lead must do in this section.

### Bridge Role
- What `scrollToSection("how_it_works")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - support line
  - lead
  - outcome cards
  - bridge CTA

### Why This Order Works
- Explain why this order fits `outcomes` specifically.

Do not propose code.
Do not let the bridge CTA feel like the main event.
Do not let the lead become a second value proposition block.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `outcomes` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the outcomes section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Support line
- Outcome card 1:
  - title
  - summary
  - detail if needed
- Outcome card 2:
  - title
  - summary
  - detail if needed
- Outcome card 3:
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
  - one concrete outcome thesis only
  - cards are clearly outcome-oriented
  - the section does not duplicate `value_prop`
  - the section does not become mechanism
  - the bridge clearly routes toward `how_it_works`

Do not propose code.
Prefer clarity and tangibility over abstract claims.
Do not expand the section just because more explanatory detail is available.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `outcomes` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/07-outcomes.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `outcomes` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/outcomesSection.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="outcomes"`.
- Preserve `scrollToSection("how_it_works")`.
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
  - the section has one clearer outcome narrative
  - cards are easier to scan
  - bridge CTA still routes to `how_it_works`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: semantic overlap, not missing layout.
- Then they compress the section into one concrete outcome narrative.
- Then they clean up the card hierarchy.
- Then they place the support line and bridge in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
