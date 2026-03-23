# Landing Template Rules

These rules define the visual and layout baseline for future landing-style work
built from `examples/next-app-router`.

Read `../AGENTS.md` first for local ownership rules.
Use `agents/README.md` as the execution and verification companion.

## Core Layout Rules

1. The home landing opens directly on `/`.
2. Each landing section carries one primary focus only.
3. Focused landing sections use exact viewport height, not flexible growth:
   - `height: calc(100svh - var(--starter-header-height))`
   - do not use `minHeight` for the primary guided sections
4. Section content must fit inside that height on standard desktop screens.
5. Default validation target for the first section is `1366x768`.
6. If a section does not fit, reduce content density. Do not let the section grow.

## Header Rules

1. The header may stay sticky, but it must not compete with the hero.
2. The real header height must be written into `--starter-header-height`.
3. Use a runtime measurement such as `ResizeObserver`; do not rely only on a hardcoded guess.
4. Header navigation should help route movement, not turn the page into a dashboard.

## Scroll Rules

1. Scrolling stays natural with wheel, trackpad, or touch.
2. Do not force snap scrolling or automatic page jumps.
3. Full-screen sections are allowed, but the user controls the scroll progression.

## Content Rules

1. Keep the hero compact:
   - one headline
   - one short subheadline
   - one primary CTA
   - one proof surface or live preview
2. Avoid stacking multiple explanatory blocks in the first section.
3. If copy repeats the same idea across multiple blocks, remove repetition.
4. Every section should answer one question only:
   - what is this
   - why it matters
   - what to do next
5. If content is too tall, cut text before reducing section-height discipline.
6. Remove self-referential template copy from visible UI:
   - do not describe the landing in terms of internal structure or section sequencing
   - do not add filler guidance about scrolling unless the interaction would otherwise be unclear
   - do not count sections in visible copy unless the count is critical to the task
7. Prefer product-facing labels over template-facing labels:
   - good: `Presets`, `Theme`, `State`, `Showcase`, `Static output`
   - bad: labels that narrate progress, section order, or internal template mechanics
8. Copy should help the user choose, understand value, or act next.
9. Copy should not narrate the information architecture back to the user.
10. Do not place information too densely inside a single block:
   - keep breathing room between labels, controls, swatches, and summary text
   - avoid stacking many micro-elements that all compete at the same visual priority
   - if a card starts feeling crowded, remove secondary content before tightening spacing
11. A preview card should read in one glance, not as a mini-dashboard that needs parsing.
12. Use available space harmoniously:
   - do not leave large dead zones inside major hero or preview surfaces
   - do not fill extra space with low-value filler copy or decorative noise
   - if a block feels too empty, improve hierarchy, scale, and composition before adding more text
   - large surfaces should feel intentional, balanced, and easy to scan at a glance

## Theme Rules

1. Landing examples use `landingPageThemes`, not `defaultThemes`.
2. Page background must come from the active preset.
3. Do not hardcode page-level background fills or gradients on landing sections when the preset should own them.
4. Surface styling may be customized, but it should still read as a product of the active preset.
5. Do not implement preset-owned surface styling inside the app layer:
   - no app-owned glow, halo, bloom, decorative border, glass treatment, blur, gradient wash, or pseudo-element chrome on landing panels
   - the visual character of `Paper`, `Card`, and other surfaces must come from the active preset through MUI theme overrides
   - app components may control layout, sizing, spacing, and content flow, but not replace preset-owned surface styling
6. If a landing surface needs a distinct visual treatment, add it to the preset or theme override layer first instead of inventing local `sx` styling in the app.
7. Header logo and hero wordmark should adapt through the active MUI theme rather than through a separate hardcoded brand palette.
8. Keep one canonical brand mark across the example:
   - the app icon, header logo, and hero wordmark should represent the same sign system
   - do not introduce unrelated alternate marks for individual sections
   - reuse shared logo or wordmark components instead of rebuilding the mark inline
9. Prefer standard MUI components for visible preview composition:
   - `Paper`
   - `Stack`
   - `Typography`
   - `Chip`
   - `Avatar`
   - other normal MUI display primitives when they fit the task
10. Do not build hero preview surfaces out of custom decorative shapes or ad hoc visual tricks when a simple MUI composition can express the same idea.

## Visual Consistency Rules

1. The hero proof block should use the same visual grammar as the rest of the focused sections.
2. Right-side preview cards should be concise, spacious, and should not become a second long-form column.
3. The first section must feel like a landing hero, not an admin dashboard.
4. Use page-by-page storytelling, not dense block grids competing for attention.
5. Do not create nested surface hierarchies that read like `block inside block inside block`.
6. Apply that rule across the project, not only in the hero:
   - one logical block should have one primary rectangular surface
   - internal structure should use layout or content primitives before adding another surface
