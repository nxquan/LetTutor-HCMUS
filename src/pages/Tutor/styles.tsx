import {StyleSheet} from 'react-native';
import {colors} from '@/constants';
const styles = StyleSheet.create({
  notiContainer: {
    backgroundColor: '#0c3ddf',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  notiHeading: {
    color: colors.white,
    fontSize: 24,
    marginTop: -12,
    fontWeight: '500',
    textAlign: 'center',
  },
  notiDateText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  notiRemainTimeText: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  tutorContainer: {
    paddingHorizontal: 16,
    marginTop: 33,
    marginBottom: 30,
  },
  inputContainer: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tutorList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  resetBtn: {
    color: '#1890ff',
    borderColor: '#1890ff',
    flexGrow: 0,
    width: 110,
    paddingHorizontal: 8,
  },
  dropdownMenuBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 8,
  },
});

export default styles;
