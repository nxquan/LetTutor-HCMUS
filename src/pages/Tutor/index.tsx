import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Feather, FontAwesome, Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import Button from '../../components/Button';
import TutorItem from './components/TutorItem';
import PaginationItem from './components/PaginationItem';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const typesOfTutor = [
  'All',
  'English for kids',
  'English for Business',
  'Conversational',
  'STARTERS',
  'MOVERS',
  'FLYERS',
  'KET',
  'PET',
  'IELTS',
  'TOEFL',
  'TOEIC',
];

const Tutor = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState('All');

  const [searchValue, setSearchValue] = useState({
    tutorName: '',
    tutorNationality: '',
    date: new Date(),
  });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date) => {
    const { type } = event;
    if (type == 'set') {
      const currentDate = selectedDate;
      setSearchValue((prev) => {
        return { ...prev, date: currentDate };
      });
      setIsShowDatePicker(!isShowDatePicker);
    } else {
      setIsShowDatePicker(!isShowDatePicker);
    }
  };

  const renderTypesOfTutor = () => {
    return typesOfTutor.map((type, index) => {
      let active = {};
      if (selectedTypes == type) {
        active = {
          color: colors.primary,
          backgroundColor: colors.backgroundActive,
        };
      }
      return (
        <Button
          key={index}
          onPress={() => setSelectedTypes(type)}
          title={type}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 10,
            backgroundColor: colors.grey200,
            marginLeft: 10,
            marginBottom: 8,
            borderRadius: 6,
            ...active,
          }}
        />
      );
    });
  };

  return (
    <ScrollView>
      <Header />
      <View style={styles.notiContainer}>
        <Text style={styles.notiHeading}>Upcoming lesson</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.notiDateText}>Fri, 20 Oct 23 00:30 - 00:55</Text>
            <Text style={styles.notiRemainTimeText}>(starts in ...)</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              flex: 1,
              flexDirection: 'row',
              flexShrink: 0,
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Feather name='youtube' size={24} color={colors.primary} />
            <Text style={{ marginLeft: 6, color: colors.primary, fontSize: 14 }}>
              Enter lesson room
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: colors.white,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '500',
            marginTop: 12,
          }}
        >
          Total lesson time is 507 hours 5 minutes
        </Text>
      </View>

      <View style={styles.tutorContainer}>
        <Text style={{ fontSize: 29, fontWeight: '700', marginBottom: 6 }}>Find a tutor</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            placeholder='Enter tutor name'
            style={[styles.inputContainer, { flex: 1, marginRight: 12 }]}
          />
          <TextInput placeholder='Select tutor national' style={styles.inputContainer} />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: '500', marginTop: 10 }}>
            Select available tutoring time:
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '50%',
              },
            ]}
          >
            <TextInput editable={false} placeholder='Select a day ' />
            <FontAwesome name='calendar' size={20} color={colors.text} style={{ marginLeft: 20 }} />
          </View>
          {isShowDatePicker && (
            <DateTimePicker mode='date' display='calendar' value={searchValue.date} />
          )}
          <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                width: (width * 2) / 3,
                marginTop: 12,
              },
            ]}
          >
            <TextInput editable={false} placeholder='Start time' style={{ flex: 1 }} />
            <Entypo
              style={{ marginHorizontal: 12 }}
              name='arrow-long-right'
              size={20}
              color={colors.text}
            />
            <TextInput editable={false} placeholder='End time' style={{ flex: 1 }} />
            <AntDesign
              style={{ marginLeft: 12 }}
              name='clockcircleo'
              size={20}
              color={colors.text}
            />
          </View>

          <View style={{ marginTop: 12, marginLeft: -12, flexDirection: 'row', flexWrap: 'wrap' }}>
            {renderTypesOfTutor()}
          </View>
          {/* <DateTimePicker mode='time' display='spinner' value={searchValue.date} /> */}

          <View>
            <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 10 }}>
              Recommended Tutors
            </Text>
            <View style={styles.tutorList}>
              <TutorItem />
              <TutorItem />
              <TutorItem />
              <TutorItem />
              <TutorItem />
            </View>
          </View>
        </View>
        <View style={styles.pagination}>
          <PaginationItem
            icon={<Ionicons name='md-chevron-back-outline' size={20} color={colors.grey350} />}
          />
          <PaginationItem active={true} title={1} />
          <PaginationItem title={2} />
          <PaginationItem title={3} />
          <PaginationItem
            icon={<Ionicons name='md-chevron-forward-outline' size={20} color={colors.grey350} />}
          />
        </View>
      </View>
      <StatusBar style='dark' />
    </ScrollView>
  );
};

export default Tutor;
