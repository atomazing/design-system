# examples/repro

This app is the design-system debug lab. Use it to validate theme switching, dark mode, surfaces, and persistence.

## Commands
- Dev: `pnpm -C examples/repro dev`
- Build: `pnpm -C examples/repro build`

## What to look at
- Theme Controls panel:
  - Scenario (presets/custom/mixed)
  - Theme selection
  - Dark mode selection (`light`, `dark`, `system`)
  - Reset + corrupt storage buttons
- Theme Snapshot panel:
  - selected theme name
  - raw darkMode setting
  - effective `palette.mode`
  - key tokens: background.default, background.paper, text.primary, divider
  - appSettings payload (sanitized)
- Preview Surface + Surface Gallery:
  - typography variants
  - Paper/Card/Dialog/Menu/Popover/Drawer surfaces

## Smoke checklist
- Load the app and confirm the default theme name is shown.
- Switch theme across presets while staying in dark mode:
  - surface backgrounds remain mode-correct
  - debug panel values update
- Toggle dark mode and verify:
  - page background changes
  - card/paper backgrounds change
  - token values update
- Reload the page:
  - theme selection is preserved
  - dark mode selection is preserved
- Reset to defaults:
  - storage key `appSettings` cleared
  - defaults re-apply without errors
