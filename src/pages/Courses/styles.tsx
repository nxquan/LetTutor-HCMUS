import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    textAlign: 'justify',
  },
  search: {
    paddingHorizontal: 20,
  },
  courseTabs: {},
  courseSection: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  courseHeading: {
    marginLeft: 12,
    fontSize: 24,
    fontWeight: '500',
  },
  courseList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
