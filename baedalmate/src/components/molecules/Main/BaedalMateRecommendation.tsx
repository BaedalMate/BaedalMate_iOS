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
import BtnSortActive from 'components/atoms/Button/BtnRadio';
import BtnSort from 'components/atoms/Button/BtnRadio';
import BtnSelectSort from '../Button/BtnSelectSort';
import BaedalMateRecommendationItem from 'components/atoms/Main/BaedalMateRecommendationItem';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const BaedalMateRecommendation = () => {
  return (
    <View style={{}}>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 15,
        }}>
        <BtnSelectSort />
      </View>

      <ScrollView
        horizontal={true}
        style={
          {
            // justifyContent: 'space-between',
          }
        }
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <BaedalMateRecommendationItem
          item={data[0]}></BaedalMateRecommendationItem>
        <BaedalMateRecommendationItem
          item={data[1]}></BaedalMateRecommendationItem>
        <BaedalMateRecommendationItem
          item={data[2]}></BaedalMateRecommendationItem>
        <BaedalMateRecommendationItem
          item={data[3]}></BaedalMateRecommendationItem>
        <BaedalMateRecommendationItem
          item={data[4]}></BaedalMateRecommendationItem>
      </ScrollView>
    </View>
  );
};

export default BaedalMateRecommendation;
