# UI Patterns & Design System

## Design System

### Color Palette
- Green: #4CAF50 (Weekly goals, completed activities)
- Blue: #2196F3 (Volume metrics)
- Orange: #FF9800 (Consistency, goal progress)
- Purple: #9C27B0 (Sleep, cardio metrics)
- Red: #F44336 (Nutrition metrics)

### Typography
- Ionic default font stack with custom weights

### Spacing
- 16px base padding with consistent margins

### Border Radius
- 12px for cards (moderate rounding)

### Shadows
- Subtle elevation with CSS box-shadow

## Development Notes

### Safe Area Handling
- CSS safe area insets for modern devices with notches
- `calc(env(safe-area-inset-top, 0px) + 60px)` for header spacing
- Profile page respects safe area for overlay positioning

### Swiper Configuration
- `slidesPerView={3}` for optimal mobile viewing
- `spaceBetween={12}` for proper spacing
- Swipe-only navigation (no pagination dots)

### Progress Indicators
- Dynamic color generation with transparency for trails
- Centered text positioning with flexbox
- Responsive sizing (100px diameter on mobile)

## Modal Pages Implementation

- **Profile Page**: Fixed positioning overlay (`z-index: 40000`)
- **EditProfile Page**: Higher z-index (45000) to layer above Profile
- **Exercise Library Page**: High z-index (50000) to appear above global header and other pages
- **Exercise Details Page**: Highest z-index (999999 !important) to appear above all elements including global header
- Routes outside IonTabs structure for proper modal layering (except ExerciseDetails which is embedded)
- Proper Ionic component usage throughout (IonHeader, IonToolbar, IonItem, IonList, IonLabel, IonCard)
- CSS keyframe animations for slide-in transitions from right
- Optimized component structure using proper Ionic patterns instead of divs
- Action sheet integration for photo selection (EditProfile only)
- Popover menus for exercise actions (Exercise Library only)
- Bottom drawer modal implementation with fixed positioning and scrollable content
- **Exercise Details**: Modal-based state management with auto-scroll functionality and similar exercise navigation

## Consistent Button Styling System

- **Default State**: All header buttons (back, add, edit, save) have transparent backgrounds
- **Hover Effects**: Circular background appears on hover with page-specific scoping
- **Ionic Integration**: Proper use of Ionic CSS variables to override default button behavior
- **Cross-Page Consistency**: Unified styling approach across Exercise, Profile, and EditProfile pages
- **Exercise Page**: Direct IonIcon approach with scoped hover effects
- **Profile/EditProfile Pages**: Div-based structure with targeted hover styling
- **Technical Implementation**: Uses `--background-hover: transparent` and `--ripple-color: transparent` to disable default Ionic button backgrounds while maintaining custom circular hover effects

## Component Architecture

- **GlobalHeader**: Centralized header with app branding and user menu
- **TabNavigation**: Extracted bottom tab navigation for reusability
- **Page-based routing**: Clean separation of concerns with individual page components
- **Custom Page Headers**: Each page has its own appropriate header (Progress, Workout, modal pages)
- **ExerciseCard**: Reusable component for displaying exercise details and sets with help and menu actions
- **RestTimer**: Modernized Ionic-native component for workout rest periods
- **AddExercise**: Modal component for seamless exercise selection during workouts

## Exercise Card Action Buttons Pattern

### Help & Menu Integration
- **Question Mark Icon (helpCircleOutline)** - Opens ExerciseDetails modal for exercise information
- **3-Dot Menu Icon (ellipsisVertical)** - Opens IonPopover with exercise management options
- **Header Layout** - Flex positioning with exercise name on left, action buttons on right
- **Accessibility** - Full ARIA label support with descriptive action descriptions
- **Responsive Sizing** - Icons scale appropriately across mobile breakpoints

### Modal Integration from Workout Context
- **Seamless Navigation** - Question mark leverages existing ExerciseDetails modal component
- **State Management** - Proper modal and popover state handling in parent Workout component  
- **Exercise ID Conversion** - Automatic exercise name to ID conversion for modal integration
- **Context Preservation** - Workout timer and session state maintained during modal interactions

### Icon Button Styling
- **Clear Fill** - Uses `fill="clear"` for transparent backgrounds with hover effects
- **Circular Design** - Consistent button sizing matching existing exercise card patterns
- **Action Positioning** - Right-aligned button group for intuitive interaction
- **Visual Hierarchy** - Icons sized appropriately without overwhelming exercise name

## Action Sheets

### WorkoutActionSheet

A reusable action sheet component for initiating workout-related actions.

**File:** `src/components/WorkoutActionSheet.tsx`

**Props:**

*   `isOpen: boolean`: Controls the visibility of the action sheet.
*   `onDidDismiss: () => void`: A callback function that is called when the action sheet is dismissed.
*   `onAction: (action: string) => void`: A callback function that is called when an action button is clicked. The `action` string will be one of `'start-new'`, `'train-again'`, or `'plan-workout'`.

**Usage:**

```tsx
import WorkoutActionSheet from '../components/WorkoutActionSheet';

// ...

const [isOpen, setIsOpen] = useState(false);

const handleAction = (action: string) => {
  console.log(`Action: ${action}`);
  setIsOpen(false);
};

return (
  <>
    <IonButton onClick={() => setIsOpen(true)}>Show Action Sheet</IonButton>
    <WorkoutActionSheet
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      onAction={handleAction}
    />
  </>
);
```

## Accessibility

- **ARIA Labels**: Descriptive labels for all interactive elements
- **Screen Reader Support**: Visually hidden text for context and status updates
- **Focus Management**: Enhanced keyboard navigation with focus-visible styles
- **Semantic HTML**: Proper use of headings, buttons, and other semantic elements

## Performance Optimization

- **React.memo**: Prevents unnecessary re-renders of components
- **useCallback**: Memoizes callback functions to optimize child component rendering
- **Lazy Loading**: Future consideration for route-based code splitting
- **Image Optimization**: Future consideration for image compression and lazy loading

## PWA Implementation

- **Vite PWA Plugin**: Automatic service worker generation with Workbox
- **Web App Manifest**: Comprehensive manifest with IronForge branding and theme colors
- **Offline Support**: Custom offline page and caching strategies
- **Install Prompt**: Custom hook for cross-platform installation

## Workout Management

- **Action Sheet**: Workout initiation with distinct options
- **Modal Overlay**: Workout builder interface with custom header
- **Interactive Sets Grid**: Real-time set completion, editing, and menu actions
- **State Management**: Dual mode system for planning vs active workouts

## Exercise Library

- **Search & Filter**: Real-time search and segment-based filtering
- **Multi-select**: Checkbox-based selection for adding multiple exercises
- **Info Button**: Access to detailed exercise information
- **Copy Last Workout**: Option to duplicate previous workout sessions

## Profile System

- **Editable Fields**: Inline editing for user profile information
- **Photo Upload**: Action sheet for camera and photo library access
- **Settings Navigation**: Links to accessibility, notifications, and other settings
- **Logout Functionality**: Secure logout with confirmation dialog

## Testing

- **Unit Tests**: Vitest with Testing Library for component testing
- **E2E Tests**: Cypress for end-to-end user flow testing
- **Mocking**: Jest mocks for Ionic components and external libraries
- **Test Coverage**: Comprehensive test suites for all major components and features

*This document is a living reference for the IronForge UI/UX patterns and design system. Please update it as new components and patterns are introduced.*
