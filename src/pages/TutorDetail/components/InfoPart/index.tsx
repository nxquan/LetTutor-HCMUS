import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';

type Props = {
  title: string;
  children?: React.ReactNode;
};

const InfoPart = (props: Props) => {
  const { title, children } = props;
  return (
    <View style={styles.infoPart}>
      <Text style={styles.infoTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default InfoPart;
