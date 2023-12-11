/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {EventProvider} from 'react-native-outside-press';
import MainStackRouter from '@/router/MainStackRouter';
import React from 'react';
import {LogBox} from 'react-native';
import {GlobalProvider} from '@/store';
import Tutor from '@/pages/Tutor';
import TutorDetail from '@/pages/TutorDetail';
import Courses from '@/pages/Courses';
import Profile from '@/pages/Profile';
import BecomeTutor from '@/pages/BecomeTutor';
import Schedule from '@/pages/Schedule';
import History from '@/pages/History';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <EventProvider>
          <MainStackRouter />
        </EventProvider>
      </GlobalProvider>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

export default App;
