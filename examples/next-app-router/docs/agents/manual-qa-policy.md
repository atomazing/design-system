# Manual QA Policy

Run this smoke pass after meaningful starter changes.

## Viewport Checks

- At `1366x768`, the first section on `/` fits inside the viewport.
- No route overflows its intended section height on `/`, `/presets`, `/debug/theme`,
  `/debug/state`, `/showcase`, or `/ssr`.

## Behavior Checks

- Preset switching works on `/debug/theme`.
- Dark mode selection persists after reload.
- The page background visibly follows the active preset.
- `/start` redirects to `/`.
- `/ssr` keeps the same timestamp across reload until the next build.

## Content Checks

- No template-meta copy appears in visible UI.
- No panels become cramped or unreadable.
- The icon, header, hero brand, and metadata still read as one brand system.

## Layout Quality Checks

- Each section has one obvious focal point.
- No section contains competing primary actions.
- Proof blocks remain visually secondary.
- No compact surface uses more than two obvious typographic roles.
- No section feels like a dashboard or mini-dashboard.
- Mobile stack preserves the intended narrative order.
- The first screen still reads in one scan pass.
