import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  lessonBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 12,
  },
  actionBtn: {
    color: colors.primary,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    paddingBottom: 12,
  },
  lessonComment: {
    borderColor: '#f1f1f1',
    borderWidth: 1,
    paddingLeft: 12,
  },
  modalInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderColor: colors.grey200,
    borderWidth: 1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  modalBody: {
    position: 'relative',
  },

  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    shadowColor: 'black',
    elevation: 10,
    marginTop: 4,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});

export default styles;
