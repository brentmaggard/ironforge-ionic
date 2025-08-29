import React, { useState, useEffect, useRef } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel
} from '@ionic/react';
import { arrowBack, person, pencil } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const [profileImage] = useState<string | null>(null);
  const pageRef = useRef<HTMLIonPageElement>(null);

  const handleBack = () => {
    history.goBack();
  };

  const handleEditProfile = () => {
    history.push('/edit-profile');
  };

  // Focus management for modal overlay
  useEffect(() => {
    if (pageRef.current) {
      const focusableElement = pageRef.current.querySelector('ion-button') as HTMLElement;
      if (focusableElement) {
        setTimeout(() => {
          focusableElement.focus();
        }, 300);
      }

      // Escape key handler for modal
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleBack();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, []);

  return (
    <IonPage ref={pageRef} className="profile-page-overlay" role="dialog" aria-label="User Profile">
      <IonHeader className="profile-header-bar">
        <IonToolbar className="profile-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button" fill="clear" aria-label="Back to dashboard">
              <div className="back-button-circle">
                <IonIcon icon={arrowBack} />
              </div>
            </IonButton>
          </IonButtons>
          <IonTitle className="profile-title">My Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleEditProfile} className="edit-button" fill="clear" aria-label="Edit profile">
              <div className="edit-button-circle">
                <IonIcon icon={pencil} />
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="profile-content">
        
        <IonCard className="profile-header-card">
          <IonCardContent className="profile-header">
            <IonItem lines="none" className="profile-photo-item">
              <IonAvatar slot="start" className="profile-avatar">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <IonIcon icon={person} className="avatar-placeholder" />
                )}
              </IonAvatar>
            </IonItem>
            
            <IonItem lines="none" className="profile-name-item">
              <IonLabel className="profile-name">
                <h2>John Doe</h2>
                <p>Fitness Enthusiast</p>
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard className="profile-stats">
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <h3>127</h3>
                      <p>Workouts</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <h3>89</h3>
                      <p>Days Active</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
                <IonCol size="4">
                  <IonItem lines="none" className="stat-item">
                    <IonLabel className="ion-text-center">
                      <h3>12</h3>
                      <p>Goals Achieved</p>
                    </IonLabel>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Profile;