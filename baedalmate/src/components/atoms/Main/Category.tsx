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

// interface CategoryProps {
//   navigation: NavigationProp<any, any>;
//   user: {
//     userName: string;
//     userAddress: string;
//   };
// }

const Category = () => {
  return (
    <View
      style={{
        height: 200,
        marginTop: 30,
        paddingHorizontal: '5%',
      }}>
      <TextKRBold
        style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 12,
          color: '#212123',
        }}>
        메뉴 둘러보기
      </TextKRBold>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
        <CategoryItem
          categoryName="전체보기"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="1인분"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="치킨"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="한식"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="전체보기"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="1인분"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="치킨"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
        <CategoryItem
          categoryName="한식"
          img="https://pizzapalaceburwell.com/wp-content/uploads/2021/11/Food.jpg"></CategoryItem>
      </View>
    </View>
  );
};

export default Category;
