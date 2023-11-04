import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
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
  video: {
    borderRadius: 10,
  },
  videoControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoSlider: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 8,
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  videoTime: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
  },
  actionBtn: {
    padding: 4,
    borderRadius: 4,
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {
    height: 40,
  },
});

export default styles;
