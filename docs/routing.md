# App Routing & Navigation

## Routing Structure

### Tab-based Navigation
- **Dashboard** (`/dashboard`) - Default route
- **Progress** (`/progress`) - Analytics and progress tracking
- Both routes are managed within the `IonTabs` component for seamless tab navigation

### Modal Pages (Outside Tab Structure)
- **Workout** (`/workout`) - Positioned outside `IonTabs` for modal-like behavior
- **Profile** (`/profile`) - Modal overlay with independent navigation
- **Exercise Library** (`/exercise`) - Modal overlay for exercise browsing
- **Exercise Details** (`/exercise-details/:exerciseId`) - Modal for detailed exercise information

## Navigation Patterns

### Tab Navigation
- Implemented through `TabNavigation` component
- Uses `IonTabBar` and `IonTabButton` components
- Dashboard and Progress tabs use direct routing
- Workout tab implements action sheet pattern instead of direct navigation

### Action Sheet Integration
- Workout tab click triggers action sheet instead of direct navigation
- Options include:
  - Start New Workout
  - Train Again (Coming Soon)
  - Plan Workout (Coming Soon)

### Modal Navigation
- Modal pages use `IonModal` or similar overlay patterns
- Maintain visibility of tab navigation where appropriate
- Proper z-index management for layering modals above content

## Implementation Details

### App.tsx Structure
```tsx
<IonReactRouter>
  <IonRouterOutlet>
    <IonTabs>
      {/* Tab-based routes */}
      <IonRouterOutlet>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/progress">
          <Progress />
        </Route>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </IonRouterOutlet>
      <TabNavigation />
    </IonTabs>
    
    {/* Modal-like pages outside tabs */}
    <Route exact path="/workout">
      <Workout />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
  </IonRouterOutlet>
</IonReactRouter>
```

### TabNavigation Component
- Manages tab selection state
- Clears selection when on modal pages
- Implements action sheet for workout tab
- Uses proper tab attributes for Ionic integration

## Best Practices

1. **Modal Page Implementation**
   - Position modals outside `IonTabs` structure
   - Maintain proper z-index hierarchy
   - Consider tab visibility requirements

2. **Tab Navigation**
   - Use appropriate tab attributes
   - Implement clear visual feedback
   - Handle navigation state properly

3. **Action Sheet Pattern**
   - Use for complex navigation decisions
   - Provide clear action descriptions
   - Handle dismissal gracefully

4. **Route Management**
   - Keep tab routes within `IonTabs`
   - Modal routes outside tab structure
   - Implement proper route guards when needed

## App Page Hierarchy

```
IronForge App
├── Main Content Area
│   ├── Dashboard (/dashboard) - Default Route
│   │   ├── IronForge Header (Dashboard Only)
│   │   │   ├── Barbell Icon (rotated -35°)
│   │   │   ├── App Title: "IronForge"
│   │   │   └── Menu (Right)
│   │   │       ├── Profile → Navigates to Profile Page
│   │   │       ├── Exercise Library → Navigates to Exercise Page
│   │   │       ├── Install App (PWA)
│   │   │       ├── Settings
│   │   │       └── Logout
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
│   │   ├── Progress Header ("Progress" title)
│   │   └── [Placeholder - ExploreContainer]
│   │
│   └── Workout (/workout) 
│       ├── Custom Workout Header (Dynamic title, close/start/finish buttons)
│       └── [Workout content as documented below]
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
├── Workout (/workout) - Modal Overlay
│   ├── Custom Header Bar
│   │   ├── Back Button (Circular)
│   │   ├── "Workout Builder" / "Active Workout" Title (Dynamic)
│   │   └── Start/Finish Button (Context-sensitive)
│   ├── Workout Info Card
│   │   ├── Workout Name Display
│   │   ├── Status Indicator (Planning/Active with icons)
│   │   └── Exercise Count
│   ├── Exercise List (When exercises exist)
│   │   ├── Exercise Name and Primary Muscles
│   │   ├── Sets Grid with Reps/Weight/Completion tracking
│   │   ├── Rest Time Information
│   │   └── Set Completion Buttons (Interactive during active workout)
│   ├── Empty State (No exercises)
│   │   ├── Barbell Icon Placeholder
│   │   ├── Motivational Text
│   │   └── "Add Your First Exercise" Button
│   └── Floating Action Button (Add Exercise when exercises exist)
│
└── Bottom Tab Navigation (Fixed)
    ├── Dashboard (Home Icon)
    ├── Progress (TrendingUp Icon)
    └── Workout (Barbell Icon) → Triggers Action Sheet
        ├── Workout Action Sheet
        │   ├── "Start New Workout" → Navigates to Workout
        │   ├── "Train a Logged Workout Again" → Coming Soon
        │   ├── "Plan a Workout" → Coming Soon
        │   └── Cancel
```

## Navigation & Routing

- Clean URL structure (/dashboard, /progress, /workout, /profile, /exercise, /edit-profile, /workout-builder)
- Default redirect to dashboard
- Tab highlighting and state management
- Modal overlay navigation for Profile, EditProfile, Exercise Library, Exercise Details, and Workout pages
- Dashboard header menu integration for Profile and Exercise Library access
- Exercise Details uses modal-based state management for better UX (no URL routing)
- Workout tab uses action sheet pattern instead of direct navigation
- Each page has appropriate header without conflicts (Dashboard: branded, Progress: simple, Workout: custom)