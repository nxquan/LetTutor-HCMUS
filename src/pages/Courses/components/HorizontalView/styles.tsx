import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
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
    zIndex: -1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
