import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import Tutor from '@/pages/Tutor';

import { colors } from '@/constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Tutor />
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
