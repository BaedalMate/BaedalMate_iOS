import {StyleSheet} from 'react-native';
import {
  BLACK_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tabHeader: {
    position: 'relative',
    height: 50,
    width: '100%',
    backgroundColor: WHITE_COLOR,
  },
  tabScrollContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  tabButtonList: {
    flexDirection: 'row',
  },
  tabButton: {
    padding: 10,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    padding: 10,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonText: {
    color: BLACK_COLOR,
    fontSize: 16,
    fontWeight: '400',
    // height: 50,
    // lineHeight: 50,
  },
  tabButtonTextActive: {
    color: BLACK_COLOR,
    fontSize: 16,
    fontWeight: '700',
  },
  tabBarContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 100,
    bottom: 0,
    borderBottomWidth: 2,
    backgroundColor: LINE_GRAY_COLOR,
    borderBottomColor: LINE_GRAY_COLOR,
  },
  tabBarLine: {
    backgroundColor: LINE_GRAY_COLOR,
    width: '100%',
    height: 2,
  },
  tabBar: {
    height: 4,
    position: 'absolute',
    backgroundColor: PRIMARY_COLOR,
    width: 1,
    left: 0,
    bottom: 0,
  },
});

export default styles;
