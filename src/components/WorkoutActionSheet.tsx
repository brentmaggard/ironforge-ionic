import React from 'react';
import {
  IonActionSheet,
  IonIcon
} from '@ionic/react';
import { add, repeat, clipboard, close } from 'ionicons/icons';

interface WorkoutActionSheetProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAction: (action: string) => void;
}

const WorkoutActionSheet: React.FC<WorkoutActionSheetProps> = ({ isOpen, onDidDismiss, onAction }) => {
  return (
    <IonActionSheet
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      cssClass="workout-action-sheet"
      header="Workout Options"
      buttons={[
        {
          text: 'Start New Workout',
          icon: add,
          cssClass: 'workout-action-start',
          handler: () => onAction('start-new')
        },
        {
          text: 'Train a Logged Workout Again',
          icon: repeat,
          cssClass: 'workout-action-repeat',
          handler: () => onAction('train-again')
        },
        {
          text: 'Plan a Workout',
          icon: clipboard,
          cssClass: 'workout-action-plan',
          handler: () => onAction('plan-workout')
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: close,
          cssClass: 'workout-action-cancel'
        }
      ]}
    />
  );
};

export default WorkoutActionSheet;