7. For hero preview cards and similar blocks, keep one primary outer surface and use lightweight MUI content composition inside it.
8. Prefer `Stack`, `List`, `Divider`, `Typography`, `Chip`, and `Avatar` over nested `Card`, `Paper`, or outlined rectangular `Box` surfaces.
9. Avoid self-invented geometry when the goal is simply to preview theme tokens.
10. When a block has generous width or height, use that room to create a clearer hierarchy, not to introduce clutter or leave awkward empty gaps.
11. Keep typography restrained and easy to read:
   - do not use more than three distinct font families on a single page
   - prefer one primary reading family and, only if needed, one accent or monospace companion
   - do not mix multiple display styles just to create visual variety
   - if typography starts feeling noisy, remove variation before adding more weight, size, or decoration

## Typography Rules

1. Use no more than two typographic roles inside one compact surface:
   - one heading role
   - one supporting copy role
2. Prefer semantic starter variants over mixed MUI defaults:
   - major headings: `h1`, `h2`, `h3`
   - panel headings: `h5`, `h6`
   - body copy: `body1`, `body2`
   - quiet labels and metadata: `caption`
   - compact action labels: `button`, `subtitle2`
3. Avoid `overline` as the primary hierarchy system for landing content.
4. When a support block reads as one thought, render it as one paragraph instead of several stacked text fragments.
5. If a section feels noisy, reduce the number of text roles before changing sizing or weight.
6. Visible text in interactive MUI controls should use `Typography component="span"` so action labels stay consistent with the rest of the starter.

## Section Budget Rules

1. One section equals one user question.
2. One section gets one primary focal point.
3. One section gets one primary surface.
4. One supporting block is allowed, but it must not become a second main card.
5. Desktop layouts should use no more than two columns.
6. Mobile layouts should collapse to one column and preserve reading order.
7. If content no longer fits, reduce content before changing the height contract.

## Content Budget Rules

1. A focused section should contain:
   - one headline
   - one supporting paragraph
   - one primary CTA
   - one supporting proof block at most
2. Avoid a second paragraph unless the section is intentionally restructured.
3. If a section cannot be understood in one quick scan, it is over budget.

## Text Budget Rules

1. Hero headline: one short thesis.
2. Hero subheadline: one supporting thought.
3. Eyebrow: one to two words.
4. CTA label: one to four words.
5. Proof panel: one key statement plus one supporting paragraph.
6. Avoid long list-like content in landing sections unless the section is explicitly restructured.

## CTA Rules

1. Use one primary CTA per section by default.
2. A secondary CTA is allowed only if it is truly alternative, not duplicate.
3. Every CTA must align with the section's purpose.
4. Do not create equal-strength CTA competition inside one cluster.
5. If a CTA is not needed to move the user forward, remove it.

## Proof Block Rules

1. The proof block supports the section's core message.
2. The proof block must not start a second narrative.
3. The proof block must remain visually quieter than the main heading.
4. The proof block should not contain its own complex sub-hierarchy.
5. Multiple short support lines that express one idea should be rendered as one paragraph.

## Responsive Priority Rules

1. On mobile, content must stack in this priority:
   - headline
   - supporting copy
   - CTA
   - proof
2. Do not use hidden overflow to force fit.
3. Sticky header behavior must not compromise first-screen readability.
4. If mobile fit breaks, reduce copy density before changing section structure.

## Spacing Rules

1. Use spacing to reinforce hierarchy, not random visual separation.
2. If a block feels crowded, remove elements before shrinking gaps.
3. If a block feels empty, improve hierarchy before adding filler.
4. Large empty zones must feel intentional, not accidental.
5. Keep spacing rhythm consistent inside and across sections.

## AI Layout Optimization Rules

1. Do not add new sections unless explicitly requested.
2. Do not change route structure unless explicitly requested.
3. Do not add extra surface layers.
4. Do not increase CTA count by default.
5. Do not increase typographic-role count in a block.
6. Optimize in this order:
   - reduce content
   - merge support text
   - simplify hierarchy
   - then adjust layout

## Success Criteria

1. The first screen reads in one glance.
2. Each section's main point is clear immediately.
3. The proof block supports but does not dominate.
4. Typography feels coherent.
5. The layout feels product-like, not like a demo stack.
6. The page remains stable across theme changes.

## Verification Rules

1. Keep an e2e assertion that the first section fits within the viewport.
2. Keep `lint`, `build`, and the example Playwright suite green after landing changes.
3. When changing hero density, verify both:
   - the section bottom stays within the viewport
   - the section content does not overflow its own height
4. Keep regression checks against the return of banned meta-copy on the landing entry route.
