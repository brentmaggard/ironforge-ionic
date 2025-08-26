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

const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <IonItem button>
                <IonIcon icon={person} slot="start" />
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={settings} slot="start" />
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem button>
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