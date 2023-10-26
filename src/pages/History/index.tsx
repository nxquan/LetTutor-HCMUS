import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import Header from '@/components/Header';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';
import Pagination from '@/components/Pagination';
import HistoryItem from './components/HistoryItem';

const History = () => {
  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <View style={styles.intro}>
        <Image source={images.history} style={{ width: 120, height: 120 }} />
        <View>
          <Text style={{ fontSize: 30, fontWeight: '500', marginBottom: 8 }}>
            History
          </Text>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.grey400,
              paddingLeft: 10,
            }}
          >
            <Text style={styles.text}>
              The following is a list of lessons you have attended. You can
              review the details of the lessons you have attended
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.historyList}>
        <HistoryItem />
        <HistoryItem />
        <HistoryItem />
      </View>
      <Pagination style={{ paddingHorizontal: 20 }} />
    </ScrollView>
  );
};

export default History;
