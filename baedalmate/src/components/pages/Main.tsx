import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import Category from 'components/molecules/Main/Category';
import Header from 'components/atoms/Header/Header';
import Slider from 'components/atoms/Main/Slider';
import ImageSlider from 'components/atoms/Main/Slider';
import TodayMenuItem from 'components/atoms/Main/Slider';
import UserInfoTitle from 'components/atoms/Main/UserInfoTitle';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Image,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  ALARM_WHITE,
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  SEARCH_WHITE,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import NowGathering from 'components/molecules/Main/NowGathering';
import TodayMenu from 'components/molecules/Main/TodayMenu';
import {SafeAreaView} from 'react-native-safe-area-context';
import BaedalMateRecommendation from 'components/molecules/Main/BaedalMateRecommendation';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import BtnHorizontal3 from 'components/molecules/Button/BtnHorizontal3';
import CreateBoard from './CreateBoard';
interface MainProps {
  navigation: NavigationProp<any, any>;
  user: {
    userName: string;
    userAddress: string;
  };
}

const Main: React.FunctionComponent<MainProps> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BtnFloating
        onPress={() => {
          props.navigation.navigate('채팅');
        }}
      />
      <ScrollView>
        <TodayMenu />
        <Category />
        <View
          style={{
            width: '95%',
            height: 1,
            borderColor: LINE_GRAY_COLOR,
            borderWidth: 1,
            marginTop: 24,
            marginBottom: 16,
          }}
        />
        <View
          style={{
            height: 260,
            paddingHorizontal: '5%',
          }}>
          <TextKRBold
            style={{
              lineHeight: 22,
              fontSize: 16,
              marginBottom: 13,
              color: '#212123',
            }}>
            지금 모으고 있어요!
          </TextKRBold>
          <NowGathering></NowGathering>
        </View>
        <View
          style={{
            width: '95%',
            height: 1,
            borderColor: LINE_GRAY_COLOR,
            borderWidth: 1,
            marginTop: 20,
            marginBottom: 16,
          }}
        />
        <View
          style={{
            paddingHorizontal: '5%',
          }}>
          <TextKRBold
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: '#212123',
            }}>
            배달메이트 추천
          </TextKRBold>
          <BaedalMateRecommendation></BaedalMateRecommendation>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
