import {colors} from '@/constants';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  inner: {
    alignItems: 'center',
  },
  courseInfo: {
    elevation: 6,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowRadius: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    width: width * 0.95,
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
    color: colors.black,
  },
  des: {
    fontSize: 14,
    color: colors.black,
  },
  topicList: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  topicHeading: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
  },
  pdfContainer: {
    marginTop: 12,
  },
  pdfHeader: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    paddingVertical: 6,
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,

    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  pdfActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfBtn: {
    padding: 6,
    borderRadius: 4,
  },
  pdfBody: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  pdfSidebar: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  pdf: {
    width: '100%',
    height: height,
  },
});

export default styles;
