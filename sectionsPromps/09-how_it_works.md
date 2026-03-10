# APLAI How It Works Prompt Pack

## Section Snapshot

- `SECTION_ID`: `how_it_works`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `How does it work step by step?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/howItWorksSection.ts`
  - `examples/next-app-router/src/components/aplai/pipelineUx.ts`
  - `examples/next-app-router/src/components/aplai/copyPack.ts`
- `Frozen Shared Contracts`:
  - `nav anchor id`
  - `scrollToSection("demo")`

## Why This Section Comes After Mechanism

- `mechanism` explains why the system works; `how_it_works` then translates that logic into a concrete sequence a visitor can follow.
- The live section is already structurally clean, so it is a strong isolated candidate for the new prompt system.
- Its main UX risk is not layout failure. It is drift:
  - becoming too dense for a step flow
  - becoming too proof-heavy
  - becoming too close to `demo`
  - or becoming too detailed for this stage of the story
- The right outcome here is one readable, believable step-by-step flow that connects naturally to the demo section.

## Working Diagnosis

- The current section already has a good skeleton:
  - skeptic line
  - short subtitle
  - four pipeline steps
  - footnote
  - bridge CTA
- The skeptic line is useful because it frames speed as repeatability, not hype.
- The steps are useful, but the section sits on a boundary:
  - too little detail and it feels hand-wavy
  - too much detail and it becomes implementation-heavy
- Time chips and trust layers support the flow, but they must not overpower the step titles and summaries.
- The footnote is useful for concreteness, but it should stay secondary to the main step sequence.
- This section should answer "what path does one scenario go through?" It should not become a technical deep dive or a live demo substitute.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/howItWorksSection.ts`
7. `examples/next-app-router/src/components/aplai/pipelineUx.ts`
8. `examples/next-app-router/src/components/aplai/copyPack.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `how_it_works`.
- Do not change `section id`.
- Preserve the `how_it_works` nav anchor id.
- Preserve `scrollToSection("demo")`.
- Do not add new sections.
- Do not increase CTA count.
- Do not add decorative surfaces.
- Keep the section focused on a step-by-step flow.
- Do not turn this section into a second `mechanism` section.
- Do not turn this section into a second `demo` section.
- If the problem can be solved by tightening step hierarchy and copy density, do that before adding more structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `how_it_works` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.

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
  - whether the skeptic line and subtitle are too repetitive
  - whether the step sequence is easy to follow
  - whether time chips and trust layers compete too much
  - whether the footnote sits at the correct hierarchy level
  - whether the section overlaps too much with `mechanism`
  - whether the bridge to `demo` feels natural

### Keep Frozen
- Which contracts and transitions must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Step Narrative Compression

```md
You are working only on the `how_it_works` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one step-by-step narrative with one dominant thesis.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Flow Thesis
- One main explanation the section should communicate.

### Supporting Logic
- What should support the thesis without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - skeptic line nuance
  - trustLayer labels
  - footnote detail
  - bridge CTA

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `mechanism`
  - `architecture`
  - `demo`
  - `final_cta`

### New Reading Formula
- Express the new logic as:
  - repeatable flow claim
  - ordered steps
  - concrete timing cue
  - credibility footnote
  - demo bridge

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Step Hierarchy Cleanup

```md
You are working only on the `how_it_works` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the steps faster to scan and more clearly sequential without turning them into shallow slogans.

Respond strictly in this format:

### Step Audit
- For each current step:
  - what is essential
  - what is repetitive
  - what is too detailed for this layer

### Step Relationship
- Explain whether the steps should feel:
  - strictly sequential
  - mostly sequential with one outcome step

### What Stays In Step Form
- Which ideas deserve explicit step-level treatment.

### What Becomes Supporting
- Which details should move below the first scan layer.

### Recommended Step Shape
- Define the ideal structure of one step:
  - number role
  - time role
  - title role
  - summary role
  - trustLayer role

### Duplication Check
- Which ideas repeat across steps and should stop repeating.

Do not propose code.
Do not turn the steps into vague labels.
Do not let trust metadata dominate the step sequence.
```

---

## Prompt 4. Skeptic Line, Footnote, And Demo Bridge Hierarchy

```md
You are working only on the `how_it_works` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the skeptic line, subtitle, footnote, and demo bridge should support the step flow without diluting it.

Respond strictly in this format:

### Skeptic Line Role
- What the skeptic line must do in this section.

### Subtitle Role
- What the subtitle must do in this section.

### Footnote Role
- What the footnote must do in this section.

### Bridge Role
- What `scrollToSection("demo")` must do here.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - skeptic line
  - subtitle
  - steps
  - footnote
  - bridge CTA

### Why This Order Works
- Explain why this order fits `how_it_works` specifically.

Do not propose code.
Do not let the footnote become a second explanatory block.
Do not let the demo CTA feel like the main event.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `how_it_works` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the how-it-works section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Skeptic line
- Subtitle
- Step 1:
  - id
  - title
  - time
  - summary
  - trustLayer if needed
- Step 2:
  - id
  - title
  - time
  - summary
  - trustLayer if needed
- Step 3:
  - id
  - title
  - time
  - summary
  - trustLayer if needed
- Step 4:
  - id
  - title
  - time
  - summary
  - trustLayer if needed
- Footnote
- Bridge CTA label

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete on the first screen of the section.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one repeatable flow thesis only
  - steps are clearly sequential
  - metadata supports rather than competes
  - the section does not duplicate `mechanism`
  - the section does not become `demo`
  - the bridge clearly routes toward `demo`

Do not propose code.
Prefer clarity, flow, and credibility over extra explanation.
Do not expand the section just because more pipeline detail exists in the source files.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `how_it_works` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/09-how_it_works.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `how_it_works` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/howItWorksSection.ts`
- `examples/next-app-router/src/components/aplai/pipelineUx.ts`
- `examples/next-app-router/src/components/aplai/copyPack.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="how_it_works"`.
- Preserve the `how_it_works` nav anchor id.
- Preserve `scrollToSection("demo")`.
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
  - the section has one clearer step narrative
  - steps are easier to scan
  - bridge CTA still routes to `demo`
  - the nav anchor remains stable
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: step-flow drift, not missing layout.
- Then they compress the section into one repeatable flow narrative.
- Then they clean up the step hierarchy.
- Then they place the skeptic line, footnote, and demo bridge in the correct order.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
