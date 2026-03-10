# APLAI Templates Prompt Pack

## Section Snapshot

- `SECTION_ID`: `templates`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `What if the scenario is different?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/templatesGallery.ts`
  - `examples/next-app-router/src/components/aplai/microcopy.ts`
- `Frozen Shared Contracts`:
  - `nav anchor id`
  - `scrollToSection("final_cta")`

## Why This Section Comes Next

- `templates` is a strong isolated candidate because it mostly carries content and one simple bridge CTA.
- Its job is distinct from `demo`: not "what will you see," but "what if your starting point is different from the anchor scenario."
- The section's main UX risk is semantic drift. It can easily become either:
  - a catalog of disconnected template names
  - or a vague reassurance block with no decision value
- The right outcome here is one clear answer to "where do we start if our case is different?" with fast-scanning starter options and a clean route to `final_cta`.

## Working Diagnosis

- The live section already has a workable structure:
  - title and subtitle
  - four template entries
  - one support line
  - one CTA bridge
- The cards are useful, but they currently risk reading like a product menu instead of a set of starting routes.
- The subtitle and support line point in the same direction, but they can still feel like two versions of the same reassurance.
- The secondary lines add specificity, but they may overload first-level scanning if every card becomes equally dense.
- The CTA is correct, but it should feel like the next action after choosing the closest start, not just a generic conversion button.
- This section should answer "how do we start if our scenario is not exactly the demo case?" It should not become a feature gallery or a second value proposition block.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/templatesGallery.ts`
7. `examples/next-app-router/src/components/aplai/microcopy.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `templates`.
- Do not change `section id`.
- Preserve the `templates` nav anchor id.
- Preserve `scrollToSection("final_cta")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on choosing the closest starting template.
- Do not turn this section into a feature catalog.
- Do not turn this section into a vague reassurance block without usable options.
- If the problem can be solved by tightening card hierarchy and copy density, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `templates` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.

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
  - whether the section reads like a useful starting-choice block or just a list
  - whether the subtitle and support line are too repetitive
  - whether the template cards are too dense
  - whether some cards are more concrete than others
  - whether the CTA bridge feels like the correct next step

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Starting-Point Narrative Compression

```md
You are working only on the `templates` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one starter-choice narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Template Thesis
- One main explanation the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - subtitle nuance
  - secondary lines
  - support line
  - CTA label

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `demo`
  - `value_prop`
  - `final_cta`
  - `not_low_code`

### New Reading Formula
- Express the new logic as:
  - choose the closest start
  - see the starter options
  - understand adaptation is possible
  - move to next step

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Template Card Cleanup

```md
You are working only on the `templates` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the template cards faster to scan and more useful as starting choices.

Respond strictly in this format:

### Card Audit
- For each current template:
  - what is essential
  - what is repetitive
  - what is too detailed for first-level reading

### Card Relationship
- Explain whether the cards should feel:
  - four equal starter options
  - one or two anchor options plus supporting variants

### What Stays In Card Form
- Which ideas deserve card-level treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Card Shape
- Define the ideal structure of one template card:
  - title role
  - subtitle role
  - secondary line role

### Duplication Check
- Which ideas repeat across cards and should stop repeating.

Do not propose code.
Do not turn the cards into generic use-case slogans.
Do not let the cards become a dense catalog.
```

---

## Prompt 4. Support Line And CTA Hierarchy

```md
You are working only on the `templates` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the support line and CTA bridge should support the starter-choice section without diluting the card logic.

Respond strictly in this format:

### Support Line Role
- What the support line must do in this section.

### Templates Hint Role
- What the idea behind `templatesHint` must do in this section, even if wording changes.

### CTA Role
- What `scrollToSection("final_cta")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - section framing
  - template cards
  - support line
  - CTA bridge

### Why This Order Works
- Explain why this order fits `templates` specifically.

Do not propose code.
Do not let the support line overpower the card choices.
Do not let the CTA feel disconnected from the template decision.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `templates` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the templates section should achieve after the redesign.

### Rewritten Content
- Section title
- Section subtitle
- Template card 1:
  - title
  - subtitle
  - secondary line if needed
- Template card 2:
  - title
  - subtitle
  - secondary line if needed
- Template card 3:
  - title
  - subtitle
  - secondary line if needed
- Template card 4:
  - title
  - subtitle
  - secondary line if needed
- Support line
- CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one starter-choice thesis only
  - cards are easier to scan
  - the section does not become a catalog
  - the section does not duplicate `demo` or `final_cta`
  - the CTA clearly routes toward `final_cta`

Do not propose code.
Prefer clarity and decision usefulness over volume.
Do not expand the section just because more scenario detail could be added.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `templates` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/12-templates.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `templates` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/templatesGallery.ts`
- `examples/next-app-router/src/components/aplai/microcopy.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="templates"`.
- Preserve the `templates` nav anchor id.
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
- Which nav and CTA contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer starter-choice narrative
  - cards are easier to scan
  - CTA still routes to `final_cta`
  - the nav anchor remains stable
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: catalog drift, not missing content.
- Then they compress the section into one starter-choice narrative.
- Then they clean up the template card hierarchy.
- Then they place the support line and CTA in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
