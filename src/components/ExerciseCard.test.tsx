import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from './ExerciseCard';
import { WorkoutExercise } from '../types/workout';

// Mock Ionic components for testing
vi.mock('@ionic/react', async () => {
  const actual = await vi.importActual('@ionic/react');
  return {
    ...actual,
    IonCard: ({ children, className }: any) => <div className={className}>{children}</div>,
    IonCardHeader: ({ children }: any) => <div>{children}</div>,
    IonCardTitle: ({ children, className }: any) => <h2 className={className}>{children}</h2>,
    IonGrid: ({ children, className }: any) => <div className={className}>{children}</div>,
    IonRow: ({ children, className }: any) => <div className={className}>{children}</div>,
    IonCol: ({ children, size }: any) => <div data-size={size}>{children}</div>,
    IonButton: ({ children, onClick, disabled, className, 'aria-label': ariaLabel, 'aria-pressed': ariaPressed }: any) => (
      <button 
        onClick={onClick} 
        disabled={disabled} 
        className={className}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
      >
        {children}
      </button>
    ),
    IonIcon: ({ icon, 'aria-hidden': ariaHidden }: any) => <span aria-hidden={ariaHidden}>{icon}</span>,
    IonText: ({ children, className }: any) => <span className={className}>{children}</span>,
    IonChip: ({ children, className, color }: any) => <span className={className} data-color={color}>{children}</span>,
    IonLabel: ({ children }: any) => <span>{children}</span>
  };
});

describe('ExerciseCard', () => {
  const mockExercise: WorkoutExercise = {
    id: 1,
    name: 'Barbell Back Squat',
    sets: [
      { reps: 10, weight: 135, completed: false },
      { reps: 8, weight: 155, completed: true },
      { reps: 6, weight: 175, completed: false }
    ],
    primaryMuscles: ['Quads', 'Glutes'],
    secondaryMuscles: ['Back', 'Core'],
    restTime: 120
  };

  const mockHandlers = {
    onSetComplete: vi.fn(),
    onSetEdit: vi.fn(),
    onSetMenu: vi.fn(),
    onAddSet: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders exercise name correctly', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
  });

  it('renders primary muscles as chips', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    expect(screen.getByText('Quads')).toBeInTheDocument();
    expect(screen.getByText('Glutes')).toBeInTheDocument();
  });

  it('renders correct number of sets', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    // Check for set numbers
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays set values correctly', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    // Check reps values
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    
    // Check weight values
    expect(screen.getByText('135')).toBeInTheDocument();
    expect(screen.getByText('155')).toBeInTheDocument();
    expect(screen.getByText('175')).toBeInTheDocument();
  });

  it('displays completed sets with proper styling', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const setButtons = screen.getAllByRole('button');
    const completedSetButton = setButtons.find(button => 
      button.textContent?.includes('2') && button.classList.contains('completed')
    );
    
    expect(completedSetButton).toBeTruthy();
  });

  it('calls onSetComplete when set button is clicked', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const setButton = screen.getByRole('button', { 
      name: /Mark set 1 as complete/i 
    });
    fireEvent.click(setButton);
    
    expect(mockHandlers.onSetComplete).toHaveBeenCalledWith(0, 0);
  });

  it('calls onSetEdit when reps button is clicked', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const repsButton = screen.getByRole('button', { 
      name: /Edit reps for set 1, currently 10/i 
    });
    fireEvent.click(repsButton);
    
    expect(mockHandlers.onSetEdit).toHaveBeenCalledWith(0, 0, 'reps');
  });

  it('calls onSetEdit when weight button is clicked', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const weightButton = screen.getByRole('button', { 
      name: /Edit weight for set 1, currently 135 pounds/i 
    });
    fireEvent.click(weightButton);
    
    expect(mockHandlers.onSetEdit).toHaveBeenCalledWith(0, 0, 'weight');
  });

  it('calls onSetMenu when menu button is clicked', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const menuButton = screen.getByRole('button', { 
      name: /More options for set 1/i 
    });
    fireEvent.click(menuButton);
    
    expect(mockHandlers.onSetMenu).toHaveBeenCalledWith(
      expect.any(Object), // event object
      0, 
      0
    );
  });

  it('calls onAddSet when add set button is clicked', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    const addButton = screen.getByRole('button', { name: /Add a new set/i });
    fireEvent.click(addButton);
    
    expect(mockHandlers.onAddSet).toHaveBeenCalledWith(0);
  });

  it('disables set buttons when workout is not active', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        isWorkoutActive={false}
        {...mockHandlers}
      />
    );
    
    const setButton = screen.getByRole('button', { 
      name: /Mark set 1 as complete/i 
    });
    expect(setButton).toBeDisabled();
  });

  it('enables set buttons when workout is active', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        isWorkoutActive={true}
        {...mockHandlers}
      />
    );
    
    const setButton = screen.getByRole('button', { 
      name: /Mark set 1 as complete/i 
    });
    expect(setButton).not.toBeDisabled();
  });

  it('has proper accessibility attributes', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
      />
    );
    
    // Check aria-pressed on completed set
    const completedSetButton = screen.getByRole('button', { 
      name: /Mark set 2 as incomplete/i 
    });
    expect(completedSetButton).toHaveAttribute('aria-pressed', 'true');
    
    // Check aria-hidden on icons (they are now span elements in our mock)
    const hiddenSpans = document.querySelectorAll('span[aria-hidden="true"]');
    expect(hiddenSpans.length).toBeGreaterThan(0);
  });

  it('handles exercise with minimal muscle data', () => {
    const minimalExercise: WorkoutExercise = {
      id: 2,
      name: 'Test Exercise',
      sets: [{ reps: 5, weight: 50, completed: false }],
      primaryMuscles: ['Unknown'],
      restTime: 60
    };

    render(
      <ExerciseCard
        exercise={minimalExercise}
        exerciseIndex={1}
        {...mockHandlers}
      />
    );
    
    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
    expect(screen.getByText('Unknown')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('handles exercise with no secondary muscles', () => {
    const exerciseWithoutSecondary: WorkoutExercise = {
      id: 3,
      name: 'Simple Exercise',
      sets: [{ reps: 12, weight: 25, completed: false }],
      primaryMuscles: ['Arms'],
      restTime: 90
    };

    render(
      <ExerciseCard
        exercise={exerciseWithoutSecondary}
        exerciseIndex={2}
        {...mockHandlers}
      />
    );
    
    expect(screen.getByText('Simple Exercise')).toBeInTheDocument();
    expect(screen.getByText('Arms')).toBeInTheDocument();
  });

  it('uses default isWorkoutActive value when not provided', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        exerciseIndex={0}
        {...mockHandlers}
        // isWorkoutActive not provided, should default to true
      />
    );
    
    const setButton = screen.getByRole('button', { 
      name: /Mark set 1 as complete/i 
    });
    expect(setButton).not.toBeDisabled();
  });
});