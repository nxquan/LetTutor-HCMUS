import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
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
    color: colors.text,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: colors.black,
  },
});

export default styles;
