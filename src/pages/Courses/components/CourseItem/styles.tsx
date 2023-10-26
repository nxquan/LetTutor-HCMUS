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
    width: width * 0.4,
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
    width: width * 0.4,
    height: width * 0.3,
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
    color: colors.text,
    marginBottom: 16,
  },
  addition: {
    fontSize: 14,
  },
});

export default styles;
