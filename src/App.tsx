import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './pages/Dashboard';
import Progress from './pages/Progress';
import Workout from './pages/Workout';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Exercise from './pages/Exercise';
import TabNavigation from './components/TabNavigation';
import RestTimer from './components/RestTimer';
import { RestTimerProvider, useRestTimer } from './contexts/RestTimerContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const { isTimerVisible, restTime, resetTrigger, workoutPaused, hideRestTimer } = useRestTimer();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/dashboard">
              <Tab1 />
            </Route>
            <Route exact path="/progress">
              <Progress />
            </Route>
            <Route exact path="/workout">
              <Workout />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
          <TabNavigation />
        </IonTabs>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/edit-profile">
          <EditProfile />
        </Route>
        <Route exact path="/exercise">
          <Exercise />
        </Route>
        
        {/* Global Rest Timer */}
        <RestTimer
          isVisible={isTimerVisible}
          onClose={hideRestTimer}
          initialTime={restTime}
          resetTrigger={resetTrigger}
          workoutPaused={workoutPaused}
        />
      </IonReactRouter>
    </IonApp>
  );
};

const App: React.FC = () => (
  <RestTimerProvider>
    <AppContent />
  </RestTimerProvider>
);

export default App;
