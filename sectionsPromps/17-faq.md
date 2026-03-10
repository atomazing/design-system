# APLAI FAQ Prompt Pack

## Section Snapshot

- `SECTION_ID`: `faq`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `What still needs to be clarified before the pilot?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/faqSection.ts`
  - `examples/next-app-router/src/components/aplai/scrollJourney.ts`
- `Frozen Shared Contracts`:
  - `nav anchor id`
  - `expandedFaqId`
  - `detail target links`
  - `FAQ_RETURN_POINT` back to `final_cta`

## Why This Section Comes Next

- This section sits after `guarantees`, so it naturally becomes the clarification layer once the user has already seen the main promise, trust, and risk-reversal story.
- FAQ is often where landing pages get bloated because unresolved topics from other sections get dumped here without hierarchy.
- The live section already has a useful shape: short answers, stable detail links, and a return CTA. The risk is not lack of structure, but lack of discipline.
- The right outcome here is a calmer clarification layer that resolves final objections quickly and routes users back to the correct section or to `final_cta`.

## Working Diagnosis

- The accordion structure is correct for the section's job, but the content can easily become too encyclopedic.
- Several questions are valid, but they span different categories:
  - enterprise fit
  - pilot duration and inputs
  - pilot output
  - vendor-lock and low-code differentiation
  - demo scope
  - what happens after submit
- The detail-link system is strong because it sends users to the right supporting section, but it must not become a crutch for unclear FAQ answers.
- The return CTA at the end is also correct, but it should feel like a calm next step after clarification, not a repeated sales push.
- This section should answer "what still blocks my decision?" and not reopen the entire landing narrative.
- Short answers and precise routing matter more here than volume.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/faqSection.ts`
7. `examples/next-app-router/src/components/aplai/scrollJourney.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `faq`.
- Do not change `section id`.
- Preserve the `faq` nav anchor id.
- Preserve `expandedFaqId` behavior.
- Preserve stable FAQ item ids.
- Preserve `detailsLabel` and `detailsTarget` link behavior where it is needed.
- Preserve the `FAQ_RETURN_POINT` route back to `final_cta`.
- Do not add new sections.
- Do not add decorative surfaces.
- Keep the section focused on clarification, not persuasion.
- Keep answers short before adding new questions.
- If a question is better answered by linking to another section, do that rather than bloating the answer itself.

---

## Prompt 1. Section Audit

```md
You are auditing only the `faq` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.

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
  - whether the current questions are the right questions
  - whether some answers are too long for accordion reading
  - whether some items duplicate nearby sections too directly
  - whether detail links are used well or compensate for weak answers
  - whether the return CTA feels properly secondary

### Keep Frozen
- Which ids, links, and state contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Question Priority Cleanup

```md
You are working only on the `faq` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.
Then use the result of Prompt 1 as required input.

Your task: decide which questions belong in FAQ, which are highest priority, and which should stay answerable via detail links instead of larger answers.

Respond strictly in this format:

### Core Section Question
- What one question the FAQ section must answer overall.

### Keep As High Priority
- Which current questions deserve early placement and why.

### Keep But Lower
- Which questions are valid but less important for first scan.

### Questions At Risk Of Duplication
- Which questions overlap too directly with:
  - `architecture`
  - `guarantees`
  - `demo`
  - `final_cta`
  - `not_low_code`

### What Must Stay Out
- Which topics should not expand inside FAQ.

### Recommended Ordering Logic
- Choose one organizing principle:
  - decision blockers first
  - pilot logistics first
  - trust blockers first

Explain why that ordering is correct for this FAQ.

Do not propose code.
Do not invent many new questions.
```

---

## Prompt 3. Answer Compression

```md
You are working only on the `faq` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the FAQ answers faster to scan without weakening their meaning.

Respond strictly in this format:

### Answer Model
- Define the ideal shape of one FAQ answer:
  - first sentence
  - supporting sentence
  - optional detail-link handoff

### Per-Question Compression Audit
- For each current FAQ item:
  - what is essential
  - what is repetitive
  - what belongs in the linked section instead

### What Must Stay Direct
- Which answers must remain explicit inside FAQ and not rely too much on routing away.

### What Should Be Shortened
- Which answers are currently too dense for accordion reading.

### Tone Guardrail
- What tone the answers should use to stay concise and trustworthy.

Do not propose code.
Do not turn answers into vague marketing language.
```

---

## Prompt 4. Detail Links And Return Path Hierarchy

```md
You are working only on the `faq` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: define the correct relationship between FAQ answers, detail-target links, accordion state, and the return CTA to `final_cta`.

Respond strictly in this format:

### Detail Link Role
- What `detailsLabel` and `detailsTarget` must do in this section.

### When To Link Out
- When an FAQ item should route to another section instead of expanding the answer further.

### When Not To Link Out
- When the answer must stand on its own.

### Return CTA Role
- What the `FAQ_RETURN_POINT` back to `final_cta` must do here.

### What Stays In First Scan
- Which FAQ-layer elements deserve first-level visibility.

### What Must Stay Supporting
- Which navigation aids must feel secondary.

### Recommended Order
- Exact order of:
  - section hint
  - FAQ items
  - detail links
  - return CTA

### Why This Order Works
- Explain why this order fits `faq` specifically.

Do not propose code.
Do not break stable question ids or detail targets.
Do not let the return CTA overpower the clarification function of the section.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `faq` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the FAQ should achieve after the redesign.

### Rewritten Content
- Section title
- Section subtitle
- Section hint
- FAQ items in final order:
  - id
  - question
  - answer
  - detailsLabel if needed
  - detailsTarget if needed
- Return CTA reason
- Return CTA label

### Keep But Demote
- Which content remains in the section but must feel quieter.

### Move Out Of First Scan
- Which content should no longer compete at first glance.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - the FAQ answers real blockers
  - answers stay short enough for accordion reading
  - detail links support instead of replacing clarity
  - stable ids and targets can be preserved
  - the return CTA stays secondary
  - the section does not duplicate `guarantees`, `architecture`, or `final_cta`

Do not propose code.
Prefer clarity and navigation usefulness over quantity.
Do not expand the FAQ just because many topics can technically be answered here.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `faq` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/17-faq.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `faq` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/faqSection.ts`
- `examples/next-app-router/src/components/aplai/scrollJourney.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="faq"`.
- Preserve the `faq` nav anchor id.
- Preserve `expandedFaqId` behavior.
- Preserve stable FAQ item ids.
- Preserve detail-link routing.
- Preserve the return CTA route to `final_cta`.
- Do not add new sections.
- Do not add decorative surfaces.
- If the problem can be solved through question order, answer length, and local hierarchy, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and structure.

### What Stayed Frozen
- Which ids, routing, and accordion contracts were preserved.

### Validation
- Confirm:
  - the FAQ answers clearer decision blockers
  - answers are easier to scan
  - stable ids are preserved
  - detail links still route correctly
  - the return CTA still routes to `final_cta`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX problem: FAQ bloat risk, not missing structure.
- Then they choose the right questions and ordering.
- Then they compress the answers.
- Then they place detail links and the return CTA in the correct hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
