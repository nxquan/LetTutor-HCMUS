import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  btn: {
    width: 50,
    paddingVertical: 2,
    backgroundColor: '#009dff',
    borderRadius: 99,
    color: colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    color: colors.grey400,
  },
});

export default styles;
