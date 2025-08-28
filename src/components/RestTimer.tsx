import React, { useState, useEffect } from 'react';
import {
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel
} from '@ionic/react';
import { refresh, play, pause } from 'ionicons/icons';
import './RestTimer.css';

interface RestTimerProps {
  isVisible: boolean;
  onClose: () => void;
  initialTime?: number; // in seconds, defaults to 120 (2 minutes)
  workoutPaused?: boolean; // when true, timer is paused and hidden
  resetTrigger?: number; // when this changes, reset the timer
}

const RestTimer: React.FC<RestTimerProps> = ({ 
  isVisible, 
  onClose, 
  initialTime = 120,
  workoutPaused = false,
  resetTrigger = 0
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Start timer when visible, not paused, and workout not paused
  useEffect(() => {
    if (isVisible && !isPaused && !workoutPaused && timeRemaining > 0) {
      const id = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 1) {
            // Timer finished
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      setIntervalId(id);
      
      return () => {
        if (id) clearInterval(id);
      };
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isVisible, isPaused, workoutPaused, timeRemaining]);

  // Reset timer when component becomes visible
  useEffect(() => {
    if (isVisible) {
      setTimeRemaining(initialTime);
      setIsPaused(false);
    }
  }, [isVisible, initialTime]);

  // Reset timer when resetTrigger changes (new set completed)
  useEffect(() => {
    if (resetTrigger > 0) {
      setTimeRemaining(initialTime);
      setIsPaused(false);
    }
  }, [resetTrigger, initialTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTimeRemaining(initialTime);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleTimerComplete = () => {
    // Auto-close when timer completes
    setTimeout(() => {
      onClose();
    }, 500); // Small delay to show 0:00
  };

  if (!isVisible || workoutPaused) {
    return null;
  }

  return (
    <IonCard className="rest-timer-overlay">
      <IonCardContent className="rest-timer-container">
        <IonGrid>
          <IonRow className="ion-align-items-center">
            <IonCol size="auto">
              <IonButton
                fill="clear"
                className="rest-timer-reset"
                onClick={handleReset}
              >
                <IonIcon icon={refresh} />
              </IonButton>
            </IonCol>
            
            <IonCol className="ion-text-center">
              <IonLabel className="rest-timer-display">
                <h1 className="rest-timer-text">
                  {formatTime(timeRemaining)}
                </h1>
              </IonLabel>
            </IonCol>
            
            <IonCol size="auto">
              <IonButton
                fill="clear"
                className="rest-timer-control"
                onClick={handlePauseResume}
              >
                <IonIcon icon={isPaused ? play : pause} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default RestTimer;