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
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonActionSheet,
  IonAlert
} from '@ionic/react';
import { arrowBack, checkmark, camera, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './EditProfile.css';

const EditProfile: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('John Doe');
  const [tagline, setTagline] = useState('Fitness Enthusiast');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleBack = () => {
    history.goBack();
  };

  const handleSave = () => {
    // In a real app, you'd save the profile data
    console.log('Saving profile:', { name, tagline, email, phone, profileImage });
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
    <IonPage className="edit-profile-page-overlay">
      <IonHeader className="edit-profile-header-bar">
        <IonToolbar className="edit-profile-toolbar">
          <IonButtons slot="start">
            <IonButton onClick={handleBack} className="back-button" fill="clear">
              <div className="back-button-circle">
                <IonIcon icon={arrowBack} />
              </div>
            </IonButton>
          </IonButtons>
          <IonTitle className="edit-profile-title">Edit Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} className="save-button" fill="clear">
              <div className="save-button-circle">
                <IonIcon icon={checkmark} />
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="edit-profile-content">
        
        {/* Profile Photo Section */}
        <div className="edit-profile-photo-section">
          <div className="edit-profile-photo-wrapper">
            <IonAvatar className="edit-main-profile-avatar" onClick={() => setShowActionSheet(true)}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <IonIcon icon={person} className="edit-main-avatar-placeholder" />
              )}
            </IonAvatar>
            
            <IonButton 
              fill="solid" 
              className="edit-photo-badge"
              onClick={() => setShowActionSheet(true)}
            >
              <IonIcon icon={camera} />
            </IonButton>
          </div>
          <p className="photo-edit-text">Tap to change photo</p>
        </div>
        
        <IonCard className="edit-form-card">
          <IonCardHeader>
            <IonCardTitle>Personal Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={name}
                onIonInput={(e) => setName(e.detail.value!)}
                placeholder="Enter your name"
              />
            </IonItem>
            
            <IonItem>
              <IonLabel position="stacked">Tagline</IonLabel>
              <IonInput
                value={tagline}
                onIonInput={(e) => setTagline(e.detail.value!)}
                placeholder="Enter your tagline"
              />
            </IonItem>
            
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
                placeholder="Enter your email"
              />
            </IonItem>
            
            <IonItem>
              <IonLabel position="stacked">Phone</IonLabel>
              <IonInput
                type="tel"
                value={phone}
                onIonInput={(e) => setPhone(e.detail.value!)}
                placeholder="Enter your phone number"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonCard className="bio-card">
          <IonCardHeader>
            <IonCardTitle>About Me</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel position="stacked">Bio</IonLabel>
              <IonTextarea
                placeholder="Tell us about your fitness journey..."
                rows={4}
              />
            </IonItem>
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

export default EditProfile;