import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  intro: {
    paddingHorizontal: 20,
    marginTop: 12,
  },
  headingText: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 8,
  },
  courseSearch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey300,
    paddingLeft: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  courseInput: {paddingVertical: 6, fontSize: 15, flex: 1},
  searchBtn: {
    borderColor: colors.grey300,
    borderLeftWidth: 1,
    height: '100%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    paddingHorizontal: 20,
  },
  dropdownMenuBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 8,
  },
  courseTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    marginLeft: -12,
  },
  courseTabText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
    padding: 6,
  },
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
