import {StyleSheet} from 'react-native';
import {colors} from '@/constants';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 28,
    marginLeft: -8,
  },
  paginationItem: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.grey350,
    marginLeft: 8,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  activeContainer: {
    borderColor: colors.primary,
  },
  activeTitle: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default styles;
