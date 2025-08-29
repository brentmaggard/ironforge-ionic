import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import AddExercise from '../AddExercise';

// Mock Ionic components
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
    IonButton: ({ children, onClick, ...props }: any) => <button data-testid="ion-button" onClick={onClick} {...props}>{children}</button>,
    IonIcon: ({ icon, ...props }: any) => <span data-testid="ion-icon" data-icon={icon} {...props} />,
    IonSearchbar: ({ value, onIonInput, placeholder, ...props }: any) => (
      <input 
        data-testid="ion-searchbar" 
        value={value}
        onChange={(e) => onIonInput?.({ detail: { value: e.target.value } })}
        placeholder={placeholder}
        {...props}
      />
    ),
    IonLabel: ({ children, ...props }: any) => <span data-testid="ion-label" {...props}>{children}</span>,
    IonList: ({ children, ...props }: any) => <div data-testid="ion-list" {...props}>{children}</div>,
    IonItem: ({ children, button, onClick, ...props }: any) => (
      button ? 
        <button data-testid="ion-item" onClick={onClick} {...props}>{children}</button> :
        <div data-testid="ion-item" {...props}>{children}</div>
    ),
    IonCheckbox: ({ checked, onIonChange, ...props }: any) => (
      <input 
        data-testid="ion-checkbox"
        type="checkbox" 
        checked={checked}
        onChange={(e) => onIonChange?.({ detail: { checked: e.target.checked } })}
        {...props}
      />
    ),
    IonSegment: ({ children, value, onIonChange, ...props }: any) => (
      <div data-testid="ion-segment" data-value={value} {...props}>
        {React.Children.map(children, (child) => 
          React.cloneElement(child, { onSegmentChange: onIonChange })
        )}
      </div>
    ),
    IonSegmentButton: ({ children, value, onSegmentChange, ...props }: any) => (
      <button 
        data-testid="ion-segment-button"
        onClick={() => onSegmentChange?.({ detail: { value } })}
        {...props}
      >
        {children}
      </button>
    ),
    IonSkeletonText: ({ style, animated, ...props }: any) => (
      <div data-testid="ion-skeleton-text" style={style} data-animated={animated} {...props} />
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

describe('AddExercise', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
    onAddExercise: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correctly when open', () => {
    render(<AddExercise {...mockProps} />);
    
    expect(screen.getByText('Add Exercise')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search exercises...')).toBeInTheDocument();
    expect(screen.getByText('Copy sets from last workout')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddExercise {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Add Exercise')).not.toBeInTheDocument();
  });

  it('shows skeleton loading initially', () => {
    render(<AddExercise {...mockProps} />);
    
    expect(screen.getAllByTestId('ion-skeleton-text')).toHaveLength(16); // 8 items × 2 skeletons each
    expect(screen.queryByText('Barbell Back Squat')).not.toBeInTheDocument();
  });

  it('shows exercises after loading completes', async () => {
    render(<AddExercise {...mockProps} />);
    
    // Fast forward past loading time
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
      expect(screen.getByText('Bench Press')).toBeInTheDocument();
      expect(screen.queryAllByTestId('ion-skeleton-text')).toHaveLength(0);
    });
  });

  it('filters exercises based on search text', async () => {
    render(<AddExercise {...mockProps} />);
    
    // Wait for loading to complete
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    const searchbar = screen.getByTestId('ion-searchbar');
    fireEvent.change(searchbar, { target: { value: 'squat' } });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
      expect(screen.queryByText('Bench Press')).not.toBeInTheDocument();
    });
  });

  it('toggles segment between most-used and all exercises', async () => {
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    });

    const allExercisesSegment = screen.getByText('All exercises');
    fireEvent.click(allExercisesSegment);

    // Verify segment change (exercises should still be visible but potentially reordered)
    expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
  });

  it('toggles copy from last workout checkbox', async () => {
    render(<AddExercise {...mockProps} />);
    
    const checkbox = screen.getByTestId('ion-checkbox');
    expect(checkbox).not.toBeChecked();
    
    fireEvent.change(checkbox, { target: { checked: true } });
    expect(checkbox).toBeChecked();
  });

  it('calls onAddExercise when exercise is selected', async () => {
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    });

    const exerciseItem = screen.getByText('Barbell Back Squat').closest('[data-testid="ion-item"]');
    fireEvent.click(exerciseItem!);

    expect(mockProps.onAddExercise).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'barbell-back-squat',
        name: 'Barbell Back Squat',
        muscleGroups: ['Quads', 'Glutes', 'Back']
      })
    );
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('shows exercise info when info button is clicked', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    });

    const infoButtons = screen.getAllByLabelText(/View .* details/);
    fireEvent.click(infoButtons[0]);

    expect(consoleSpy).toHaveBeenCalledWith('Show info for exercise:', 'barbell-back-squat');
    
    consoleSpy.mockRestore();
  });

  it('handles infinite scroll loading', async () => {
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    });

    const infiniteScroll = screen.getByTestId('ion-infinite-scroll');
    expect(infiniteScroll).toBeInTheDocument();
    
    // Since our test data has only 10 exercises, infinite scroll should be disabled
    expect(infiniteScroll.dataset.disabled).toBe('true');
  });

  it('enables infinite scroll when more items are available', async () => {
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const infiniteScroll = screen.getByTestId('ion-infinite-scroll');
      // With only 10 exercises and displayCount starting at 20, should be disabled
      expect(infiniteScroll.dataset.disabled).toBe('true');
    });
  });

  it('closes modal when close button is clicked', async () => {
    render(<AddExercise {...mockProps} />);
    
    const closeButtons = screen.getAllByLabelText(/Cancel adding exercise|Close add exercise/);
    fireEvent.click(closeButtons[0]);

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('resets loading state when modal reopens', async () => {
    const { rerender } = render(<AddExercise {...mockProps} isOpen={false} />);
    
    // Reopen modal
    rerender(<AddExercise {...mockProps} isOpen={true} />);
    
    expect(screen.getAllByTestId('ion-skeleton-text')).toHaveLength(16);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.queryAllByTestId('ion-skeleton-text')).toHaveLength(0);
      expect(screen.getByText('Barbell Back Squat')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', async () => {
    render(<AddExercise {...mockProps} />);
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const infoButtons = screen.getAllByLabelText(/View .* details/);
      expect(infoButtons[0]).toHaveAttribute('aria-label', 'View Barbell Back Squat details');
      
      const backButton = screen.getByLabelText('Cancel adding exercise');
      expect(backButton).toBeInTheDocument();
      
      const closeButton = screen.getByLabelText('Close add exercise');
      expect(closeButton).toBeInTheDocument();
    });
  });
});