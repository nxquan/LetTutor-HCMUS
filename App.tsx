import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { colors } from '@/constants';

import Schedule from '@/pages/Schedule';
import Tutor from '@/pages/Tutor';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import History from '@/pages/History';

import { EventProvider } from 'react-native-outside-press';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseTopic';

export default function App() {
  return (
    <EventProvider>
      <SafeAreaView style={styles.container}>
        <CourseDetail />
        <StatusBar
          backgroundColor={colors.white}
          barStyle={'dark-content'}
          showHideTransition={'fade'}
        />
      </SafeAreaView>
    </EventProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
