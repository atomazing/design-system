# APLAI Footer Prompt Pack

## Section Snapshot

- `SECTION_ID`: `footer`
- `Section Type`: `shell`
- `Isolation`: `Medium`
- `Parent`: `page`
- `Primary Question`: `What utility links and contact points close the page?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/footerSection.ts`
  - `examples/next-app-router/src/components/aplai/copyPack.ts`
- `Frozen Shared Contracts`:
  - `footerNavigationItems`
  - `anchor ids`
  - `contact tracking`

## Why This Section Comes After Roadmap

- Footer is the true closing shell of the landing, so it makes sense to handle it after the core narrative and conversion sections are already cleaner.
- This section is not about persuasion anymore. It is about utility, calm closure, and safe navigation.
- The live footer already has a workable shape, but it can easily drift into duplication if the summary, links, and contact area all try to sell at once.
- The right outcome here is a quiet closing utility block that preserves anchor routing and contact tracking without becoming another CTA section.

## Working Diagnosis

- The current footer structure is solid:
  - brand label
  - short summary
  - section navigation
  - contact link
  - legal note
  - copyright
- The main risk is not missing information, but misplaced emphasis.
- The summary is useful, but it should not read like a second hero.
- The navigation area is useful, but it depends directly on stable anchor ids through `footerNavigationItems`.
- The contact area is correct, but it should remain utility-level and not compete with `final_cta`.
- The legal note matters for credibility, but it should stay quiet and compact.
- This section should answer "where can I go next and how can I contact you?" It should not reopen the main landing story.

## Common Preflight For Every Prompt In This File

Before executing any prompt, load and use these files in this order:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/footerSection.ts`
7. `examples/next-app-router/src/components/aplai/copyPack.ts`

Mandatory constraints for all prompts in this file:

- Work only inside section `footer`.
- Treat it as a `shell` section, not a standalone value or CTA section.
- Preserve `footerNavigationItems`.
- Preserve stable anchor ids, or explicitly update footer navigation and related checks in the same change.
- Preserve contact tracking behavior.
- Do not add new sections.
- Do not add decorative surfaces.
- Keep the footer focused on utility, contact, and quiet closure.
- Do not turn the footer summary into a second hero or second final CTA.
- If a problem can be solved by reducing emphasis or shortening copy, do that before adding structure.

---

## Prompt 1. Section Audit

```md
You are auditing only the `footer` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.

Your task: perform a strict UX audit of the current section without proposing code.

Respond strictly in this format:

### Section
- SECTION_ID:
- Type:
- Isolation:
- Frozen Contracts:

### Function
- One sentence: what single job this section should perform at the end of the page.

### 3-5 Second Takeaway
- What the visitor should understand in 3-5 seconds.

### Current Strengths
- What already works and should be preserved.

### Current Problems
- Only specific UX issues:
  - whether the summary is too promotional for a footer
  - whether navigation and contact are weighted correctly
  - whether legal text sits in the right hierarchy
  - whether the footer competes with `final_cta`
  - whether the utility role is clear enough

### Keep Frozen
- Which routing and tracking contracts must not be broken.

### Risk Of Over-Editing
- What would be dangerous to simplify too aggressively.

Do not propose code.
Do not rewrite content.
Do not propose a final structure yet.
```

---

## Prompt 2. Utility Role Compression

```md
You are working only on the `footer` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.
Then use the result of Prompt 1 as required input.

Your task: compress the footer into one utility role with one quiet closing message.

Respond strictly in this format:

### Core Section Question
- What one question the footer must answer.

### Main Footer Role
- One sentence describing the footer's primary job.

### Quiet Closing Message
- What the summary should communicate without reopening the landing narrative.

### What Moves Down The Hierarchy
- Which elements must stop competing at top level:
  - summary copy
  - navigation label
  - contact link
  - legal note

### What Must Not Enter This Section
- Which topics belong more to neighboring sections:
  - `hero`
  - `trust_showcase`
  - `final_cta`
  - `faq`

### New Reading Formula
- Express the new logic as:
  - quiet brand/context cue
  - navigation utility
  - contact utility
  - legal closure

### Edit Severity
- Choose one:
  - light hierarchy fix
  - medium density cleanup
  - heavy restructuring

Explain the choice in 3-5 sentences.
Do not propose code.
```

---

## Prompt 3. Navigation Contract Audit

```md
You are working only on the `footer` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.
Then use the results of Prompt 1 and Prompt 2.

