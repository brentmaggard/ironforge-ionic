import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Workout from '../pages/Workout';
import { RestTimerProvider } from '../contexts/RestTimerContext';

// Mock Ionic components with skeleton text support
vi.mock('@ionic/react', async () => {
  const actual = await vi.importActual('@ionic/react');
  return {
    ...actual,
    IonContent: ({ children, ...props }: any) => <div data-testid="ion-content" {...props}>{children}</div>,
    IonPage: ({ children, ...props }: any) => <div data-testid="ion-page" {...props}>{children}</div>,
    IonHeader: ({ children, ...props }: any) => <div data-testid="ion-header" {...props}>{children}</div>,
    IonToolbar: ({ children, ...props }: any) => <div data-testid="ion-toolbar" {...props}>{children}</div>,
    IonTitle: ({ children, ...props }: any) => <div data-testid="ion-title" {...props}>{children}</div>,
    IonButtons: ({ children, ...props }: any) => <div data-testid="ion-buttons" {...props}>{children}</div>,
    IonButton: ({ children, onClick, fill, ...props }: any) => (
      <button data-testid="ion-button" onClick={onClick} data-fill={fill} {...props}>{children}</button>
    ),
    IonIcon: ({ icon, style, ...props }: any) => <span data-testid="ion-icon" data-icon={icon} style={style} {...props} />,
    IonCard: ({ children, button, onClick, ...props }: any) => (
      button ? 
        <button data-testid="ion-card" onClick={onClick} {...props}>{children}</button> :
        <div data-testid="ion-card" {...props}>{children}</div>
    ),
    IonCardContent: ({ children, ...props }: any) => <div data-testid="ion-card-content" {...props}>{children}</div>,
    IonCardHeader: ({ children, ...props }: any) => <div data-testid="ion-card-header" {...props}>{children}</div>,
    IonItem: ({ children, button, onClick, ...props }: any) => (
      button ? 
        <button data-testid="ion-item" onClick={onClick} {...props}>{children}</button> :
        <div data-testid="ion-item" {...props}>{children}</div>
    ),
    IonLabel: ({ children, ...props }: any) => <span data-testid="ion-label" {...props}>{children}</span>,
    IonText: ({ children, ...props }: any) => <span data-testid="ion-text" {...props}>{children}</span>,
    IonGrid: ({ children, ...props }: any) => <div data-testid="ion-grid" {...props}>{children}</div>,
    IonRow: ({ children, ...props }: any) => <div data-testid="ion-row" {...props}>{children}</div>,
    IonCol: ({ children, ...props }: any) => <div data-testid="ion-col" {...props}>{children}</div>,
    IonAlert: ({ isOpen, buttons, onDidDismiss, ...props }: any) => 
      isOpen ? (
        <div data-testid="ion-alert" {...props}>
          {buttons?.map((btn: any, idx: number) => (
            <button key={idx} onClick={() => btn.handler?.() || onDidDismiss?.()}>{btn.text}</button>
          ))}
        </div>
      ) : null,
    IonActionSheet: ({ isOpen, buttons, onDidDismiss, ...props }: any) => 
      isOpen ? (
        <div data-testid="ion-action-sheet" {...props}>
          {buttons?.map((btn: any, idx: number) => (
            <button key={idx} onClick={() => btn.handler?.() || onDidDismiss?.()}>{btn.text}</button>
          ))}
        </div>
      ) : null,
    IonPopover: ({ children, isOpen, onDidDismiss, ...props }: any) => 
      isOpen ? (
        <div data-testid="ion-popover" onClick={onDidDismiss} {...props}>{children}</div>
      ) : null,
    IonInput: ({ value, onIonInput, ...props }: any) => (
      <input 
        data-testid="ion-input"
        value={value}
        onChange={(e) => onIonInput?.({ detail: { value: e.target.value } })}
        {...props}
      />
    ),
    IonList: ({ children, ...props }: any) => <div data-testid="ion-list" {...props}>{children}</div>,
    IonSkeletonText: ({ style, animated, ...props }: any) => (
      <div data-testid="ion-skeleton-text" style={style} data-animated={animated} {...props}>
        Loading...
      </div>
    ),
    IonInfiniteScroll: ({ children, onIonInfinite, disabled, ...props }: any) => (
      <div 
        data-testid="ion-infinite-scroll" 
        data-disabled={disabled}
        onClick={() => !disabled && onIonInfinite?.({ target: { complete: vi.fn() } })}
        {...props}
      >
        {children}
      </div>
    ),
    IonInfiniteScrollContent: ({ loadingSpinner, loadingText, ...props }: any) => (
      <div data-testid="ion-infinite-scroll-content" data-spinner={loadingSpinner} {...props}>
        {loadingText}
      </div>
    ),
  };
});

