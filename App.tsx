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
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <EventProvider>
        <MainStackRouter />
      </EventProvider>
    </NavigationContainer>
  );
}

LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

export default App;
