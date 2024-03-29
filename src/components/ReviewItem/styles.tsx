import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  info: {
    marginLeft: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: 14,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginLeft: -6,
  },
  description: {
    fontSize: 14,
  },
});

export default styles;
