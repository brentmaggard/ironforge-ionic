/**
 * Shared workout-related TypeScript interfaces for the IronForge fitness app
 * These interfaces ensure type consistency across workout components
 */

export interface WorkoutSet {
  reps: number;
  weight: number;
  completed: boolean;
}

export type EditField = 'reps' | 'weight';

export interface WorkoutExercise {
  id: number;
  name: string;
  sets: WorkoutSet[];
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  restTime: number;
}

// Additional helper types for workout management
export interface WorkoutSession {
  id: string;
  name: string;
  exercises: WorkoutExercise[];
  startTime?: Date;
  endTime?: Date;
  totalDuration?: number;
}

export interface SetEditingState {
  exerciseIndex: number;
  setIndex: number;
  field: EditField;
}