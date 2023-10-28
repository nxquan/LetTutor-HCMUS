import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { EventProvider } from 'react-native-outside-press';
import MainStackRouter from '@/router/MainStackRouter';
import TutorDetail from '@/pages/TutorDetail';
import CourseTopic from '@/pages/CourseTopic';

export default function App() {
  return (
    <NavigationContainer>
      <EventProvider>
        {/* <MainStackRouter /> */}
        {/* <TutorDetail /> */}
        <CourseTopic />
      </EventProvider>
    </NavigationContainer>
  );
}
