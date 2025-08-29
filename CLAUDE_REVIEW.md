# Ionic 8 React Review Rubric

## Guardrails
- Ionic 8.x + React + Vite
- **React Router v5 only** with IonReactRouter + IonRouterOutlet
- Use **Switch/Route/Redirect** and **useHistory** (❌ v6: Routes, useNavigate, createBrowserRouter)
- Prefer **Ionic components** over raw <div>
- Details as **overlays** (IonModal/ActionSheet/Popover) when appropriate
- Hardware back via IonBackButton; preserve tab stacks
- A11y: labeled controls, semantic roles

## Flag these
- Any v6 router API usage or missing IonReactRouter/IonRouterOutlet
- Raw divs where Ionic primitives exist
- Full-page routes used where a modal overlay is better
- Long lists without virtualization/skeletons; heavy DOM in IonContent
- A11y misses; weak/missing tests

## Output
Write **REPORT.md** with:
1) Summary
2) Findings (file:line + 5–10 line code frame)
3) Exact fix (unified diff or patch)
4) Priority: P0/P1/P2