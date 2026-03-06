# Next.js App Router Starter

This example is the canonical internal Next.js App Router starter for
`@atomazing-org/design-system`.

## Start Here

- `AGENTS.md`: local AI and process rules
- `docs/README.md`: index of the starter docs pack
- `docs/landing-template-rules.md`: visual and layout contract

## Run Locally

From `examples/next-app-router`:

```bash
pnpm install
pnpm run dev
pnpm run lint
pnpm run build
pnpm run test:e2e
```

If Playwright browsers are missing:

```bash
pnpm exec playwright install --with-deps
```

## Customize

- Brand: `docs/customization/brand-system.md`
- Themes: `docs/customization/theme-policy.md`
- Content: `docs/customization/content-map.md`
- Routes: `docs/customization/route-map.md`
- Full edit map: `docs/customization/change-map.md`

## Deploy And Verify

- Deploy artifact: `dist/`
- Runbook: `docs/ops/runbook.md`
- Deploy notes: `docs/ops/deploy.md`
- Verification rules: `docs/agents/verification.md`
- Release checklist: `docs/ops/verification-checklist.md`
