import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: colors.white,
    width: '80%',
    padding: 16,
  },
});

export default styles;
