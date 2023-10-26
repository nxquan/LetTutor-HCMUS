import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { EventProvider } from 'react-native-outside-press';
import MainStackRouter from '@/router/MainStackRouter';

export default function App() {
  return (
    <NavigationContainer>
      <EventProvider>
        <MainStackRouter />
      </EventProvider>
    </NavigationContainer>
  );
}
