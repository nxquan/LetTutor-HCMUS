import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';

export type RootParamList = {
	SignIn: undefined;
	SignUp: undefined;
	Tutor: undefined;
	Schedule: undefined;
	History: undefined;
	Courses: undefined;
	CourseDetail: undefined;
	CourseTopic: undefined;
	TutorDetail: undefined;
	HomeDrawerRouter: undefined;
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
	'TutorDetail'
>;
export type DrawerProps = DrawerNavigationProp<
	RootParamList,
	'SignIn',
	'SignUp',
	'Tutor',
	'Schedule',
	'History',
	'Courses',
	'CourseDetail',
	'CourseTopic',
	'TutorDetail'
>;
export default StackProps;
