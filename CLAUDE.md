# IronForge - Ionic React Fitness App

## Project Overview
IronForge is a comprehensive fitness tracking application built with Ionic 8 and React. The app provides users with workout tracking, progress monitoring, and goal management capabilities in a modern, mobile-first interface.

## Tech Stack & Versions

### Core Framework
- **Ionic**: ^8.5.0
- **React**: 19.0.0
- **React DOM**: 19.0.0
- **TypeScript**: ^5.1.6

### Routing & Navigation
- **Ionic React Router**: ^8.5.0
- **React Router**: ^5.3.4
- **React Router DOM**: ^5.3.4

### UI Components & Libraries
- **Ionicons**: ^7.4.0 (Icon library)
- **React Circular Progressbar**: ^2.2.0 (Progress indicators)
- **Swiper.js**: ^11.2.10 (Carousel/swipe functionality)

### Build Tools & Development
- **Vite**: ^5.4.19 (Build tool)
- **Terser**: ^5.4.0 (JavaScript minifier)
- **ESLint**: ^9.20.1 (Code linting)
- **TypeScript ESLint**: ^8.24.0

### Testing
- **Vitest**: ^0.34.6 (Unit testing)
- **Cypress**: ^13.5.0 (E2E testing)
- **Testing Library React**: ^16.2.0
- **Jest DOM**: ^5.16.5

### PWA Support
- **Vite Plugin PWA**: ^1.0.3
- **Vite Plugin Legacy**: ^5.0.0

## Architecture Decisions

### 1. Component Structure
- **Global Header**: Centralized header component with app branding and user menu
- **Tab Navigation**: Extracted bottom tab navigation for reusability
- **Page-based routing**: Clean separation of concerns with individual page components
- **Modal Profile Page**: Overlay routing pattern for profile functionality

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

## App Page Hierarchy

```
IronForge App
├── Global Header (Fixed)
│   ├── Barbell Icon (rotated -35°)
│   ├── App Title: "IronForge"
│   └── Menu (Right)
│       ├── Profile → Navigates to Profile Page
│       ├── Settings
│       └── Logout
│
├── Main Content Area
│   ├── Dashboard (/dashboard) - Default Route
│   │   ├── Quick Actions
│   │   │   ├── Start Workout Card
│   │   │   └── Browse Exercises Card
│   │   ├── Your Progress (Swipeable)
│   │   │   ├── Weekly Goal (3/4 workouts)
│   │   │   ├── Monthly Volume (18.2k lbs)
│   │   │   ├── Consistency (85%)
│   │   │   ├── Sleep Quality (7.2 hours)
│   │   │   ├── Nutrition Score (78%)
│   │   │   └── Cardio Minutes (180/200)
│   │   ├── Active Goals
│   │   │   ├── Bench Press PR (92% - 13 days left)
│   │   │   └── Squat Consistency (75% - 6 days left)
│   │   └── Latest Workout
│   │       └── Full Body Beginner - Week 12
│   │
│   ├── Progress (/progress)
│   │   └── [Placeholder - ExploreContainer]
│   │
│   └── Workout (/workout)
│       └── [Placeholder - ExploreContainer]
│
├── Exercise Library (/exercise) - Modal Overlay
│   ├── Custom Header Bar
│   │   ├── Back Button (Circular)
│   │   ├── "Exercise Library" Title
│   │   └── Add Button (Plus Icon)
│   ├── Search Section
│   │   └── Search Bar with placeholder "Search exercises..."
│   ├── Filter Section
│   │   ├── All Exercises
│   │   ├── Compound Movements
│   │   ├── Isolation Exercises
│   │   └── Bodyweight Exercises
│   ├── Exercise List (IonList)
│   │   ├── Exercise Name & Description
│   │   ├── Info Button (? icon in blue circle) → Navigates to Exercise Details
│   │   ├── Menu Button (3 dots icon)
│   │   └── Popover Menu Options:
│   │       ├── Add to Favorites
│   │       ├── Add to Workout
│   │       ├── Share Exercise
│   │       └── Delete Exercise
│   ├── Bottom Filter Drawer Modal
│   │   ├── Fixed Header (IonHeader/IonToolbar)
│   │   │   ├── Reset Button (left)
│   │   │   ├── "Filter" Title (center)
│   │   │   └── Apply Button (right)
│   │   ├── Drag Handle
│   │   └── Scrollable Filter Options (checkboxes)
│   └── Sample Exercises (10 alphabetically sorted):
│       ├── Barbell Back Squat
│       ├── Bench Press
│       ├── Deadlift
│       ├── Dumbbell Bicep Curl
│       ├── Lat Pulldown
│       ├── Leg Press
│       ├── Overhead Press
│       ├── Pull-ups
│       ├── Romanian Deadlift
│       └── Tricep Dips
│
├── Exercise Details (/exercise-details/:exerciseId) - Modal Overlay
│   ├── Custom Header Bar
│   │   ├── Close Button (X icon)
│   │   └── Exercise Name as Title
│   ├── Muscle Diagram Section
│   │   ├── Placeholder Body Diagrams (Front/Back)
│   │   └── Primary/Secondary Muscle Indicators
│   ├── Muscles Worked Card
│   │   ├── Primary Muscles (Red chips)
│   │   └── Secondary Muscles (Orange chips)
│   ├── Instructions Card
│   │   └── Numbered Step-by-Step Instructions
│   ├── Commentary Card
│   │   └── Exercise Benefits and Tips
│   └── Similar Exercises Card
│       ├── List of Related Exercises
│       └── Info Buttons (Navigate to their details)
│
├── Profile (/profile) - Modal Overlay
│   ├── Custom Header Bar
│   │   ├── Back Button (Circular)
│   │   ├── "My Profile" Title
│   │   └── Edit Button (Pencil Icon)
│   ├── Profile Photo Section
│   │   └── Avatar Placeholder/Photo (Display Only)
│   ├── User Information
│   │   ├── Name: "John Doe"
│   │   └── Tagline: "Fitness Enthusiast"
│   └── Stats Section
│       ├── Workouts: 127
│       ├── Days Active: 89
│       └── Goals Achieved: 12
│
├── Edit Profile (/edit-profile) - Modal Overlay
│   ├── Custom Header Bar
│   │   ├── Back Button (Circular)
│   │   ├── "Edit Profile" Title
│   │   └── Save Button (Checkmark Icon)
│   ├── Profile Photo Section
│   │   ├── Large Avatar Placeholder/Photo
│   │   ├── Round Edit Badge (Camera Icon)
│   │   └── "Tap to change photo" Text
│   ├── Personal Information Form
│   │   ├── Name Input
│   │   ├── Tagline Input
│   │   ├── Email Input
│   │   └── Phone Input
│   ├── About Me Section
│   │   └── Bio Textarea
│   └── Photo Action Sheet
│       ├── Take Photo
│       ├── Choose from Gallery
│       ├── Remove Photo
│       └── Cancel
│
└── Bottom Tab Navigation (Fixed)
    ├── Dashboard (Home Icon)
    ├── Progress (TrendingUp Icon)
    └── Workout (Barbell Icon)
```

