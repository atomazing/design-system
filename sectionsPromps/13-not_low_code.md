# APLAI Not Low Code Prompt Pack

## Section Snapshot

- `SECTION_ID`: `not_low_code`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `Will this hit a platform ceiling?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/notLowCodeSection.ts`
- `Frozen Shared Contracts`:
  - `scrollToSection("guarantees")`

## Why This Section Comes Next

- `not_low_code` is a strong isolated candidate because it mostly carries comparison framing and one bridge CTA.
- Its job is distinct from `templates` and `trust_showcase`: it answers a strategic objection about long-term fit, not a starting scenario or external proof question.
- The main UX risk here is tone and framing. This section can easily turn into:
  - a vague anti-low-code argument
  - a defensive comparison chart
  - or a disguised guarantees block
- The right outcome here is one clear answer to "can we start fast without locking ourselves into a ceiling?" with a fair comparison and a clean bridge to `guarantees`.

## Working Diagnosis

- The live section already has a useful skeleton:
  - title and lead
  - two comparison columns
  - when-to-choose bullets
  - disclaimer
  - bridge CTA
- The comparison model is strong, but it can become too binary if both columns read like slogans instead of trade-offs.
- The APLAI column is useful, but it must not drift into a generic value-prop repeat.
- The `whenToChoose` list is practical, but it can compete with the comparison itself if it becomes the real main story.
- The disclaimer is important because this is a trade-off section, not a universal claim section.
- This section should answer "where does fast start stop being enough, and why does APLAI keep working past that point?" It should not become a blanket dismissal of low-code.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/notLowCodeSection.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `not_low_code`.
- Do not change `section id`.
- Preserve `scrollToSection("guarantees")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on platform ceiling and long-term fit.
- Do not turn this section into a generic anti-low-code attack.
- Do not turn this section into a second guarantees section.
- If the problem can be solved by tightening comparison logic and hierarchy, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `not_low_code` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.

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
  - whether the section reads like a fair trade-off comparison
  - whether the comparison columns are too dense
  - whether the APLAI column repeats nearby value sections
  - whether `whenToChoose` competes too much with the comparison
  - whether the disclaimer sits at the right hierarchy level
  - whether the bridge to `guarantees` feels like the correct next step

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Platform Ceiling Narrative Compression

```md
You are working only on the `not_low_code` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one platform-ceiling narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Ceiling Thesis
- One main explanation the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - comparison nuance
  - `whenToChoose` detail
  - disclaimer
  - bridge CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `value_prop`
  - `guarantees`
  - `trust_showcase`
  - `final_cta`

### New Reading Formula
- Express the new logic as:
  - fast start is useful
  - ceiling risk appears later
  - APLAI avoids that ceiling
  - when to choose it
  - de-risking bridge

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Comparison Column Cleanup

```md
You are working only on the `not_low_code` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the comparison columns faster to scan and more balanced without weakening the contrast.

Respond strictly in this format:

### Column Audit
- For each current column:
  - what is essential
  - what is repetitive
  - what is too detailed for first-level reading

### Comparison Logic
- Explain what one key contrast the section should make obvious.

### What Stays In Column Form
- Which ideas deserve side-by-side treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Column Shape
- Define the ideal structure of one comparison column:
  - title role
  - summary role
  - points role

### Duplication Check
- Which ideas are repeated across columns and should stop repeating.

Do not propose code.
Do not turn the comparison into a strawman.
Do not let the APLAI column become a generic marketing claim list.
```

---

## Prompt 4. Decision Criteria, Disclaimer, And Bridge Hierarchy

```md
You are working only on the `not_low_code` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how `whenToChoose`, the disclaimer, and the bridge CTA should support the comparison without becoming co-equal narratives.

Respond strictly in this format:

### Decision-Criteria Role
- What `whenToChoose` must do in this section.

### Disclaimer Role
- What the disclaimer must do in this section.

### Bridge Role
- What `scrollToSection("guarantees")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - lead
  - comparison columns
  - `whenToChoose`
  - disclaimer
  - bridge CTA

### Why This Order Works
- Explain why this order fits `not_low_code` specifically.

Do not propose code.
Do not let `whenToChoose` overpower the comparison itself.
Do not let the disclaimer cancel the section's main point.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `not_low_code` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Comparison column 1:
  - title
  - summary
  - points
- Comparison column 2:
  - title
  - summary
  - points
- `whenToChoose` title
- `whenToChoose` items
- Disclaimer
- Bridge CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one platform-ceiling thesis only
  - the comparison feels fair and useful
  - the section does not become a generic anti-low-code rant
  - the section does not duplicate `guarantees`
  - the bridge clearly routes toward `guarantees`

Do not propose code.
Prefer clarity and decision usefulness over rhetoric.
Do not expand the section just because more comparison detail could be added.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `not_low_code` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/13-not_low_code.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `not_low_code` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/notLowCodeSection.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="not_low_code"`.
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
- Which routing and CTA contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer platform-ceiling narrative
  - comparison columns are easier to scan
  - bridge CTA still routes to `guarantees`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: comparison drift, not missing content.
- Then they compress the section into one platform-ceiling narrative.
- Then they clean up the comparison columns.
- Then they place decision criteria, disclaimer, and bridge in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
