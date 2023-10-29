import { StyleSheet } from 'react-native';
import { colors } from '@/constants';
const styles = StyleSheet.create({
  notiContainer: {
    backgroundColor: '#0c3ddf',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  notiHeading: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
  },
  notiDateText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  notiRemainTimeText: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  tutorContainer: {
    paddingHorizontal: 16,
    marginTop: 33,
    marginBottom: 30,
  },
  inputContainer: {
    color: colors.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tutorList: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
});

export default styles;
