import React, { useState } from 'react';
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
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="progress" href="/progress">
          <IonIcon aria-hidden="true" icon={trendingUp} />
          <IonLabel>Progress</IonLabel>
        </IonTabButton>
        <IonTabButton tab="workout" href="#" onClick={handleWorkoutTabClick}>
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
