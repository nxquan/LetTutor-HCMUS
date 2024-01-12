import {colors} from '@/constants';
import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inner: {
    alignItems: 'center',
  },
  courseInfo: {
    elevation: 6,
    shadowRadius: 8,
    borderRadius: 8,
    width: width * 0.95,
    marginTop: 12,
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
  },
  topicList: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  topicHeading: {
    fontSize: 20,
    fontWeight: '500',
  },
  pdfContainer: {
    marginTop: 4,
  },
  pdfHeader: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
