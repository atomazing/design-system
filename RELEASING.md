# Releasing

This repository uses Changesets for versioning and a GitHub Actions workflow for
release PR creation and npm publishing.

## First-Time Setup

Complete these one-time checks before expecting the first automated publish to work.

1. In GitHub repository settings, open `Settings -> Actions -> General`.
2. Set workflow permissions to `Read and write permissions`.
3. Enable `Allow GitHub Actions to create and approve pull requests`.
4. In npm package settings for `@atomazing-org/design-system`, add a trusted
   publisher for:
   - repository: `atomazing/design-system`
   - workflow file: `.github/workflows/release.yml`
   - branch: `master`
5. Merge one normal PR that contains a real changeset file and confirm that the
   release workflow opens a release PR.

## Normal Release Flow

1. Make your code changes.
2. Run `pnpm changeset`.
3. Select the package `@atomazing-org/design-system`.
4. Choose `patch`, `minor`, or `major`.
5. Write a short release note in plain language.
6. Commit the generated `.changeset/*.md` file with the feature work.
7. Merge the PR into `master`.
8. Wait for the release workflow to open or update the release PR.
9. Merge the release PR to publish to npm.

## Example Changeset File

Do not commit this example verbatim. Create your own file in `.changeset/`.

```md
---
"@atomazing-org/design-system": patch
---

Add `settingsStorageKey` support to `ThemeProviderWrapper`.
```

## Useful Commands

- `pnpm changeset`: create a changeset interactively
- `pnpm run version-packages`: apply pending changesets locally
- `pnpm run release:verify`: run the release quality gates locally
- `pnpm run release`: publish packages from the current branch

## Notes

- The automated release workflow runs only on `master`.
- Publishing is configured for npm Trusted Publishing via GitHub Actions OIDC.
- If there is no pending `.changeset/*.md` file in the working tree, the
  workflow will stay idle until the next feature or fix PR adds one.
- If npm trusted publishing is not configured yet, the release workflow can still
  open the release PR, but the publish step will not authenticate successfully.
