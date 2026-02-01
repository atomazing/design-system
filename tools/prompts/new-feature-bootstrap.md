# tools/prompts/new-feature-bootstrap.md â€” New Feature Bootstrap Prompt (Helper, Non-Canonical)

This file is a **helper prompt** to bootstrap a new feature (initiative) in this repository.
It is **non-canonical**: it must not introduce new rules.
If anything here conflicts with canonical rules, follow `docs/agents/*`.

---

## Copy-Paste Prompt (bootstrap a new feature)

You are an engineering agent. Bootstrap a new feature initiative in this repo using the canonical process.

### Hard rules
- Canonical rules live in `docs/agents/*` and override this helper.
- Do not invent commands; use only `docs/agents/repo-commands.md`.
- Use templates from `docs/agents/templates/*`.
- Manual QA is non-blocking by default; phases must not stop by default.

---

## Step 0 — Read canonical docs (fast)
Read in order:
1) `docs/agents/README.md`
2) `docs/agents/source-of-truth.md`
3) `docs/agents/delivery-loop.md`
4) `docs/agents/verification.md`
5) `docs/agents/manual-qa-policy.md`
6) `docs/agents/decisions-and-debt.md`
7) `docs/agents/phase-closeout-checklist.md`
8) `docs/agents/repo-commands.md`
9) `docs/agents/style.md`

---

## Step 1 — Choose a feature slug (deterministic, stable)

Define `<feature>` slug:
- lowercase
- `kebab-case`
- descriptive but short (e.g., `mindmap-mvp`, `billing-portal`, `rtl-polish`)

Do not rename the slug after creation unless a migration is explicitly performed.

---

## Step 2 — Create backlog execution skeleton

Create folder structure:

- `backlog/<feature>/`
- `backlog/<feature>/reports/`

Create PROGRESS using template:
- `backlog/<feature>/PROGRESS.<feature>.md`
  - use: `docs/agents/templates/progress.md`

Create the initial phase:
- `backlog/<feature>/phase-01-bootstrap.md`
  - use: `docs/agents/templates/phase.md`

### What Phase 01 should contain (recommended)
Goal: establish a “ready-to-execute” baseline.

Include in `phase-01-bootstrap.md`:
- a short goal statement
- a plan to:
  - ensure repo builds and lints (`pnpm lint`, `pnpm build`)
  - create/confirm the backlog folder and reports folder
  - create feature docs (feature summary, decisions file, debt file)
  - define the first real delivery phase (phase-02) if possible
- acceptance criteria to confirm:
  - files exist
  - verification is recorded
  - PROGRESS entry is created and consistent

---

## Step 3 — Create feature-level documents (single-file approach)

Create:
1) `docs/features/<feature>.md`
   - use the template: `docs/features/<feature>.md` (template file you maintain)

2) `docs/decisions/<feature>.md`
   - use the template: `docs/decisions/<feature>.md` (high-impact only)

3) `docs/debt/<feature>.md`
   - initialize with a header and “None recorded yet” (or an empty debt section)
   - debt definition: `docs/debt/README.md`

Keep these files short. Link to backlog/PROGRESS.

---

## Step 4 — Activate the feature (optional)

If you want this feature to be the active initiative:
- set `backlog/ACTIVE.md` to contain exactly:
  - `<feature>`

If you do not want to activate it yet:
- leave `ACTIVE.md` unchanged.

---

## Step 5 — Add the feature to the PROGRESS phase index

In `backlog/<feature>/PROGRESS.<feature>.md`:
- add the phase list index entries:
  - Phase 01 → `phase-01-bootstrap.md`
  - (optional) Phase 02 → `phase-02-<slug>.md` if you created it

Then add the Phase 01 progress entry using:
- `docs/agents/templates/progress-entry.md`

---

## Step 6 — Verification and evidence (Phase 01)

For Phase 01, perform mandatory verification:
- `pnpm lint`
- `pnpm build`

Record outcomes in:
- `phase-01-bootstrap.md` (verification section)
- `PROGRESS.<feature>.md` (verification fields)

Store any logs under:
- `backlog/<feature>/reports/phase-01-build-log.txt` (if needed)

Manual QA:
- Phase 01 typically does not require manual QA unless it changes UI.
- If UI is touched, do minimal smoke and record it. Otherwise mark “Not required”.

---

## Step 7 — Close out Phase 01 and prepare Phase 02

- Follow: `docs/agents/phase-closeout-checklist.md`
- Mark Phase 01 as `Done` in PROGRESS
- Create Phase 02:
  - `backlog/<feature>/phase-02-<slug>.md`
  - using `docs/agents/templates/phase.md`
- Ensure Phase 02 has a small, verifiable goal.

---

## Output requirements (report back)

After bootstrapping, report:
- created file list (paths)
- which feature was activated (ACTIVE.md value)
- Phase 01 verification results (`pnpm lint`, `pnpm build`)
- links to new docs:
  - `docs/features/<feature>.md`
  - `docs/decisions/<feature>.md`
  - `docs/debt/<feature>.md`
  - `backlog/<feature>/PROGRESS.<feature>.md`
  - `backlog/<feature>/phase-01-bootstrap.md`

---

## Maintainer notes

- This is a helper prompt. Keep it link-oriented.
- Do not paste canonical rules here; link to them.
- If canonical docs or templates change, update the referenced paths.

---

**End of bootstrap helper prompt.**