## Key Features Implemented

### Dashboard Features
1. **Quick Actions Section**
   - Start Workout button with plus icon
   - Browse Exercises button with search icon
   - Clickable cards with console logging

2. **Swipeable Progress Metrics**
   - 6 different fitness metrics
   - 3 charts visible at once
   - Horizontal swipe navigation
   - Color-coded progress indicators

3. **Active Goals Tracking**
   - Progress bars with percentages
   - Days remaining indicators
   - Goal-specific icons
   - "View All" functionality

4. **Latest Workout Display**
   - Recent activity tracking
   - Exercise count and duration
   - Completion status icons

### Profile Page Features
1. **Modal Overlay Design**
   - Slides in from right over global header
   - Fixed positioning with high z-index (9999)
   - Custom Ionic header with navigation buttons

2. **Profile Display (Read-Only)**
   - 85px circular avatar with gradient border
   - Person icon placeholder when no photo
   - Display-only avatar (no photo editing capabilities)
   - Edit pencil button in header navigates to EditProfile page
   - Clean, view-only interface without camera functionality

3. **User Information Display**
   - Name and tagline section
   - Gradient background design matching app theme
   - Proper Ionic component structure

4. **Statistics Grid**
   - Three-column stats layout
   - Workouts, Days Active, Goals Achieved
   - Responsive design with IonGrid

### Exercise Library Page Features
1. **Modal Overlay Design**
   - Slides in from right over global header
   - High z-index (11000) to appear above other pages
   - Custom header with Back/Add buttons

2. **Search & Filter Functionality**
   - Real-time search across exercise names and descriptions
   - IonItem-based search section with IonSearchbar and filter button
   - Bottom drawer modal for advanced filtering (replaces inline segment filter)
   - Dual filtering: Direct muscle group chip clicks + drawer-based Apply filtering

3. **Filter Drawer Modal**
   - Fixed-height bottom drawer (380px) with sticky header
   - IonHeader/IonToolbar with Reset, Filter title, and Apply buttons
   - Three filter sections: Exercise Types, Muscle Groups, Equipment
   - Exercise Types: Checkboxes with icons (Strength/barbell, Cardio/walk, Mobility/accessibility)
   - Muscle Groups: 13 selectable IonChip components with compact styling
   - Equipment: 9 selectable IonChip options (Barbell, Dumbbell, Machine, etc.)
   - Ultra-compact spacing with negative margins for mobile optimization

