# IronForge - Ionic React Fitness App

## Project Overview
IronForge is a comprehensive fitness tracking application built with Ionic 8 and React. The app provides users with workout tracking, progress monitoring, and goal management capabilities in a modern, mobile-first interface.

## Tech Stack & Versions

- **Ionic**: ^8.5.0 with React 19.0.0 and TypeScript ^5.1.6
- **Routing**: React Router ^5.3.4 with Ionic React Router ^8.5.0
- **Testing**: Vitest ^0.34.6, Cypress ^13.5.0, Testing Library React ^16.2.0
- **PWA**: Vite Plugin PWA ^1.0.3 with Workbox service worker generation
- **Build**: Vite ^5.4.19, ESLint ^9.20.1, TypeScript ESLint ^8.24.0
- **UI**: Ionicons ^7.4.0, React Circular Progressbar ^2.2.0, Swiper.js ^11.2.10

## Architecture Decisions

### 1. Component Structure
- **Dashboard Header**: IronForge header with app branding and user menu (Dashboard page only)
- **Tab Navigation**: Extracted bottom tab navigation for main pages with modal support
- **Modal-based Pages**: Workout and Profile pages as modals outside tab structure
- **Custom Page Headers**: Each page has its own appropriate header (Progress, Workout, modal pages)
- **Action Sheet Integration**: Workout tab uses action sheet for workout options

### 2. Ionic Framework Standards
- **Always Use Ionic Components**: Prioritize native Ionic components (IonList, IonItem, IonButton, etc.) over HTML divs for proper mobile behavior and theming
- **Avoid Generic Divs**: Only use divs when Ionic components don't provide the needed layout pattern (e.g., flex containers for chips)
- **Component Hierarchy**: Follow Ionic's component structure guidelines for accessibility and consistent styling
- **Semantic HTML**: Use appropriate Ionic components for their intended purpose (IonLabel for text, IonIcon for icons, etc.)

### 3. Styling Approach
- **Ionic CSS Variables**: Leveraged native Ionic theming system
- **Custom CSS Variables**: Added for consistent color theming
- **Mobile-first Design**: Responsive breakpoints prioritizing mobile experience
- **CSS Modules**: Page-specific styling with .css imports

### 4. Data Management
- **Mock Data**: Static data structures for prototyping and development
- **Component State**: React hooks for local component state management
- **Props Drilling**: Simple prop passing for current scope

### 5. UI/UX Patterns
- **Card-based Layout**: Consistent card design throughout the app
- **Swipeable Components**: Horizontal scrolling for progress metrics
- **Progress Indicators**: Circular and linear progress bars for visual feedback
- **Icon-driven Navigation**: Clear visual hierarchy with appropriate icons
- **Modal Overlays**: Profile page slides over main app content
- **Action Sheets**: Native mobile patterns for photo selection
- **Consistent Button Styling**: Unified circular button hover effects across all pages
- **Interactive Feedback**: Smooth transitions and hover states for all interactive elements

### 6. Progressive Web App (PWA) Architecture
Comprehensive PWA implementation with offline support, cross-platform installation, and native app-like capabilities. Detailed configuration and implementation guide in [pwa.md](docs/pwa.md).

## App Structure
IronForge follows a tab-based navigation structure with modal overlays for secondary pages. Complete page hierarchy and routing patterns documented in [routing.md](docs/routing.md).

## Key Features
IronForge includes dashboard analytics, exercise library with filtering, profile management, workout tracking with timers, and comprehensive PWA capabilities. 

**Feature Documentation**: [Dashboard](docs/features/dashboard.md) | [Exercise Library](docs/features/exercise-library.md) | [Workout Management](docs/features/workout-management.md) | [Profile System](docs/features/profile-system.md)

## Design System
IronForge uses Ionic 8's theming system with custom color palette and mobile-first responsive design. Complete design patterns and component guidelines in [ui-patterns.md](docs/ui-patterns.md).

## Data Management
Component state with React hooks, props drilling for simple data flow, and shared TypeScript interfaces. State management patterns and data architecture detailed in [state-query.md](docs/state-query.md).

## Future Enhancements
- Real data integration with backend API
- User authentication and profile management
- Progress analytics and reporting
- Social features and sharing
- Native mobile features via Capacitor (see [native-capacitor.md](docs/native-capacitor.md))

## Development Commands
```bash
# Development (regular features)
npm run dev

# Build (required for PWA features)
npm run build

# Preview (test PWA features locally)
npm run preview

# Preview with mobile access (for phone testing)
npm run preview -- --host

# Preview with HTTPS (for full PWA testing)
npm run preview -- --host --https

# Testing
npm run test.unit
npm run test.e2e

# Linting
npm run lint
```

## Architecture Standards
Current implementation deviates from Ionic best practices in tab navigation and modal patterns. Full architectural review and remediation plan in [ADR-0002](docs/adr/0002-ionic-standards-review.md).

## Testing
Comprehensive test coverage with Vitest unit tests, Cypress E2E, and performance validation. Testing standards and mobile testing strategies in [testing.md](docs/testing.md).

---
## Documentation

Complete technical documentation available in the [/docs](docs/) directory:

- **Architecture**: [Routing](docs/routing.md) | [UI Patterns](docs/ui-patterns.md) | [State Management](docs/state-query.md)
- **Features**: [Dashboard](docs/features/dashboard.md) | [Exercise Library](docs/features/exercise-library.md) | [Workout Management](docs/features/workout-management.md) | [Profile System](docs/features/profile-system.md)
- **Technical**: [PWA Configuration](docs/pwa.md) | [Testing Standards](docs/testing.md) | [Native Integration](docs/native-capacitor.md)
- **ADRs**: [Router v5](docs/adr/0001-router-v5.md) | [Ionic Standards Review](docs/adr/0002-ionic-standards-review.md)
- **Development**: [Changelog](docs/changelog.md)

---
*Last Updated: 2025-08-29*  
*Generated with Claude Code*

## Recent Development
Latest enhancements include Exercise Card help and menu icons, workout action sheet refactoring, and component architecture improvements. Complete development history in [changelog.md](docs/changelog.md).