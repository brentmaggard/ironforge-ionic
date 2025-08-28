import React, { useCallback, memo } from 'react';
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
import { WorkoutExercise, EditField } from '../types/workout';
import './ExerciseCard.css';

interface ExerciseCardProps {
  exercise: WorkoutExercise;
  exerciseIndex: number;
  onSetComplete: (exerciseIndex: number, setIndex: number) => void;
  onSetEdit: (exerciseIndex: number, setIndex: number, field: EditField) => void;
  onSetMenu: (event: Event, exerciseIndex: number, setIndex: number) => void;
  onAddSet: (exerciseIndex: number) => void;
  isWorkoutActive?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  exerciseIndex,
  onSetComplete,
  onSetEdit,
  onSetMenu,
  onAddSet,
  isWorkoutActive = true
}) => {
  // Memoized handler functions
  const handleSetComplete = useCallback((setIndex: number) => {
    onSetComplete(exerciseIndex, setIndex);
  }, [exerciseIndex, onSetComplete]);

  const handleSetEdit = useCallback((setIndex: number, field: EditField) => {
    onSetEdit(exerciseIndex, setIndex, field);
  }, [exerciseIndex, onSetEdit]);

  const handleSetMenu = useCallback((event: React.MouseEvent, setIndex: number) => {
    onSetMenu(event.nativeEvent, exerciseIndex, setIndex);
  }, [exerciseIndex, onSetMenu]);

  const handleAddSet = useCallback(() => {
    onAddSet(exerciseIndex);
  }, [exerciseIndex, onAddSet]);

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
                onClick={() => handleSetComplete(setIndex)}
                disabled={!isWorkoutActive}
                aria-label={`Mark set ${setIndex + 1} as ${set.completed ? 'incomplete' : 'complete'}`}
                aria-pressed={set.completed}
              >
                <span aria-hidden="true">{setIndex + 1}</span>
                <span className="visually-hidden">
                  Set {setIndex + 1} {set.completed ? 'completed' : 'not completed'}
                </span>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton
                fill="clear"
                className="set-edit-btn"
                onClick={() => handleSetEdit(setIndex, 'reps')}
                aria-label={`Edit reps for set ${setIndex + 1}, currently ${set.reps}`}
              >
                {set.reps} <IonText className="unit-text">reps</IonText>
              </IonButton>
            </IonCol>
            <IonCol size="4">
              <IonButton
                fill="clear" 
                className="set-edit-btn"
                onClick={() => handleSetEdit(setIndex, 'weight')}
                aria-label={`Edit weight for set ${setIndex + 1}, currently ${set.weight} pounds`}
              >
                {set.weight} <IonText className="unit-text">lbs</IonText>
              </IonButton>
            </IonCol>
            <IonCol size="2">
              <IonButton
                fill="clear"
                className="set-menu-btn"
                onClick={(e) => handleSetMenu(e, setIndex)}
                aria-label={`More options for set ${setIndex + 1}`}
              >
                <IonIcon icon={ellipsisVertical} aria-hidden="true" />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
      
      {/* Add Set Button */}
      <IonButton 
        fill="clear" 
        className="add-set-button"
        onClick={handleAddSet}
        aria-label="Add a new set"
      >
        <IonIcon icon={add} slot="start" aria-hidden="true" />
        Add Set
      </IonButton>
    </IonCard>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(ExerciseCard);