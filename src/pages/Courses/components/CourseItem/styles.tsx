import { colors } from '@/constants';
import { Dimensions, StyleSheet } from 'react-native';

const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    elevation: 12,
    shadowColor: 'black',
    shadowRadius: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: width * 0.8,
    marginTop: 16,
    marginBottom: 12,
  },
  info: {
    paddingHorizontal: 24,
    paddingTop: 12,
    elevation: 10,
    paddingBottom: 10,
  },
  image: {
    resizeMode: 'contain',
    width: width * 0.8,
    height: 240,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  des: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 24,
  },
  addition: {
    fontSize: 12,
  },
});

export default styles;
