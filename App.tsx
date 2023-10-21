import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Schedule from '@/pages/Schedule';
import Tutor from '@/pages/Tutor';
import { colors } from '@/constants';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Schedule />
      <StatusBar
        backgroundColor={colors.white}
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
