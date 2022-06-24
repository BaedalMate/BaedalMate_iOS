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
import Header from './Header';
import UserInfoTitle from './UserInfoTitle';

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const TodayMenu = () => {
  return (
    <View
      style={{
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        height: 387,
        paddingHorizontal: '5%',
      }}>
      <Header />
      <UserInfoTitle userName="캡스톤" userAddress="서울과기대 누리학사" />
      <Slider key={0} data="data"></Slider>
    </View>
  );
};

export default TodayMenu;
