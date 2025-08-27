import React, { useEffect, useRef } from 'react';
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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel,
  IonList,
  IonItem
} from '@ionic/react';
import { close, helpCircleOutline } from 'ionicons/icons';
import './ExerciseDetails.css';

interface ExerciseDetailsProps {
  exerciseId: string;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSimilar: (exerciseId: string) => void;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exerciseId, isOpen, onClose, onNavigateToSimilar }) => {
  const contentRef = useRef<HTMLIonContentElement>(null);
  
  if (!isOpen) {
    return null;
  }

  // Scroll to top when exercise changes
  useEffect(() => {
    if (contentRef.current && exerciseId) {
      contentRef.current.scrollToTop(300); // 300ms smooth scroll animation
    }
  }, [exerciseId]);

  const handleClose = () => {
    onClose();
  };

  const handleSimilarExerciseInfo = (similarExerciseId: string) => {
    onNavigateToSimilar(similarExerciseId);
  };

  // Exercise data - in a real app this would come from a service/context
  const exercises = [
    { 
      id: 'barbell-back-squat',
      name: 'Barbell Back Squat', 
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
      similarExercises: [
        { id: 'leg-press', name: 'Leg Press' },
        { id: 'deadlift', name: 'Deadlift' },
        { id: 'overhead-press', name: 'Overhead Press' }
      ]
    },
    { 
      id: 'bench-press',
      name: 'Bench Press', 
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
      similarExercises: [
        { id: 'overhead-press', name: 'Overhead Press' },
        { id: 'dumbbell-bicep-curl', name: 'Dumbbell Bicep Curl' },
        { id: 'tricep-dips', name: 'Tricep Dips' }
      ]
    },
    { 
      id: 'deadlift',
      name: 'Deadlift', 
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
      similarExercises: [
        { id: 'romanian-deadlift', name: 'Romanian Deadlift' },
        { id: 'barbell-back-squat', name: 'Barbell Back Squat' },
        { id: 'overhead-press', name: 'Overhead Press' }
      ]
    },
    { 
      id: 'dumbbell-bicep-curl',
      name: 'Dumbbell Bicep Curl', 
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
      similarExercises: [
        { id: 'tricep-dips', name: 'Tricep Dips' },
        { id: 'lat-pulldown', name: 'Lat Pulldown' },
        { id: 'pull-ups', name: 'Pull-ups' }
      ]
    },
    { 
      id: 'lat-pulldown',
      name: 'Lat Pulldown', 
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
      similarExercises: [
        { id: 'pull-ups', name: 'Pull-ups' },
        { id: 'dumbbell-bicep-curl', name: 'Dumbbell Bicep Curl' },
        { id: 'deadlift', name: 'Deadlift' }
      ]
    },
    { 
      id: 'leg-press',
      name: 'Leg Press', 
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
      similarExercises: [
        { id: 'barbell-back-squat', name: 'Barbell Back Squat' },
        { id: 'deadlift', name: 'Deadlift' },
        { id: 'romanian-deadlift', name: 'Romanian Deadlift' }
      ]
    },
    { 
      id: 'overhead-press',
      name: 'Overhead Press', 
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
      similarExercises: [
        { id: 'bench-press', name: 'Bench Press' },
        { id: 'tricep-dips', name: 'Tricep Dips' },
        { id: 'deadlift', name: 'Deadlift' }
      ]
    },
    { 
      id: 'pull-ups',
      name: 'Pull-ups', 
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
      similarExercises: [
        { id: 'lat-pulldown', name: 'Lat Pulldown' },
        { id: 'dumbbell-bicep-curl', name: 'Dumbbell Bicep Curl' },
        { id: 'deadlift', name: 'Deadlift' }
      ]
    },
    { 
      id: 'romanian-deadlift',
      name: 'Romanian Deadlift', 
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
      similarExercises: [
        { id: 'deadlift', name: 'Deadlift' },
        { id: 'barbell-back-squat', name: 'Barbell Back Squat' },
        { id: 'leg-press', name: 'Leg Press' }
      ]
    },
    { 
      id: 'tricep-dips',
      name: 'Tricep Dips', 
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
      similarExercises: [
        { id: 'bench-press', name: 'Bench Press' },
        { id: 'overhead-press', name: 'Overhead Press' },
        { id: 'dumbbell-bicep-curl', name: 'Dumbbell Bicep Curl' }
      ]
    }
  ];

  const exercise = exercises.find(ex => ex.id === exerciseId);

  if (!exercise) {
    return (
      <IonPage className="exercise-details-page-overlay">
        <IonHeader className="exercise-details-header-bar">
          <IonToolbar className="exercise-details-toolbar">
            <IonButtons slot="start">
              <IonButton onClick={handleClose} className="close-button" fill="clear">
                <IonIcon icon={close} className="close-button-icon" />
              </IonButton>
            </IonButtons>
            <IonTitle className="exercise-details-title">Exercise Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent className="exercise-details-content">
          <IonCard>
            <IonCardContent>
              <p>Exercise not found. Please try again.</p>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="exercise-details-page-overlay">
      <IonHeader className="exercise-details-header-bar">
        <IonToolbar className="exercise-details-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleClose} className="close-button" fill="clear">
              <IonIcon icon={close} className="close-button-icon" />
            </IonButton>
          </IonButtons>
          <IonTitle className="exercise-details-title">{exercise.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent ref={contentRef} className="exercise-details-content">
        
        {/* Muscle Diagram Section */}
        <IonCard className="muscle-diagram-card">
          <IonCardContent className="muscle-diagram-content">
            <div className="muscle-diagram-placeholder">
              <div className="body-diagram">
                <div className="body-front">
                  <div className="body-silhouette">👤</div>
                </div>
                <div className="body-back">
                  <div className="body-silhouette">👤</div>
                </div>
              </div>
              <div className="diagram-indicators">
                <div className="indicator-dot primary"></div>
                <div className="indicator-dot secondary"></div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Muscles Worked Section */}
        <IonCard className="muscles-worked-card">
          <IonCardHeader>
            <IonCardTitle>Muscles worked</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="muscles-worked-content">
            <div className="muscle-groups-section">
              <div className="muscle-group">
                <h4>Primary</h4>
                <div className="muscle-chips">
                  {exercise.primaryMuscles.map((muscle, index) => (
                    <IonChip key={index} className="primary-muscle-chip">
                      <IonLabel>{muscle}</IonLabel>
                    </IonChip>
                  ))}
                </div>
              </div>
              <div className="muscle-group">
                <h4>Secondary</h4>
                <div className="muscle-chips">
                  {exercise.secondaryMuscles.map((muscle, index) => (
                    <IonChip key={index} className="secondary-muscle-chip">
                      <IonLabel>{muscle}</IonLabel>
                    </IonChip>
                  ))}
                </div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Instructions Section */}
        <IonCard className="instructions-card">
          <IonCardHeader>
            <IonCardTitle>Instructions</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="instructions-content">
            <ol className="instructions-list">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="instruction-item">
                  {instruction}
                </li>
              ))}
            </ol>
          </IonCardContent>
        </IonCard>

        {/* Commentary Section */}
        <IonCard className="commentary-card">
          <IonCardHeader>
            <IonCardTitle>Commentary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="commentary-content">
            <p>{exercise.commentary}</p>
          </IonCardContent>
        </IonCard>

        {/* Similar Exercises Section */}
        <IonCard className="similar-exercises-card">
          <IonCardHeader>
            <IonCardTitle>Similar exercises</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="similar-exercises-content">
            <IonList className="similar-exercises-list">
              {exercise.similarExercises.map((similarExercise, index) => (
                <IonItem 
                  key={index} 
                  className="similar-exercise-item"
                  button
                  onClick={() => handleSimilarExerciseInfo(similarExercise.id)}
                >
                  <IonLabel className="similar-exercise-label">
                    {similarExercise.name}
                  </IonLabel>
                  <IonButton
                    fill="clear"
                    className="similar-exercise-info-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSimilarExerciseInfo(similarExercise.id);
                    }}
                    slot="end"
                  >
                    <IonIcon icon={helpCircleOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <div className="exercise-details-spacer"></div>

      </IonContent>
    </IonPage>
  );
};

export default ExerciseDetails;