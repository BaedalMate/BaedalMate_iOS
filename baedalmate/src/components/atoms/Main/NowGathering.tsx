import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Slider from 'components/atoms/Main/Slider';
import ImageSlider from 'components/atoms/Main/Slider';
import TodayMenuItem from 'components/atoms/Main/Slider';
import {wrap} from 'module';
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ALARM_WHITE,
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  PRIMARY_COLOR,
  SEARCH_WHITE,
  WHITE_COLOR,
} from 'themes/theme';
import CategoryItem from './CategoryItem';
import {TextKRBold, TextKRReg} from 'themes/text';
import NowGatheringItem from './NowGatheringItem';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const NowGathering = () => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
      }}>
      <ScrollView
        horizontal={true}
        // style={{
        //   justifyContent: 'space-between',
        // }}
        contentContainerStyle={{
          flexGrow: 1,
          marginHorizontal: 15,
        }}>
        <NowGatheringItem></NowGatheringItem>
        <NowGatheringItem></NowGatheringItem>
        <NowGatheringItem></NowGatheringItem>
        <NowGatheringItem></NowGatheringItem>
        <NowGatheringItem></NowGatheringItem>
      </ScrollView>
    </View>
  );
};

export default NowGathering;
