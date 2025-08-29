#!/usr/bin/env bash
set -euo pipefail
mkdir -p tmp
{
  echo "== v6 usage =="; rg -n "useNavigate|createBrowserRouter|<Routes" src || true
  echo "== Router v5 signals =="; rg -n "<IonReactRouter|<IonRouterOutlet|<Switch|<Route|<Redirect" src || true
  echo "== Overlays =="; rg -n "<IonModal|<IonActionSheet|<IonPopover" src || true
  echo "== Ionic-first div heuristic =="; rg -n "<div class=.*ion-" src || true
  echo "== Lists/perf heuristics =="; rg -n "map\\(.*\\)\\s*=>" src/pages src/components | head -n 50
  echo "== Infinite/virtualization =="; rg -n "IonInfiniteScroll|react-window|react-virtual|useInfiniteQuery" src || true
  echo "== A11y =="; rg -n "<IonButton(?![^>]*aria-label)" src || true
  echo "== Tests =="; rg -n "@testing-library/react" src test || true; rg -n "cy\\.|describe\\(" cypress || true
} > tmp/review_scans.txt
echo "Wrote tmp/review_scans.txt"