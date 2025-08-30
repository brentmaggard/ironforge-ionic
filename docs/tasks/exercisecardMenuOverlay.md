Detailed Implementation Guide: Exercise Card Menu Overlay

  Pre-Implementation Setup

  Before starting, ensure you understand the current ExerciseCard
  implementation and the Workout page structure. The modal will
  replace the existing popover functionality triggered by the 3-dot
   menu button.

  ---
[ ]  Task 1: Create TypeScript Interfaces

  File: /src/types/exercise-menu.ts

  export interface ExerciseMenuState {
    open: boolean;
    exerciseIndex?: number;
    exerciseId?: string;
  }

  export interface ExerciseStats {
    heaviest?: number;
    averageWeight?: number;
    averageReps?: number;
  }

  export interface PremiumFeature {
    isPremium: boolean;
    label?: string;
  }

  export interface ExerciseMenuProps {
    isOpen: boolean;
    exercise?: any; // Use existing exercise type
    onDismiss: () => void;
    onDelete: (exerciseId: string) => void;
    onChangeExercise: (exerciseId: string) => void;
    onShowRecords: (exerciseId: string) => void;
    onShowHistory: (exerciseId: string) => void;
    onEditComment: (exerciseId: string) => void;
    onReorderExercises: () => void;
  }

  Key Points:
  - Extend existing exercise types from /src/types/workout.ts
  - Use consistent naming with existing codebase patterns
  - Include all callback functions for menu actions

  ---
[ ]  Task 2: Create ExerciseMenuModal Component Structure

  File: /src/components/ExerciseMenuModal.tsx

  import React from 'react';
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonToggle
  } from '@ionic/react';
  import {
    close,
    star,
    list,
    reorderThree,
    chatbubble,
    informationCircle,
    swap
  } from 'ionicons/icons';
  import { ExerciseMenuProps } from '../types/exercise-menu';
  import './ExerciseMenuModal.css';

  const ExerciseMenuModal: React.FC<ExerciseMenuProps> = ({
    isOpen,
    exercise,
    onDismiss,
    onDelete,
    onChangeExercise,
    onShowRecords,
    onShowHistory,
    onEditComment,
    onReorderExercises
  }) => {
    return (
      <IonModal 
        isOpen={isOpen} 
        onDidDismiss={onDismiss}
        breakpoints={[0, 0.75, 1]}
        initialBreakpoint={0.75}
        className="exercise-menu-modal"
        data-testid="exercise-menu-modal"
      >
        {/* Content sections will be built in subsequent tasks */}
      </IonModal>
    );
  };

  export default ExerciseMenuModal;

  Implementation Notes:
  - Use breakpoints for bottom sheet behavior
  - Set initial breakpoint at 75% height
  - Include all necessary Ionic imports
  - Add data-testid for testing

  ---
[ ]  Task 3: Implement Modal Header

  Add to ExerciseMenuModal component:

  <IonContent className="exercise-menu-content">
    <div className="exercise-menu-header">
      <h2 className="exercise-title">{exercise?.name ||
  'Exercise'}</h2>
      <IonButton
        fill="clear"
        className="delete-button"
        onClick={() => exercise && onDelete(exercise.id)}
        data-testid="delete-exercise-button"
      >
        <IonIcon icon={close} color="danger" />
        <IonLabel color="danger">Delete</IonLabel>
      </IonButton>
    </div>
    {/* Additional sections go here */}
  </IonContent>

  Styling Requirements:
  - Dark background for entire modal
  - Red delete button with X icon
  - Proper spacing and typography

  ---
[ ]  Task 4: Build Quick Stats Section

  Add after header:

  <div className="quick-stats-section">
    <h3 className="section-title">Quick stats</h3>
    <div className="stats-grid">
      <div className="stat-item">
        <IonLabel>Heaviest</IonLabel>
        <span className="premium-label">Premium</span>
      </div>
      <div className="stat-item">
        <IonLabel>Average weight</IonLabel>
        <span className="premium-label">Premium</span>
      </div>
      <div className="stat-item">
        <IonLabel>Average reps</IonLabel>
        <span className="premium-label">Premium</span>
      </div>
    </div>
  </div>

  Implementation Notes:
  - Create 3-column grid layout
  - Red "Premium" labels to match screenshot
  - Mock premium feature restrictions

  ---
[ ]  Task 5: Create Exercise Information Section

  Add after Quick Stats:

  <div className="exercise-info-section">
    <h3 className="section-title">Exercise information</h3>
    <IonList>
      <IonItem 
        button 
        onClick={() => exercise && onShowRecords(exercise.id)}
        data-testid="records-item"
      >
        <IonIcon icon={star} slot="start" />
        <IonLabel>Records</IonLabel>
        <IonIcon icon={chevronForward} slot="end" />
      </IonItem>
      <IonItem 
        button 
        onClick={() => exercise && onShowHistory(exercise.id)}
        data-testid="history-item"
      >
        <IonIcon icon={list} slot="start" />
        <IonLabel>History</IonLabel>
        <IonIcon icon={chevronForward} slot="end" />
      </IonItem>
    </IonList>
  </div>

  Key Points:
  - Use IonList for consistent styling
  - Add chevron forward icons
  - Include click handlers for navigation

  ---
