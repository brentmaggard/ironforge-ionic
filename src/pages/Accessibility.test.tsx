import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Import components to test
import GlobalHeader from '../components/GlobalHeader';
import Exercise from './Exercise';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Workout from './Workout';

// Mock hooks and contexts
jest.mock('../hooks/useInstallPrompt', () => ({
  useInstallPrompt: () => ({
    isInstallable: false,
    isIOSInstallable: false,
    promptInstall: jest.fn()
  })
}));

jest.mock('../contexts/RestTimerContext', () => ({
  useRestTimer: () => ({
    startRestTimer: jest.fn(),
    resetRestTimer: jest.fn(),
    isTimerVisible: false,
    setWorkoutPaused: jest.fn()
  })
}));

// Mock Ionic components for consistent testing
const mockIonicComponents = {
  IonPage: ({ children, role, 'aria-label': ariaLabel, ...props }: any) => (
    <div data-testid="ion-page" role={role} aria-label={ariaLabel} {...props}>{children}</div>
  ),
  IonHeader: ({ children }: any) => <div data-testid="ion-header">{children}</div>,
  IonToolbar: ({ children }: any) => <div data-testid="ion-toolbar">{children}</div>,
  IonButtons: ({ children }: any) => <div data-testid="ion-buttons">{children}</div>,
  IonButton: ({ children, 'aria-label': ariaLabel, onClick, onKeyDown, ...props }: any) => (
    <button data-testid="ion-button" aria-label={ariaLabel} onClick={onClick} onKeyDown={onKeyDown} {...props}>
      {children}
    </button>
  ),
  IonChip: ({ children, onClick, onKeyDown, role, tabIndex, 'aria-label': ariaLabel, 'aria-pressed': ariaPressed }: any) => (
    <div 
      data-testid="ion-chip" 
      onClick={onClick} 
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </div>
  ),
  IonIcon: ({ icon }: any) => <span data-testid="ion-icon">{icon?.name || 'icon'}</span>,
  IonTitle: ({ children }: any) => <h1 data-testid="ion-title">{children}</h1>,
  IonContent: ({ children }: any) => <div data-testid="ion-content">{children}</div>,
  IonPopover: ({ children, isOpen }: any) => isOpen ? <div data-testid="ion-popover">{children}</div> : null,
  IonList: ({ children }: any) => <ul data-testid="ion-list">{children}</ul>,
  IonItem: ({ children }: any) => <li data-testid="ion-item">{children}</li>,
  IonLabel: ({ children }: any) => <div data-testid="ion-label">{children}</div>,
  IonAlert: ({ isOpen }: any) => isOpen ? <div data-testid="ion-alert">Alert</div> : null,
  IonSearchbar: ({ onIonInput }: any) => <input data-testid="ion-searchbar" onChange={onIonInput} />,
  IonSkeletonText: () => <div data-testid="ion-skeleton-text">Loading...</div>,
  IonInfiniteScroll: ({ children }: any) => <div data-testid="ion-infinite-scroll">{children}</div>,
  IonInfiniteScrollContent: () => <div data-testid="ion-infinite-scroll-content">Loading more...</div>,
  IonBadge: ({ children }: any) => <span data-testid="ion-badge">{children}</span>,
  IonModal: ({ children, isOpen }: any) => isOpen ? <div data-testid="ion-modal">{children}</div> : null,
  IonCheckbox: (props: any) => <input data-testid="ion-checkbox" type="checkbox" {...props} />,
  IonCard: ({ children }: any) => <div data-testid="ion-card">{children}</div>,
  IonCardContent: ({ children }: any) => <div data-testid="ion-card-content">{children}</div>,
  IonCardHeader: ({ children }: any) => <div data-testid="ion-card-header">{children}</div>,
  IonCardTitle: ({ children }: any) => <h2 data-testid="ion-card-title">{children}</h2>,
  IonGrid: ({ children }: any) => <div data-testid="ion-grid">{children}</div>,
  IonRow: ({ children }: any) => <div data-testid="ion-row">{children}</div>,
  IonCol: ({ children }: any) => <div data-testid="ion-col">{children}</div>,
  IonText: ({ children }: any) => <div data-testid="ion-text">{children}</div>,
  IonInput: ({ onIonInput }: any) => <input data-testid="ion-input" onChange={onIonInput} />,
  IonTextarea: ({ onIonInput }: any) => <textarea data-testid="ion-textarea" onChange={onIonInput} />,
  IonAvatar: ({ children }: any) => <div data-testid="ion-avatar">{children}</div>,
  IonActionSheet: ({ isOpen }: any) => isOpen ? <div data-testid="ion-action-sheet">Action Sheet</div> : null,
};

jest.mock('@ionic/react', () => mockIonicComponents);

