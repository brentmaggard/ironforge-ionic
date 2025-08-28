import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RestTimerContextType {
  isTimerVisible: boolean;
  restTime: number;
  resetTrigger: number;
  workoutPaused: boolean;
  startRestTimer: (duration?: number) => void;
  hideRestTimer: () => void;
  resetRestTimer: (duration?: number) => void;
  setWorkoutPaused: (paused: boolean) => void;
}

const RestTimerContext = createContext<RestTimerContextType | undefined>(undefined);

interface RestTimerProviderProps {
  children: ReactNode;
}

export const RestTimerProvider: React.FC<RestTimerProviderProps> = ({ children }) => {
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [restTime, setRestTime] = useState(120); // Default 2 minutes
  const [resetTrigger, setResetTrigger] = useState(0);
  const [workoutPaused, setWorkoutPaused] = useState(false);

  const startRestTimer = (duration: number = 120) => {
    setRestTime(duration);
    setIsTimerVisible(true);
  };

  const hideRestTimer = () => {
    setIsTimerVisible(false);
  };

  const resetRestTimer = (duration: number = 120) => {
    setRestTime(duration);
    setResetTrigger(prev => prev + 1); // Trigger reset in RestTimer component
    if (!isTimerVisible) {
      setIsTimerVisible(true);
    }
  };

  const value: RestTimerContextType = {
    isTimerVisible,
    restTime,
    resetTrigger,
    workoutPaused,
    startRestTimer,
    hideRestTimer,
    resetRestTimer,
    setWorkoutPaused
  };

  return (
    <RestTimerContext.Provider value={value}>
      {children}
    </RestTimerContext.Provider>
  );
};

export const useRestTimer = (): RestTimerContextType => {
  const context = useContext(RestTimerContext);
  if (!context) {
    throw new Error('useRestTimer must be used within a RestTimerProvider');
  }
  return context;
};