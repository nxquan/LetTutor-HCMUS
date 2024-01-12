import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inner: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  info: {},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    marginRight: 20,
  },
  table: {},
  header: {
    flexDirection: 'row',
  },
  firstCell: {
    backgroundColor: '#f9f9f9',
    width: 100,
  },
  cell: {
    width: 90,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    padding: 4,
    borderRadius: 4,
  },
  modalBody: {
    position: 'relative',
    width: '100%',
    paddingTop: 12,
  },
});

export default styles;
