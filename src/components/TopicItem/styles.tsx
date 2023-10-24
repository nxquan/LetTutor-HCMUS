import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  touchContainer: {
    borderRadius: 8,
    marginTop: 6,
  },
  active: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  topicItem: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  topicNo: {
    fontSize: 15,
    fontWeight: '400',
    marginLeft: 12,
  },
  topicName: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400',
  },
});

export default styles;
