import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  bookContainer: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'left',
    borderWidth: 0.5,
    borderColor: colors.grey300,
  },
  scheduleList: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
});

export default styles;
