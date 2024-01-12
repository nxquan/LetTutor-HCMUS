import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    width: width * 0.7,
    marginTop: 16,
    marginLeft: 12,
  },
  info: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 10,
  },
  image: {
    resizeMode: 'contain',
    width: width * 0.7,
    height: width * 0.54,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  des: {
    fontSize: 14,
    marginBottom: 16,
  },
  addition: {
    fontSize: 14,
  },
});

export default styles;
