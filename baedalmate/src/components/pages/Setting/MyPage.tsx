import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {LIGHT_GRAY_COLOR, LINE_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';
import BoardList from 'components/molecules/BoardList/BoardList';
import Sort from 'components/molecules/BoardList/Sort';
import {CategoryList} from 'components/atoms/BoardList/CategoryItem';
import BtnFloating from 'components/atoms/Button/BtnFloating';
import axios from 'axios';
import MypageUserInfo from 'components/atoms/Setting/MyPageUserInfo';
import MyPageListItem from 'components/atoms/Setting/MyPageListItem';
import MyPageBar from 'components/atoms/Setting/MyPageBar';
import MyPageBottom from 'components/atoms/Bottom/MyPageBottom';
import {useNavigation} from '@react-navigation/native';

export interface MyPageI {
  profileImage: string;
  userName: string;
  score: string;
  dormitory: string;
}
export const MyPageUserDummyData = {
  profileImage:
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  userName: '김예빈',
  score: '4.3',
  dormitory: '성림학사',
};

const MyPage = ({route, navigation}) => {
  // const navigation = useNavigation();

  const MyPageRecruitDummyData = [
    {
      name: '주최한 모집',
      onPress: () => {
        navigation.navigate('주최한 모집' as never);
      },
    },
    {
      name: '참여한 모집',
      onPress: () => {
        navigation.navigate('참여한 모집' as never);
      },
    },
    // {
    //   name: '내 거점 설정',
    //   onPress: () => {
    //     navigation.navigate('내 거점 설정' as never);
    //   },
    // },
    {
      name: 'GPS 인증하기',
      onPress: () => {
        navigation.navigate('GPS 인증하기' as never);
      },
    },
  ];
  const MyPageSettingDummyData = [
    {
      name: '이벤트',
      onPress: () => {},
    },
    {
      name: '공지사항',
      onPress: () => {},
    },
    {
      name: '1:1 문의',
      onPress: () => {},
    },
    {
      name: '설정',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: LINE_GRAY_COLOR,
      }}>
      <MypageUserInfo item={MyPageUserDummyData} />
      {MyPageRecruitDummyData.map((v, i) => (
        <View key={i}>
          <MyPageBar height={3} />
          <MyPageListItem item={v} />
        </View>
      ))}
      <MyPageBar height={12} />

      {MyPageSettingDummyData.map((v, i) => (
        <View key={i}>
          {i !== 0 && <MyPageBar height={3} />}
          <MyPageListItem item={v} />
        </View>
      ))}
      <MyPageBottom />
    </ScrollView>
  );
};

export default MyPage;