Your task: define the correct role and presentation of footer navigation without breaking the shared anchor contract.

Respond strictly in this format:

### Navigation Role
- What `footerNavigationItems` must do in this section.

### Navigation Weight
- How prominent footer navigation should feel relative to the summary and contact area.

### Anchor Contract Check
- What must remain stable about anchor ids and why.

### If Anchor Changes Are Needed
- State the mandatory rule for handling footer navigation and checks in the same change.

### What Must Stay In Footer Nav
- Which navigation destinations make sense here.

### What Must Not Happen
- Which footer-nav behaviors would weaken the section.

Do not propose code.
Do not change anchors casually.
Do not turn footer navigation into a second header nav.
```

---

## Prompt 4. Contact And Legal Hierarchy

```md
You are working only on the `footer` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.
Then use the results of Prompt 1, 2, and 3.

Your task: decide how contact links, legal text, and copyright should support a calm closeout without competing with the main conversion flow.

Respond strictly in this format:

### Contact Role
- What the footer contact link must do here.

### Contact Tracking Role
- What must remain true about contact tracking.

### Legal Role
- What the legal note must do here.

### Copyright Role
- What the copyright line must do here.

### What Stays In First Scan
- Which footer elements deserve first-level visibility.

### What Becomes Supporting
- Which footer elements should stay quieter.

### Recommended Order
- Exact order of:
  - summary
  - navigation
  - contact
  - legal note
  - copyright

### Why This Order Works
- Explain why this order fits `footer` specifically.

Do not propose code.
Do not let footer contact compete with `final_cta`.
Do not let legal text dominate the closeout.
```

---

## Prompt 5. Final Content Rewrite

```md
You are working only on the `footer` section in the APLAI landing page.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.
Then use the results of Prompt 1, 2, 3, and 4.

Your task: prepare the final rewritten version of the section as a content and UX output before code.

Respond strictly in this format:

### Final Section Goal
- One paragraph describing what the footer should achieve after the redesign.

### Rewritten Content
- Brand label
- Summary
- Navigation label
- Navigation destinations
- Contact label
- Contact link label
- Legal note
- Copyright

### Keep But Demote
- Which content remains in the footer but must feel quieter.

### Move Out Of First Scan
- Which content should no longer compete at first glance.

### Mobile Order
- Exact order of content blocks on mobile.

### Quality Check
- Verify:
  - the footer stays utility-first
  - navigation remains useful and quiet
  - contact stays available without competing with `final_cta`
  - legal text stays secondary
  - anchor and tracking contracts can be preserved

Do not propose code.
Prefer utility and calm closure over persuasion.
Do not expand the footer just because more brand or legal copy could fit there.
```

---

## Prompt 6. Implementation Prompt

```md
You are working only on the `footer` section in the APLAI landing page and must implement the change in code.

First execute the Common Preflight from `sectionsPromps/20-footer.md`.
Then use the result of Prompt 5 as the content source of truth.

Your task: implement the redesign of `footer` with minimal necessary code changes.

Required files for work:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/footerSection.ts`
- `examples/next-app-router/src/components/aplai/copyPack.ts`

Do not touch unrelated sections unless directly required.

Hard constraints:

- Preserve `footerNavigationItems`.
- Preserve anchor ids, or update footer navigation and related checks in the same change.
- Preserve contact tracking behavior.
- Do not add new sections.
- Do not add decorative surfaces.
- Keep the footer as a shell closeout, not a new narrative section.
- If the problem can be solved through content hierarchy and local structure, do not perform a heavier refactor.

After changes, respond strictly in this format:

### Changed Files
- Which files were actually changed.

### What Changed
- What changed in content and structure.

### What Stayed Frozen
- Which anchor and tracking contracts were preserved.

### Validation
- Confirm:
  - the footer is more utility-focused
  - navigation still routes correctly
  - contact tracking still works
  - legal text remains present but quieter
  - mobile order is preserved
  - no extra surfaces were introduced

### Residual Risk
- What may still need a second pass but should not block this change.
```

---

## Expected Outcome Of This File

- First the prompts isolate the real UX risk: footer emphasis drift, not missing content.
- Then they compress the section into one utility closeout role.
- Then they protect the navigation contract.
- Then they place contact and legal text in the correct hierarchy.
- Then they create a final rewritten content version.
- Only after that do they move into implementation.
