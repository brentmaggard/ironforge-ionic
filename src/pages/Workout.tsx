import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonFab,
  IonFabButton,
  IonChip,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert
} from '@ionic/react';
import { close, add, checkmark, time, barbell, flame } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Workout.css';

const Workout: React.FC = () => {
  const history = useHistory();
  const [workoutName, setWorkoutName] = useState('New Workout');
  const [exercises, setExercises] = useState<any[]>([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const handleCloseClick = () => {
    setShowCancelAlert(true);
  };

  const handleCancelWorkout = () => {
    setShowCancelAlert(false);
    history.push('/dashboard');
  };

  const handleKeepWorkout = () => {
    setShowCancelAlert(false);
  };

  const handleAddExercise = () => {
    // Navigate to exercise selection - for now just add a sample exercise
    const sampleExercise = {
      id: Date.now(),
      name: 'Barbell Back Squat',
      sets: [
        { reps: 10, weight: 135, completed: false },
        { reps: 8, weight: 155, completed: false },
        { reps: 6, weight: 175, completed: false }
      ],
      primaryMuscles: ['Quads', 'Glutes'],
      restTime: 180 // seconds
    };
    setExercises([...exercises, sampleExercise]);
  };

  const handleStartWorkout = () => {
    setWorkoutStarted(true);
    console.log('Workout started!');
  };

  const handleFinishWorkout = () => {
    console.log('Workout finished!');
    history.push('/dashboard');
  };

  const formatRestTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <IonPage className="workout-page-overlay">
      <IonHeader className="workout-header-bar">
        <IonToolbar className="workout-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleCloseClick} className="close-button" fill="clear">
              <div className="close-button-circle">
                <IonIcon icon={close} />
              </div>
            </IonButton>
          </IonButtons>
          <IonTitle className="workout-title">
            {workoutStarted ? 'Active Workout' : 'Workout Builder'}
          </IonTitle>
          <IonButtons slot="end">
            {!workoutStarted && exercises.length > 0 && (
              <IonButton onClick={handleStartWorkout} className="start-button" fill="solid">
                <IonIcon icon={barbell} slot="start" />
                Start
              </IonButton>
            )}
            {workoutStarted && (
              <IonButton onClick={handleFinishWorkout} className="finish-button" fill="solid">
                <IonIcon icon={checkmark} slot="start" />
                Finish
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="workout-content">
        
        {/* Workout Info Card */}
        <IonCard className="workout-info-card">
          <IonCardContent>
            <IonItem lines="none" className="workout-info-item">
              <IonLabel>
                <h2 className="workout-name">{workoutName}</h2>
                <p className="workout-meta">
                  {workoutStarted ? (
                    <span className="workout-status active">
                      <IonIcon icon={flame} /> Active • {exercises.length} exercises
                    </span>
                  ) : (
                    <span className="workout-status planning">
                      <IonIcon icon={time} /> Planning • {exercises.length} exercises
                    </span>
                  )}
                </p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* Exercise List */}
        {exercises.length > 0 && (
          <IonCard className="exercises-card">
            <IonCardHeader>
              <IonCardTitle>Exercises</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="exercises-content">
              <IonList className="exercises-list">
                {exercises.map((exercise, index) => (
                  <IonItem key={exercise.id} className="exercise-item">
                    <IonLabel>
                      <h3 className="exercise-name">{exercise.name}</h3>
                      <div className="exercise-details">
                        <div className="muscle-groups">
                          {exercise.primaryMuscles.map((muscle: string, idx: number) => (
                            <IonChip key={idx} className="muscle-chip">
                              <IonLabel>{muscle}</IonLabel>
                            </IonChip>
                          ))}
                        </div>
                        <IonText className="sets-info">
                          <p>{exercise.sets.length} sets • Rest: {formatRestTime(exercise.restTime)}</p>
                        </IonText>
                      </div>
                      
                      {/* Sets Grid */}
                      <IonGrid className="sets-grid">
                        <IonRow className="sets-header-row">
                          <IonCol size="2"><IonText><small>Set</small></IonText></IonCol>
                          <IonCol size="3"><IonText><small>Reps</small></IonText></IonCol>
                          <IonCol size="3"><IonText><small>Weight</small></IonText></IonCol>
                          <IonCol size="2"><IonText><small>Done</small></IonText></IonCol>
                        </IonRow>
                        {exercise.sets.map((set: any, setIndex: number) => (
                          <IonRow key={setIndex} className="set-row">
                            <IonCol size="2">
                              <IonText className="set-number">{setIndex + 1}</IonText>
                            </IonCol>
                            <IonCol size="3">
                              <IonText className="set-reps">{set.reps}</IonText>
                            </IonCol>
                            <IonCol size="3">
                              <IonText className="set-weight">{set.weight} lbs</IonText>
                            </IonCol>
                            <IonCol size="2">
                              <IonButton 
                                fill={set.completed ? "solid" : "outline"} 
                                size="small"
                                className={`set-complete-btn ${set.completed ? 'completed' : ''}`}
                                disabled={!workoutStarted}
                                onClick={() => {
                                  const updatedExercises = [...exercises];
                                  updatedExercises[index].sets[setIndex].completed = !set.completed;
                                  setExercises(updatedExercises);
                                }}
                              >
                                <IonIcon icon={checkmark} />
                              </IonButton>
                            </IonCol>
                          </IonRow>
                        ))}
                      </IonGrid>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}

        {/* Empty State */}
        {exercises.length === 0 && (
          <IonCard className="empty-state-card">
            <IonCardContent className="empty-state-content">
              <IonIcon icon={barbell} className="empty-state-icon" />
              <IonText>
                <h3>Ready to Build Your Workout?</h3>
                <p>Add exercises to get started with your training session.</p>
              </IonText>
              <IonButton 
                fill="outline" 
                size="default" 
                className="add-exercise-button"
                onClick={handleAddExercise}
              >
                <IonIcon icon={add} slot="start" />
                Add Your First Exercise
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {/* Floating Add Button (when exercises exist) */}
        {exercises.length > 0 && !workoutStarted && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleAddExercise} className="add-exercise-fab">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}

      </IonContent>

      <IonAlert
        isOpen={showCancelAlert}
        onDidDismiss={() => {
          handleKeepWorkout();
        }}
        cssClass="workout-alert"
        header="Cancel Workout"
        message="Are you sure you want to cancel this workout? No data will be saved."
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: handleKeepWorkout
          },
          {
            text: 'Yes',
            role: 'confirm',
            cssClass: 'alert-button-confirm',
            handler: handleCancelWorkout
          }
        ]}
      />
    </IonPage>
  );
};

export default Workout;