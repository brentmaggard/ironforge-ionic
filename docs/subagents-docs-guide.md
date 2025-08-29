# Ionic 8 + React — Sub‑Agents & Docs Maintenance Guide (Claude Code in VS Code)

This guide shows how to: 1) set up Claude Code **sub‑agents** that are aware of your `/docs` structure, and 2) keep `CLAUDE.md` small and up‑to‑date automatically.

---

## 0) Prereqs
- VS Code + **Claude Code** extension (signed in).
- Your project opened at the repo root.
- (Optional) `ripgrep` installed for quick scans (`rg`).

---

## 1) Make sub‑agents “docs‑aware” (one‑time)

### 1.1 Add this **DOC AWARENESS** snippet to every sub‑agent prompt body
Paste at the end of each sub‑agent’s Markdown file in `.claude/agents/` (or via `/agents → Edit`):

```
DOC AWARENESS
- Before acting, READ: CLAUDE.md, /docs/README.md, and topic docs that match the task
  (routing.md, state-query.md, testing.md, pwa.md, ui-patterns.md, native-capacitor.md, docs/features/*, docs/adr/*).
- Treat these docs as source of truth. If the requested change conflicts with them, call it out and propose doc updates.
- Always include a "DOC-IMPACT" section in your output listing which docs to add/update.
```

### 1.2 Ensure each sub‑agent has the right **tools** in its YAML front‑matter
- Planner: `tools: Read, Grep, Glob`
- Feature Builder: `tools: Read, Edit, Write, Grep, Glob, Bash`
- Router Sentinel: `tools: Read, Grep, Glob`
- State & Data Architect: `tools: Read, Write, Edit, Grep, Glob`
- Testing Engineer: `tools: Read, Write, Edit, Bash`

### 1.3 Create the **Docs Concierge** sub‑agent (recommended)
Create `.claude/agents/ionic-docs-concierge.md`:

```md
---
name: ionic-docs-concierge
description: Keep CLAUDE.md tiny; move detail into /docs and maintain ToC/ADRs. Use proactively after code changes.
tools: Read, Write, Edit
---
ROLE: Docs Concierge.

Given a "DOC-IMPACT" list (or a diff), do this:
1) Create/update the right /docs/*.md (routing, state-query, testing, pwa, ui-patterns, native-capacitor, features/*, adr/*).
2) Keep CLAUDE.md as an index: ≤600 lines, short summaries + links.
3) Update /docs/README.md ToC.
Return a diff preview, then WRITE files on approval.
```

---

## 2) Standard chain to run (ensures docs are touched every time)

1. **Planner** → Feature Card  
2. **Feature Builder** → code + **DOC‑IMPACT**  
3. *(If routes changed)* **Router Sentinel** → **PASS** required  
4. *(If server/forms)* **State & Data Architect** → hooks/keys + **DOC‑IMPACT**  
5. **Testing Engineer** → tests + **DOC‑IMPACT**  
6. **Docs Concierge** → apply all **DOC‑IMPACT** updates; keep `CLAUDE.md` ≤ 600 lines; update `/docs/README.md` ToC

**Ask Builder/Architect/Tester to always include this block:**

```
DOC-IMPACT
- docs/features/<feature>.md (new): overview, UX, state shape, testing notes
- CLAUDE.md: add 3-line summary with link
- docs/ui-patterns.md: note Ionic-first replacement for <div> shells
```

---

## 3) Ready prompts you can paste in Claude Code

### 3.1 Feature build (single message chain)
```
Use ionic-planner on: “<your feature>”.
Then ionic-feature-builder to implement. Include a DOC-IMPACT list.
If routing changed, run ionic-router-sentinel and require PASS.
If server/forms, run ionic-state-data-architect; include DOC-IMPACT.
Run ionic-testing-engineer; include DOC-IMPACT.
Finally, run ionic-docs-concierge to apply all DOC-IMPACT updates and keep CLAUDE.md ≤600 lines.
```

### 3.2 After merging a PR
```
Use ionic-docs-concierge.
Input: the merged diff (or list of changed files).
Task: reconcile docs with code; update any feature docs + ADRs; append a ≤150-word “Recent updates” entry in CLAUDE.md with links. Then WRITE files.
```

### 3.3 Weekly hygiene
```
Use ionic-docs-concierge.
Audit /docs vs current repo: list missing feature docs, stale sections, and ADR gaps.
Propose fixes + DOC-IMPACT and be ready to WRITE files.
```

