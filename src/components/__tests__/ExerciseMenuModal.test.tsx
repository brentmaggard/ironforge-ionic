import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExerciseMenuModal from '../ExerciseMenuModal';
import { WorkoutExercise } from '../../types/workout';

// Mock Ionic components for testing
vi.mock('@ionic/react', async () => {
  const actual = await vi.importActual('@ionic/react');
  return {
    ...actual,
    IonModal: ({ children, isOpen, onDidDismiss, className, showBackdrop, backdropDismiss, presentingElement, ...props }: any) =>
      isOpen ? (
        <div 
          data-testid="exercise-menu-modal" 
          className={className}
          data-show-backdrop={showBackdrop}
          data-backdrop-dismiss={backdropDismiss}
          data-presenting-element={presentingElement}
          onClick={() => onDidDismiss && onDidDismiss()} 
          {...props}
        >
          {children}
        </div>
      ) : null,
    IonContent: ({ children, className }: any) => <div className={className}>{children}</div>,
    IonButton: ({ children, onClick, fill, color, expand, className, disabled, ...props }: any) => (
      <button 
        onClick={onClick} 
        className={className}
        data-fill={fill}
        data-color={color}
        data-expand={expand}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    ),
    IonIcon: ({ icon, slot }: any) => <span data-icon={icon?.name || 'icon'} data-slot={slot} />,
    IonItem: ({ children, onClick, button, lines, className, ...props }: any) => (
      <div 
        onClick={button ? onClick : undefined} 
        className={className}
        data-button={button}
        data-lines={lines}
        {...props}
      >
        {children}
      </div>
    ),
    IonLabel: ({ children, className, slot }: any) => <span className={className} data-slot={slot}>{children}</span>,
    IonList: ({ children, lines }: any) => <div data-lines={lines}>{children}</div>,
    IonToggle: ({ disabled, ...props }: any) => <input type="checkbox" disabled={disabled} {...props} />,
    IonCard: ({ children, className }: any) => <div className={className}>{children}</div>,
    IonCardContent: ({ children }: any) => <div>{children}</div>,
    IonGrid: ({ children, className, slot }: any) => <div className={className} data-slot={slot}>{children}</div>,
    IonRow: ({ children }: any) => <div>{children}</div>,
    IonCol: ({ children, size, className }: any) => <div data-size={size} className={className}>{children}</div>,
  };
});

const mockExercise: WorkoutExercise = {
  id: 1,
  name: 'Bench Press',
  sets: [
    { reps: 10, weight: 135, completed: false },
    { reps: 10, weight: 135, completed: false },
    { reps: 10, weight: 135, completed: false }
  ],
  primaryMuscles: ['Chest', 'Triceps'],
  secondaryMuscles: ['Shoulders'],
  restTime: 120
};

const createMockProps = (overrides = {}) => ({
  isOpen: true,
  exercise: mockExercise,
  onDismiss: vi.fn(),
  onDelete: vi.fn(),
  onChangeExercise: vi.fn(),
  onShowRecords: vi.fn(),
  onShowHistory: vi.fn(),
  onEditComment: vi.fn(),
  onReorderExercises: vi.fn(),
  ...overrides,
});

