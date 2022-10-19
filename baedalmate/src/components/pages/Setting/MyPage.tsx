import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

export interface MyPageI {
  profileImage: string;
  userName: string;
  score: string;
}
const MyPageUserDummyData = {
  profileImage:
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  userName: '김예빈',
  score: '4.3',
};

const MyPageRecruitDummyData = [
  {
    name: '주최한 모집',
    onPress: () => {},
  },
  {
    name: '참여한 모집',
    onPress: () => {},
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

const MyPage = ({route, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: LINE_GRAY_COLOR,
      }}>
      <MypageUserInfo item={MyPageUserDummyData} />
      {MyPageRecruitDummyData.map((v, i) => (
        <>
          <MyPageBar height={3} />
          <MyPageListItem item={v} />
        </>
      ))}
      <MyPageBar height={12} />

      {MyPageSettingDummyData.map((v, i) => (
        <>
          {i !== 0 && <MyPageBar height={3} />}
          <MyPageListItem item={v} />
        </>
      ))}
      <MyPageBottom />
    </View>
  );
};

export default MyPage;
