import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Slider from 'components/atoms/Main/Slider';
import ImageSlider from 'components/atoms/Main/Slider';
import TodayMenuItem from 'components/atoms/Main/Slider';
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
import {TextKRBold, TextKRReg} from 'themes/text';

interface CategoryItemProps {
  // navigation: NavigationProp<any, any>;
  categoryName: string;
  img: string;
}

const CategoryItem: React.FunctionComponent<CategoryItemProps> = ({
  categoryName,
  img,
}) => {
  return (
    <View style={{marginBottom: 15}}>
      <View
        style={{
          width: 75,
          height: 75,
          backgroundColor: LIGHT_GRAY_COLOR,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Image
          source={{uri: img}}
          style={{width: 45, height: 45, borderRadius: 45 / 2}}></Image>
        <TextKRReg style={{}}>{categoryName}</TextKRReg>
      </View>
    </View>
  );
};

export default CategoryItem;
