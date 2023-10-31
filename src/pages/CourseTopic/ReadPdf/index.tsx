import { Dimensions, Pressable, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import styles from './styles';
const height = Dimensions.get('window').height;

const source = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

const ReadPdf = () => {
  return (
    <ScrollView
      contentContainerStyle={{ height: height }}
      nestedScrollEnabled={true}
    >
      <Pdf
        source={source}
        trustAllCerts={true}
        onLoadComplete={(number, filePath) => {}}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={[styles.pdf, { height: height * 3 }]}
      />
    </ScrollView>
  );
};

export default ReadPdf;
