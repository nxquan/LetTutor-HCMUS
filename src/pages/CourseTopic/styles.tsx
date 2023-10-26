import { colors } from '@/constants';
import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  inner: {
    alignItems: 'center',
  },
  infoContainer: {
    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowRadius: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: width * 0.9,
    marginTop: 16,
    marginBottom: 12,
  },
  info: {
    paddingHorizontal: 24,
    paddingTop: 12,
    elevation: 10,
    marginBottom: 16,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 240,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
  },
  des: {
    fontSize: 14,
    color: colors.text,
  },
  topicList: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  topicHeading: {
    fontSize: 20,
    fontWeight: '500',
  },
  showPdfContainer: {},
});

export default styles;