---

## 4) Keep `CLAUDE.md` small and useful

### 4.1 Role of `CLAUDE.md`
- **Front door** only: short overview, stack, page map, and links to `/docs/*`.
- **Line budget**: ≤ 600 lines.

### 4.2 Suggested `/docs` layout
```
/docs
  README.md                  # ToC
  architecture.md
  routing.md                 # IonReactRouter + Router v5 patterns
  state-query.md             # TanStack keys, defaults, invalidation
  testing.md                 # Vitest/RTL + Cypress + MSW
  pwa.md                     # VitePWA, caching, update flow
  ui-patterns.md             # Ionic-first rules, overlays, skeletons
  native-capacitor.md
  /features/<feature>.md
  /adr/0001-router-v5.md, 0002-pwa-caching.md, ...
```

### 4.3 Pre‑commit size guard (if not already added)
Create `.githooks/pre-commit`:
```bash
#!/usr/bin/env bash
MAX=600
[ -f CLAUDE.md ] || exit 0
LINES=$(wc -l < CLAUDE.md | tr -d ' ')
if [ "$LINES" -gt "$MAX" ]; then
  echo "CLAUDE.md too large ($LINES). Move details into /docs." >&2
  exit 1
fi
```
Enable:
```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

---

## 5) Docs discipline via PR & hook guards

### 5.1 PR template
`.github/pull_request_template.md`
```md
### Summary
<what changed>

### Checklists
- [ ] Router v5 + IonReactRouter (no v6 APIs)
- [ ] Tests updated (Vitest/RTL, + Cypress if UX flow changed)
- [ ] **Docs updated**:
  - [ ] DOC-IMPACT included in this PR description
  - [ ] /docs/* files added/updated
  - [ ] CLAUDE.md summary + link (≤600 lines)

### Links
- Docs: <docs/...>
- ADR(s): <docs/adr/...>
```

### 5.2 Pre‑push docs guard
`.githooks/pre-push`
```bash
#!/usr/bin/env bash
set -euo pipefail
CHANGED=$(git diff --cached --name-only || true)
TOUCHES_CODE=$(echo "$CHANGED" | grep -E '^src/|^vite\.config|^public/manifest|^capacitor\.config' || true)
TOUCHES_DOCS=$(echo "$CHANGED" | grep -E '^docs/|^CLAUDE\.md' || true)
if [ -n "$TOUCHES_CODE" ] && [ -z "$TOUCHES_DOCS" ]; then
  echo "Docs guard: Code changed but no docs updated. Add DOC-IMPACT + update /docs and CLAUDE.md." >&2
  exit 1
fi
```
Enable:
```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-push
```

---

## 6) Repo review helper (optional)

`scripts/review_scans.sh` (collects routing/UI/a11y/test signals):
```bash
#!/usr/bin/env bash
set -euo pipefail
mkdir -p tmp
{
  echo "== v6 usage =="; rg -n "useNavigate|createBrowserRouter|<Routes" src || true
  echo "== Router v5 signals =="; rg -n "<IonReactRouter|<IonRouterOutlet|<Switch|<Route|<Redirect" src || true
  echo "== Overlays =="; rg -n "<IonModal|<IonActionSheet|<IonPopover" src || true
  echo "== Ionic-first div heuristic =="; rg -n "<div class=.*ion-" src || true
  echo "== Lists/perf heuristics =="; rg -n "map\(.*\)\s*=>" src/pages src/components | head -n 50
  echo "== Infinite/virtualization =="; rg -n "IonInfiniteScroll|react-window|react-virtual|useInfiniteQuery" src || true
  echo "== A11y =="; rg -n "<IonButton(?![^>]*aria-label)" src || true
  echo "== Tests =="; rg -n "@testing-library/react" src test || true; rg -n "cy\.|describe\(" cypress || true
} > tmp/review_scans.txt
echo "Wrote tmp/review_scans.txt"
```

---

## 7) Sanity checks (to know it’s working)
- Builder/Architect/Tester outputs always include a **DOC‑IMPACT** list.
- Every code PR touches `/docs` or explains why not.
- `CLAUDE.md` remains an index (≤ 600 lines) with links to `/docs`.
- `/docs/README.md` ToC shows latest feature docs.
- ADRs exist for big decisions (Router v5, PWA caching, persistence, etc.).

---

*Keep this file in your repo (e.g., `/docs/subagents-docs-guide.md`) and share it with collaborators so the behavior is consistent across machines.*
