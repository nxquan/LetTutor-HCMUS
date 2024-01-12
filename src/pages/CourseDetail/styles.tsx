import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inner: {
    paddingHorizontal: 24,
  },
  intro: {
    elevation: 12,
    shadowRadius: 8,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 12,
  },
  info: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 260,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  des: {
    fontSize: 14,
    marginBottom: 24,
  },
  discoverBtn: {
    backgroundColor: '#0071F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  detail: {
    paddingBottom: 48,
  },
  detailContent: {
    marginTop: 16,
  },
  detailHeading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 12,
  },
  line: {
    height: 1,
    backgroundColor: colors.grey300,
    flex: 1,
  },
  detailItem: {
    marginTop: 8,
  },
  detailItemHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 6,
  },
  detailItemText: {
    fontSize: 15,
    marginLeft: 32,
  },
  topicItem: {
    flexDirection: 'row',
    elevation: 2,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowRadius: 4,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.grey100,
  },
  topic: {
    fontWeight: '400',
    paddingVertical: 24,
  },
});

export default styles;
