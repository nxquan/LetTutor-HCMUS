import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#474747',
    width: width,
    height: height,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    top: height - 75,
    backgroundColor: colors.black,
    padding: 6,
    borderRadius: 6,
  },
  controlItem: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: colors.black,
  },
  controlItemInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlSubmenuBtn: {
    backgroundColor: '#36383c',
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  participants: {
    position: 'absolute',
    right: 12,
    top: 20,
  },
});

export default styles;
