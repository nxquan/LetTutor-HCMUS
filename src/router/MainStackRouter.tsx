import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StackProps, { RootParamList } from '@/global/type';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import HomeDrawerRouter from './HomeDrawerRouter';

const Stack = createNativeStackNavigator<RootParamList>();
const MainStackRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName='Tutor'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='HomeDrawerRouter' component={HomeDrawerRouter} />
    </Stack.Navigator>
  );
};

export default MainStackRouter;
