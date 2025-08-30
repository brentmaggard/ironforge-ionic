import React from 'react';
import {
  IonModal,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToggle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import {
  close,
  star,
  list,
  reorderThree,
  chatbubble,
  informationCircle,
  swapHorizontal,
  chevronForward,
  create
} from 'ionicons/icons';
import { ExerciseMenuProps } from '../types/exercise-menu';
import './ExerciseMenuModal.css';

const ExerciseMenuModal: React.FC<ExerciseMenuProps> = ({
  isOpen,
  exercise,
  onDismiss,
  onDelete,
  onChangeExercise,
  onShowRecords,
  onShowHistory,
  onEditComment,
  onReorderExercises
}) => {
  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onDismiss}
      showBackdrop={true}
      backdropDismiss={true}
      presentingElement={undefined}
      className="exercise-menu-modal"
      data-testid="exercise-menu-modal"
      aria-label={`Exercise menu for ${exercise?.name || 'Exercise'}`}
    >
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>{exercise?.name || 'Exercise'}</IonTitle>
          <IonButton
            slot="end"
            fill="clear"
            color="danger"
            onClick={() => exercise && onDelete(exercise.id.toString())}
            data-testid="delete-exercise-button"
          >
            <IonIcon icon={close} />
            Delete
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="exercise-menu-content">
        {/* Quick Stats Section */}
        <IonCard className="stats-card">
          <IonCardHeader>
            <IonCardTitle>Quick stats</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <p>Heaviest</p>
                      <span className="premium-label">Premium</span>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <p>Average weight</p>
                      <span className="premium-label">Premium</span>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <p>Average reps</p>
                      <span className="premium-label">Premium</span>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* Exercise Information Section */}
        <IonCard className="exercise-info-card">
          <IonCardHeader>
            <IonCardTitle>Exercise information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem 
                lines="none"
                button 
                onClick={() => exercise && onShowRecords(exercise.id.toString())}
                data-testid="records-item"
              >
                <IonIcon icon={star} slot="start" />
                <IonLabel>Records</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
              <IonItem 
                lines="none"
                button 
                onClick={() => exercise && onShowHistory(exercise.id.toString())}
                data-testid="history-item"
              >
                <IonIcon icon={list} slot="start" />
                <IonLabel>History</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Handle Exercise Section */}
        <IonCard className="handle-exercise-card">
          <IonCardHeader>
            <IonCardTitle>Handle exercise</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList lines="none">
              <IonItem lines="none" button onClick={onReorderExercises}>
                <IonIcon icon={reorderThree} slot="start" />
                <IonLabel>Reorder exercises</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>

              <IonItem lines="none" button onClick={() => exercise && onEditComment(exercise.id.toString())}>
                <IonIcon icon={chatbubble} slot="start" />
                <IonLabel>Exercise comment</IonLabel>
                <IonIcon icon={chevronForward} slot="end" />
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={informationCircle} slot="start" />
                <IonLabel>Exercise specific rest timer</IonLabel>
                <IonLabel slot="end" className="default-label">Default</IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={create} slot="start" />
                <IonLabel>
                  RPE/RiR
                  <IonLabel className="premium-label">Premium</IonLabel>
                </IonLabel>
                <IonGrid slot="end" className="toggle-group">
                  <IonRow>
                    <IonCol size="6" className="ion-text-center">
                      <IonLabel>RPE</IonLabel>
                      <IonToggle disabled={true} />
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                      <IonLabel>RiR</IonLabel>
                      <IonToggle disabled={true} />
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Action Buttons */}
        <div className="actions-section">
          <IonButton
            expand="block"
            fill="outline"
            className="change-exercise-button"
            onClick={() => exercise && onChangeExercise(exercise.id.toString())}
          >
            <IonIcon icon={swapHorizontal} slot="start" />
            Change exercise
          </IonButton>
        </div>
      </IonContent>
      
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="block"
            fill="clear"
            className="close-button"
            onClick={onDismiss}
          >
            Close
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default ExerciseMenuModal;