import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';

type Props = {
  title: string;
  children?: React.ReactNode;
};

const InfoPart = (props: Props) => {
  const {title, children} = props;
  return (
    <View style={styles.infoPart}>
      <Text style={styles.infoTitle} className="text-black dark:text-white">
        {title}
      </Text>
      {children}
    </View>
  );
};

export default React.memo(InfoPart);
