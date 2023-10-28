import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {},
  inner: {
    paddingHorizontal: 10,
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
  actionBtn: {
    padding: 4,
    borderRadius: 4,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 40 },
  text: { textAlign: 'center' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
});

export default styles;
