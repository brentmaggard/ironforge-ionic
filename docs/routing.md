# App Routing & Navigation

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