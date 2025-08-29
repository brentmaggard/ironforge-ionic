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
  IonSearchbar,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/react';
import { arrowBack, close, helpCircleOutline } from 'ionicons/icons';
import './AddExercise.css';

interface Exercise {
  id: string;
  name: string;
  description: string;
  completionCount: number;
  muscleGroups: string[];
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  commentary: string;
  similarExercises: string[];
}

interface AddExerciseProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercise: (exercise: Exercise) => void;
}

const AddExercise: React.FC<AddExerciseProps> = ({ isOpen, onClose, onAddExercise }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('most-used');
  const [copyFromLastWorkout, setCopyFromLastWorkout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(20);

  // Reusing the same exercise data from Exercise.tsx
  const exercises = [
    { 
      id: 'barbell-back-squat',
      name: 'Barbell Back Squat', 
      description: 'Compound lower body exercise targeting quads, glutes, and hamstrings',
      completionCount: 23,
      muscleGroups: ['Quads', 'Glutes', 'Back'],
      primaryMuscles: ['Quads', 'Glutes'],
      secondaryMuscles: ['Back', 'Core'],
      instructions: [
        'Place the barbell on your upper traps and shoulders, not on your neck.',
        'Position your feet shoulder-width apart with toes slightly turned out.',
        'Brace your core and keep your chest up as you begin to squat down.',
        'Lower yourself until your thighs are parallel to the floor or as low as mobility allows.',
        'Drive through your heels to return to the starting position.',
        'Keep your knees tracking over your toes throughout the movement.'
      ],
      commentary: 'The barbell back squat is often called the king of exercises. It builds functional strength throughout your entire lower body and core while improving mobility and stability.',
      similarExercises: ['leg-press', 'front-squat', 'goblet-squat']
    },
    { 
      id: 'bench-press',
      name: 'Bench Press', 
      description: 'Upper body compound movement for chest, shoulders, and triceps',
      completionCount: 18,
      muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
      primaryMuscles: ['Chest'],
      secondaryMuscles: ['Shoulders', 'Triceps'],
      instructions: [
        'Lie flat on the bench with your eyes under the barbell.',
        'Grip the bar with hands slightly wider than shoulder-width apart.',
        'Plant your feet firmly on the ground and engage your core.',
        'Lower the bar to your mid-chest with control.',
        'Press the bar back up to the starting position, fully extending your arms.',
        'Maintain a slight arch in your back throughout the movement.'
      ],
      commentary: 'The bench press is a fundamental upper body strength exercise. Focus on controlled movement and proper form rather than maximum weight to build strength safely.',
      similarExercises: ['dumbbell-press', 'incline-press', 'push-ups']
    },
    { 
      id: 'deadlift',
      name: 'Deadlift', 
      description: 'Full body compound exercise focusing on posterior chain',
      completionCount: 15,
      muscleGroups: ['Back', 'Glutes', 'Posterior thighs'],
      primaryMuscles: ['Back', 'Glutes', 'Hamstrings'],
      secondaryMuscles: ['Traps', 'Forearms', 'Core'],
      instructions: [
        'Stand with feet hip-width apart, barbell over mid-foot.',
        'Bend at hips and knees to grip the bar with both hands.',
        'Keep your chest up and back straight as you prepare to lift.',
        'Drive through your heels and extend your hips to lift the bar.',
        'Stand tall with shoulders back at the top of the movement.',
        'Lower the bar back to the ground with control, reversing the movement.'
      ],
      commentary: 'The deadlift is one of the most effective exercises for building total body strength and power. It targets more muscle groups than almost any other single exercise.',
      similarExercises: ['romanian-deadlift', 'sumo-deadlift', 'rack-pulls']
    },
    { 
      id: 'dumbbell-bicep-curl',
      name: 'Dumbbell Bicep Curl', 
      description: 'Isolation exercise for bicep development',
      completionCount: 31,
      muscleGroups: ['Biceps', 'Forearms'],
      primaryMuscles: ['Biceps'],
      secondaryMuscles: ['Forearms'],
      instructions: [
        'Stand with feet shoulder-width apart, holding dumbbells at your sides.',
        'Keep your elbows close to your torso throughout the movement.',
        'Slowly curl the weights up, contracting your biceps.',
        'Pause briefly at the top of the movement.',
        'Lower the weights back down with control.',
        'Avoid swinging or using momentum to lift the weights.'
      ],
      commentary: 'Bicep curls are an excellent isolation exercise for building arm strength and size. Focus on slow, controlled movements for maximum muscle engagement.',
      similarExercises: ['hammer-curls', 'cable-curls', 'preacher-curls']
    },
    { 
      id: 'lat-pulldown',
      name: 'Lat Pulldown', 
      description: 'Upper body pulling exercise for back and biceps',
      completionCount: 12,
      muscleGroups: ['Back', 'Biceps'],
      primaryMuscles: ['Lats', 'Rhomboids'],
      secondaryMuscles: ['Biceps', 'Rear Delts'],
      instructions: [
        'Sit at the lat pulldown machine with thighs secured under the pads.',
        'Grip the bar with hands wider than shoulder-width apart.',
        'Lean back slightly and pull your chest up.',
        'Pull the bar down to your upper chest, squeezing your shoulder blades.',
        'Slowly return the bar to the starting position with control.',
        'Focus on pulling with your back muscles, not just your arms.'
      ],
      commentary: 'The lat pulldown is excellent for developing back width and strength. It\'s a great alternative to pull-ups and helps build the foundation for bodyweight pulling exercises.',
      similarExercises: ['pull-ups', 'cable-rows', 'bent-rows']
    },
    { 
      id: 'leg-press',
      name: 'Leg Press', 
      description: 'Machine-based lower body exercise for quad development',
      completionCount: 8,
      muscleGroups: ['Quads', 'Glutes'],
      primaryMuscles: ['Quads'],
      secondaryMuscles: ['Glutes', 'Calves'],
      instructions: [
        'Sit on the leg press machine with your back against the pad.',
        'Place your feet on the footplate shoulder-width apart.',
        'Lower the weight by bending your knees to about 90 degrees.',
        'Press through your heels to return to the starting position.',
        'Keep your core engaged throughout the movement.',
        'Avoid locking your knees completely at the top.'
      ],
      commentary: 'The leg press allows you to train your legs with heavy weight in a controlled, safe environment. It\'s excellent for building quad strength and size.',
      similarExercises: ['barbell-back-squat', 'hack-squat', 'goblet-squat']
    },
    { 
      id: 'overhead-press',
      name: 'Overhead Press', 
      description: 'Standing shoulder press for deltoid strength',
      completionCount: 14,
      muscleGroups: ['Shoulders', 'Triceps', 'Abs'],
      primaryMuscles: ['Shoulders'],
      secondaryMuscles: ['Triceps', 'Core'],
      instructions: [
        'Stand with feet shoulder-width apart, holding a barbell at shoulder height.',
        'Grip the bar with hands just outside shoulder-width.',
        'Brace your core and keep your torso upright.',
        'Press the bar straight up overhead until your arms are fully extended.',
        'Lower the bar back to shoulder level with control.',
        'Keep your core tight to prevent arching your back.'
      ],
      commentary: 'The overhead press is a true test of total body strength and stability. It builds impressive shoulder strength while requiring core stability and balance.',
      similarExercises: ['dumbbell-press', 'seated-press', 'push-press']
    },
    { 
      id: 'pull-ups',
      name: 'Pull-ups', 
      description: 'Bodyweight upper body pulling exercise',
      completionCount: 27,
      muscleGroups: ['Back', 'Biceps', 'Forearms'],
      primaryMuscles: ['Lats', 'Rhomboids'],
      secondaryMuscles: ['Biceps', 'Rear Delts', 'Forearms'],
      instructions: [
        'Hang from a pull-up bar with hands slightly wider than shoulder-width.',
        'Start from a dead hang with arms fully extended.',
        'Pull yourself up by engaging your back muscles and biceps.',
        'Bring your chin over the bar at the top of the movement.',
        'Lower yourself back down with control to the starting position.',
        'Avoid swinging or using momentum to complete the movement.'
      ],
      commentary: 'Pull-ups are one of the best bodyweight exercises for building upper body strength. They require no equipment beyond a bar and build functional pulling strength.',
      similarExercises: ['lat-pulldown', 'assisted-pullups', 'chin-ups']
    },
    { 
      id: 'romanian-deadlift',
      name: 'Romanian Deadlift', 
      description: 'Hip-hinge movement targeting hamstrings and glutes',
      completionCount: 9,
      muscleGroups: ['Posterior thighs', 'Glutes', 'Back'],
      primaryMuscles: ['Hamstrings', 'Glutes'],
      secondaryMuscles: ['Lower Back', 'Core'],
      instructions: [
        'Hold a barbell with both hands in front of your thighs.',
        'Stand with feet hip-width apart and knees slightly bent.',
        'Hinge at the hips, pushing your glutes back while lowering the bar.',
        'Keep the bar close to your legs and maintain a neutral spine.',
        'Lower until you feel a stretch in your hamstrings.',
        'Drive your hips forward to return to the starting position.'
      ],
      commentary: 'The Romanian deadlift is excellent for developing posterior chain strength and improving hip mobility. It\'s particularly effective for hamstring and glute development.',
      similarExercises: ['deadlift', 'good-mornings', 'single-leg-rdl']
    },
    { 
      id: 'tricep-dips',
      name: 'Tricep Dips', 
      description: 'Bodyweight exercise for tricep development',
      completionCount: 22,
      muscleGroups: ['Triceps', 'Chest', 'Shoulders'],
      primaryMuscles: ['Triceps'],
      secondaryMuscles: ['Chest', 'Front Delts'],
      instructions: [
        'Position yourself on parallel bars or the edge of a bench.',
        'Start with arms fully extended, supporting your body weight.',
        'Lower your body by bending your elbows until they reach about 90 degrees.',
        'Press back up to the starting position by extending your arms.',
        'Keep your torso upright and avoid swinging.',
        'Control both the lowering and lifting phases of the movement.'
      ],
      commentary: 'Tricep dips are an effective bodyweight exercise for building tricep strength and size. They can be modified to increase or decrease difficulty as needed.',
      similarExercises: ['close-grip-bench', 'tricep-extensions', 'diamond-pushups']
    }
  ].sort((a, b) => {
    // Sort by completion count for "Most used", alphabetically for "All exercises"
    if (selectedSegment === 'most-used') {
      return b.completionCount - a.completionCount;
    }
    return a.name.localeCompare(b.name);
  });

  const handleSelectExercise = (exerciseId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      onAddExercise(exercise);
      onClose();
    }
  };

  const handleExerciseInfo = (exerciseId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Show info for exercise:', exerciseId);
    // Could open ExerciseDetails modal or show info popover
  };

  const filteredExercises = exercises.filter(exercise => {
    // Search filter
    const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesSearch;
  });

  // Simulate initial loading
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setDisplayCount(20);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Load more exercises for infinite scroll
  const loadMoreExercises = (event: CustomEvent<void>) => {
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 20, filteredExercises.length));
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <IonPage className="add-exercise-overlay">
      <IonHeader className="add-exercise-header-bar">
        <IonToolbar className="add-exercise-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={onClose} className="back-button" fill="clear" aria-label="Cancel adding exercise">
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle className="add-exercise-title">Add Exercise</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              onClick={onClose} 
              className="close-button" 
              fill="clear"
              aria-label="Close add exercise"
            >
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="add-exercise-content">
        
        {/* Search Bar */}
        <IonItem className="search-section" lines="none">
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search exercises..."
            className="exercise-searchbar"
          />
        </IonItem>

        {/* Copy from Last Workout Option */}
        <IonItem lines="none" className="copy-option">
          <IonCheckbox
            checked={copyFromLastWorkout}
            onIonChange={(e) => setCopyFromLastWorkout(e.detail.checked)}
            slot="start"
          />
          <IonLabel>Copy sets from last workout</IonLabel>
        </IonItem>

        {/* Filter Segments */}
        <IonSegment 
          value={selectedSegment} 
          onIonChange={(e) => setSelectedSegment(e.detail.value as string)}
          className="filter-segments"
        >
          <IonSegmentButton value="most-used">
            <IonLabel>Most used</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="all-exercises">
            <IonLabel>All exercises</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Exercise List */}
        {isLoading ? (
          <IonList className="exercise-list">
            {[...Array(8)].map((_, i) => (
              <IonItem key={i} className="exercise-item">
                <IonLabel>
                  <h3><IonSkeletonText animated style={{ width: '65%' }} /></h3>
                </IonLabel>
                <IonSkeletonText animated style={{ width: '24px', height: '24px' }} slot="end" />
              </IonItem>
            ))}
          </IonList>
        ) : (
          <IonList className="exercise-list">
            {filteredExercises.slice(0, displayCount).map((exercise) => (
              <IonItem 
                key={exercise.id} 
                className="exercise-item"
                button
                onClick={(e) => handleSelectExercise(exercise.id, e)}
              >
                <IonLabel className="exercise-label">
                  <h3 className="exercise-name">{exercise.name}</h3>
                </IonLabel>
                
                <div className="exercise-actions">
                  <IonButton
                    fill="clear"
                    className="info-button"
                    onClick={(e) => handleExerciseInfo(exercise.id, e)}
                    aria-label={`View ${exercise.name} details`}
                  >
                    <IonIcon icon={helpCircleOutline} />
                  </IonButton>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
        
        {!isLoading && (
          <IonInfiniteScroll 
            onIonInfinite={loadMoreExercises} 
            threshold="100px" 
            disabled={displayCount >= filteredExercises.length}
          >
            <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more exercises..." />
          </IonInfiniteScroll>
        )}

      </IonContent>
    </IonPage>
  );
};

export default AddExercise;