4. **Enhanced Exercise List Display**
   - Proper IonList with IonItem components using semantic Ionic structure
   - Exercise name with bold font-weight: 700
   - Completion count badge (small blue badge showing workout frequency)
   - "Logged workouts" text with completion statistics
   - Clickable muscle group chips for instant filtering
   - Alphabetically sorted exercise database with realistic completion counts
   - Optimized compact spacing throughout

5. **Interactive Filtering System**
   - Click muscle group chips directly for immediate filtering
   - Filter drawer Apply button integrates with main filtering system
   - Active filter states with visual feedback (selected chips highlight)
   - Reset functionality clears all filter selections
   - Seamless integration between chip clicks and drawer selections

6. **Interactive Elements**
   - Info button (helpCircleOutline icon, 24px) in blue circle navigates to Exercise Details
   - Menu button (3 dots, 20px) with popover containing actions
   - Action menu: Add to Favorites, Add to Workout, Share, Delete
   - Hoverable muscle group chips with selection states

7. **Navigation Integration**
   - Accessible via Global Header menu with library icon
   - Route configured for proper modal overlay behavior
   - Info buttons navigate to detailed exercise pages
   - Consistent with app's navigation patterns

### Exercise Details Page Features
1. **Modal Overlay Design**
   - Slides in from right over Exercise Library without closing it
   - Highest z-index (999999) to appear above all pages including global header
   - Custom header with Close button and exercise name as title
   - Solid background design for focused reading experience

2. **Comprehensive Exercise Information**
   - Expanded exercise data structure with detailed information
   - All 10 exercises include: instructions, commentary, primary/secondary muscles, similar exercises
   - Modal-based state management instead of URL routing
   - Embedded within Exercise Library component for seamless integration

3. **Muscle Diagram Section**
   - Placeholder body diagrams (front and back views)
   - Visual indicators for primary and secondary muscles
   - Consistent with fitness app design patterns

4. **Detailed Content Cards**
   - **Muscles Worked Card**: Primary (red) and secondary (orange) muscle chips
   - **Instructions Card**: Numbered step-by-step exercise instructions with circular numbered bullets
   - **Commentary Card**: Exercise benefits, tips, and form guidance
   - **Similar Exercises Card**: Related exercises with functional navigation buttons

5. **Interactive Navigation & UX**
   - Similar exercises are clickable and seamlessly change content within same modal
   - Auto-scroll to top (300ms smooth animation) when exercise changes via similar exercise navigation
   - Info buttons on similar exercises for continuous exploration
   - Close button returns to Exercise Library at exact previous position
   - No page replacement - Exercise Library remains loaded underneath

6. **Enhanced User Experience**
   - **Context preservation**: Exercise Library state, filters, and scroll position maintained
   - **Smooth transitions**: No flash effects or jarring page changes
   - **Proper layering**: Modal appears above global header without double-header issues
   - **Consistent styling**: Matches app's card-based design with subtle shadows
   - **Responsive design**: Mobile-optimized spacing and touch targets

### Edit Profile Page Features
1. **Modal Overlay Design**
   - Slides in from right over Profile page
   - Higher z-index (10000) to appear above Profile
   - Custom header with Save/Back buttons

2. **Profile Photo Management**
   - 120px circular avatar with edit functionality
   - Round orange edit badge (40px) with camera icon
   - "Tap to change photo" instruction text
   - Action sheet with photo options (Take, Gallery, Remove)
   - Proper circular styling with backdrop-filter effect

3. **Editable Form Fields**
   - Personal Information card with Name, Tagline, Email, Phone
   - About Me section with Bio textarea
   - Proper Ionic form components with validation-ready structure
   - Save functionality with form state management

4. **User Experience**
   - Clear visual hierarchy with photo at top
   - Professional form layout with proper spacing
   - Consistent with app's design patterns

### Navigation & Routing
- Clean URL structure (/dashboard, /progress, /workout, /profile, /exercise, /edit-profile)
- Default redirect to dashboard
- Tab highlighting and state management
- Modal overlay navigation for Profile, EditProfile, Exercise Library, and Exercise Details pages
- Global header menu integration for Profile and Exercise Library access
- Exercise Details uses modal-based state management for better UX (no URL routing)

### Design System
- **Color Palette**:
  - Green: #4CAF50 (Weekly goals, completed activities)
  - Blue: #2196F3 (Volume metrics)
  - Orange: #FF9800 (Consistency, goal progress)
  - Purple: #9C27B0 (Sleep, cardio metrics)
  - Red: #F44336 (Nutrition metrics)