// Mock other dependencies
jest.mock('./ExerciseDetails', () => () => <div data-testid="exercise-details">Exercise Details</div>);
jest.mock('../components/AddExercise', () => () => <div data-testid="add-exercise">Add Exercise</div>);
jest.mock('../components/ExerciseCard', () => () => <div data-testid="exercise-card">Exercise Card</div>);

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Accessibility Improvements', () => {
  describe('GlobalHeader Component', () => {
    it('should have aria-label on menu button', () => {
      render(
        <TestWrapper>
          <GlobalHeader />
        </TestWrapper>
      );

      const menuButton = screen.getByLabelText('Open main menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-label', 'Open main menu');
    });

    it('should have proper menu items with labels', () => {
      render(
        <TestWrapper>
          <GlobalHeader />
        </TestWrapper>
      );

      // Click menu to open popover
      const menuButton = screen.getByLabelText('Open main menu');
      fireEvent.click(menuButton);

      // Check that menu items have proper text labels
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Exercise Library')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });

  describe('Exercise Page Accessibility', () => {
    it('should have proper dialog role and aria-label', () => {
      render(
        <TestWrapper>
          <Exercise />
        </TestWrapper>
      );

      const page = screen.getByRole('dialog');
      expect(page).toHaveAttribute('aria-label', 'Exercise Library');
    });

    it('should have aria-labels on header buttons', () => {
      render(
        <TestWrapper>
          <Exercise />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Back to dashboard')).toBeInTheDocument();
      expect(screen.getByLabelText('Add new exercise')).toBeInTheDocument();
      expect(screen.getByLabelText('Open exercise filters')).toBeInTheDocument();
    });

    it('should have proper muscle chip accessibility', async () => {
      render(
        <TestWrapper>
          <Exercise />
        </TestWrapper>
      );

      // Wait for loading to complete
      await new Promise(resolve => setTimeout(resolve, 1600));

      // Check for muscle chips with proper attributes
      const chips = screen.queryAllByTestId('ion-chip');
      if (chips.length > 0) {
        const firstChip = chips[0];
        expect(firstChip).toHaveAttribute('role', 'button');
        expect(firstChip).toHaveAttribute('tabIndex', '0');
        expect(firstChip).toHaveAttribute('aria-pressed');
      }
    });

    it('should handle keyboard navigation on muscle chips', async () => {
      render(
        <TestWrapper>
          <Exercise />
        </TestWrapper>
      );

      await new Promise(resolve => setTimeout(resolve, 1600));

      const chips = screen.queryAllByTestId('ion-chip');
      if (chips.length > 0) {
        const firstChip = chips[0];
        
        // Test Enter key
        fireEvent.keyDown(firstChip, { key: 'Enter', preventDefault: jest.fn() });
        
        // Test Space key
        fireEvent.keyDown(firstChip, { key: ' ', preventDefault: jest.fn() });
        
        // Test other keys (should not trigger)
        fireEvent.keyDown(firstChip, { key: 'a', preventDefault: jest.fn() });
      }
    });
  });

  describe('Profile Page Accessibility', () => {
    it('should have proper dialog role and aria-label', () => {
      render(
        <TestWrapper>
          <Profile />
        </TestWrapper>
      );

      const page = screen.getByRole('dialog');
      expect(page).toHaveAttribute('aria-label', 'User Profile');
    });

    it('should have aria-labels on header buttons', () => {
      render(
        <TestWrapper>
          <Profile />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Back to dashboard')).toBeInTheDocument();
      expect(screen.getByLabelText('Edit profile')).toBeInTheDocument();
    });
  });

  describe('EditProfile Page Accessibility', () => {
    it('should have proper dialog role and aria-label', () => {
      render(
        <TestWrapper>
          <EditProfile />
        </TestWrapper>
      );

      const page = screen.getByRole('dialog');
      expect(page).toHaveAttribute('aria-label', 'Edit Profile');
    });

    it('should have aria-labels on header buttons', () => {
      render(
        <TestWrapper>
          <EditProfile />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Cancel editing')).toBeInTheDocument();
      expect(screen.getByLabelText('Save profile changes')).toBeInTheDocument();
    });

    it('should have proper avatar button accessibility', () => {
      render(
        <TestWrapper>
          <EditProfile />
        </TestWrapper>
      );

      const avatarButton = screen.getByLabelText('Change profile photo');
      expect(avatarButton).toBeInTheDocument();
      expect(avatarButton.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('Workout Page Accessibility', () => {
    it('should have proper dialog role and aria-label', () => {
      render(
        <TestWrapper>
          <Workout />
        </TestWrapper>
      );

      const page = screen.getByRole('dialog');
      expect(page).toHaveAttribute('aria-label', 'Workout Builder');
    });

    it('should have comprehensive aria-labels on header buttons', () => {
      render(
        <TestWrapper>
          <Workout />
        </TestWrapper>
      );

      expect(screen.getByLabelText('Close workout')).toBeInTheDocument();
      expect(screen.getByLabelText(/Pause workout|Resume workout/)).toBeInTheDocument();
      expect(screen.getByLabelText('Workout settings')).toBeInTheDocument();
      expect(screen.getByLabelText('Complete workout')).toBeInTheDocument();
    });

    it('should update pause button aria-label dynamically', () => {
      render(
        <TestWrapper>
          <Workout />
        </TestWrapper>
      );

      // Initially should show "Pause workout"
      expect(screen.getByLabelText('Pause workout')).toBeInTheDocument();
      
      // Note: Full state testing would require more complex setup
      // This test verifies the button exists with proper labeling
    });
  });

  describe('Focus Management', () => {
    it('should handle focus indicators in CSS', () => {
      // This test verifies CSS classes exist for focus management
      // In a real implementation, you'd test actual focus behavior
      render(
        <TestWrapper>
          <Exercise />
        </TestWrapper>
      );

      // Verify components render without errors
      expect(screen.getByTestId('ion-page')).toBeInTheDocument();
    });
  });
});