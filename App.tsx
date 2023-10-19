import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SignUp from './src/pages/SignUp';
import Tutor from './src/pages/Tutor';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Tutor />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
