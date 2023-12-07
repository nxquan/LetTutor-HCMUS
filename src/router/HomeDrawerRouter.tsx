import React, {useEffect, useState} from 'react';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {DrawerProps} from '@/types/type';
import Tutor from '@/pages/Tutor';
import Schedule from '@/pages/Schedule';
import History from '@/pages/History';
import Courses from '@/pages/Courses';
import CourseTopic from '@/pages/CourseTopic';
import TutorDetail from '@/pages/TutorDetail';
import {
  BecomeTutorIcon,
  CoursesIcon,
  HistoryIcon,
  LogoutIcon,
  MyCourseIcon,
  RecurringScheduleIcon,
  ScheduleIcon,
  TutorIcon,
} from '@/assets/icons';

import {images} from '@/assets';
import CourseDetail from '@/pages/CourseDetail';
import {colors} from '@/constants';
import {useGlobalContext} from '@/hooks';
import {logout} from '@/store';
import BecomeTutor from '@/pages/BecomeTutor';
import Profile from '@/pages/Profile';
const Drawer = createDrawerNavigator<DrawerProps>();

const HomeDrawerRouter = () => {
  const [state, dispatch] = useGlobalContext();
  const [profile, setProfile] = useState<any>({});
  const handleLogout = (navigation: any) => {
    dispatch(logout());
    navigation.navigate('SignIn');
  };

  useEffect(() => {
    if (state?.currentUser) {
      setProfile(state.currentUser);
    }
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => {
        const {navigation} = props;
        return (
          <SafeAreaView>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="rgba(0,0,0,0.1)"
              onPress={() => navigation.navigate('Profile')}
              style={{
                marginTop: 20,
                marginBottom: 6,
                marginLeft: 12,
                borderRadius: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                }}>
                <Image
                  source={{
                    uri:
                      profile?.avatar ||
                      'https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1700296337596.jpg',
                  }}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.black,
                  }}>
                  {profile?.name}
                </Text>
              </View>
            </TouchableHighlight>
            <DrawerItemList {...props} />
            <TouchableHighlight
              onPress={() => handleLogout(navigation)}
              underlayColor="rgba(0,0,0,0.2)"
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                marginLeft: 6,
                borderRadius: 4,
              }}>
              <View style={{flexDirection: 'row'}}>
                <LogoutIcon style={{width: 24, height: 24, marginRight: -16}} />
                <Text
                  style={{
                    marginLeft: 34,
                    fontWeight: '500',
                    color: colors.error,
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableHighlight>
          </SafeAreaView>
        );
      }}
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '70%',
        },
        drawerItemStyle: {
          marginRight: 0,
        },
      }}>
      {/* <Drawer.Screen
        name="RecurringLessonSchedule"
        component={Tutor}
        options={{
          drawerLabel: 'Recurring Lesson Schedule',
          title: 'Recurring Lesson Schedule',
          drawerIcon: () => (
            <RecurringScheduleIcon
              style={{width: 24, height: 24, marginRight: -16}}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Tutor"
        component={Tutor}
        options={{
          drawerLabel: 'Tutor',
          title: 'Tutor',
          drawerIcon: () => (
            <TutorIcon style={{width: 24, height: 24, marginRight: -16}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Schedule"
        component={Schedule}
        options={{
          drawerLabel: 'Schedule',
          title: 'Schedule',
          drawerIcon: () => (
            <ScheduleIcon style={{width: 24, height: 24, marginRight: -16}} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerLabel: 'History',
          title: 'History',
          drawerIcon: () => (
            <HistoryIcon style={{width: 24, height: 24, marginRight: -16}} />
          ),
        }}
      />
      <Drawer.Screen
        name="Courses"
        component={Courses}
        options={{
          drawerLabel: 'Courses',
          title: 'Courses',
          drawerIcon: () => (
            <CoursesIcon style={{width: 24, height: 24, marginRight: -16}} />
          ),
        }}
      />
      <Drawer.Screen
        name="CourseTopic"
        component={CourseTopic}
        options={{
          drawerLabel: 'My Course',
          title: 'My Course',
          drawerIcon: () => (
            <MyCourseIcon style={{width: 24, height: 24, marginRight: -16}} />
          ),
        }}
      />
      <Drawer.Screen
        name="CourseDetail"
        component={CourseDetail}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />
      <Drawer.Screen
        name="BecomeTutor"
        component={BecomeTutor}
        options={{
          drawerLabel: 'Become a tutor',
          title: 'Become a tutor',
          drawerIcon: () => (
            <BecomeTutorIcon
              style={{width: 24, height: 24, marginRight: -16}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerRouter;
