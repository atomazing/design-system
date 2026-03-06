# Deploy

- The deployment artifact is `dist/`.
- The starter is designed for static hosting.
- Theme finalization still happens on the client after hydration when the mode is `system`.
- `/ssr` is a static diagnostics artifact, not runtime SSR.
- Set `NEXT_PUBLIC_SITE_URL` when deployment metadata needs a canonical site URL.
