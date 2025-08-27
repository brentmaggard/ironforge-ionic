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
  IonChip
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
    { name: 'Barbell Back Squat', description: 'Compound lower body exercise targeting quads, glutes, and hamstrings' },
    { name: 'Bench Press', description: 'Upper body compound movement for chest, shoulders, and triceps' },
    { name: 'Deadlift', description: 'Full body compound exercise focusing on posterior chain' },
    { name: 'Dumbbell Bicep Curl', description: 'Isolation exercise for bicep development' },
    { name: 'Lat Pulldown', description: 'Upper body pulling exercise for back and biceps' },
    { name: 'Leg Press', description: 'Machine-based lower body exercise for quad development' },
    { name: 'Overhead Press', description: 'Standing shoulder press for deltoid strength' },
    { name: 'Pull-ups', description: 'Bodyweight upper body pulling exercise' },
    { name: 'Romanian Deadlift', description: 'Hip-hinge movement targeting hamstrings and glutes' },
    { name: 'Tricep Dips', description: 'Bodyweight exercise for tricep development' }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchText.toLowerCase()) ||
    exercise.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <IonPage className="exercise-page-overlay">
      <IonHeader className="exercise-header-bar">
        <IonToolbar className="exercise-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button" fill="clear">
              <div className="back-button-circle">
                <IonIcon icon={arrowBack} />
              </div>
            </IonButton>
          </IonButtons>
          <IonTitle className="exercise-title">Exercise Library</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleAddExercise} className="add-button" fill="clear">
              <div className="add-button-circle">
                <IonIcon icon={add} />
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="exercise-content">
        
        {/* Search Bar */}
        <div className="exercise-search-section">
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
          >
            <IonIcon icon={optionsOutline} />
          </IonButton>
        </div>

        {/* Exercise List */}
        <IonList className="exercise-list">
          {filteredExercises.map((exercise, index) => (
            <IonItem key={index} className="exercise-item">
              <IonLabel className="exercise-info">
                <h3 className="exercise-name">{exercise.name}</h3>
                <p className="exercise-description">{exercise.description}</p>
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
                onClick={() => setFilterDrawerOpen(false)}
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