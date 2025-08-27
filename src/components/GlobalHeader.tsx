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
  IonLabel
} from '@ionic/react';
import { menuOutline, person, settings, logOut, barbell } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

  const handleMenuAction = (action: string) => {
    setIsMenuOpen(false);
    
    switch (action) {
      case 'profile':
        history.push('/profile');
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
          <IonButton id="menu-trigger" onClick={() => setIsMenuOpen(true)}>
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
    </IonHeader>
  );
};

export default GlobalHeader;