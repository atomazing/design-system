# tools/prompts/start-session.md â€” Start Session Prompt (Helper, Non-Canonical)

This file is a **helper prompt** to start a new AI agent session quickly.
It is **non-canonical**: it must not introduce new rules.
If anything here conflicts with canonical rules, follow `docs/agents/*`.

---

## Copy-Paste Prompt (for a new agent session)

You are an engineering agent working in this repository.

**Hard rules:**
- Canonical process rules live in `docs/agents/*`. If any conflict exists, follow canonical docs.
- Phases must not stop by default. Manual QA is **non-blocking by default**.
- Verification is mandatory for any phase completion: at least `pnpm lint` and `pnpm build`.
- Do not invent commands. Run only commands listed in `docs/agents/repo-commands.md`.
- Do not duplicate policy text. Link to canonical docs instead.

### Step 0 — Load canonical docs (fast)
Read, in this order:
1) `docs/agents/README.md`
2) `docs/agents/source-of-truth.md`
3) `docs/agents/delivery-loop.md`
4) `docs/agents/verification.md`
5) `docs/agents/manual-qa-policy.md`
6) `docs/agents/decisions-and-debt.md`
7) `docs/agents/phase-closeout-checklist.md`
8) `docs/agents/repo-commands.md`
9) `docs/agents/style.md`

Use templates:
- `docs/agents/templates/phase.md`
- `docs/agents/templates/progress-entry.md`
- (optional) `docs/agents/templates/progress.md`

### Step 1 — Select the active feature (deterministic)
- If `backlog/ACTIVE.md` exists and is not `none`, use that slug as `<feature>`.
- Otherwise pick the first non-archive folder under `backlog/`.

### Step 2 — Select the next phase (deterministic)
- Open `backlog/<feature>/PROGRESS.<feature>.md`.
- Choose the **first** phase with status `Not Started`.
- Open its phase file `backlog/<feature>/phase-XX-*.md`.

### Step 3 — Execute continuously (no waiting)
- Mark the phase `In Progress` in PROGRESS.
- Execute the phase plan in order with minimal, scoped changes.
- Store evidence under `backlog/<feature>/reports/` and link it.
- Run verification:
  - `pnpm lint`
  - `pnpm build`
  - plus any conditional checks required by `docs/agents/verification.md`
- Manual QA:
  - Do minimal smoke relevant to the change.
  - Defer deep QA as **Deferred (non-blocking)** unless it meets rare blocker criteria.

### Step 4 — Close out and move on
- Follow `docs/agents/phase-closeout-checklist.md`.
- Mark the phase `Done` in PROGRESS.
- Immediately continue to the next `Not Started` phase.

### Reporting requirement
After completing a phase, provide a short report:
- Summary of changes (2–6 bullets)
- Files changed (paths)
- Verification results
- Manual QA status + evidence links
- Decisions/debt updated or explicitly “None”

---

## Notes (for maintainers)

- Keep this helper prompt short and link-oriented.
- Do not copy canonical policy text here; link to it.
- If canonical docs change, update links and reading order here accordingly.

---

**End of helper prompt.**
