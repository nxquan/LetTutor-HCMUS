import { Dimensions, StyleSheet } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  pdf: {
    width: width * 0.95,
  },
});

export default styles;
