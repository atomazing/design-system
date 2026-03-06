# Content Map

## Where Content Lives

- `src/content/starterFlow.ts`: navigation labels and section copy model.
- `src/components/home/GuidedStarterFlow.tsx`: landing hero copy and final CTA copy.
- `src/components/home/LandingHeroPreview.tsx`: live proof copy for the hero panel.
- `src/components/home/LandingEditorialPanel.tsx`: shared proof surface structure.
- `src/app/**/page.tsx`: route-specific headings and descriptions through `FocusedPageHeader`.
- `src/components/theme/ThemeSnapshotCard.tsx`: diagnostics labels.
- `src/components/ui/StarterWordmark.tsx`: visible brand text.
- `src/app/layout.tsx`: metadata copy.

## Copy Rules

- Keep copy concise.
- Use product-facing labels.
- Do not narrate the layout, sections, or route progression back to the user.
- Do not restore removed archive naming or business-specific language.

## Typography Rules

- One block should usually have one accent text role and one supporting text role.
- Prefer `header_*` variants for headings and `text_*` variants for body, labels, and metadata.
- Do not mix `header_*` variants with a separate ad hoc set of `h*`, `caption`, `subtitle*`, and `overline` styles inside the same block.
- If multiple short support lines express one idea, combine them into one paragraph.
- For visible text inside `Button`, `ToggleButton`, `MenuItem`, `Chip`, and `Alert`, wrap the label in `Typography component="span"`.

## Content Slot Contract

- Every new string must be assigned a role before insertion:
  - headline
  - supporting paragraph
  - CTA
  - proof
  - metadata
- Do not insert content without a defined slot.
- If content does not fit an existing slot, the section needs restructuring, not overflow.
- Content should adapt to the layout contract, not silently rewrite it.

## Text Budget By Slot

- Headline: one main claim.
- Supporting paragraph: one coherent explanatory thought.
- CTA: one action phrase.
- Proof: one supporting thesis plus one support paragraph.
- Quiet labels: short and functional.
- If multiple lines express one supporting idea, combine them.