[ ]  Task 6: Implement Handle Exercise Section

  Add after Exercise Information:

  <div className="handle-exercise-section">
    <h3 className="section-title">Handle exercise</h3>
    <IonList>
      <IonItem button onClick={onReorderExercises}>
        <IonIcon icon={reorderThree} slot="start" />
        <IonLabel>Reorder exercises</IonLabel>
        <IonIcon icon={chevronForward} slot="end" />
      </IonItem>

      <IonItem button onClick={() => exercise &&
  onEditComment(exercise.id)}>
        <IonIcon icon={chatbubble} slot="start" />
        <IonLabel>Exercise comment</IonLabel>
        <IonIcon icon={chevronForward} slot="end" />
      </IonItem>

      <IonItem>
        <IonIcon icon={informationCircle} slot="start" />
        <IonLabel>Exercise specific rest timer</IonLabel>
        <span className="default-label" slot="end">Default</span>
      </IonItem>

      <IonItem>
        <IonIcon icon={create} slot="start" />
        <IonLabel>
          RPE/RiR
          <span className="premium-label">Premium</span>
        </IonLabel>
        <div className="toggle-group" slot="end">
          <div className="toggle-item">
            <span>RPE</span>
            <IonToggle disabled={true} />
          </div>
          <div className="toggle-item">
            <span>RiR</span>
            <IonToggle disabled={true} />
          </div>
        </div>
      </IonItem>
    </IonList>
  </div>

  Implementation Details:
  - Mix of clickable and non-clickable items
  - Disabled toggles for premium features
  - Custom styling for toggle groups

  ---
[ ]  Task 7: Add Bottom Action Buttons

  Add at end of content:

  <div className="bottom-actions">
    <IonButton
      expand="block"
      fill="outline"
      className="change-exercise-button"
      onClick={() => exercise && onChangeExercise(exercise.id)}
    >
      <IonIcon icon={swap} slot="start" />
      Change exercise
    </IonButton>

    <IonButton
      fill="clear"
      className="close-button"
      onClick={onDismiss}
    >
      Close
    </IonButton>
  </div>

  ---
