import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Exercise from './Exercise';

// Mock Ionic components
jest.mock('@ionic/react', () => ({
  ...jest.requireActual('@ionic/react'),
  IonPage: ({ children }: any) => <div data-testid="ion-page">{children}</div>,
  IonContent: ({ children }: any) => <div data-testid="ion-content">{children}</div>,
  IonHeader: ({ children }: any) => <div data-testid="ion-header">{children}</div>,
  IonToolbar: ({ children }: any) => <div data-testid="ion-toolbar">{children}</div>,
  IonTitle: ({ children }: any) => <div data-testid="ion-title">{children}</div>,
  IonButtons: ({ children }: any) => <div data-testid="ion-buttons">{children}</div>,
  IonButton: ({ children, onClick, ...props }: any) => (
    <button data-testid="ion-button" onClick={onClick} {...props}>{children}</button>
  ),
  IonIcon: ({ icon }: any) => <div data-testid="ion-icon">{icon?.name || 'icon'}</div>,
  IonSearchbar: ({ onIonInput, ...props }: any) => (
    <input data-testid="ion-searchbar" onChange={onIonInput} {...props} />
  ),
  IonList: ({ children }: any) => <div data-testid="ion-list">{children}</div>,
  IonItem: ({ children }: any) => <div data-testid="ion-item">{children}</div>,
  IonLabel: ({ children }: any) => <div data-testid="ion-label">{children}</div>,
  IonChip: ({ children, onClick }: any) => (
    <div data-testid="ion-chip" onClick={onClick}>{children}</div>
  ),
  IonBadge: ({ children }: any) => <div data-testid="ion-badge">{children}</div>,
  IonSkeletonText: ({ style }: any) => (
    <div data-testid="ion-skeleton-text" style={style}>Loading...</div>
  ),
  IonInfiniteScroll: ({ children, onIonInfinite, disabled }: any) => (
    <div data-testid="ion-infinite-scroll" data-disabled={disabled}>
      {children}
      <button onClick={onIonInfinite}>Load More</button>
    </div>
  ),
  IonInfiniteScrollContent: ({ loadingText }: any) => (
    <div data-testid="ion-infinite-scroll-content">{loadingText}</div>
  ),
  IonModal: ({ children, isOpen }: any) => isOpen ? <div data-testid="ion-modal">{children}</div> : null,
  IonPopover: ({ children, isOpen }: any) => isOpen ? <div data-testid="ion-popover">{children}</div> : null,
  IonCheckbox: (props: any) => <input data-testid="ion-checkbox" type="checkbox" {...props} />,
}));

// Mock ExerciseDetails component
jest.mock('./ExerciseDetails', () => {
  return function MockExerciseDetails() {
    return <div data-testid="exercise-details">Exercise Details Modal</div>;
  };
});

const ExerciseWrapper = () => (
  <BrowserRouter>
    <Exercise />
  </BrowserRouter>
);

describe('Exercise Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<ExerciseWrapper />);
    expect(screen.getByTestId('ion-page')).toBeInTheDocument();
  });

  it('shows loading skeleton initially', () => {
    render(<ExerciseWrapper />);
    expect(screen.getAllByTestId('ion-skeleton-text')).toHaveLength(20); // 5 items × 4 skeletons each
  });

  it('shows exercises after loading', async () => {
    render(<ExerciseWrapper />);
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Check that exercises are displayed
    expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    expect(screen.getByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Deadlift')).toBeInTheDocument();
  });

  it('has search functionality', async () => {
    render(<ExerciseWrapper />);
    
    // Wait for loading
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    const searchbar = screen.getByTestId('ion-searchbar');
    fireEvent.change(searchbar, { target: { value: 'squat' } });

    // The search functionality should filter results
    expect(searchbar).toHaveValue('squat');
  });

  it('displays muscle group chips that are clickable', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    const muscleChips = screen.getAllByTestId('ion-chip');
    expect(muscleChips.length).toBeGreaterThan(0);

    // Test clicking a muscle chip
    fireEvent.click(muscleChips[0]);
  });

  it('shows infinite scroll when not loading', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByTestId('ion-infinite-scroll')).toBeInTheDocument();
    expect(screen.getByText('Loading more exercises...')).toBeInTheDocument();
  });

  it('loads more exercises when infinite scroll is triggered', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Initially shows 20 exercises (but we only have 10 total)
    const initialItems = screen.getAllByTestId('ion-item');
    const initialExerciseCount = initialItems.length - 1; // Subtract search item

    // Trigger infinite scroll
    const infiniteScroll = screen.getByTestId('ion-infinite-scroll');
    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);

    // Since we only have 10 exercises total, count shouldn't increase
    await waitFor(() => {
      const finalItems = screen.getAllByTestId('ion-item');
      const finalExerciseCount = finalItems.length - 1;
      expect(finalExerciseCount).toBe(initialExerciseCount);
    });
  });

  it('disables infinite scroll when all exercises are loaded', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    const infiniteScroll = screen.getByTestId('ion-infinite-scroll');
    expect(infiniteScroll.dataset.disabled).toBe('true');
  });

  it('shows screen reader announcements for exercise count', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Check for screen reader announcement
    const announcement = screen.getByLabelText(/Showing .* of .* exercises/);
    expect(announcement).toBeInTheDocument();
  });

  it('displays completion badges for exercises', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    const badges = screen.getAllByTestId('ion-badge');
    expect(badges.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Logged workouts')).toHaveLength(20); // First 20 exercises displayed initially
  });

  it('has proper accessibility with header buttons', async () => {
    render(<ExerciseWrapper />);
    
    const buttons = screen.getAllByTestId('ion-button');
    expect(buttons.length).toBeGreaterThan(0);
    
    // Back button should be present
    expect(screen.getByTestId('ion-buttons')).toBeInTheDocument();
  });

  it('properly limits initial display count', async () => {
    render(<ExerciseWrapper />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('ion-skeleton-text')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Should initially show only first 20 exercises
    const exerciseItems = screen.getAllByTestId('ion-item');
    expect(exerciseItems.length).toBeLessThanOrEqual(21); // 20 exercises + 1 search item
  });
});