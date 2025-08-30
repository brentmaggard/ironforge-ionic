/**
 * Exercise menu modal TypeScript interfaces for IronForge
 * Defines types for the exercise menu overlay functionality
 */

import { WorkoutExercise } from './workout';

export interface ExerciseMenuState {
  open: boolean;
  exerciseIndex?: number;
  exerciseId?: string;
}

export interface ExerciseStats {
  heaviest?: number;
  averageWeight?: number;
  averageReps?: number;
}

export interface PremiumFeature {
  isPremium: boolean;
  label?: string;
}

export interface ExerciseMenuProps {
  isOpen: boolean;
  exercise?: WorkoutExercise;
  onDismiss: () => void;
  onDelete: (exerciseId: string) => void;
  onChangeExercise: (exerciseId: string) => void;
  onShowRecords: (exerciseId: string) => void;
  onShowHistory: (exerciseId: string) => void;
  onEditComment: (exerciseId: string) => void;
  onReorderExercises: () => void;
}