[ ]  Task 8: Create CSS Styling

  File: /src/components/ExerciseMenuModal.css

  .exercise-menu-modal {
    --backdrop-opacity: 0.6;
    --background: var(--ion-color-dark);
    --color: var(--ion-color-light);
  }

  .exercise-menu-content {
    --background: var(--ion-color-dark);
    --color: var(--ion-color-light);
    padding: 20px;
  }

  .exercise-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .exercise-title {
    color: var(--ion-color-light);
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  .delete-button {
    --color: var(--ion-color-danger);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-title {
    color: var(--ion-color-light);
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-item {
    text-align: center;
    padding: 16px;
    background: var(--ion-color-dark-shade);
    border-radius: 8px;
  }

  .premium-label {
    color: var(--ion-color-danger);
    font-size: 12px;
    font-weight: 500;
  }

  .default-label {
    color: var(--ion-color-medium);
    font-size: 14px;
  }

  .toggle-group {
    display: flex;
    gap: 16px;
  }

  .toggle-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-size: 12px;
  }

  .bottom-actions {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .change-exercise-button {
    --border-color: var(--ion-color-primary);
    --color: var(--ion-color-primary);
  }

  .close-button {
    --color: var(--ion-color-medium);
    margin: 0 auto;
  }

  /* Dark theme overrides for ion-list items */
  .exercise-menu-modal ion-list {
    background: transparent;
  }

  .exercise-menu-modal ion-item {
    --background: var(--ion-color-dark-shade);
    --color: var(--ion-color-light);
    --border-color: var(--ion-color-dark-tint);
    margin-bottom: 8px;
    border-radius: 8px;
  }

  ---
[ ]  Task 9: Update ExerciseCard Component

  In /src/components/ExerciseCard.tsx, find the menu button handler
   and update:

  // Replace existing popover trigger with modal trigger
  const handleMenuClick = () => {
    onOpenExerciseMenu(exercise.id, exerciseIndex); // Pass to 
  parent
  };

  Add prop to ExerciseCard interface:
  interface ExerciseCardProps {
    // ... existing props
    onOpenExerciseMenu: (exerciseId: string, exerciseIndex: number)
   => void;
  }

  ---
[ ]  Task 10: Integrate Modal in Workout Page

  In /src/pages/Workout.tsx:

  // Add import
  import ExerciseMenuModal from '../components/ExerciseMenuModal';
  import { ExerciseMenuState } from '../types/exercise-menu';

  // Add state
  const [exerciseMenuState, setExerciseMenuState] =
  useState<ExerciseMenuState>({
    open: false
  });

  // Add handlers
  const handleOpenExerciseMenu = (exerciseId: string, 
  exerciseIndex: number) => {
    setExerciseMenuState({
      open: true,
      exerciseId,
      exerciseIndex
    });
  };

  const handleCloseExerciseMenu = () => {
    setExerciseMenuState({ open: false });
  };

  // Add menu action handlers
  const handleDeleteExercise = (exerciseId: string) => {
    // Implementation depends on your state management
    console.log('Delete exercise:', exerciseId);
    handleCloseExerciseMenu();
  };

  const handleChangeExercise = (exerciseId: string) => {
    console.log('Change exercise:', exerciseId);
    handleCloseExerciseMenu();
  };

  // Add other handlers (onShowRecords, onShowHistory, etc.)

  // Add modal to JSX
  return (
    <IonPage>
      {/* Existing content */}

      <ExerciseMenuModal
        isOpen={exerciseMenuState.open}
        exercise={currentExercise} // Get from state based on 
  exerciseIndex
        onDismiss={handleCloseExerciseMenu}
        onDelete={handleDeleteExercise}
        onChangeExercise={handleChangeExercise}
        onShowRecords={handleShowRecords}
        onShowHistory={handleShowHistory}
        onEditComment={handleEditComment}
        onReorderExercises={handleReorderExercises}
      />
    </IonPage>
  );

  ---
[ ]  Task 11: Implement Modal Dismiss Functionality

  The modal should automatically handle:
  - Swipe down to dismiss (built-in with breakpoints)
  - Backdrop tap to close (built-in with onDidDismiss)
  - Hardware back button (automatic on mobile)

  Test these behaviors thoroughly on mobile devices

  ---
[ ]    Task 12: Add Accessibility Features

  In ExerciseMenuModal component, add:

  // Add ARIA labels and roles
  <IonModal
    isOpen={isOpen}
    onDidDismiss={onDismiss}
    breakpoints={[0, 0.75, 1]}
    initialBreakpoint={0.75}
    className="exercise-menu-modal"
    data-testid="exercise-menu-modal"
    aria-label={`Exercise menu for ${exercise?.name}`}
    role="dialog"
    aria-modal="true"
  >

  Add focus management:
  - Focus should trap within modal when open
  - Return focus to trigger button when closed
  - All interactive elements should be keyboard accessible

  ---
[ ]  Task 13: Testing Implementation

  Manual Testing Checklist:
  1. Modal slides up from bottom when menu button clicked
  2. Dark theme styling matches screenshot
  3. All sections display correctly with proper spacing
  4. Premium labels show and toggles are disabled
  5. Clickable items show hover states and respond to touch
  6. Delete button shows confirmation (implement if needed)
  7. Modal dismisses with swipe, backdrop tap, and close button
  8. Accessibility: Screen reader announces content properly
  9. Mobile: Test on actual device for touch interactions

  Performance Testing:
  - Modal should open/close smoothly without lag
  - No memory leaks when opening/closing repeatedly

  ---
[ ]  Task 14: Unit Tests

  File: /src/components/__tests__/ExerciseMenuModal.test.tsx

  import { render, screen, fireEvent } from
  '@testing-library/react';
  import ExerciseMenuModal from '../ExerciseMenuModal';

  const mockProps = {
    isOpen: true,
    exercise: { id: '1', name: 'Dumbbell Curl' },
    onDismiss: jest.fn(),
    onDelete: jest.fn(),
    onChangeExercise: jest.fn(),
    onShowRecords: jest.fn(),
    onShowHistory: jest.fn(),
    onEditComment: jest.fn(),
    onReorderExercises: jest.fn(),
  };

  describe('ExerciseMenuModal', () => {
    test('renders modal when open', () => {
      render(<ExerciseMenuModal {...mockProps} />);
      expect(screen.getByTestId('exercise-menu-modal')).toBeInTheDo
  cument();
    });

    test('displays exercise name in header', () => {
      render(<ExerciseMenuModal {...mockProps} />);
      expect(screen.getByText('Dumbbell 
  Curl')).toBeInTheDocument();
    });

    test('calls onDelete when delete button clicked', () => {
      render(<ExerciseMenuModal {...mockProps} />);

  fireEvent.click(screen.getByTestId('delete-exercise-button'));
      expect(mockProps.onDelete).toHaveBeenCalledWith('1');
    });

    // Add tests for all menu actions
  });

  ---
[ ]  Task 15: Final Quality Checks

  Run these commands:
  npm run lint
  npm run test:unit
  npm run build

  Manual Verification:
  - Modal matches screenshot design exactly
  - All interactions work as expected
  - No TypeScript errors
  - No console errors or warnings
  - Responsive design works on different screen sizes
  - Dark theme is consistent throughout
  - Performance is smooth on mobile devices

  ---
  Common Issues & Solutions

  1. Modal not sliding from bottom: Ensure presentingElement is set
   correctly and breakpoints are configured
  2. Dark theme not applying: Check CSS variable inheritance and
  Ionic theme configuration
  3. Toggle switches not disabled: Verify disabled={true} prop is
  set for premium features
  4. Layout issues on mobile: Test on actual devices, not just
  browser DevTools
  5. Modal state not updating: Ensure parent component state
  management is correct

  This implementation will create a pixel-perfect recreation of the
   exercise menu overlay shown in the reference image while
  following Ionic 8 best practices and maintaining compatibility
  with your existing codebase architecture.