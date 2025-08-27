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
  IonPopover,
  IonModal,
  IonCheckbox,
  IonChip,
  IonBadge
} from '@ionic/react';
import { arrowBack, add, helpCircleOutline, ellipsisVertical, heart, bookmark, share, trash, optionsOutline, person, barbell, walk, accessibility } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import ExerciseDetails from './ExerciseDetails';
import './Exercise.css';

const Exercise: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedExerciseTypes, setSelectedExerciseTypes] = useState<string[]>(['strength', 'cardio', 'mobility']);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [activeMuscleFilter, setActiveMuscleFilter] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState<{open: boolean, event?: Event}>({open: false});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [exerciseDetailsOpen, setExerciseDetailsOpen] = useState(false);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');

  const handleBack = () => {
    history.goBack();
  };

  const handleAddExercise = () => {
    console.log('Navigate to Add Exercise page');
  };

  const handleExerciseInfo = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    setExerciseDetailsOpen(true);
  };

  const handleCloseExerciseDetails = () => {
    setExerciseDetailsOpen(false);
    setSelectedExerciseId('');
  };

  const handleSimilarExerciseNavigation = (similarExerciseId: string) => {
    setSelectedExerciseId(similarExerciseId);
  };

  const handleExerciseMenu = (event: Event, exercise: string) => {
    setPopoverOpen({open: true, event});
    console.log('Show menu for:', exercise);
  };

  const toggleExerciseType = (type: string) => {
    setSelectedExerciseTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleMuscleGroup = (group: string) => {
    setSelectedMuscleGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipment) 
        ? prev.filter(e => e !== equipment)
        : [...prev, equipment]
    );
  };

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
  ].sort((a, b) => a.name.localeCompare(b.name));

  const handleMuscleChipClick = (muscleGroup: string) => {
    setActiveMuscleFilter(activeMuscleFilter === muscleGroup ? null : muscleGroup);
  };

  const handleApplyFilters = () => {
    // Apply muscle group filter from drawer selections
    if (selectedMuscleGroups.length === 1) {
      setActiveMuscleFilter(selectedMuscleGroups[0]);
    } else if (selectedMuscleGroups.length === 0) {
      setActiveMuscleFilter(null);
    } else {
      // Multiple selections - for now, use the first one
      setActiveMuscleFilter(selectedMuscleGroups[0]);
    }
    setFilterDrawerOpen(false);
  };

  const filteredExercises = exercises.filter(exercise => {
    // Search filter
    const matchesSearch = exercise.name.toLowerCase().includes(searchText.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchText.toLowerCase());
    
    // Muscle group filter
    const matchesMuscleFilter = !activeMuscleFilter || 
      exercise.muscleGroups.some(muscle => muscle === activeMuscleFilter);
    
    return matchesSearch && matchesMuscleFilter;
  });

  return (
    <IonPage className="exercise-page-overlay">
      <IonHeader className="exercise-header-bar">
        <IonToolbar className="exercise-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button" fill="clear">
              <IonIcon icon={arrowBack} className="back-button-icon" />
            </IonButton>
          </IonButtons>
          <IonTitle className="exercise-title">Exercise Library</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleAddExercise} className="add-button" fill="clear">
              <IonIcon icon={add} className="add-button-icon" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="exercise-content">
        
        {/* Search Bar */}
        <IonItem className="exercise-search-section" lines="none">
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search exercises..."
            className="exercise-searchbar"
          />
          <IonButton
            fill="clear"
            className="filter-button"
            onClick={() => setFilterDrawerOpen(true)}
            slot="end"
          >
            <IonIcon icon={optionsOutline} />
          </IonButton>
        </IonItem>

        {/* Exercise List */}
        <IonList className="exercise-list">
          {filteredExercises.map((exercise, index) => (
            <IonItem key={index} className="exercise-item">
              <IonLabel className="exercise-info">
                <h3 className="exercise-name">{exercise.name}</h3>
                <div className="workout-count">
                  <IonBadge color="primary" className="completion-badge">{exercise.completionCount}</IonBadge>
                  <span className="logged-text">Logged workouts</span>
                </div>
                <div className="muscle-groups">
                  {exercise.muscleGroups.map((muscle, muscleIndex) => (
                    <IonChip 
                      key={muscleIndex} 
                      className={`muscle-group-tag ${activeMuscleFilter === muscle ? 'active' : ''}`}
                      onClick={() => handleMuscleChipClick(muscle)}
                    >
                      <IonLabel>{muscle}</IonLabel>
                    </IonChip>
                  ))}
                </div>
              </IonLabel>
              
              <IonButton
                fill="clear"
                className="info-button"
                onClick={() => handleExerciseInfo(exercise.id)}
                slot="end"
              >
                <IonIcon icon={helpCircleOutline} />
              </IonButton>
              
              <IonButton
                fill="clear"
                className="menu-button"
                onClick={(e) => handleExerciseMenu(e.nativeEvent, exercise.name)}
                slot="end"
              >
                <IonIcon icon={ellipsisVertical} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>

        {/* Exercise Menu Popover */}
        <IonPopover
          isOpen={popoverOpen.open}
          event={popoverOpen.event}
          onDidDismiss={() => setPopoverOpen({open: false})}
          showBackdrop={true}
        >
          <IonContent>
            <IonList>
              <IonItem button onClick={() => setPopoverOpen({open: false})}>
                <IonIcon icon={heart} slot="start" />
                <IonLabel>Add to Favorites</IonLabel>
              </IonItem>
              <IonItem button onClick={() => setPopoverOpen({open: false})}>
                <IonIcon icon={bookmark} slot="start" />
                <IonLabel>Add to Workout</IonLabel>
              </IonItem>
              <IonItem button onClick={() => setPopoverOpen({open: false})}>
                <IonIcon icon={share} slot="start" />
                <IonLabel>Share Exercise</IonLabel>
              </IonItem>
              <IonItem button onClick={() => setPopoverOpen({open: false})} lines="none">
                <IonIcon icon={trash} slot="start" color="danger" />
                <IonLabel color="danger">Delete Exercise</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>

        {/* Filter Drawer Modal */}
        <IonModal
          isOpen={filterDrawerOpen}
          onDidDismiss={() => setFilterDrawerOpen(false)}
          handle={false}
          showBackdrop={true}
          className="filter-drawer-modal"
        >
          <IonHeader className="filter-drawer-header-fixed">
            <IonToolbar className="filter-drawer-toolbar">
              <IonButton 
                fill="clear" 
                size="small" 
                slot="start"
                onClick={() => {
                  setSelectedExerciseTypes(['strength', 'cardio', 'mobility']);
                  setSelectedMuscleGroups([]);
                  setSelectedEquipment([]);
                }}
                className="filter-header-button"
              >
                Reset
              </IonButton>
              <IonTitle>Filter</IonTitle>
              <IonButton 
                fill="clear" 
                size="small" 
                slot="end"
                onClick={handleApplyFilters}
                className="filter-header-button"
              >
                Apply
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="filter-drawer-content">
            
            {/* Exercise Type Section */}
            <IonList className="filter-section">
              <IonItem lines="none" className="filter-section-header">
                <IonLabel>
                  <h3>Exercise type</h3>
                </IonLabel>
              </IonItem>
              
              <IonList className="exercise-type-options">
                <IonItem lines="none" className="exercise-type-item">
                  <IonCheckbox
                    checked={selectedExerciseTypes.includes('strength')}
                    onIonChange={() => toggleExerciseType('strength')}
                    className="exercise-type-checkbox"
                    slot="start"
                  />
                  <IonIcon icon={barbell} className="exercise-type-icon strength-icon" slot="start" />
                  <IonLabel className="exercise-type-label">Strength</IonLabel>
                </IonItem>
                
                <IonItem lines="none" className="exercise-type-item">
                  <IonCheckbox
                    checked={selectedExerciseTypes.includes('cardio')}
                    onIonChange={() => toggleExerciseType('cardio')}
                    className="exercise-type-checkbox"
                    slot="start"
                  />
                  <IonIcon icon={walk} className="exercise-type-icon cardio-icon" slot="start" />
                  <IonLabel className="exercise-type-label">Cardio</IonLabel>
                </IonItem>
                
                <IonItem lines="none" className="exercise-type-item">
                  <IonCheckbox
                    checked={selectedExerciseTypes.includes('mobility')}
                    onIonChange={() => toggleExerciseType('mobility')}
                    className="exercise-type-checkbox"
                    slot="start"
                  />
                  <IonIcon icon={accessibility} className="exercise-type-icon mobility-icon" slot="start" />
                  <IonLabel className="exercise-type-label">Mobility</IonLabel>
                </IonItem>
              </IonList>
            </IonList>

            {/* Muscle Groups Section */}
            <IonList className="filter-section">
              <IonItem lines="none" className="filter-section-header">
                <IonLabel>
                  <h3>Muscle groups</h3>
                </IonLabel>
              </IonItem>
            </IonList>
            
            <div className="muscle-groups-container">
              {['Posterior thighs', 'Neck', 'Forearms', 'Triceps', 'Quads', 'Biceps', 'Hip flexor', 'Abs', 'Shoulders', 'Back', 'Lower legs', 'Glutes', 'Chest'].map((group) => (
                <IonChip
                  key={group}
                  className={`muscle-group-chip ${selectedMuscleGroups.includes(group) ? 'selected' : ''}`}
                  onClick={() => toggleMuscleGroup(group)}
                >
                  <IonLabel>{group}</IonLabel>
                </IonChip>
              ))}
            </div>

            {/* Equipment Section */}
            <IonList className="filter-section">
              <IonItem lines="none" className="filter-section-header">
                <IonLabel>
                  <h3>Equipment</h3>
                </IonLabel>
              </IonItem>
            </IonList>
            
            <div className="equipment-container">
              {['Barbell', 'Dumbbell', 'Machine', 'Kettlebell', 'Body Weight', 'Resistance Band', 'Cable Machine', 'Other', 'None'].map((equipment) => (
                <IonChip
                  key={equipment}
                  className={`equipment-chip ${selectedEquipment.includes(equipment) ? 'selected' : ''}`}
                  onClick={() => toggleEquipment(equipment)}
                >
                  <IonLabel>{equipment}</IonLabel>
                </IonChip>
              ))}
            </div>
            
          </IonContent>
        </IonModal>

      </IonContent>

      {/* Exercise Details Modal Overlay */}
      {exerciseDetailsOpen && (
        <ExerciseDetails 
          exerciseId={selectedExerciseId}
          isOpen={exerciseDetailsOpen}
          onClose={handleCloseExerciseDetails}
          onNavigateToSimilar={handleSimilarExerciseNavigation}
        />
      )}

    </IonPage>
  );
};

export default Exercise;