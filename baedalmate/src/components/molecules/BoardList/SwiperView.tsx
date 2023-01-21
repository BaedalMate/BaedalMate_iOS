import React, {ReactElement, useCallback, useRef, useState} from 'react';
import {Animated, Dimensions, ScrollView, View} from 'react-native';
import Tabs from './Tabs';
import styles from './styles';
import {BLACK_COLOR, LINE_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';
import {useRecoilState} from 'recoil';
import {recruitListCategoryIdxState} from 'components/utils/recoil/atoms/RecruitList';
export const WIDTH = Dimensions.get('window').width;
export interface ITab {
  id: number;
  name: string;
  component: ReactElement;
}

export interface IMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}
interface SwiperViewProps {
  tabList: ITab[];
  tabHeaderStyles: object;
  tabButtonStyles: object;
  tabButtonActiveStyles: object;
  tabButtonTextStyles: object;
  tabButtonTextActiveStyles: object;
  tabBarContainerStyles: object;
  tabBarLineStyles: object;
  tabBarStyles: object;
  tabHeaderColor: string;
  tabTextColor: string;
  tabBarColor: string;
  tabTextSelectedColor: string;
}

export default function SwiperView({
  tabList = [],
  tabHeaderStyles = {},
  tabButtonStyles = {},
  tabButtonActiveStyles = {},
  tabButtonTextStyles = {},
  tabButtonTextActiveStyles = {},
  tabBarContainerStyles = {},
  tabBarLineStyles = {},
  tabBarStyles = {},
  tabHeaderColor = '',
  tabTextColor = '',
  tabBarColor = '',
  tabTextSelectedColor = '',
}: SwiperViewProps): ReactElement {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollHeaderRef = useRef<ScrollView>(null);
  const [scrollContainerWidth, setScrollContainerWidth] = useState<number>(0);
  const [measures, setMeasures] = useState<IMeasure[]>([]);
  const [currentIndex, setCurrentIndex] = useRecoilState(
    recruitListCategoryIdxState,
  );

  const moveHeaderScroll = (moveIndex: number) => {
    setCurrentIndex(moveIndex);
    if (measures[moveIndex]) {
      const {x, width} = measures[moveIndex];
      const offsetX = x + width - WIDTH;
      const space = Math.floor(width / 3);

      if (offsetX > 0) {
        scrollHeaderRef.current?.scrollTo({
          x: offsetX + space > scrollContainerWidth ? offsetX : offsetX + space,
          y: 0,
        });
      } else {
        scrollHeaderRef.current?.scrollTo({x: 0, y: 0});
      }
    }
  };
  const onTabPress = (index: number) => {
    moveHeaderScroll(index);
    scrollRef.current?.scrollTo({x: index * WIDTH, y: 0});
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.tabHeader,
          tabHeaderStyles,
          {backgroundColor: tabHeaderColor},
        ]}>
        <ScrollView
          ref={scrollHeaderRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={{
            width: '100%',
            borderBottomColor: LINE_GRAY_COLOR,
            borderBottomWidth: 2,
          }}>
          <Tabs
            scrollX={scrollX}
            tabList={tabList}
            onTabPress={onTabPress}
            measures={measures}
            setMeasures={setMeasures}
            setScrollContainerWidth={setScrollContainerWidth}
            currentIndex={currentIndex}
            tabButtonStyles={tabButtonStyles}
            tabButtonActiveStyles={tabButtonActiveStyles}
            tabButtonTextStyles={tabButtonTextStyles}
            tabButtonTextActiveStyles={tabButtonTextActiveStyles}
            tabBarContainerStyles={tabBarContainerStyles}
            tabBarLineStyles={tabBarLineStyles}
            tabBarStyles={tabBarStyles}
            tabTextColor={tabTextColor}
            tabBarColor={tabBarColor}
            tabTextSelectedColor={tabTextSelectedColor}
          />
        </ScrollView>
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        bounces={false}
        snapToAlignment="center"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onMomentumScrollEnd={e => {
          const scrollX = e.nativeEvent.contentOffset.x; // 총 이동거리
          const moveIndex = Math.floor(scrollX / WIDTH + 0.5); // 현재 화면 인덱스
          moveHeaderScroll(moveIndex);
        }}>
        {tabList.map((tab, i) => (
          <View
            key={i}
            style={{
              width: WIDTH,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {tab.component}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
