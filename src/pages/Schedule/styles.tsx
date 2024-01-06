import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  intro: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 20,
    textAlign: 'justify',
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
    color: colors.text,
    backgroundColor: colors.grey200,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'left',
    borderWidth: 0.5,
    borderColor: colors.grey300,
  },

  scheduleList: {
    paddingHorizontal: 20,
    marginTop: 12,
    backgroundColor: colors.white,
  },
});

export default styles;
