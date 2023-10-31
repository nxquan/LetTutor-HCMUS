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
  headingText: {
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 8,
    color: colors.black,
  },
  text: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    textAlign: 'justify',
  },
  courseSearch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grey300,
    paddingLeft: 12,
    marginBottom: 12,
  },
  courseInput: {paddingVertical: 4, flex: 1, color: colors.text},
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
    zIndex: 100,
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
    paddingVertical: 4,
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
    color: colors.text,
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
    color: colors.black,
  },
  courseList: {
    zIndex: -1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
