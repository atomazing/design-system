# Release Status

This file captures the current release setup and the exact point where work
stopped, so the next session can resume without rediscovering context.

## Current State

- Changesets is installed and configured.
- A GitHub Actions release workflow exists in `.github/workflows/release.yml`.
- Dependabot is configured in `.github/dependabot.yml`.
- Release usage is documented in `RELEASING.md`.
- Local release checks are green via `pnpm run release:verify`.

## Current Blocker

Automatic release PR creation is blocked by GitHub repository or organization
permissions.

The workflow needs these GitHub settings:

- `Workflow permissions` -> `Read and write permissions`
- `Allow GitHub Actions to create and approve pull requests`

Those settings cannot currently be changed because the organization owner is not
available.

## Temporary Path Forward

Use Changesets in manual mode until the owner can enable the required GitHub
Actions permissions.

### Manual release flow

1. Make code changes.
2. Run `pnpm changeset`.
3. Commit the generated `.changeset/*.md` file with the feature work.
4. Merge the feature PR into `master`.
5. On a clean local checkout of `master`, run `pnpm run version-packages`.
6. Run `pnpm run release:verify`.
7. Commit the version bumps with `chore(release): version packages`.
8. Publish with `pnpm run release`.

## When Owner Access Becomes Available

Enable the GitHub settings listed above, then configure npm Trusted Publishing
for:

- organization or user: `atomazing`
- repository: `design-system`
- workflow file: `release.yml`

After that, the intended automated flow becomes:

1. `pnpm changeset`
2. merge into `master`
3. workflow opens a release PR
4. merge the release PR
5. package publishes to npm

## Files To Check First

- `package.json`
- `.changeset/config.json`
- `.github/workflows/release.yml`
- `.github/dependabot.yml`
- `RELEASING.md`

## Notes

- No pending `.changeset/*.md` file exists in the working tree right now.
- The next feature or fix PR must add a real changeset before expecting the
  release workflow to open a release PR.
- The current automation is prepared, but full PR automation is not usable until
  GitHub permissions are unlocked.
