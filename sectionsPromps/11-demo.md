# APLAI Demo Prompt Pack

## Section Snapshot

- `SECTION_ID`: `demo`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `What do you actually show on the demo?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/demoAnchor.ts`
  - `examples/next-app-router/src/components/aplai/demoNarrative.ts`
  - `examples/next-app-router/src/components/aplai/messageMap.ts`
- `Frozen Shared Contracts`:
  - `nav anchor id`
  - `handlePrimaryCta(sectionId)`
  - `scrollToSection("final_cta")`

## Why This Section Comes Next

- `demo` is where the page must stop talking in abstractions and show one believable preview of the actual walkthrough.
- The live section is useful, but it carries several narratives at once:
  - demo promise
  - anchor scenario
  - timed stage flow
  - post-demo takeaways
  - conversion routing
- That makes it a medium-isolation section: structurally independent enough to redesign, but still coupled to shared CTA behavior and nav anchor stability.
- The right outcome here is one clear answer to "what will I see in 10-15 minutes?" with one dominant demo story and clean CTA hierarchy.

## Working Diagnosis

- The section currently mixes at least five layers of meaning:
  - promise cards
  - anchor scenario framing
  - timed demo stages
  - what remains after the demo
  - dual CTA routing
- The promise cards are useful, but they can compete with the stage flow instead of preparing the visitor for it.
- The anchor scenario is valuable because it grounds the demo, but it can start a second reading path next to the timeline.
- The stage flow is likely the real core of the section, but it currently shares equal weight with several other blocks.
- The result block and takeaways are useful, but together they risk duplicating each other.
- This section should answer "what exactly will you show me and what will I leave with?" It should not become a second roadmap or a second final CTA.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/demoAnchor.ts`
7. `examples/next-app-router/src/components/aplai/demoNarrative.ts`
8. `examples/next-app-router/src/components/aplai/messageMap.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `demo`.
- Do not change `section id`.
- Preserve the `demo` nav anchor id.
- Preserve `handlePrimaryCta("demo")`.
- Preserve `scrollToSection("final_cta")`.
- Do not add new sections.
- Do not increase CTA path count.
- Do not add decorative surfaces.
- Keep the section focused on one concrete demo walkthrough.
- Do not turn this section into a second `how_it_works` section.
- Do not turn this section into a second `final_cta` section.
- If the problem can be solved by tightening hierarchy and reducing first-level density, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `demo` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.

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
  - whether promise cards compete too much with the actual demo flow
  - whether the anchor scenario creates a second reading path
  - whether the stage list is clearly the main event
  - whether result items and takeaways duplicate each other
  - whether the two CTA exits compete too directly

### Keep Frozen
- Which contracts and routes must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Demo Narrative Compression

```md
You are working only on the `demo` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one demo-preview narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Demo Thesis
- One main expectation the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - promise cards
  - anchor scenario reasons
  - stage metadata
  - result block
  - takeaways
  - secondary CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `how_it_works`
  - `final_cta`
  - `roadmap`
  - `trust_showcase`

### New Reading Formula
- Express the new logic as:
  - demo promise
  - anchor scenario
  - live walkthrough flow
  - post-demo outcome
  - CTA transition

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Flow And Anchor Scenario Cleanup

```md
You are working only on the `demo` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: define the correct relationship between the anchor scenario block and the timed demo stages.

Respond strictly in this format:

### Anchor Scenario Role
- What the anchor scenario must do in this section.

### Stage Flow Role
- What the timed demo stages must do in this section.

### Which Is Primary
- State whether the section should read primarily through:
  - anchor scenario first
  - stage flow first
  - a tightly coupled pair with one dominant side

### What Must Stay Concrete
- Which parts of the demo must remain concrete and non-generic.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Duplication Check
- Which ideas repeat across:
  - promise cards
  - anchor bullets
  - stage flow
  - result/takeaway blocks

Do not propose code.
Do not let the anchor scenario become a second section inside the section.
Do not turn the stages into generic time labels without a clear story.
```

---

## Prompt 4. CTA And Outcome Hierarchy

```md
You are working only on the `demo` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how promise cards, result items, takeaways, and CTA exits should support one demo narrative without competing at equal weight.

Respond strictly in this format:

### Promise Card Role
- What the promise cards must do in this section.

### Result Block Role
- What the result block must do in this section.

### Takeaway Role
- What the takeaways must do in this section.

### Primary CTA Role
- What `handlePrimaryCta("demo")` must do here.

### Secondary CTA Role
- What `scrollToSection("final_cta")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - promise cards
  - anchor scenario
  - stage flow
  - result/takeaway block
  - primary CTA
  - secondary CTA

### Why This Order Works
- Explain why this order fits `demo` specifically.

Do not propose code.
Do not let CTA routing overpower the demo preview.
Do not let result and takeaway blocks duplicate each other at equal weight.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `demo` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the demo section should achieve after the redesign.

### Rewritten Content
- Section title
- Section body
- Promise cards treatment
- Anchor scenario block:
  - badge
  - title
  - core points
- Demo stages in final order:
  - id
  - title
  - time
  - summary
- Post-demo outcome block
- Primary CTA label
- Secondary CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one demo-preview thesis only
  - the stage flow is clearly legible
  - the anchor scenario supports instead of competes
  - result/takeaway content is not duplicative
  - the section does not become `how_it_works` or `final_cta`
  - both CTA routes can still be preserved

Do not propose code.
Prefer concreteness and reading order over volume.
Do not expand the section just because the source data contains many valid demo details.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `demo` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/11-demo.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `demo` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/demoAnchor.ts`
- `examples/next-app-router/src/components/aplai/demoNarrative.ts`
- `examples/next-app-router/src/components/aplai/messageMap.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="demo"`.
- Preserve the `demo` nav anchor id.
- Preserve `handlePrimaryCta("demo")`.
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
  - the section has one clearer demo-preview narrative
  - the stage flow is easier to scan
  - the anchor scenario still supports the story
  - primary CTA still uses `handlePrimaryCta("demo")`
  - secondary CTA still routes to `final_cta`
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: demo density and competing reading paths.
- Then they compress the section into one demo-preview narrative.
- Then they clean up the relationship between anchor scenario and stage flow.
- Then they place results and CTA in the correct hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
