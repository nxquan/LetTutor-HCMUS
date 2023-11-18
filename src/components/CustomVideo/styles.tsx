import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
});
export default styles;
