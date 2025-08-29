# ADR-0001: React Router v5 and Tab Navigation Approach

**Status**: Accepted  
**Date**: 2025-08-29  
**Decision Makers**: Development Team  

## Context

IronForge required a routing solution that could handle both tab-based navigation for the main app flow and modal overlays for secondary pages while maintaining Ionic 8 compatibility.

## Decision

Use React Router v5 with a hybrid navigation approach:

### Routing & Navigation Architecture
- **Ionic React Router**: ^8.5.0
- **React Router**: ^5.3.4  
- **React Router DOM**: ^5.3.4

### Implementation Approach
- Tab-based navigation for core app functionality (Dashboard, Progress, Workout)
- Modal overlay pattern for secondary pages (Profile, Exercise Library, Exercise Details)
- Custom TabNavigation component with action sheet integration
- Dashboard header menu for accessing modal pages

### Route Structure
```typescript
// Current flat structure
/dashboard (default)
/progress  
/workout
/profile (modal)
/exercise (modal)
/edit-profile (modal)
/workout-builder (modal)
```

## Alternatives Considered

1. **Standard Ionic Tab Structure** (`/tabs/*` pattern)
   - Rejected: Conflicts with custom header requirements
   - Would require significant architectural changes

2. **Full Modal-Based Navigation**
   - Rejected: Too complex for main app flow
   - Tab navigation provides better user experience

3. **React Router v6**
   - Rejected: Ionic 8 compatibility concerns
   - v5 provides stable, tested integration

## Consequences

### Positive
- Flexible navigation supporting both tabs and modals
- Custom header capabilities for specialized pages
- Preserved bottom tab navigation accessibility
- Compatible with Ionic 8 and React 19

### Negative  
- Deviates from standard Ionic tab patterns
- Custom event handling required
- Potential maintenance overhead
- Architecture complexity

## Future Considerations

Based on ADR-0002 Ionic Standards Review, this approach should be revisited to align with Ionic best practices:
- Convert to `/tabs/*` route structure
- Replace custom TabNavigation with native IonTabBar
- Migrate modal pages to proper IonModal components

## Status

**Under Review** - ADR-0002 identifies this as non-standard and recommends migration to Ionic best practices.