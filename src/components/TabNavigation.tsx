import React, { useState, useEffect } from 'react';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { home, trendingUp, barbell } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import './TabNavigation.css';
import WorkoutActionSheet from './WorkoutActionSheet';

const TabNavigation: React.FC = () => {
  const [isWorkoutActionSheetOpen, setIsWorkoutActionSheetOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();

  // Force tab selection based on current route
  useEffect(() => {
    console.log('Current location:', location.pathname);
    const selectedTab = {
      '/dashboard': 'tab1',
      '/progress': 'tab2',
    }[location.pathname];
    
    // Clear any selected tabs when on workout page
    if (location.pathname === '/workout') {
      const tabBar = document.querySelector('ion-tab-bar');
      tabBar?.querySelectorAll('ion-tab-button').forEach((tab) => {
        (tab as any).selected = false;
      });
      return;
    }
    
    if (selectedTab) {
      const tabBar = document.querySelector('ion-tab-bar');
      const tab = tabBar?.querySelector(`ion-tab-button[tab="${selectedTab}"]`);
      if (tab) {
        (tab as any).selected = true;
      }
    }
  }, [location.pathname]);

  const handleWorkoutTabClick = (e: any) => {
    e.preventDefault();
    
    // Don't show action sheet if already on workout page
    if (location.pathname === '/workout') {
      return;
    }
    
    setIsWorkoutActionSheetOpen(true);
  };

  const handleWorkoutAction = (action: string) => {
    setIsWorkoutActionSheetOpen(false);
    
    switch (action) {
      case 'start-new':
        history.push('/workout');
        break;
      case 'train-again':
        console.log('Train a logged workout again - Coming Soon');
        break;
      case 'plan-workout':
        console.log('Plan a workout - Coming Soon');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <IonTabBar slot="bottom">
        <IonTabButton 
          tab="tab1" 
          href="/dashboard"
          selected={location.pathname === '/dashboard'}
          onClick={(e) => {
            if (location.pathname === '/dashboard') {
              e.preventDefault();
              return;
            }
            history.push('/dashboard');
          }}
        >
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton 
          tab="tab2" 
          href="/progress"
          selected={location.pathname === '/progress'}
          onClick={(e) => {
            if (location.pathname === '/progress') {
              e.preventDefault();
              return;
            }
            history.push('/progress');
          }}
        >
          <IonIcon aria-hidden="true" icon={trendingUp} />
          <IonLabel>Progress</IonLabel>
        </IonTabButton>
        <IonTabButton 
          tab="workout"
          href="#"
          selected={location.pathname === '/workout'}
          onClick={handleWorkoutTabClick}>
          <IonIcon aria-hidden="true" icon={barbell} />
          <IonLabel>Workout</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <WorkoutActionSheet
        isOpen={isWorkoutActionSheetOpen}
        onDidDismiss={() => setIsWorkoutActionSheetOpen(false)}
        onAction={handleWorkoutAction}
      />
    </>
  );
};

export default TabNavigation;
