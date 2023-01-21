import React from 'react';
import {Animated, Easing} from 'react-native';
import {ITab, IMeasure, WIDTH} from './SwiperView';
import styles from './styles';

interface IndicatorProps {
  tabList: ITab[];
  measures: IMeasure[];
  scrollX: Animated.Value;
  tabBarContainerStyles: object;
  tabBarStyles: object;
  tabBarLineStyles: object;
  tabBarColor: string;
}

export default function Indicator({
  tabList,
  measures,
  scrollX,
  tabBarStyles,
  tabBarContainerStyles,
  tabBarLineStyles,
  tabBarColor,
}: IndicatorProps) {
  const inputRange = tabList.map((_, index) => index * WIDTH);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width),
    easing: Easing.inOut(Easing.linear),
  });
  const indicatorTranslateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x),
    easing: Easing.inOut(Easing.linear),
  });

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          width: indicatorWidth,
          left: 0,
          transform: [{translateX: indicatorTranslateX}],
          height: 4,
        },
        tabBarContainerStyles,
        {backgroundColor: tabBarColor},
        tabBarStyles,
        tabBarLineStyles,
      ]}></Animated.View>
  );
}
