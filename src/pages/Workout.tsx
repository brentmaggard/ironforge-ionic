import React, { useState, useEffect } from 'react';
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
  IonAlert,
  IonActionSheet
} from '@ionic/react';
import { close, add, checkmark, time, barbell, flame, pause, play, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AddExercise from '../components/AddExercise';
import './Workout.css';

const Workout: React.FC = () => {
  const history = useHistory();
  const [workoutName, setWorkoutName] = useState('New Workout');
  const [exercises, setExercises] = useState<any[]>([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettingsActionSheet, setShowSettingsActionSheet] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);

  // Timer effect - starts when component mounts, pauses when isPaused is true
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCloseClick = () => {
    setShowCancelAlert(true);
  };

  const handleCancelWorkout = () => {
    // Reset workout state
    setElapsedTime(0);
    setIsPaused(false);
    setWorkoutStarted(false);
    setExercises([]);
    setWorkoutName('New Workout');
    setShowCancelAlert(false);
    
    // Navigate to dashboard
    history.replace('/dashboard');
    return true;
  };

  const handleKeepWorkout = () => {
    setShowCancelAlert(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleSettingsClick = () => {
    setShowSettingsActionSheet(true);
  };

  const handleSettingsAction = (action: string) => {
    setShowSettingsActionSheet(false);
    
    switch (action) {
      case 'rest-timer':
        console.log('Rest Timer Settings clicked');
        break;
      case 'auto-advance':
        console.log('Auto Advance Settings clicked');
        break;
      case 'sound':
        console.log('Sound Settings clicked');
        break;
      default:
        break;
    }
  };

  const handleCompleteWorkout = () => {
    // For now, just log - will implement later
    console.log('Complete workout clicked');
  };

  const handleAddExercise = () => {
    setShowAddExercise(true);
  };

  const handleCloseAddExercise = () => {
    setShowAddExercise(false);
  };

  const handleAddExerciseToWorkout = (exercise: any) => {
    // Create workout exercise with default sets
    const workoutExercise = {
      id: Date.now(),
      name: exercise.name,
      sets: [
        { reps: 10, weight: 0, completed: false },
        { reps: 10, weight: 0, completed: false },
        { reps: 10, weight: 0, completed: false }
      ],
      primaryMuscles: exercise.primaryMuscles || exercise.muscleGroups?.slice(0, 2) || ['Unknown'],
      restTime: 180 // seconds
    };
    setExercises([...exercises, workoutExercise]);
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
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle className="workout-title">
            {formatTime(elapsedTime)}
          </IonTitle>
          <IonButtons slot="end">
            {/* Pause/Resume Button */}
            <IonButton onClick={handlePauseResume} className="pause-resume-button" fill="clear">
              <IonIcon icon={isPaused ? play : pause} />
            </IonButton>
            
            {/* Settings Button */}
            <IonButton onClick={handleSettingsClick} className="settings-button" fill="clear">
              <IonIcon icon={settings} />
            </IonButton>
            
            {/* Complete Workout Button */}
            <IonButton onClick={handleCompleteWorkout} className="complete-button" fill="clear">
              <IonIcon icon={checkmark} style={{ color: '#4CAF50' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="workout-content">
        
        {/* Exercise and Special Set Buttons */}
        <IonGrid className="exercise-button-container">
          <IonRow>
            <IonCol size="6">
              <IonButton 
                fill="outline" 
                className="exercise-button"
                onClick={handleAddExercise}
                expand="block"
              >
                <IonIcon icon={add} slot="start" />
                Exercise
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton 
                fill="outline" 
                className="special-set-button"
                onClick={() => console.log('Special Set clicked')}
                expand="block"
              >
                <IonIcon icon={add} slot="start" />
                Special Set
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        
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
                      <IonGrid className="exercise-details">
                        <IonRow>
                          <IonCol>
                            <div className="muscle-groups">
                              {exercise.primaryMuscles.map((muscle: string, idx: number) => (
                                <IonChip key={idx} className="muscle-chip">
                                  <IonLabel>{muscle}</IonLabel>
                                </IonChip>
                              ))}
                            </div>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol>
                            <IonText className="sets-info">
                              <p>{exercise.sets.length} sets • Rest: {formatRestTime(exercise.restTime)}</p>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                      
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

      {/* Pause Overlay */}
      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-content">
            <IonText className="pause-title">
              <h2>The workout is paused!</h2>
            </IonText>
            <IonText className="pause-timer">
              <h5>{formatTime(elapsedTime)}</h5>
            </IonText>
            <IonButton className="pause-play-icon" fill="clear" onClick={handlePauseResume}>
              <IonIcon icon={play} />
            </IonButton>
          </div>
        </div>
      )}

      {/* Settings Action Sheet */}
      <IonActionSheet
        isOpen={showSettingsActionSheet}
        onDidDismiss={() => setShowSettingsActionSheet(false)}
        cssClass="settings-action-sheet"
        header="Workout Settings"
        buttons={[
          {
            text: 'Rest Timer Settings',
            icon: time,
            handler: () => handleSettingsAction('rest-timer')
          },
          {
            text: 'Auto Advance Sets',
            icon: play,
            handler: () => handleSettingsAction('auto-advance')
          },
          {
            text: 'Sound & Notifications',
            icon: settings,
            handler: () => handleSettingsAction('sound')
          },
          {
            text: 'Cancel',
            role: 'cancel',
            icon: close
          }
        ]}
      />

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

      {/* Add Exercise Modal */}
      <AddExercise 
        isOpen={showAddExercise}
        onClose={handleCloseAddExercise}
        onAddExercise={handleAddExerciseToWorkout}
      />
    </IonPage>
  );
};

export default Workout;