- **Typography**: Ionic default font stack with custom weights
- **Spacing**: 16px base padding with consistent margins
- **Border Radius**: 12px for cards (moderate rounding)
- **Shadows**: Subtle elevation with CSS box-shadow

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

### Modal Pages Implementation
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

### Consistent Button Styling System
- **Default State**: All header buttons (back, add, edit, save) have transparent backgrounds
- **Hover Effects**: Circular background appears on hover with page-specific scoping
- **Ionic Integration**: Proper use of Ionic CSS variables to override default button behavior
- **Cross-Page Consistency**: Unified styling approach across Exercise, Profile, and EditProfile pages
- **Exercise Page**: Direct IonIcon approach with scoped hover effects
- **Profile/EditProfile Pages**: Div-based structure with targeted hover styling
- **Technical Implementation**: Uses `--background-hover: transparent` and `--ripple-color: transparent` to disable default Ionic button backgrounds while maintaining custom circular hover effects

## Future Enhancements
- Real data integration with backend API
- User authentication and profile management
- Workout creation and tracking functionality
- Progress analytics and reporting
- Social features and sharing
- Offline capability with PWA features

## Development Commands
```bash
# Development
npm run dev

# Build
npm run build

# Testing
npm run test.unit
npm run test.e2e

# Linting
npm run lint
```

---
*Last Updated: 2025-08-27*
*Generated with Claude Code*

## Recent Updates (2025-08-27)

### Exercise Details Modal Implementation & Enhancement
This session involved the complete implementation and enhancement of the ExerciseDetails modal overlay system, transforming it from a basic concept to a fully functional, user-friendly feature.

#### Initial Implementation
- **Created ExerciseDetails component** from scratch with comprehensive exercise data structure
- **Expanded exercise database** with detailed information for all 10 exercises including instructions, commentary, primary/secondary muscles, and similar exercises
- **Implemented route-based navigation** initially using `/exercise-details/:exerciseId` pattern

#### Modal Conversion & UX Improvements
- **Converted from route-based to modal-based navigation** to prevent Exercise Library from closing when viewing details
- **Added state management** in Exercise.tsx with `exerciseDetailsOpen` and `selectedExerciseId` state variables
- **Embedded ExerciseDetails within Exercise component** for seamless integration without page replacement
- **Fixed z-index layering issues** - increased to 999999 !important to properly appear above global header
- **Resolved double-header problem** by ensuring proper modal hierarchy

#### Enhanced Navigation & Interactivity
- **Implemented similar exercise navigation** - users can explore related exercises within the same modal
- **Added auto-scroll functionality** - smoothly scrolls to top (300ms animation) when navigating between similar exercises using `contentRef.current.scrollToTop(300)`
- **Fixed broken similar exercise links** by updating all similarExercises arrays to reference valid exercise IDs
- **Enhanced context preservation** - Exercise Library state, filters, and scroll position remain intact underneath modal

#### Component Architecture Compliance
- **Cleaned up generic divs** to follow Ionic component standards as per project architecture
- **Replaced HTML structure with Ionic components**: Added IonGrid, IonRow, IonCol, IonText imports and implementation
- **Simplified muscle diagram section** from complex IonGrid layout to single `<IonText className="body-silhouette">👤</IonText>`
- **Maintained semantic structure** while prioritizing Ionic components over generic HTML elements
- **Preserved muscle-chips divs** as appropriate flex containers per architecture guidelines

#### Technical Achievements
- **Modal-based state management** instead of URL routing for better user experience
- **Proper component communication** between Exercise and ExerciseDetails with callback functions
- **Responsive design** with mobile-optimized spacing and touch targets
- **Consistent styling** matching app's card-based design with subtle shadows
- **Smooth transitions** without flash effects or jarring page changes

#### Key Files Modified
- **Exercise.tsx**: Added modal state management, embedded ExerciseDetails component, expanded exercise data structure
- **ExerciseDetails.tsx**: Created comprehensive modal component with auto-scroll and similar exercise navigation
- **ExerciseDetails.css**: Implemented styling with highest z-index (999999 !important) and solid background design
- **App.tsx**: Removed ExerciseDetails route after converting to modal pattern

#### User Experience Enhancements
- **Seamless navigation flow** - no page replacement, Exercise Library stays loaded
- **Continuous exploration** - similar exercises clickable for uninterrupted browsing
- **Auto-scroll on exercise change** - smooth 300ms animation to top of content
- **Proper modal layering** - appears above all elements including global header
- **Context preservation** - all filters and scroll positions maintained when closing modal

This implementation demonstrates successful conversion from route-based to modal-based navigation while maintaining proper Ionic component architecture and delivering an enhanced user experience.