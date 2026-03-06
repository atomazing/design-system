# Starter Runbook

Use this workflow from `examples/next-app-router`.

1. Run `pnpm install`.
2. Run `pnpm run dev`.
3. `predev` runs `pnpm --dir ../.. build` first and clears `.next`.
4. Run `pnpm run lint`.
5. Run `pnpm run build`.
6. `prebuild` runs `pnpm --dir ../.. build` first.
7. The static export is written to `dist/`.
8. Run `pnpm run test:e2e`.
9. If browsers are missing, run `pnpm exec playwright install --with-deps` once.

## Notes

- The example depends on a fresh root library build because it consumes the local package output.
- `pnpm run start` serves the exported static build from `dist/`.