// Mock AddExercise component
vi.mock('../components/AddExercise', () => ({
  default: ({ isOpen, onClose, onAddExercise }: any) => 
    isOpen ? (
      <div data-testid="add-exercise-modal">
        <div>Add Exercise Modal</div>
        <div data-testid="skeleton-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} data-testid="ion-skeleton-text">Loading exercise...</div>
          ))}
        </div>
        <button onClick={() => onAddExercise({ 
          id: 'test-exercise', 
          name: 'Test Exercise',
          muscleGroups: ['Test'],
          primaryMuscles: ['Test'],
          secondaryMuscles: []
        })}>
          Add Test Exercise
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <RestTimerProvider>
      {children}
    </RestTimerProvider>
  </BrowserRouter>
);

describe('Exercise Selection Flow Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('integrates AddExercise modal with skeleton loading in workout flow', async () => {
    render(
      <TestWrapper>
        <Workout />
      </TestWrapper>
    );

    // Should show empty state initially
    expect(screen.getByText('Ready to Build Your Workout?')).toBeInTheDocument();
    expect(screen.getByText('Add Your First Exercise')).toBeInTheDocument();

    // Click add exercise button
    fireEvent.click(screen.getByText('Add Your First Exercise'));

    // Should show AddExercise modal with skeletons
    expect(screen.getByTestId('add-exercise-modal')).toBeInTheDocument();
    expect(screen.getAllByTestId('ion-skeleton-text')).toHaveLength(8);

    // Add an exercise
    fireEvent.click(screen.getByText('Add Test Exercise'));

    // Should close modal and show exercise in workout
    await waitFor(() => {
      expect(screen.queryByTestId('add-exercise-modal')).not.toBeInTheDocument();
      expect(screen.getByText('Test Exercise')).toBeInTheDocument();
    });
  });

  it('handles workout timer and exercise addition flow', async () => {
    render(
      <TestWrapper>
        <Workout />
      </TestWrapper>
    );

    // Timer should be running (starts at 00:00:00)
    expect(screen.getByText('00:00:00')).toBeInTheDocument();

    // Advance timer
    act(() => {
      vi.advanceTimersByTime(5000); // 5 seconds
    });

    await waitFor(() => {
      expect(screen.getByText('00:00:05')).toBeInTheDocument();
    });

    // Add exercise and verify it appears
    fireEvent.click(screen.getByText('Add Your First Exercise'));
    fireEvent.click(screen.getByText('Add Test Exercise'));

    await waitFor(() => {
      expect(screen.getByText('Test Exercise')).toBeInTheDocument();
      expect(screen.getByText('Active • 1 exercises')).toBeInTheDocument();
    });
  });

  it('handles empty state to exercise list transition', async () => {
    render(
      <TestWrapper>
        <Workout />
      </TestWrapper>
    );

    // Verify empty state
    expect(screen.getByText('Ready to Build Your Workout?')).toBeInTheDocument();
    
    // Add exercise
    fireEvent.click(screen.getByText('Add Your First Exercise'));
    fireEvent.click(screen.getByText('Add Test Exercise'));

    // Should transition from empty state to exercise list
    await waitFor(() => {
      expect(screen.queryByText('Ready to Build Your Workout?')).not.toBeInTheDocument();
      expect(screen.getByText('Test Exercise')).toBeInTheDocument();
      expect(screen.getByText('Exercise')).toBeInTheDocument(); // Exercise button should appear
    });
  });

  it('maintains workout state during exercise selection', async () => {
    render(
      <TestWrapper>
        <Workout />
      </TestWrapper>
    );

    // Start timer
    act(() => {
      vi.advanceTimersByTime(10000); // 10 seconds
    });

    await waitFor(() => {
      expect(screen.getByText('00:00:10')).toBeInTheDocument();
    });

    // Open and close AddExercise modal
    fireEvent.click(screen.getByText('Add Your First Exercise'));
    expect(screen.getByTestId('add-exercise-modal')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Close'));

    // Timer should continue running
    await waitFor(() => {
      expect(screen.queryByTestId('add-exercise-modal')).not.toBeInTheDocument();
      expect(screen.getByText('00:00:10')).toBeInTheDocument(); // Timer preserved
    });
  });

  it('supports multiple exercise additions', async () => {
    render(
      <TestWrapper>
        <Workout />
      </TestWrapper>
    );

    // Add first exercise
    fireEvent.click(screen.getByText('Add Your First Exercise'));
    fireEvent.click(screen.getByText('Add Test Exercise'));

    await waitFor(() => {
      expect(screen.getByText('Test Exercise')).toBeInTheDocument();
    });

    // Add second exercise using Exercise button
    fireEvent.click(screen.getByText('Exercise'));
    fireEvent.click(screen.getByText('Add Test Exercise'));

    // Should have multiple exercises (but our mock adds the same one)
    await waitFor(() => {
      const testExercises = screen.getAllByText('Test Exercise');
      expect(testExercises).toHaveLength(2);
      expect(screen.getByText('Active • 2 exercises')).toBeInTheDocument();
    });
  });
});