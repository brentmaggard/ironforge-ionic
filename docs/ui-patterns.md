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