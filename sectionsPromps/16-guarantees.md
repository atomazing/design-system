# APLAI Guarantees Prompt Pack

## Section Snapshot

- `SECTION_ID`: `guarantees`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Where are the traps and how is risk reduced?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/guaranteesSection.ts`
  - `examples/next-app-router/src/components/aplai/riskReversalPack.ts`
- `Frozen Shared Contracts`:
  - `nav anchor id`
  - `handlePrimaryCta(sectionId)`
  - `scrollToSection("faq")`

## Why This Section Comes Sixth

- This section is smaller than `final_cta`, but it sits in a dangerous place where it can easily duplicate trust, qualification, or scope content from nearby sections.
- It works best after `trust_showcase` and `final_cta` are already clearer, because only then can this section focus on pure de-risking instead of trying to compensate for upstream ambiguity.
- The live section already has a workable shape, but it still mixes guarantee cards, pre-pilot signals, details hint, and dual CTA routing at similar weight.
- The right outcome here is a tighter risk-reversal section that supports conversion without reopening the broader proof or scoping story.

## Working Diagnosis

- The section is not badly structured, but it is too easy for it to drift into duplication.
- The two main guarantee cards carry the correct topic, but they can feel like parallel claims unless one shared de-risking thesis clearly frames them.
- The `riskSignals` chips are useful, but they partially overlap with:
  - `trust_showcase` safe signals
  - `final_cta` risk-reversal and requirements language
- The details hint is important, but it should feel like a bridge to `faq`, not like a second explanatory paragraph.
- The CTA pair is valid, but the FAQ path must remain clearly secondary to the main conversion path.
- This section should answer "what traps are removed before we start?" and not re-explain maturity, form flow, or pilot scope.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/guaranteesSection.ts`
7. `examples/next-app-router/src/components/aplai/riskReversalPack.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `guarantees`.
- Do not change `section id`.
- Preserve the `guarantees` nav anchor id.
- Preserve `handlePrimaryCta("guarantees")`.
- Preserve `scrollToSection("faq")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on de-risking only.
- Do not turn this section into a second trust section, a second final CTA section, or a technical FAQ section.
- If the problem can be solved by reducing first-level density, do that before adding more internal structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `guarantees` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.

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
  - where the cards feel like separate claims instead of one risk-reversal story
  - where `riskSignals` duplicate nearby sections
  - whether the details hint sits too high or too low
  - whether the FAQ CTA competes too directly
  - whether the section feels tighter than neighboring sections or repeats them

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Risk Narrative Compression

```md
You are working only on the `guarantees` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one de-risking narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Guarantee Thesis
- One main de-risking claim the section should communicate.

### Supporting Logic
- What should support the claim without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - individual card detail
  - `riskSignals`
  - `detailsHint`
  - FAQ CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `trust_showcase`
  - `not_low_code`
  - `final_cta`
  - `faq`

### New Reading Formula
- Express the new logic as:
  - risk thesis
  - guarantee proof
  - pre-pilot signal
  - FAQ bridge
  - primary action

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Guarantee Card Cleanup

```md
You are working only on the `guarantees` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the main guarantee cards faster to scan and less repetitive without weakening the de-risking message.

Respond strictly in this format:

### Card Audit
- For each current card:
  - what is essential
  - what is repetitive
  - what is too detailed for first-level reading

### Card Relationship
- Explain how the cards should relate:
  - two equal guarantees
  - one primary guarantee plus one supporting guarantee

### What Stays In Card Form
- Which ideas deserve card-level treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Card Shape
- Define the ideal structure of one guarantee card:
  - what comes first
  - what supports it
  - what can be shorter

### Duplication Check
- Which ideas are being repeated across cards and should stop repeating.

Do not propose code.
Do not turn the cards into generic claims.
Do not add more cards unless absolutely necessary.
```

---

## Prompt 4. Signal, FAQ, And CTA Hierarchy

```md
You are working only on the `guarantees` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how `riskSignals`, the details hint, and the two CTA exits should support one de-risking narrative without becoming co-equal focal points.

Respond strictly in this format:

### Signal Role
- What `riskSignals` must do in this section.

### Details Hint Role
- What the details hint must do in this section.

### Primary CTA Role
- What `handlePrimaryCta("guarantees")` must do here.

### FAQ CTA Role
- What `scrollToSection("faq")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - section thesis
  - guarantee cards
  - `riskSignals`
  - details hint
  - primary CTA
  - FAQ CTA

### Why This Order Works
- Explain why this order fits `guarantees` specifically.

Do not propose code.
Do not let the FAQ bridge feel like the primary action.
Do not let `riskSignals` become a second proof strip.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `guarantees` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section subtitle
- Main guarantee thesis
- Guarantee card 1:
  - title
  - summary
- Guarantee card 2:
  - title
  - summary
- `riskSignals` treatment
- details hint
- primary CTA label
- FAQ CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one de-risking thesis only
  - cards support one shared story
  - `riskSignals` do not duplicate nearby sections too aggressively
  - FAQ stays a secondary bridge
  - the section does not duplicate `trust_showcase` or `final_cta`

Do not propose code.
Prefer clarity, de-risking, and conversion support over extra explanation.
Do not expand the section just because more detail exists in the risk pack.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `guarantees` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/16-guarantees.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `guarantees` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/guaranteesSection.ts`
- `examples/next-app-router/src/components/aplai/riskReversalPack.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="guarantees"`.
- Preserve the `guarantees` nav anchor id.
- Preserve `handlePrimaryCta("guarantees")`.
- Preserve `scrollToSection("faq")`.
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
  - the section has one clearer de-risking narrative
  - cards are easier to scan
  - `riskSignals` are still present but quieter
  - FAQ still works as a secondary bridge
  - the primary CTA path is preserved
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX problem: duplication risk, not missing structure.
- Then they compress the section into one de-risking narrative.
- Then they clean up the guarantee cards.
- Then they place signals, hint, and CTA in the right hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
