import { StyleSheet } from 'react-native';
import { colors } from '../@/constants';

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '400',
    color: colors.grey500,
  },
  textControl: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.grey500,
    borderWidth: 1,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
});
