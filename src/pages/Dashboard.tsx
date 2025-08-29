import React from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonButton,
  IonProgressBar,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/react';
import { add, search, barbell, trendingUp, checkmark } from 'ionicons/icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import GlobalHeader from '../components/GlobalHeader';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const progressItems = [
    {
      title: 'Weekly Goal',
      value: '3/4',
      label: 'workouts',
      progress: 75,
      color: 'var(--progress-green)'
    },
    {
      title: 'Monthly Volume',
      value: '18.2k',
      label: 'lbs lifted',
      progress: 65,
      color: 'var(--progress-blue)'
    },
    {
      title: 'Consistency',
      value: '85%',
      label: 'this month',
      progress: 85,
      color: 'var(--progress-orange)'
    },
    {
      title: 'Sleep Quality',
      value: '7.2',
      label: 'hours avg',
      progress: 72,
      color: '#9C27B0'
    },
    {
      title: 'Nutrition Score',
      value: '78%',
      label: 'compliance',
      progress: 78,
      color: '#F44336'
    },
    {
      title: 'Cardio Minutes',
      value: '180',
      label: 'of 200 min',
      progress: 90,
      color: '#9C27B0'
    }
  ];

  const mockData = {
    activeGoals: [
      {
        id: 1,
        title: 'Bench Press PR',
        current: 185,
        target: 200,
        unit: 'lbs',
        progress: 92,
        daysLeft: 13,
        color: 'var(--progress-orange)',
        icon: barbell
      },
      {
        id: 2,
        title: 'Squat Consistency',
        current: 12,
        target: 16,
        unit: 'sessions',
        progress: 75,
        daysLeft: 6,
        color: '#9C27B0',
        icon: trendingUp
      }
    ],
    recentActivity: {
      title: 'Full Body Beginner - Week 12',
      exercises: 3,
      duration: '45m 0s',
      timeAgo: '2 days ago'
    }
  };

  const handleQuickAction = (action: string) => {
    console.log(`${action} clicked`);
  };

  const handleGoalClick = (goalId: number) => {
    console.log(`Goal ${goalId} clicked`);
  };

  return (
    <IonPage>
      <GlobalHeader />
      <IonContent className="dashboard-content">

        
        <IonGrid className="quick-actions">
          <IonRow>
            <IonCol size="6">
              <IonCard className="action-card" button onClick={() => handleQuickAction('Start Workout')}>
                <IonCardContent className="action-card-content">
                  <IonIcon icon={add} slot="start" color="success" className="action-icon green" />
                  <IonText>
                    <h3>Start Workout</h3>
                    <p>Begin a new workout</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard className="action-card" button onClick={() => handleQuickAction('Browse Exercises')}>
                <IonCardContent className="action-card-content">
                  <IonIcon icon={search} slot="start" color="primary" className="action-icon blue" />
                  <IonText>
                    <h3>Browse Exercises</h3>
                    <p>52+ exercises</p>
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Your Progress */}
        <IonItem lines="none" className="section-header">
          <IonLabel>
            <h2>Your Progress</h2>
          </IonLabel>
        </IonItem>
        
        <div className="progress-swiper-container">
          <Swiper
            slidesPerView={3}
            spaceBetween={12}
            centeredSlides={false}
            className="progress-swiper"
          >
            {progressItems.map((item, index) => (
              <SwiperSlide key={index}>
                <IonCard className="progress-item">
                  <IonCardContent className="circular-progress">
                    <CircularProgressbar
                      value={item.progress}
                      text=""
                      styles={buildStyles({
                        pathColor: item.color,
                        trailColor: `${item.color}20`
                      })}
                    />
                    <div className="progress-content">
                      <IonText className="progress-value">{item.value}</IonText>
                      <IonText className="progress-label">{item.label}</IonText>
                    </div>
                  </IonCardContent>
                  <IonText className="progress-title">
                    <p>{item.title}</p>
                  </IonText>
                </IonCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Active Goals */}
        <IonItem lines="none" className="section-header">
          <IonLabel>
            <h2>Active Goals</h2>
          </IonLabel>
          <IonButton fill="clear" color="success" slot="end">
            View All
          </IonButton>
        </IonItem>
        
        <div className="goals-section">
          {mockData.activeGoals.map((goal) => (
            <IonCard key={goal.id} className="goal-card" button onClick={() => handleGoalClick(goal.id)}>
              <IonCardContent>
                <IonItem lines="none" className="goal-content">
                  <IonIcon icon={goal.icon} slot="start" className="goal-icon" style={{ backgroundColor: `${goal.color}20`, color: goal.color }} />
                  <IonLabel className="goal-info">
                    <h3>{goal.title}</h3>
                    <p>{goal.current} {goal.unit} → {goal.target} {goal.unit}</p>
                  </IonLabel>
                  <div className="goal-stats" slot="end">
                    <IonLabel className="progress-percentage">
                      {goal.progress}%
                    </IonLabel>
                    <IonLabel className="days-left">
                      <p>{goal.daysLeft} days left</p>
                    </IonLabel>
                  </div>
                </IonItem>
                <IonProgressBar value={goal.progress / 100} color="warning" className="goal-progress" />
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Latest Workout */}
        <IonItem lines="none" className="section-header">
          <IonLabel>
            <h2>Latest Workout</h2>
          </IonLabel>
        </IonItem>
        
        <IonCard className="activity-card">
          <IonCardContent>
            <IonItem lines="none">
              <IonAvatar slot="start" className="activity-avatar">
                <div className="activity-icon">
                  <IonIcon icon={checkmark} />
                </div>
              </IonAvatar>
              <IonLabel>
                <h3>{mockData.recentActivity.title}</h3>
                <p>{mockData.recentActivity.exercises} exercises • {mockData.recentActivity.duration}</p>
              </IonLabel>
              <IonText slot="end" className="time-ago">
                <p>{mockData.recentActivity.timeAgo}</p>
              </IonText>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
