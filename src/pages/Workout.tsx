import React, { useState, useEffect, useRef } from 'react';
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
  IonItem,
  IonLabel,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonAlert,
  IonActionSheet,
  IonPopover,
  IonInput,
  IonList
} from '@ionic/react';
import { close, add, checkmark, time, barbell, flame, pause, play, settings } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AddExercise from '../components/AddExercise';
import ExerciseCard from '../components/ExerciseCard';
import { useRestTimer } from '../contexts/RestTimerContext';
import { WorkoutExercise, EditField, SetEditingState } from '../types/workout';
import './Workout.css';

const Workout: React.FC = () => {
  const history = useHistory();
  const { startRestTimer, resetRestTimer, isTimerVisible, setWorkoutPaused } = useRestTimer();
  const [workoutName, setWorkoutName] = useState('New Workout');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [workoutStarted, setWorkoutStarted] = useState(true);
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettingsActionSheet, setShowSettingsActionSheet] = useState(false);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [editingSet, setEditingSet] = useState<SetEditingState | null>(null);
  const [editValue, setEditValue] = useState('');
  const [setMenuOpen, setSetMenuOpen] = useState<{open: boolean, event?: Event, exerciseIndex?: number, setIndex?: number}>({open: false});
  const pageRef = useRef<HTMLIonPageElement>(null);

  // Timer effect - starts when component mounts, pauses when isPaused is true
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  // Reset workout pause state on component unmount
  useEffect(() => {
    return () => {
      setWorkoutPaused(false);
    };
  }, [setWorkoutPaused]);

  // Focus management for modal overlay
  useEffect(() => {
    if (pageRef.current) {
      const focusableElement = pageRef.current.querySelector('ion-button') as HTMLElement;
      if (focusableElement) {
        setTimeout(() => {
          focusableElement.focus();
        }, 300);
      }

      // Escape key handler for modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCloseClick();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

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
    
    // Reset global workout pause state
    setWorkoutPaused(false);
    
    // Navigate to dashboard
    history.replace('/dashboard');
    return true;
  };

  const handleKeepWorkout = () => {
    setShowCancelAlert(false);
  };

  const handlePauseResume = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);
    setWorkoutPaused(newPausedState);
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
    const workoutExercise: WorkoutExercise = {
      id: Date.now(),
      name: exercise.name,
      sets: [
        { reps: 10, weight: 0, completed: false },
        { reps: 10, weight: 0, completed: false },
        { reps: 10, weight: 0, completed: false }
      ],
      primaryMuscles: exercise.primaryMuscles || exercise.muscleGroups?.slice(0, 2) || ['Unknown'],
      secondaryMuscles: exercise.secondaryMuscles || [],
      restTime: 120 // seconds
    };
    setExercises([...exercises, workoutExercise]);
  };

  const handleAddSet = (exerciseIndex: number) => {
    const updatedExercises = [...exercises];
    const exercise = updatedExercises[exerciseIndex];
    const lastSet = exercise.sets[exercise.sets.length - 1];
    
    // Create new set matching last set's reps and weight
    const newSet = {
      reps: lastSet.reps,
      weight: lastSet.weight,
      completed: false
    };
    
    exercise.sets.push(newSet);
    setExercises(updatedExercises);
  };

  const handleSetComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedExercises = [...exercises];
    const wasCompleted = updatedExercises[exerciseIndex].sets[setIndex].completed;
    const isNowCompleted = !wasCompleted;
    
    updatedExercises[exerciseIndex].sets[setIndex].completed = isNowCompleted;
    setExercises(updatedExercises);

    // Start or reset rest timer if workout is active and set is being marked complete (not uncompleted)
    if (workoutStarted && isNowCompleted) {
      // Get rest time from exercise data (default to 120 seconds if not set)
      const restTime = updatedExercises[exerciseIndex].restTime || 120;
      
      if (isTimerVisible) {
        // Timer is already running, reset it to new duration
        resetRestTimer(restTime);
      } else {
        // Timer is not visible, start it
        startRestTimer(restTime);
      }
    }
  };

  const handleEditSet = (exerciseIndex: number, setIndex: number, field: EditField) => {
    const currentValue = exercises[exerciseIndex].sets[setIndex][field];
    setEditValue(currentValue.toString());
    setEditingSet({ exerciseIndex, setIndex, field });
  };

  const handleSaveEdit = () => {
    if (editingSet) {
      const updatedExercises = [...exercises];
      const numValue = parseInt(editValue) || 0;
      updatedExercises[editingSet.exerciseIndex].sets[editingSet.setIndex][editingSet.field] = numValue;
      setExercises(updatedExercises);
    }
    setEditingSet(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingSet(null);
    setEditValue('');
  };

  const handleSetMenu = (event: Event, exerciseIndex: number, setIndex: number) => {
    setSetMenuOpen({ open: true, event, exerciseIndex, setIndex });
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
    <IonPage ref={pageRef} className="workout-page-overlay" role="dialog" aria-label="Workout Builder">
      <IonHeader className="workout-header-bar">
        <IonToolbar className="workout-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleCloseClick} className="close-button" fill="clear" aria-label="Close workout">
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle className="workout-title">
            {formatTime(elapsedTime)}
          </IonTitle>
          <IonButtons slot="end">
            {/* Pause/Resume Button */}
            <IonButton onClick={handlePauseResume} className="pause-resume-button" fill="clear" aria-label={isPaused ? "Resume workout" : "Pause workout"}>
              <IonIcon icon={isPaused ? play : pause} />
            </IonButton>
            
            {/* Settings Button */}
            <IonButton onClick={handleSettingsClick} className="settings-button" fill="clear" aria-label="Workout settings">
              <IonIcon icon={settings} />
            </IonButton>
            
            {/* Complete Workout Button */}
            <IonButton onClick={handleCompleteWorkout} className="complete-button" fill="clear" aria-label="Complete workout">
              <IonIcon icon={checkmark} style={{ color: '#4CAF50' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="workout-content">
        
        {/* Screen reader announcement for workout timer */}
        <div 
          aria-live="polite" 
          aria-atomic="false" 
          className="sr-only"
        >
          Workout time: {formatTime(elapsedTime)}
        </div>
        
        {/* Exercise Cards */}
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            exerciseIndex={index}
            onSetComplete={handleSetComplete}
            onSetEdit={handleEditSet}
            onSetMenu={handleSetMenu}
            onAddSet={handleAddSet}
            isWorkoutActive={workoutStarted}
          />
        ))}
        
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
                  <span className="workout-status active">
                    <IonIcon icon={flame} /> Active • {exercises.length} exercises
                  </span>
                </p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

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
            <IonButton className="pause-play-icon" fill="clear" onClick={handlePauseResume} aria-label="Resume workout">
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

      {/* Edit Set Input Alert */}
      <IonAlert
        isOpen={editingSet !== null}
        onDidDismiss={handleCancelEdit}
        header={`Edit ${editingSet?.field === 'reps' ? 'Reps' : 'Weight'}`}
        inputs={[
          {
            name: 'value',
            type: 'number',
            placeholder: `Enter ${editingSet?.field === 'reps' ? 'reps' : 'weight'}`,
            value: editValue
          }
        ]}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: handleCancelEdit
          },
          {
            text: 'Save',
            handler: (data) => {
              setEditValue(data.value);
              handleSaveEdit();
            }
          }
        ]}
      />

      {/* Set Menu Popover */}
      <IonPopover
        isOpen={setMenuOpen.open}
        event={setMenuOpen.event}
        onDidDismiss={() => setSetMenuOpen({open: false})}
        showBackdrop={true}
      >
        <IonContent>
          <IonList>
            <IonItem button onClick={() => setSetMenuOpen({open: false})}>
              <IonLabel>Duplicate Set</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSetMenuOpen({open: false})}>
              <IonLabel>Insert Set Above</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSetMenuOpen({open: false})}>
              <IonLabel>Insert Set Below</IonLabel>
            </IonItem>
            <IonItem button onClick={() => setSetMenuOpen({open: false})} lines="none">
              <IonLabel color="danger">Delete Set</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>

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