import React, {useEffect} from 'react';
import {LayoutChangeEvent, Text, TouchableOpacity, View} from 'react-native';
import {ITab} from './SwiperView';
import styles from './styles';
import {recruitListCategoryIdxState} from 'components/utils/recoil/atoms/RecruitList';
import {useRecoilState} from 'recoil';
import {LIGHT_GRAY_COLOR, LINE_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';

interface TabProps {
  isSelected: boolean;
  tab: ITab;
  tabButtonStyles: object;
  tabButtonActiveStyles: object;
  tabButtonTextStyles: object;
  tabButtonTextActiveStyles: object;
  onTabPress: () => void;
  onTabLayout: (e: LayoutChangeEvent) => void;
  tabTextColor: string;
  tabTextSelectedColor: string;
}

export default function Tab({
  isSelected,
  tab,
  tabButtonStyles,
  tabButtonActiveStyles,
  tabButtonTextStyles,
  tabButtonTextActiveStyles,
  onTabPress,
  onTabLayout,
  tabTextColor,
  tabTextSelectedColor,
}: TabProps) {
  const [currentIndex, setCurrentIndex] = useRecoilState(
    recruitListCategoryIdxState,
  );
  useEffect(() => {
    setCurrentIndex(currentIndex);
  }, [isSelected]);
  return (
    <View onLayout={onTabLayout}>
      <TouchableOpacity
        onPress={() => onTabPress()}
        style={[
          styles.tabButton,
          tabButtonStyles,
          isSelected
            ? {
                ...styles.tabButtonActive,
                ...tabButtonActiveStyles,
                ...tabButtonTextActiveStyles,
                borderBottomWidth: 4,
                borderBottomColor: PRIMARY_COLOR,
              }
            : {borderBottomWidth: 2, borderBottomColor: LINE_GRAY_COLOR},
        ]}>
        <Text
          style={[
            styles.tabButtonText,
            tabButtonTextStyles,
            {color: tabTextColor},
            isSelected
              ? {
                  ...styles.tabButtonTextActive,
                  ...tabButtonTextActiveStyles,
                  color: tabTextSelectedColor,
                }
              : {},
          ]}>
          {tab.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
