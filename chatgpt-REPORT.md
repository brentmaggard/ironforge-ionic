# REPORT.md — Ionic 8 + React Audit

## 1) Summary
- Phase A (Routing): **No P0 violations found**. No `Routes`, `useNavigate`, or `BrowserRouter` usage detected. `IonReactRouter/IonRouterOutlet` present in the codebase.
- Phase B (UI & A11y): Found **27 unlabeled IonButton(s)** containing `IonIcon`. No raw `<div>` scaffolding flagged.
- Phase C (Perf & Tests): No long lists without skeleton/virtualization were flagged. **Vitest** and **Cypress** scripts detected in `package.json`.

## 2) Findings (file:line + 5–10 line code frame)
### [P2] Unlabeled IonButton with IonIcon — `src/components/RestTimer.tsx:116`
```
111 |     <IonCard className="rest-timer-overlay">
112 |       <IonCardContent className="rest-timer-container">
113 |         <IonGrid>
114 |           <IonRow className="ion-align-items-center">
115 |             <IonCol size="auto">
116 |               <IonButton
117 |                 fill="clear"
118 |                 className="rest-timer-reset"
119 |                 onClick={handleReset}
120 |               >
121 |                 <IonIcon icon={refresh} />
```
### [P2] Unlabeled IonButton with IonIcon — `src/components/RestTimer.tsx:134`
```
129 |                 </h1>
130 |               </IonLabel>
131 |             </IonCol>
132 |             
133 |             <IonCol size="auto">
134 |               <IonButton
135 |                 fill="clear"
136 |                 className="rest-timer-control"
137 |                 onClick={handlePauseResume}
138 |               >
139 |                 <IonIcon icon={isPaused ? play : pause} />
```
### [P2] Unlabeled IonButton with IonIcon — `src/components/GlobalHeader.tsx:74`
```
 69 |               transform: 'rotate(-35deg)' 
 70 |             }} 
 71 |           />
 72 |         </IonButtons>
 73 |         <IonTitle>IronForge</IonTitle>
 74 |         <IonButtons slot="end">
 75 |           <IonButton id="menu-trigger" onClick={() => setIsMenuOpen(true)}>
 76 |             <IonIcon icon={menuOutline} />
 77 |           </IonButton>
 78 |           <IonPopover
 79 |             trigger="menu-trigger"
```
### [P2] Unlabeled IonButton with IonIcon — `src/components/ExerciseCard.tsx:105`
```
100 |               >
101 |                 {set.weight} <IonText className="unit-text">lbs</IonText>
102 |               </IonButton>
103 |             </IonCol>
104 |             <IonCol size="2">
105 |               <IonButton
106 |                 fill="clear"
107 |                 className="set-menu-btn"
108 |                 onClick={(e) => handleSetMenu(e, setIndex)}
109 |                 aria-label={`More options for set ${setIndex + 1}`}
110 |               >
```
### [P2] Unlabeled IonButton with IonIcon — `src/components/AddExercise.tsx:275`
```
270 | 
271 |   return (
272 |     <IonPage className="add-exercise-overlay">
273 |       <IonHeader className="add-exercise-header-bar">
274 |         <IonToolbar className="add-exercise-toolbar">
275 |           <IonButtons slot="start">
276 |             <IonButton onClick={onClose} className="back-button" fill="clear">
277 |               <IonIcon icon={arrowBack} />
278 |             </IonButton>
279 |           </IonButtons>
280 |           <IonTitle className="add-exercise-title">Add Exercise</IonTitle>
```
### [P2] Unlabeled IonButton with IonIcon — `src/components/AddExercise.tsx:281`
```
276 |             <IonButton onClick={onClose} className="back-button" fill="clear">
277 |               <IonIcon icon={arrowBack} />
278 |             </IonButton>
279 |           </IonButtons>
280 |           <IonTitle className="add-exercise-title">Add Exercise</IonTitle>
281 |           <IonButtons slot="end">
282 |             <IonButton 
283 |               onClick={onClose} 
284 |               className="close-button" 
285 |               fill="clear"
286 |             >
```

