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
  IonAvatar,
  IonCard,
  IonCardContent,
  IonActionSheet,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel
} from '@ionic/react';
import { arrowBack, camera, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Profile.css';

const Profile: React.FC = () => {
  const history = useHistory();
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleBack = () => {
    history.goBack();
  };

  const handlePhotoAction = (action: string) => {
    setShowActionSheet(false);
    
    switch (action) {
      case 'camera':
        // In a real app, you'd use Capacitor Camera plugin
        setShowAlert(true);
        break;
      case 'gallery':
        // In a real app, you'd use Capacitor Camera plugin
        setShowAlert(true);
        break;
      case 'remove':
        setProfileImage(null);
        break;
      default:
        break;
    }
  };

  return (
    <IonPage className="profile-page-overlay">
      <IonHeader className="profile-header-bar">
        <IonToolbar className="profile-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button" fill="clear">
              <div className="back-button-circle">
                <IonIcon icon={arrowBack} />
              </div>
            </IonButton>
          </IonButtons>
          <IonTitle className="profile-title">My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="profile-content">
        
        <IonCard className="profile-header-card">
          <IonCardContent className="profile-header">
            <IonItem lines="none" className="profile-photo-item">
              <IonAvatar slot="start" className="profile-avatar" onClick={() => setShowActionSheet(true)}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <IonIcon icon={person} className="avatar-placeholder" />
                )}
              </IonAvatar>
              
              <IonButton 
                fill="clear" 
                className="camera-button"
                onClick={() => setShowActionSheet(true)}
                slot="end"
              >
                <IonIcon icon={camera} />
              </IonButton>
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

        {/* Action Sheet for Photo Options */}
        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Take Photo',
              icon: camera,
              handler: () => handlePhotoAction('camera')
            },
            {
              text: 'Choose from Gallery',
              icon: 'image',
              handler: () => handlePhotoAction('gallery')
            },
            ...(profileImage ? [{
              text: 'Remove Photo',
              icon: 'trash',
              role: 'destructive' as const,
              handler: () => handlePhotoAction('remove')
            }] : []),
            {
              text: 'Cancel',
              role: 'cancel' as const
            }
          ]}
        />

        {/* Alert for Photo Feature */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Photo Feature"
          message="Photo upload functionality requires native device capabilities. This will be implemented using Capacitor Camera plugin."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;