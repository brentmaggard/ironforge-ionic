import React from 'react';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { home, trendingUp, barbell } from 'ionicons/icons';

const TabNavigation: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="dashboard" href="/dashboard">
        <IonIcon aria-hidden="true" icon={home} />
        <IonLabel>Dashboard</IonLabel>
      </IonTabButton>
      <IonTabButton tab="progress" href="/progress">
        <IonIcon aria-hidden="true" icon={trendingUp} />
        <IonLabel>Progress</IonLabel>
      </IonTabButton>
      <IonTabButton tab="workout" href="/workout">
        <IonIcon aria-hidden="true" icon={barbell} />
        <IonLabel>Workout</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabNavigation;