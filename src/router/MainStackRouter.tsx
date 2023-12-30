import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootParamList} from '@/types/type';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import HomeDrawerRouter from './HomeDrawerRouter';
import CourseDetail from '@/pages/CourseDetail';
import CourseTopic from '@/pages/CourseTopic';
import VideoCall from '@/pages/VideoCall';
import Profile from '@/pages/Profile';
import TutorDetail from '@/pages/TutorDetail';
import Tutor from '@/pages/Tutor';
import Message from '@/pages/Message';
import Messages from '@/pages/Messages';

const Stack = createNativeStackNavigator<RootParamList>();

const MainStackRouter = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Tutor" component={Tutor} />
      <Stack.Screen name="CourseDetail" component={CourseDetail} />
      <Stack.Screen name="CourseTopic" component={CourseTopic} />
      <Stack.Screen name="VideoCall" component={VideoCall} />
      <Stack.Screen name="HomeDrawerRouter" component={HomeDrawerRouter} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="TutorDetail" component={TutorDetail} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Messages" component={Messages} />
    </Stack.Navigator>
  );
};

export default MainStackRouter;
