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

  const handleBack = () => {
    history.goBack();
  };

  const handleAddExercise = () => {
    console.log('Navigate to Add Exercise page');
  };

  const handleExerciseInfo = (exercise: string) => {
    console.log('Show exercise info for:', exercise);
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
      name: 'Barbell Back Squat', 
      description: 'Compound lower body exercise targeting quads, glutes, and hamstrings',
      completionCount: 23,
      muscleGroups: ['Quads', 'Glutes', 'Back']
    },
    { 
      name: 'Bench Press', 
      description: 'Upper body compound movement for chest, shoulders, and triceps',
      completionCount: 18,
      muscleGroups: ['Chest', 'Shoulders', 'Triceps']
    },
    { 
      name: 'Deadlift', 
      description: 'Full body compound exercise focusing on posterior chain',
      completionCount: 15,
      muscleGroups: ['Back', 'Glutes', 'Posterior thighs']
    },
    { 
      name: 'Dumbbell Bicep Curl', 
      description: 'Isolation exercise for bicep development',
      completionCount: 31,
      muscleGroups: ['Biceps', 'Forearms']
    },
    { 
      name: 'Lat Pulldown', 
      description: 'Upper body pulling exercise for back and biceps',
      completionCount: 12,
      muscleGroups: ['Back', 'Biceps']
    },
    { 
      name: 'Leg Press', 
      description: 'Machine-based lower body exercise for quad development',
      completionCount: 8,
      muscleGroups: ['Quads', 'Glutes']
    },
    { 
      name: 'Overhead Press', 
      description: 'Standing shoulder press for deltoid strength',
      completionCount: 14,
      muscleGroups: ['Shoulders', 'Triceps', 'Abs']
    },
    { 
      name: 'Pull-ups', 
      description: 'Bodyweight upper body pulling exercise',
      completionCount: 27,
      muscleGroups: ['Back', 'Biceps', 'Forearms']
    },
    { 
      name: 'Romanian Deadlift', 
      description: 'Hip-hinge movement targeting hamstrings and glutes',
      completionCount: 9,
      muscleGroups: ['Posterior thighs', 'Glutes', 'Back']
    },
    { 
      name: 'Tricep Dips', 
      description: 'Bodyweight exercise for tricep development',
      completionCount: 22,
      muscleGroups: ['Triceps', 'Chest', 'Shoulders']
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
                onClick={() => handleExerciseInfo(exercise.name)}
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
    </IonPage>
  );
};

export default Exercise;