## 3) Exact fixes (minimal unified diffs)
```diff
--- a/src/components/RestTimer.tsx
+++ b/src/components/RestTimer.tsx
@@
-<IonButton
            fill="clear"
            className="rest-timer-reset"
            onClick={handleReset}
          >
            <IonIcon icon={refresh} />
          </IonButton>
+<IonButton aria-label="More options"
            fill="clear"
            className="rest-timer-reset"
            onClick={handleReset}
          >
            <IonIcon aria-hidden="true" icon={refresh} />
          </IonButton>

--- a/src/components/GlobalHeader.tsx
+++ b/src/components/GlobalHeader.tsx
@@
-<IonButtons slot="end">
      <IonButton id="menu-trigger" onClick={() => setIsMenuOpen(true)}>
        <IonIcon icon={menuOutline} />
      </IonButton>
+<IonButton aria-label="More options"s slot="end">
      <IonButton id="menu-trigger" onClick={() => setIsMenuOpen(true)}>
        <IonIcon aria-hidden="true" icon={menuOutline} />
      </IonButton>

--- a/src/components/ExerciseCard.tsx
+++ b/src/components/ExerciseCard.tsx
@@
-<IonButton
            fill="clear"
            className="set-menu-btn"
            onClick={(e) => handleSetMenu(e, setIndex)}
            aria-label={`More options for set ${setIndex + 1}`}
          >
            <IonIcon icon={ellipsisVertical} aria-hidden="true" />
          </IonButton>
+<IonButton aria-label="More options"
            fill="clear"
            className="set-menu-btn"
            onClick={(e) => handleSetMenu(e, setIndex)}
            aria-label={`More options for set ${setIndex + 1}`}
          >
            <IonIcon aria-hidden="true" icon={ellipsisVertical} aria-hidden="true" />
          </IonButton>

--- a/src/components/AddExercise.tsx
+++ b/src/components/AddExercise.tsx
@@
-<IonButtons slot="start">
        <IonButton onClick={onClose} className="back-button" fill="clear">
          <IonIcon icon={arrowBack} />
        </IonButton>
+<IonButton aria-label="More options"s slot="start">
        <IonButton onClick={onClose} className="back-button" fill="clear">
          <IonIcon aria-hidden="true" icon={arrowBack} />
        </IonButton>

--- a/src/pages/ExerciseDetails.tsx
+++ b/src/pages/ExerciseDetails.tsx
@@
-<IonButtons slot="start">
          <IonButton onClick={handleClose} className="close-button" fill="clear">
            <IonIcon icon={close} className="close-button-icon" />
          </IonButton>
+<IonButton aria-label="More options"s slot="start">
          <IonButton onClick={handleClose} className="close-button" fill="clear">
            <IonIcon aria-hidden="true" icon={close} className="close-button-icon" />
          </IonButton>

```

## 4) Priority Summary
- **P0**: 0
- **P1**: 0
- **P2**: 27

## Searches Used
**A) Routing**
- v6_leaks: `\b(Routes|useNavigate|createBrowserRouter|createRoutesFromElements|RouterProvider)\b|element\s*=`
- browser_router: `\bBrowserRouter\b`
- ion_router_pair: `\b(IonReactRouter|IonRouterOutlet)\b`

**B) UI & A11y**
- raw_div_scaffold: `<div\s+className=[\"'](page|header|content|toolbar|title)[\"']`
- unlabeled_ionbutton_with_icon: `<IonButton([^>]*?)>([\s\S]{0,200}?)</IonButton>`

**C) Perf & Tests**
- map_ionitem: `map\s*\([^)]*=>[\s\S]{0,120}IonItem`
- infinite_or_virtual: `IonInfiniteScroll|IonVirtualScroll|IonSkeletonText`

## Tests & Tooling
- `package.json`: `package.json`
- Vitest present: **True**
- Cypress present: **True**
<details><summary>package.json (scripts/devDependencies/dependencies)</summary>

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test.e2e": "cypress run",
    "test.unit": "vitest",
    "lint": "eslint"
  },
  "devDependencies": {
    "@testing-library/dom": ">=7.21.4",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^16.2.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/react": "19.0.10",
    "@types/react-dom": "19.0.4",
    "@vitejs/plugin-legacy": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.1",
    "cypress": "^13.5.0",
    "eslint": "^9.20.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^15.15.0",
    "jsdom": "^22.1.0",
    "terser": "^5.4.0",
    "typescript": "^5.1.6",
    "typescript-eslint": "^8.24.0",
    "vite": "^5.4.19",
    "vite-plugin-pwa": "^1.0.3",
    "vitest": "^0.34.6"
  },
  "dependencies": {
    "@ionic/react": "^8.5.0",
    "@ionic/react-router": "^8.5.0",
    "@types/react-router": "^5.1.20",
    "@types/react-router-dom": "^5.3.3",
    "ionicons": "^7.4.0",
    "react": "19.0.0",
    "react-circular-progressbar": "^2.2.0",
    "react-dom": "19.0.0",
    "react-router": "^5.3.4",
    "react-router-dom": "^5.3.4",
    "swiper": "^11.2.10"
  }
}
```
</details>