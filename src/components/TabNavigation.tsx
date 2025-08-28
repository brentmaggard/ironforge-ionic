import React, { useState } from 'react';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonActionSheet
} from '@ionic/react';
import { home, trendingUp, barbell, add, repeat, clipboard, close } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import './TabNavigation.css';

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

      <IonActionSheet
        isOpen={isWorkoutActionSheetOpen}
        onDidDismiss={() => setIsWorkoutActionSheetOpen(false)}
        cssClass="workout-action-sheet"
        header="Workout Options"
        buttons={[
          {
            text: 'Start New Workout',
            icon: add,
            cssClass: 'workout-action-start',
            handler: () => handleWorkoutAction('start-new')
          },
          {
            text: 'Train a Logged Workout Again',
            icon: repeat,
            cssClass: 'workout-action-repeat',
            handler: () => handleWorkoutAction('train-again')
          },
          {
            text: 'Plan a Workout',
            icon: clipboard,
            cssClass: 'workout-action-plan',
            handler: () => handleWorkoutAction('plan-workout')
          },
          {
            text: 'Cancel',
            role: 'cancel',
            icon: close,
            cssClass: 'workout-action-cancel'
          }
        ]}
      />
    </>
  );
};

export default TabNavigation;