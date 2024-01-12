import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  table: {},
  header: {
    flexDirection: 'row',
  },
  firstCell: {
    width: 100,
  },
  cell: {
    width: 90,
    height: 40,
    borderWidth: 0.5,
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
