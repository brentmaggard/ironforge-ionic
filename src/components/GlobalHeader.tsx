import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonAlert
} from '@ionic/react';
import { menuOutline, person, settings, logOut, barbell, library, download, shareOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIOSInstallAlert, setShowIOSInstallAlert] = useState(false);
  const history = useHistory();
  const { isInstallable, isIOSInstallable, promptInstall } = useInstallPrompt();

  const handleMenuAction = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'profile':
        history.push('/profile');
        break;
      case 'exercise':
        history.push('/exercise');
        break;
      case 'install':
        handleInstallApp();
        break;
      case 'settings':
        console.log('Settings clicked');
        break;
      case 'logout':
        console.log('Logout clicked');
        break;
      default:
        break;
    }
  };

  const handleInstallApp = async () => {
    if (isIOSInstallable) {
      setShowIOSInstallAlert(true);
    } else {
      const installed = await promptInstall();
      if (installed) {
        console.log('App installed successfully!');
      }
    }
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonIcon 
            icon={barbell} 
            style={{ 
              fontSize: '28px', 
              marginLeft: '17px', 
              transform: 'rotate(-35deg)' 
            }} 
          />
        </IonButtons>
        <IonTitle>IronForge</IonTitle>
        <IonButtons slot="end">
          <IonButton id="menu-trigger" onClick={() => setIsMenuOpen(true)} aria-label="Open main menu">
            <IonIcon icon={menuOutline} />
          </IonButton>
          <IonPopover
            trigger="menu-trigger"
            isOpen={isMenuOpen}
            onDidDismiss={() => setIsMenuOpen(false)}
            showBackdrop={true}
          >
            <IonList>
              <IonItem button onClick={() => handleMenuAction('profile')}>
                <IonIcon icon={person} slot="start" />
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem button onClick={() => handleMenuAction('exercise')}>
                <IonIcon icon={library} slot="start" />
                <IonLabel>Exercise Library</IonLabel>
              </IonItem>
              {(isInstallable || isIOSInstallable) && (
                <IonItem button onClick={() => handleMenuAction('install')}>
                  <IonIcon icon={download} slot="start" />
                  <IonLabel>Install App</IonLabel>
                </IonItem>
              )}
              <IonItem button onClick={() => handleMenuAction('settings')}>
                <IonIcon icon={settings} slot="start" />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem button onClick={() => handleMenuAction('logout')}>
                <IonIcon icon={logOut} slot="start" />
                <IonLabel>Logout</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonButtons>
      </IonToolbar>

      <IonAlert
        isOpen={showIOSInstallAlert}
        onDidDismiss={() => setShowIOSInstallAlert(false)}
        header="Install IronForge"
        message={`To install this app on your iPhone/iPad:\n\n1. Tap the Share button ${shareOutline} at the bottom of Safari\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm`}
        buttons={[
          {
            text: 'Got it',
            role: 'confirm'
          }
        ]}
      />
    </IonHeader>
  );
};

export default GlobalHeader;