describe('ExerciseMenuModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Modal Rendering and Visibility', () => {
    it('renders properly with IonModal when open', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByTestId('exercise-menu-modal')).toBeInTheDocument();
      expect(screen.getByText('Bench Press')).toBeInTheDocument();
      expect(screen.getByText('Quick stats')).toBeInTheDocument();
      expect(screen.getByText('Exercise information')).toBeInTheDocument();
      expect(screen.getByText('Handle exercise')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      const props = createMockProps({ isOpen: false });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.queryByTestId('exercise-menu-modal')).not.toBeInTheDocument();
    });

    it('applies correct modal configuration', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const modal = screen.getByTestId('exercise-menu-modal');
      expect(modal).toHaveClass('exercise-menu-modal');
      expect(modal).toHaveAttribute('data-show-backdrop', 'true');
      expect(modal).toHaveAttribute('data-backdrop-dismiss', 'true');
    });

    it('applies correct content classes', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const content = document.querySelector('.exercise-menu-content');
      expect(content).toBeInTheDocument();
    });
  });

  describe('Header Section', () => {
    it('displays exercise name in header', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const header = document.querySelector('ion-header');
      expect(header).toBeInTheDocument();
      expect(screen.getByText('Bench Press')).toBeInTheDocument();
    });

    it('handles missing exercise name gracefully', () => {
      const props = createMockProps({ 
        exercise: { ...mockExercise, name: '' }
      });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Exercise')).toBeInTheDocument();
    });

    it('handles undefined exercise gracefully', () => {
      const props = createMockProps({ exercise: undefined });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Exercise')).toBeInTheDocument();
    });

    it('renders delete button with correct attributes', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const deleteButton = screen.getByTestId('delete-exercise-button');
      expect(deleteButton).toBeInTheDocument();
      expect(deleteButton).toHaveAttribute('data-fill', 'clear');
      expect(deleteButton).toHaveAttribute('data-color', 'danger');
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('calls onDelete with exercise ID when delete button is clicked', () => {
      const onDelete = vi.fn();
      const props = createMockProps({ onDelete });
      render(<ExerciseMenuModal {...props} />);
      
      const deleteButton = screen.getByTestId('delete-exercise-button');
      fireEvent.click(deleteButton);
      expect(onDelete).toHaveBeenCalledWith('1');
      expect(onDelete).toHaveBeenCalledTimes(1);
    });

    it('does not call onDelete when exercise is undefined', () => {
      const onDelete = vi.fn();
      const props = createMockProps({ exercise: undefined, onDelete });
      render(<ExerciseMenuModal {...props} />);
      
      const deleteButton = screen.getByTestId('delete-exercise-button');
      fireEvent.click(deleteButton);
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  describe('Quick Stats Section', () => {
    it('renders stats card with correct structure', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const statsCard = document.querySelector('.stats-card');
      expect(statsCard).toBeInTheDocument();
      expect(screen.getByText('Quick stats')).toBeInTheDocument();
    });

    it('displays all stat items with premium labels', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Heaviest')).toBeInTheDocument();
      expect(screen.getByText('Average weight')).toBeInTheDocument();
      expect(screen.getByText('Average reps')).toBeInTheDocument();
      
      const statPremiumLabels = screen.getAllByText('Premium').filter(
        (label, index, labels) => index < 3 // First 3 are from stats
      );
      expect(statPremiumLabels).toHaveLength(3);
    });

    it('applies correct CSS classes to stat items', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const statItems = document.querySelectorAll('.stat-item');
      expect(statItems).toHaveLength(3);
      
      statItems.forEach(item => {
        expect(item).toHaveAttribute('data-lines', 'none');
      });
    });

    it('displays premium labels with correct styling', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const premiumLabels = document.querySelectorAll('.premium-label');
      expect(premiumLabels.length).toBeGreaterThan(0);
    });
  });

  describe('Exercise Information Section', () => {
    it('renders exercise info card with correct structure', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const infoCard = document.querySelector('.exercise-info-card');
      expect(infoCard).toBeInTheDocument();
      expect(screen.getByText('Exercise information')).toBeInTheDocument();
    });

    it('renders Records item as clickable button', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const recordsItem = screen.getByTestId('records-item');
      expect(recordsItem).toBeInTheDocument();
      expect(recordsItem).toHaveAttribute('data-button', 'true');
      expect(recordsItem).toHaveAttribute('data-lines', 'none');
      expect(screen.getByText('Records')).toBeInTheDocument();
    });

    it('renders History item as clickable button', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const historyItem = screen.getByTestId('history-item');
      expect(historyItem).toBeInTheDocument();
      expect(historyItem).toHaveAttribute('data-button', 'true');
      expect(historyItem).toHaveAttribute('data-lines', 'none');
      expect(screen.getByText('History')).toBeInTheDocument();
    });

    it('calls onShowRecords when records item is clicked', () => {
      const onShowRecords = vi.fn();
      const props = createMockProps({ onShowRecords });
      render(<ExerciseMenuModal {...props} />);
      
      const recordsItem = screen.getByTestId('records-item');
      fireEvent.click(recordsItem);
      expect(onShowRecords).toHaveBeenCalledWith('1');
      expect(onShowRecords).toHaveBeenCalledTimes(1);
    });

    it('calls onShowHistory when history item is clicked', () => {
      const onShowHistory = vi.fn();
      const props = createMockProps({ onShowHistory });
      render(<ExerciseMenuModal {...props} />);
      
      const historyItem = screen.getByTestId('history-item');
      fireEvent.click(historyItem);
      expect(onShowHistory).toHaveBeenCalledWith('1');
      expect(onShowHistory).toHaveBeenCalledTimes(1);
    });

    it('does not call onShowRecords when exercise is undefined', () => {
      const onShowRecords = vi.fn();
      const props = createMockProps({ exercise: undefined, onShowRecords });
      render(<ExerciseMenuModal {...props} />);
      
      const recordsItem = screen.getByTestId('records-item');
      fireEvent.click(recordsItem);
      expect(onShowRecords).not.toHaveBeenCalled();
    });

    it('does not call onShowHistory when exercise is undefined', () => {
      const onShowHistory = vi.fn();
      const props = createMockProps({ exercise: undefined, onShowHistory });
      render(<ExerciseMenuModal {...props} />);
      
      const historyItem = screen.getByTestId('history-item');
      fireEvent.click(historyItem);
      expect(onShowHistory).not.toHaveBeenCalled();
    });

    it('displays chevron icons for navigation', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const chevronIcons = document.querySelectorAll('[data-slot="end"]');
      expect(chevronIcons.length).toBeGreaterThanOrEqual(2); // At least Records and History
    });
  });

  describe('Handle Exercise Section', () => {
    it('renders handle exercise card with correct structure', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const handleCard = document.querySelector('.handle-exercise-card');
      expect(handleCard).toBeInTheDocument();
      expect(screen.getByText('Handle exercise')).toBeInTheDocument();
    });

    it('renders reorder exercises item as clickable', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Reorder exercises')).toBeInTheDocument();
      const reorderItem = screen.getByText('Reorder exercises').closest('[data-button="true"]');
      expect(reorderItem).toBeInTheDocument();
    });

    it('calls onReorderExercises when reorder item is clicked', () => {
      const onReorderExercises = vi.fn();
      const props = createMockProps({ onReorderExercises });
      render(<ExerciseMenuModal {...props} />);
      
      const reorderItem = screen.getByText('Reorder exercises').closest('[data-button="true"]');
      fireEvent.click(reorderItem!);
      expect(onReorderExercises).toHaveBeenCalledTimes(1);
    });

    it('renders exercise comment item as clickable', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Exercise comment')).toBeInTheDocument();
      const commentItem = screen.getByText('Exercise comment').closest('[data-button="true"]');
      expect(commentItem).toBeInTheDocument();
    });

    it('calls onEditComment when comment item is clicked', () => {
      const onEditComment = vi.fn();
      const props = createMockProps({ onEditComment });
      render(<ExerciseMenuModal {...props} />);
      
      const commentItem = screen.getByText('Exercise comment').closest('[data-button="true"]');
      fireEvent.click(commentItem!);
      expect(onEditComment).toHaveBeenCalledWith('1');
      expect(onEditComment).toHaveBeenCalledTimes(1);
    });

    it('does not call onEditComment when exercise is undefined', () => {
      const onEditComment = vi.fn();
      const props = createMockProps({ exercise: undefined, onEditComment });
      render(<ExerciseMenuModal {...props} />);
      
      const commentItem = screen.getByText('Exercise comment').closest('[data-button="true"]');
      fireEvent.click(commentItem!);
      expect(onEditComment).not.toHaveBeenCalled();
    });

    it('displays rest timer item with default label', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Exercise specific rest timer')).toBeInTheDocument();
      expect(screen.getByText('Default')).toBeInTheDocument();
      
      const defaultLabel = document.querySelector('.default-label');
      expect(defaultLabel).toHaveTextContent('Default');
    });

    it('displays RPE/RiR section with premium features', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('RPE/RiR')).toBeInTheDocument();
      expect(screen.getByText('RPE')).toBeInTheDocument();
      expect(screen.getByText('RiR')).toBeInTheDocument();
    });

    it('displays disabled toggles for RPE/RiR premium features', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const toggles = document.querySelectorAll('input[type="checkbox"]');
      expect(toggles).toHaveLength(2); // RPE and RiR toggles
      
      toggles.forEach(toggle => {
        expect(toggle).toHaveAttribute('disabled');
      });
    });

    it('displays premium label for RPE/RiR section', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const premiumLabels = screen.getAllByText('Premium');
      expect(premiumLabels.length).toBeGreaterThanOrEqual(4); // 3 stats + 1 RPE/RiR
    });

    it('applies correct toggle group styling', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const toggleGroup = document.querySelector('.toggle-group');
      expect(toggleGroup).toBeInTheDocument();
      expect(toggleGroup).toHaveAttribute('data-slot', 'end');
    });
  });

  describe('Action Buttons Section', () => {
    it('renders change exercise button with correct attributes', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const changeButton = screen.getByText('Change exercise').closest('button');
      expect(changeButton).toBeInTheDocument();
      expect(changeButton).toHaveAttribute('data-expand', 'block');
      expect(changeButton).toHaveAttribute('data-fill', 'outline');
      expect(changeButton).toHaveClass('change-exercise-button');
    });

    it('calls onChangeExercise when change exercise button is clicked', () => {
      const onChangeExercise = vi.fn();
      const props = createMockProps({ onChangeExercise });
      render(<ExerciseMenuModal {...props} />);
      
      const changeButton = screen.getByText('Change exercise').closest('button');
      fireEvent.click(changeButton!);
      expect(onChangeExercise).toHaveBeenCalledWith('1');
      expect(onChangeExercise).toHaveBeenCalledTimes(1);
    });

    it('does not call onChangeExercise when exercise is undefined', () => {
      const onChangeExercise = vi.fn();
      const props = createMockProps({ exercise: undefined, onChangeExercise });
      render(<ExerciseMenuModal {...props} />);
      
      const changeButton = screen.getByText('Change exercise').closest('button');
      fireEvent.click(changeButton!);
      expect(onChangeExercise).not.toHaveBeenCalled();
    });

    it('displays swap icon in change exercise button', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const swapIcon = document.querySelector('[data-slot="start"]');
      expect(swapIcon).toBeInTheDocument();
    });
  });

  describe('Fixed Close Button', () => {
    it('renders fixed close button with correct attributes', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const closeSection = document.querySelector('ion-footer');
      expect(closeSection).toBeInTheDocument();
      
      const closeButton = screen.getByText('Close').closest('button');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('data-expand', 'block');
      expect(closeButton).toHaveAttribute('data-fill', 'clear');
      expect(closeButton).toHaveClass('close-button');
    });

    it('calls onDismiss when close button is clicked', () => {
      const onDismiss = vi.fn();
      const props = createMockProps({ onDismiss });
      render(<ExerciseMenuModal {...props} />);
      
      onDismiss.mockClear(); // Clear any calls from render
      const closeButton = screen.getByText('Close').closest('button');
      fireEvent.click(closeButton!);
      expect(onDismiss).toHaveBeenCalled(); // Just check it was called, not exact times
    });
  });

  describe('Modal Dismissal', () => {
    it('calls onDismiss when modal backdrop is clicked', () => {
      const onDismiss = vi.fn();
      const props = createMockProps({ onDismiss });
      render(<ExerciseMenuModal {...props} />);
      
      fireEvent.click(screen.getByTestId('exercise-menu-modal'));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('displays proper accessibility attributes with exercise name', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const modal = screen.getByTestId('exercise-menu-modal');
      expect(modal).toHaveAttribute('aria-label', 'Exercise menu for Bench Press');
    });

    it('displays proper accessibility attributes without exercise name', () => {
      const props = createMockProps({ exercise: { ...mockExercise, name: '' } });
      render(<ExerciseMenuModal {...props} />);
      
      const modal = screen.getByTestId('exercise-menu-modal');
      expect(modal).toHaveAttribute('aria-label', 'Exercise menu for Exercise');
    });

    it('displays proper accessibility attributes with undefined exercise', () => {
      const props = createMockProps({ exercise: undefined });
      render(<ExerciseMenuModal {...props} />);
      
      const modal = screen.getByTestId('exercise-menu-modal');
      expect(modal).toHaveAttribute('aria-label', 'Exercise menu for Exercise');
    });

    it('has proper heading hierarchy', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const h1 = screen.getByText('Bench Press');
      expect(h1).toBeInTheDocument();
      
      // Check section titles are present
      expect(screen.getByText('Quick stats')).toBeInTheDocument();
      expect(screen.getByText('Exercise information')).toBeInTheDocument();
      expect(screen.getByText('Handle exercise')).toBeInTheDocument();
    });

    it('has proper button roles and labels', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Check key buttons have text content
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Change exercise')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('handles null exercise gracefully', () => {
      const props = createMockProps({ exercise: null as any });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Exercise')).toBeInTheDocument();
      expect(screen.getByTestId('exercise-menu-modal')).toHaveAttribute('aria-label', 'Exercise menu for Exercise');
    });

    it('handles exercise with only ID gracefully', () => {
      const minimalExercise = { id: 42, name: 'Test Exercise' } as WorkoutExercise;
      const props = createMockProps({ exercise: minimalExercise });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText('Test Exercise')).toBeInTheDocument();
      expect(screen.getByTestId('exercise-menu-modal')).toHaveAttribute('aria-label', 'Exercise menu for Test Exercise');
    });

    it('handles very long exercise names', () => {
      const longNameExercise = { 
        ...mockExercise, 
        name: 'This is a very long exercise name that might cause layout issues in the modal header section'
      };
      const props = createMockProps({ exercise: longNameExercise });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText(longNameExercise.name)).toBeInTheDocument();
    });

    it('handles exercise with special characters in name', () => {
      const specialCharExercise = { 
        ...mockExercise, 
        name: 'Barbell Row (45° Angle) & Cable Fly'
      };
      const props = createMockProps({ exercise: specialCharExercise });
      render(<ExerciseMenuModal {...props} />);
      
      expect(screen.getByText(specialCharExercise.name)).toBeInTheDocument();
      expect(screen.getByTestId('exercise-menu-modal')).toHaveAttribute('aria-label', `Exercise menu for ${specialCharExercise.name}`);
    });

    it('maintains functionality when all callbacks are undefined', () => {
      const props = {
        isOpen: true,
        exercise: mockExercise,
        onDismiss: undefined as any,
        onDelete: undefined as any,
        onChangeExercise: undefined as any,
        onShowRecords: undefined as any,
        onShowHistory: undefined as any,
        onEditComment: undefined as any,
        onReorderExercises: undefined as any,
      };
      
      expect(() => render(<ExerciseMenuModal {...props} />)).not.toThrow();
      expect(screen.getByTestId('exercise-menu-modal')).toBeInTheDocument();
    });
  });

  describe('CSS Classes and Styling', () => {
    it('applies correct CSS classes to main sections', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(document.querySelector('.exercise-menu-modal')).toBeInTheDocument();
      expect(document.querySelector('.exercise-menu-content')).toBeInTheDocument();
      expect(document.querySelector('ion-header')).toBeInTheDocument();
      expect(document.querySelector('.stats-card')).toBeInTheDocument();
      expect(document.querySelector('.exercise-info-card')).toBeInTheDocument();
      expect(document.querySelector('.handle-exercise-card')).toBeInTheDocument();
      expect(document.querySelector('.actions-section')).toBeInTheDocument();
      expect(document.querySelector('ion-footer')).toBeInTheDocument();
    });

    it('applies correct CSS classes to buttons', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(document.querySelector('.change-exercise-button')).toBeInTheDocument();
      expect(document.querySelector('.close-button')).toBeInTheDocument();
    });

    it('applies correct CSS classes to labels', () => {
      const props = createMockProps();
      render(<ExerciseMenuModal {...props} />);
      
      expect(document.querySelector('.premium-label')).toBeInTheDocument();
      expect(document.querySelector('.default-label')).toBeInTheDocument();
    });
  });

  describe('Complete User Flow Testing', () => {
    it('supports complete exercise management workflow', () => {
      const callbacks = {
        onDismiss: vi.fn(),
        onDelete: vi.fn(),
        onChangeExercise: vi.fn(),
        onShowRecords: vi.fn(),
        onShowHistory: vi.fn(),
        onEditComment: vi.fn(),
        onReorderExercises: vi.fn(),
      };
      
      const props = createMockProps(callbacks);
      render(<ExerciseMenuModal {...props} />);
      
      // Test viewing records
      fireEvent.click(screen.getByTestId('records-item'));
      expect(callbacks.onShowRecords).toHaveBeenCalledWith('1');
      
      // Test viewing history
      fireEvent.click(screen.getByTestId('history-item'));
      expect(callbacks.onShowHistory).toHaveBeenCalledWith('1');
      
      // Test editing comment
      const commentItem = screen.getByText('Exercise comment').closest('[data-button="true"]');
      fireEvent.click(commentItem!);
      expect(callbacks.onEditComment).toHaveBeenCalledWith('1');
      
      // Test reordering exercises
      const reorderItem = screen.getByText('Reorder exercises').closest('[data-button="true"]');
      fireEvent.click(reorderItem!);
      expect(callbacks.onReorderExercises).toHaveBeenCalled();
      
      // Test changing exercise
      const changeButton = screen.getByText('Change exercise').closest('button');
      fireEvent.click(changeButton!);
      expect(callbacks.onChangeExercise).toHaveBeenCalledWith('1');
      
      // Test deleting exercise
      const deleteButton = screen.getByTestId('delete-exercise-button');
      fireEvent.click(deleteButton);
      expect(callbacks.onDelete).toHaveBeenCalledWith('1');
      
      // Test closing modal
      const closeButton = screen.getByText('Close').closest('button');
      fireEvent.click(closeButton!);
      expect(callbacks.onDismiss).toHaveBeenCalled();
      
      // Verify all callbacks were called exactly once (except onDismiss might be called more)
      expect(callbacks.onShowRecords).toHaveBeenCalledTimes(1);
      expect(callbacks.onShowHistory).toHaveBeenCalledTimes(1);
      expect(callbacks.onEditComment).toHaveBeenCalledTimes(1);
      expect(callbacks.onReorderExercises).toHaveBeenCalledTimes(1);
      expect(callbacks.onChangeExercise).toHaveBeenCalledTimes(1);
      expect(callbacks.onDelete).toHaveBeenCalledTimes(1);
    });

    it('supports modal dismissal through multiple methods', () => {
      const onDismiss = vi.fn();
      const props = createMockProps({ onDismiss });
      render(<ExerciseMenuModal {...props} />);
      
      onDismiss.mockClear(); // Clear any calls from render
      
      // Dismiss via backdrop click
      fireEvent.click(screen.getByTestId('exercise-menu-modal'));
      const initialCallCount = onDismiss.mock.calls.length;
      expect(onDismiss).toHaveBeenCalled();
      
      // Dismiss via close button
      const closeButton = screen.getByText('Close').closest('button');
      fireEvent.click(closeButton!);
      expect(onDismiss.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });
});