import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IonReactRouter } from '@ionic/react-router';
import Dashboard from './Dashboard';

// Mock Ionic components
jest.mock('@ionic/react', () => ({
  ...jest.requireActual('@ionic/react'),
  IonPage: ({ children }: any) => <div data-testid="ion-page">{children}</div>,
  IonContent: ({ children }: any) => <div data-testid="ion-content">{children}</div>,
  IonCard: ({ children, ...props }: any) => <div data-testid="ion-card" {...props}>{children}</div>,
  IonCardContent: ({ children }: any) => <div data-testid="ion-card-content">{children}</div>,
  IonText: ({ children }: any) => <div data-testid="ion-text">{children}</div>,
  IonIcon: ({ icon }: any) => <div data-testid="ion-icon">{icon?.name || 'icon'}</div>,
  IonGrid: ({ children }: any) => <div data-testid="ion-grid">{children}</div>,
  IonRow: ({ children }: any) => <div data-testid="ion-row">{children}</div>,
  IonCol: ({ children }: any) => <div data-testid="ion-col">{children}</div>,
  IonItem: ({ children }: any) => <div data-testid="ion-item">{children}</div>,
  IonLabel: ({ children }: any) => <div data-testid="ion-label">{children}</div>,
  IonButton: ({ children, ...props }: any) => <button data-testid="ion-button" {...props}>{children}</button>,
  IonActionSheet: ({ isOpen, header, buttons }: any) => isOpen ? <div data-testid="ion-action-sheet">{header}{buttons.map((b: any) => b.text).join('')}</div> : null,
  IonProgressBar: (props: any) => <div data-testid="ion-progress-bar" {...props}></div>,
  IonAvatar: ({ children }: any) => <div data-testid="ion-avatar">{children}</div>,
}));

// Mock GlobalHeader component
jest.mock('../components/GlobalHeader', () => {
  return function MockGlobalHeader() {
    return <div data-testid="global-header">Global Header</div>;
  };
});

// Mock Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: any) => <div data-testid="swiper-slide">{children}</div>,
}));

// Mock CircularProgressbar
jest.mock('react-circular-progressbar', () => ({
  CircularProgressbar: ({ value, text }: any) => (
    <div data-testid="circular-progressbar" data-value={value}>
      {text}
    </div>
  ),
  buildStyles: () => ({}),
}));

const DashboardWrapper = () => (
  <IonReactRouter>
    <Dashboard />
  </IonReactRouter>
);

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    render(<DashboardWrapper />);
    expect(screen.getByTestId('ion-page')).toBeInTheDocument();
  });

  it('displays quick action cards', () => {
    render(<DashboardWrapper />);
    expect(screen.getByText('Start Workout')).toBeInTheDocument();
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
    expect(screen.getByText('Begin a new workout')).toBeInTheDocument();
    expect(screen.getByText('52+ exercises')).toBeInTheDocument();
  });

  it('displays progress metrics section', () => {
    render(<DashboardWrapper />);
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
    // Check for some of the progress values
    expect(screen.getByText('3/4')).toBeInTheDocument();
    expect(screen.getByText('18.2k')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('displays active goals section', () => {
    render(<DashboardWrapper />);
    expect(screen.getByText('Active Goals')).toBeInTheDocument();
    expect(screen.getByText('Bench Press PR')).toBeInTheDocument();
    expect(screen.getByText('Squat Consistency')).toBeInTheDocument();
    expect(screen.getByText('View All')).toBeInTheDocument();
  });

  it('displays latest workout section', () => {
    render(<DashboardWrapper />);
    expect(screen.getByText('Latest Workout')).toBeInTheDocument();
    expect(screen.getByText('Full Body Beginner - Week 12')).toBeInTheDocument();
    expect(screen.getByText('3 exercises • 45m 0s')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  it('uses proper Ionic components instead of generic divs', () => {
    render(<DashboardWrapper />);
    // Check that we have proper Ionic components
    expect(screen.getAllByTestId('ion-card')).toHaveLength(7); // 2 action cards + 2 goal cards + progress cards + activity card
    expect(screen.getAllByTestId('ion-card-content')).toHaveLength(5); // Action cards, goal cards, activity card
    expect(screen.getAllByTestId('ion-icon')).toHaveLength(7); // Icons in various places
  });

  it('has proper accessibility structure', () => {
    render(<DashboardWrapper />);
    // Check that buttons are properly structured
    const buttons = screen.getAllByTestId('ion-button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('opens the start workout action sheet when "Start Workout" is clicked', () => {
    render(<DashboardWrapper />);
    const startWorkoutButton = screen.getByText('Start Workout');
    fireEvent.click(startWorkoutButton);
    expect(screen.getByTestId('ion-action-sheet')).toBeInTheDocument();
    expect(screen.getByText('Start Empty Workout')).toBeInTheDocument();
  });
});