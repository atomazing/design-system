# APLAI Architecture Prompt Pack

## Section Snapshot

- `SECTION_ID`: `architecture`
- `Section Type`: `standalone`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `Will this fit our stack?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/architectureSection.ts`
  - `examples/next-app-router/src/components/aplai/architectureDrawerContent.ts`
  - `examples/next-app-router/src/components/aplai/messageMap.ts`
  - `examples/next-app-router/src/components/aplai/microcopy.ts`
- `Frozen Shared Contracts`:
  - `selectedArchitectureNodeId`
  - `analytics click tracking`

## Why This Section Comes Next

- `architecture` is the first truly interactive section in the middle of the landing, so it needs a different prompt pack from the pure content sections.
- The section already has a useful interaction model: choose a zone, choose a node, read one consistent detail panel.
- Its main risk is not lack of information. It is interaction overload:
  - too many nodes
  - unclear first step
  - detail panel density
  - and support copy that can compete with the selection task
- The right outcome here is one clear fit-in-your-stack interaction model that feels explorable, trustworthy, and easy to parse.

## Working Diagnosis

- The section already does several things right:
  - one scene framing block
  - one selection task
  - one active node detail panel
  - one support block
- The core UX risk is that the section asks the user to understand the map and the drawer content at the same time.
- The helper hint is useful, but it must not become a wall of instruction text.
- The node groups are valuable, but the taxonomy can feel heavy before the user even clicks.
- The detail panel is strong, but it can easily become too dense because each node carries four content bands.
- The trust and support block at the bottom matters, but it must not compete with the active selection task.
- This section should answer "where does APLAI connect into our real delivery stack?" It should not become a full architecture document or a trust section in disguise.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/architectureSection.ts`
7. `examples/next-app-router/src/components/aplai/architectureDrawerContent.ts`
8. `examples/next-app-router/src/components/aplai/messageMap.ts`
9. `examples/next-app-router/src/components/aplai/microcopy.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `architecture`.
- Do not change `section id`.
- Preserve `selectedArchitectureNodeId`.
- Preserve analytics click tracking on architecture node selection.
- Preserve the one-selected-node interaction model unless a change is explicitly justified.
- Do not add new sections.
- Do not add decorative surfaces.
- Keep the section focused on fit and integration clarity.
- Do not turn this section into a static wall of enterprise proof.
- Do not turn this section into a deep technical document.
- If the problem can be solved by simplifying the selection logic and hierarchy, do that before adding more content.

---

## Prompt 1. Section Audit

```md
You are auditing only the `architecture` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.

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
  - whether the scene framing is clear enough
  - whether the selection task is obvious enough on first read
  - whether the group and node taxonomy feels too heavy
  - whether the detail panel is too dense
  - whether the bottom trust/support block competes too much
  - whether the section feels like a landing interaction or a mini internal doc

### Keep Frozen
- Which interactive and tracking contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Interaction Narrative Compression

```md
You are working only on the `architecture` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the section into one fit-and-integration narrative with one dominant interaction question.

Respond strictly in this format:

### Core Section Question
- What one question the section must answer.

### Main Architecture Thesis
- One main fit-in-your-stack claim the section should communicate.

### Supporting Logic
- What should support the claim without competing with it.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - scene summary nuance
  - helper hint detail
  - vendor-lock statement
  - support bullets
  - architecture hint

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `mechanism`
  - `trust_showcase`
  - `guarantees`
  - `demo`

### New Reading Formula
- Express the new logic as:
  - fit framing
  - pick a zone
  - inspect one node
  - understand required inputs and outcomes
  - credibility support

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium interaction cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Selection Model Cleanup

```md
You are working only on the `architecture` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: make the zone-and-node selection model easier to understand without breaking the current interactive contract.

Respond strictly in this format:

### Selection Task
- Describe the ideal user task in one sentence.

### Group Taxonomy Audit
- For the current architecture groups:
  - what is useful
  - what feels heavy
  - what may be too granular or too abstract

### Node Density Audit
- For the current node model:
  - what is essential
  - what may create decision fatigue
  - what can stay hidden until selected

### Helper Hint Role
- What the helper hint must do and how short it should feel.

### Recommended Selection Model
- Define the ideal interaction pattern:
  - what the user notices first
  - what the user selects second
  - what feedback confirms the active node

### Frozen Contract Check
- Confirm what must remain untouched about:
  - selected node state
  - node click tracking
  - current one-selected-node model

Do not propose code.
Do not replace the interaction with a static list.
Do not add a second competing interaction inside the section.
```

---

## Prompt 4. Detail Panel And Support Hierarchy

```md
You are working only on the `architecture` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how the active node detail panel, vendor-lock statement, trust line, support bullets, and architecture hint should support one clear interaction flow.

Respond strictly in this format:

### Detail Panel Role
- What the selected-node panel must do in this section.

### Content Band Roles
- For each band, explain its role:
  - `connect`
  - `outcome`
  - `why`
  - `fromYou`

### Support Block Role
- What the bottom trust/support block must do in this section.

### What Stays In First Scan
- Which elements deserve first-level visibility.

### What Becomes Supporting
- Which elements should move below the first scan layer.

### Recommended Order
- Exact order of:
  - scene framing
  - selection instructions
  - zone groups and nodes
  - active detail panel
  - bottom trust/support block

### Why This Order Works
- Explain why this order fits `architecture` specifically.

Do not propose code.
Do not let the detail panel become a mini documentation page.
Do not let the support block compete with the active interaction.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `architecture` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the architecture section should achieve after the redesign.

### Rewritten Content
- Section title
- Section lead
- Scene title
- Scene summary
- Vendor-lock statement treatment
- Selection title
- Helper hint
- Group label strategy
- Active node detail model:
  - title
  - summary
  - band ordering
  - optional badge usage
- Trust line
- Support bullets
- Architecture hint

### Keep But Demote
- Which content remains in the section but moves to supporting level.

### Move Out Of First Scan
- Which content should no longer compete in the first read.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - one fit-in-your-stack question only
  - selection task is clearer
  - detail panel is easier to parse
  - support copy does not overpower the interaction
  - the section does not become a trust block or a technical doc
  - interactive contracts can still be preserved

Do not propose code.
Prefer clarity and controllable exploration over content volume.
Do not expand the section just because there are many architecture nodes available.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `architecture` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/10-architecture.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `architecture` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/architectureSection.ts`
- `examples/next-app-router/src/components/aplai/architectureDrawerContent.ts`
- `examples/next-app-router/src/components/aplai/messageMap.ts`
- `examples/next-app-router/src/components/aplai/microcopy.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `id="architecture"`.
- Preserve `selectedArchitectureNodeId`.
- Preserve analytics click tracking for architecture node clicks.
- Preserve the one-selected-node interaction pattern unless the task explicitly requires a justified change.
- Do not add new sections.
- Do not add decorative surfaces.
- If the problem can be solved through content hierarchy and local interaction cleanup, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and interaction structure.

### What Stayed Frozen
- Which state and tracking contracts were preserved.

### Validation
- Confirm:
  - the section has one clearer fit-and-integration narrative
  - node selection is easier to understand
  - detail content is easier to parse
  - selected node state is preserved
  - analytics click tracking is preserved
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: interaction overload, not lack of content.
- Then they compress the section into one fit-in-your-stack narrative.
- Then they clean up the selection model.
- Then they place the detail panel and support content in the correct hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
