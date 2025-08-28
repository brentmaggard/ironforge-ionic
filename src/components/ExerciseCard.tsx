import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { add, ellipsisVertical } from 'ionicons/icons';
import './ExerciseCard.css';

interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

interface WorkoutExercise {
  id: number;
  name: string;
  sets: WorkoutSet[];
  primaryMuscles: string[];
  restTime: number;
}

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  exerciseIndex: number;
  onSetComplete: (exerciseIndex: number, setIndex: number) => void;
  onSetEdit: (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight') => void;
  onSetMenu: (event: Event, exerciseIndex: number, setIndex: number) => void;
  onAddSet: (exerciseIndex: number) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseIndex,
  onSetComplete,
  onSetEdit,
  onSetMenu,
  onAddSet
}) => {
  return (
    <IonCard className="exercise-card">
      <IonCardHeader>
        <IonCardTitle className="exercise-name">{exercise.name}</IonCardTitle>
      </IonCardHeader>
      
      {/* Sets Grid */}
      <IonGrid className="sets-grid">
        <IonRow className="sets-header-row">
          <IonCol size="2"><IonText><small>Set</small></IonText></IonCol>
          <IonCol size="4"><IonText><small>Reps</small></IonText></IonCol>
          <IonCol size="4"><IonText><small>Weight</small></IonText></IonCol>
          <IonCol size="2"></IonCol>
        </IonRow>
        {exercise.sets.map((set, setIndex) => (
          <IonRow key={setIndex} className="set-row">
            <IonCol size="2">
              <IonButton
                fill="clear"
                className={`set-complete-btn ${set.completed ? 'completed' : ''}`}
                onClick={() => onSetComplete(exerciseIndex, setIndex)}
              >
                {setIndex + 1}
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton
                fill="clear"
                className="set-edit-btn"
                onClick={() => onSetEdit(exerciseIndex, setIndex, 'reps')}
              >
                {set.reps} <IonText className="unit-text">reps</IonText>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton
                fill="clear" 
                className="set-edit-btn"
                onClick={() => onSetEdit(exerciseIndex, setIndex, 'weight')}
              >
                {set.weight} <IonText className="unit-text">lbs</IonText>
              </IonButton>
            </IonCol>
            <IonCol size="2">
              <IonButton
                fill="clear"
                className="set-menu-btn"
                onClick={(e) => onSetMenu(e.nativeEvent, exerciseIndex, setIndex)}
              >
                <IonIcon icon={ellipsisVertical} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
      
      {/* Add Set Button */}
      <IonButton 
        fill="clear" 
        className="add-set-button"
        onClick={() => onAddSet(exerciseIndex)}
      >
        <IonIcon icon={add} slot="start" />
        Add Set
      </IonButton>
    </IonCard>
  );
};

export default ExerciseCard;