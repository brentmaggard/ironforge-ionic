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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonPopover
} from '@ionic/react';
import { arrowBack, add, helpCircle, ellipsisVertical, heart, bookmark, share, trash } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Exercise.css';

const Exercise: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [popoverOpen, setPopoverOpen] = useState<{open: boolean, event?: Event}>({open: false});

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
        </div>
        
        {/* Filter Options */}
        <div className="exercise-filter-section">
          <IonSegment 
            value={selectedFilter} 
            onIonChange={(e) => setSelectedFilter(e.detail.value as string)}
            className="exercise-filters"
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="compound">
              <IonLabel>Compound</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="isolation">
              <IonLabel>Isolation</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="bodyweight">
              <IonLabel>Bodyweight</IonLabel>
            </IonSegmentButton>
          </IonSegment>
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
                <IonIcon icon={helpCircle} />
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

      </IonContent>
    </IonPage>
  );
};

export default Exercise;