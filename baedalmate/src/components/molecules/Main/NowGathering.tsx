import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Slider, {data} from 'components/atoms/Main/Slider';
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
import CategoryItem from '../../atoms/Main/CategoryItem';
import {TextKRBold, TextKRReg} from 'themes/text';
import NowGatheringItem from '../../atoms/Main/NowGatheringItem';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const NowGathering = () => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <NowGatheringItem item={data[0]}></NowGatheringItem>
        <NowGatheringItem item={data[1]}></NowGatheringItem>
        <NowGatheringItem item={data[2]}></NowGatheringItem>
        <NowGatheringItem item={data[3]}></NowGatheringItem>
        <NowGatheringItem item={data[4]}></NowGatheringItem>
      </ScrollView>
    </View>
  );
};

export default NowGathering;
