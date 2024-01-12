import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export type RootParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Tutor: undefined;
  Schedule: undefined;
  History: undefined;
  Courses: undefined;
  CourseDetail: {courseId: string};
  CourseTopic: undefined;
  TutorDetail: {tutorId: string};
  HomeDrawerRouter: undefined;
  VideoCall: {data: any};
  Profile: undefined;
  BecomeTutor: undefined;
  Message: {recipientId: string; name: string; avatar: string};
  Messages: undefined;
};

type StackProps = NativeStackNavigationProp<
  RootParamList,
  'SignIn',
  'SignUp',
  'Tutor',
  'Schedule',
  'History',
  'Courses',
  'CourseDetail',
  'CourseTopic',
  'TutorDetail',
  'Profile',
  'BecomeTutor',
  'Message',
  'Messages'
>;
export type DrawerProps = DrawerNavigationProp<
  RootParamList,
  'Tutor',
  'Schedule',
  'History',
  'Courses',
  'CourseDetail',
  'CourseTopic',
  'TutorDetail',
  'Profile',
  'BecomeTutor',
  'Messages',
  'Message'
>;

export type User = {
  email: string;
  password: string;
};

export default StackProps;
