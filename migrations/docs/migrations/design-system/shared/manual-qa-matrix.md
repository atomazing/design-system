# Manual QA Matrix

Use this matrix after automated gates pass.

Skip rows that are clearly out of scope for the target app, but do not skip a row
just because build and lint are green.

## Startup And Runtime

- Open the first route and confirm there are no startup console errors.
- Confirm any migration-caused warnings were removed, not just recorded.
- If the app uses non-Latin text, verify at least one real localized route renders readable copy.

## Shell And Layout

- Desktop:
  - sidebar or navigation stays in its intended column
  - content stays inside the visible workspace
  - routed page roots fill the content pane
- Mobile:
  - stacked shell still behaves correctly
  - scroll containers and navigation still feel normal

## Theme And Preset Ownership

- Verify the active preset still owns the page background.
- Verify root shells and page wrappers do not paint a competing page-level background.
- If the app exposes multiple presets or theme switching, verify the selection still works from the intended app theme module.

## Protected Routes

- Verify at least one protected route as real product content, not a fallback page.
- If smoke mode or QA mode bypasses auth redirect, verify the seeded user still has the required roles.

## Overlays

- Dialogs, drawers, and bottom sheets:
  - open correctly
  - expose the expected title and description
  - have labeled close actions
- Search overlays:
  - keyboard filtering still works
  - combobox or listbox semantics still match the behavior

## Dashboards And Dense Screens

- Metric cards:
  - labels are visually quieter than values
  - values remain the primary reading target
  - helper text does not compete with the metric
- Dashboard grids:
  - cards align on desktop as intended
  - no accidental full-width spans appear
  - gap rhythm is consistent
- Compact legends, badges, and segmented filters:
  - still look preset-aligned
  - do not drift into app-local chip chrome

## Forms And Workflow Screens

- Shared workflow layouts still align correctly across the related pages.
- Inputs, labels, helper text, and errors still render through the intended MUI or Typography contract.
- Clear buttons, adornments, drawers, and form overlays still behave correctly after primitive cleanup.

## Build And Asset Hygiene

- If the app uses PWA or Workbox, verify referenced static assets actually exist in the emitted app.
- If build output still warns, confirm whether the warning is:
  - consumer-owned and must be fixed
  - or upstream-only and should be recorded precisely
