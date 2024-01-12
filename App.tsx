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
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <EventProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <MainStackRouter />
          </GestureHandlerRootView>
        </EventProvider>
      </GlobalProvider>
    </NavigationContainer>
  );
}

LogBox.ignoreAllLogs();
export default App;
