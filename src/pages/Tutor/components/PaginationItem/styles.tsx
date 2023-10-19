import { StyleSheet } from 'react-native';
import { colors } from '../../../../constants/colors';
const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.grey350,
    marginLeft: 8,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeContainer: {
    borderColor: colors.primary,
  },
  activeTitle: {
    color: colors.primary,
    fontSize: 16,
  },
  title: {
    color: colors.black,
  },
});

export default styles;
