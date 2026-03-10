# APLAI Final CTA Prompt Pack

## Section Snapshot

- `SECTION_ID`: `final_cta`
- `Section Type`: `standalone`
- `Isolation`: `Low`
- `Parent`: `page`
- `Primary Question`: `What happens after the request is submitted?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/pilotOffer.ts`
  - `examples/next-app-router/src/components/aplai/copyPack.ts`
  - `examples/next-app-router/src/components/aplai/messageMap.ts`
  - `examples/next-app-router/src/components/aplai/LeadCaptureForm.tsx`
  - `examples/next-app-router/src/components/aplai/leadFormModal.ts`
- `Frozen Shared Contracts`:
  - `modal flow`
  - `inline form`
  - `form analytics`
  - `direct-contact links`

## Why This Section Comes Fifth

- This is the most conversion-heavy section on the page and the most coupled to shared runtime behavior.
- It only makes sense to redesign after the earlier story sections are cleaner, otherwise this section ends up compensating for upstream ambiguity.
- The live section currently mixes request flow, qualification, scope framing, next steps, direct contact, and risk reduction in one large surface.
- The right outcome here is not more persuasion. The right outcome is one clearer conversion path with supporting detail moved to the correct depth.

## Working Diagnosis

- The section currently mixes at least six layers of meaning:
  - pilot promise
  - modal shortcut path
  - inline form
  - fit and not-fit qualification
  - next steps and direct contact
  - scope, requirements, success criteria, and risk reversal
- The inline form is important, but it is not the only focal point on the screen, so attention gets split too early.
- The modal path is valid, but it currently competes with the inline path instead of feeling like a secondary convenience option.
- Qualification and scope details are useful, but too many of them sit at the same visual weight as the actual submit action.
- Next-step clarity is necessary for trust, but parts of it are duplicated across the section and the form flow.
- This section should answer "what happens if I submit?" and "why is it safe to start?" It should not try to re-explain the full pilot model.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/pilotOffer.ts`
7. `examples/next-app-router/src/components/aplai/copyPack.ts`
8. `examples/next-app-router/src/components/aplai/messageMap.ts`
9. `examples/next-app-router/src/components/aplai/LeadCaptureForm.tsx`
10. `examples/next-app-router/src/components/aplai/leadFormModal.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `final_cta`.
- Do not change `section id`.
- Preserve the inline form path.
- Preserve the modal path.
- Preserve form analytics behavior.
- Preserve direct-contact links.
- Do not break `LeadCaptureForm`.
- Do not break `openLeadDialog("final_cta")` behavior.
- Do not add new sections.
- Do not increase CTA path count.
- Do not add decorative surfaces.
- Keep the section focused on one conversion question: what happens next and why it is safe to submit.
- If a problem can be solved by demoting supporting detail, do that before refactoring the conversion flow.

---

## Prompt 1. Section Audit

```md
You are auditing only the `final_cta` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.

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
  - where the inline form loses focus
  - where the modal shortcut competes too much
  - where qualification and scope details sit too high
  - where next-step clarity is duplicated
  - where risk-reversal content competes with form completion

### Keep Frozen
- Which contracts and flows must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Conversion Narrative Compression

```md
You are working only on the `final_cta` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one conversion narrative with one dominant question and one dominant action.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Primary Action
- What the main action should be.

### Main Safety Message
- What should make the visitor feel safe enough to act.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - modal shortcut
  - fit and not-fit lists
  - next steps
  - scope framing
  - requirements
  - success criteria
  - risk reversal

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `trust_showcase`
  - `guarantees`
  - `faq`
  - `roadmap`

### New Reading Formula
- Express the new logic as:
  - request prompt
  - why it is safe
  - primary action
  - supporting qualification
  - next-step reassurance

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Form Path And CTA Role Split

```md
You are working only on the `final_cta` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: define the correct relationship between the inline form, the modal path, and the direct-contact path.

Respond strictly in this format:

### Primary Conversion Path
- State which path should feel primary and why.

### Inline Form Role
- What the inline form must do in this section.

### Modal Path Role
- What the modal path must do and when it should feel useful.

### Direct-Contact Role
- What the direct-contact path must do without stealing focus.

### Analytics Guardrails
- Which tracking behaviors must remain intact.

### What Must Not Compete
- Which actions must stop competing at the same visual weight.

### Frozen Flow Check
- Confirm what must remain untouched about:
  - inline form
  - modal open behavior
  - direct-contact links
  - analytics hooks

Do not propose code.
Do not remove any existing path.
Do not invent a new conversion path.
```

---

## Prompt 4. Supporting Detail Hierarchy Cleanup

```md
You are working only on the `final_cta` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how qualification, scope, requirements, success criteria, and risk-reversal content should support the conversion flow without becoming co-equal sections inside the section.

Respond strictly in this format:

### Qualification Role
- What fit and not-fit content must do here.

### Scope Role
- What in-scope and out-of-scope content must do here.

### Requirements Role
- What minimum and optional requirements must do here.

### Success Role
- What success criteria must do here.

### Risk-Reversal Role
- What risk-reversal content must do here.

### What Stays In First Scan
- Which supporting details deserve first-level visibility.

### What Becomes Supporting
- Which details should move lower in hierarchy.

### Recommended Order
- Exact order of:
  - intro
  - primary action
  - modal shortcut
  - qualification
  - next steps
  - direct contact
  - scope
  - requirements
  - success criteria
  - risk reversal

### Why This Order Works
- Explain why this order fits `final_cta` specifically.

Do not propose code.
Do not let the section become a long appendix of pilot details.
Do not duplicate `guarantees` or `roadmap`.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `final_cta` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the section should achieve after the redesign.

### Rewritten Content
- Section title
- Section body
- Inline form intro
- Modal shortcut copy
- Qualification summary
- Next-step reassurance
- Direct-contact label
- Scope summary
- Requirements summary
- Success and safety summary

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one conversion question only
  - inline form stays primary
  - modal path stays secondary but useful
  - direct contact stays available but quieter
  - supporting details do not overpower submission
  - the section does not duplicate `guarantees`, `trust_showcase`, or `roadmap`

Do not propose code.
Prefer clarity, action, and trust over volume.
Do not expand the section just because many details are available in the source packs.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `final_cta` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/19-final_cta.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `final_cta` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/pilotOffer.ts`
- `examples/next-app-router/src/components/aplai/copyPack.ts`
- `examples/next-app-router/src/components/aplai/messageMap.ts`
- `examples/next-app-router/src/components/aplai/LeadCaptureForm.tsx`
- `examples/next-app-router/src/components/aplai/leadFormModal.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="final_cta"`.
- Preserve the inline form path.
- Preserve the modal path.
- Preserve form analytics hooks.
- Preserve direct-contact links.
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
- Which shared conversion and tracking contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer conversion narrative
  - the inline form still works as the primary path
  - the modal path still works as a secondary shortcut
  - direct-contact links still work
  - analytics hooks are still preserved
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts identify the real UX problem: conversion overload, not lack of detail.
- Then they compress the section into one conversion narrative.
- Then they define the correct roles of inline form, modal path, and direct contact.
- Then they place qualification and safety details in the right hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
