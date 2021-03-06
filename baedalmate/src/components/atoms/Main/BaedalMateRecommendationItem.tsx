import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Slider, {status} from 'components/atoms/Main/Slider';
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
  ImageBackground,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ALARM_WHITE,
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PEOPLE_BLACK,
  PRIMARY_COLOR,
  SEARCH_WHITE,
  STAR_BLACK,
  STAR_PRIMARY,
  STAR_WHITE,
  TIMER_BLACK,
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

const BaedalMateRecommendationItem = ({item}) => {
  return (
    <View
      style={{
        marginRight: 15,
        width: 150,
        minHeight: 204,
        borderRadius: 10,
      }}>
      <Image
        source={{uri: item.imgUrl}}
        resizeMode="cover"
        // source={{uri: item.imgUrl}}
        style={{
          width: 150,
          height: 95,
          backgroundColor: LINE_GRAY_COLOR,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          marginVertical: 5,
          minHeight: 104,
        }}>
        <TextKRBold
          fontSize={16}
          style={{
            fontSize: 18,
          }}>
          {item.title}{' '}
        </TextKRBold>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <TextKRBold
            style={{
              flex: 1,
              fontSize: 14,
              marginBottom: 7,
              lineHeight: 20,
              marginRight: 17,
              justifyContent: 'center',
            }}>
            <Image
              source={PEOPLE_BLACK}
              style={{width: 17, height: 15, resizeMode: 'contain'}}
            />{' '}
            {item.body.curruntPeople}/{item.body.maxPeople}
          </TextKRBold>
          <TextKRBold
            style={{
              flex: 1.5,
              fontSize: 14,
              marginBottom: 7,
              lineHeight: 20,
              justifyContent: 'center',
            }}>
            {' '}
            <Image
              source={TIMER_BLACK}
              style={{width: 12, height: 15, resizeMode: 'contain'}}
            />{' '}
            {item.body.maxTime}???
          </TextKRBold>
        </View>

        <TextKRReg>
          ?????????{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.baedalTips
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            ???
          </TextKRBold>
        </TextKRReg>
        <TextKRReg>
          ????????????{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.minCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            ???
          </TextKRBold>
        </TextKRReg>
        <TextKRReg>
          {item.user.userName} &middot; {item.user.userAddress}{' '}
          <Image source={STAR_BLACK} style={{width: 14, height: 14}}></Image>{' '}
          {item.user.userStarRate}
        </TextKRReg>
      </View>
    </View>
  );
};

export default BaedalMateRecommendationItem;
