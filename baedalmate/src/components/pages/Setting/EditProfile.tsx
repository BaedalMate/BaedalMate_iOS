import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CAMERA_GRAY_FILLED_BIG_ICON,
  DARK_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import MypageUserInfo from 'components/atoms/Setting/MyPageUserInfo';
import MyPageListItem from 'components/atoms/Setting/MyPageListItem';
import MyPageBar from 'components/atoms/Setting/MyPageBar';
import MyPageBottom from 'components/atoms/Bottom/MyPageBottom';
import {getUserAPI} from 'components/utils/api/User';
import {TextKRBold, TextKRReg} from 'themes/text';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';

export interface MyPageI {
  userId: number;
  nickname: string;
  profileImage: string;
  dormitory: string;
  score: number;
}
export const MyPageUserDummyData = {
  profileImage:
    'https://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
  userName: '김예빈',
  score: '4.3',
  dormitory: '성림학사',
};

const EditProfile = ({route, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: WHITE_COLOR,
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{marginTop: 48, marginBottom: 75}}>
        <Image
          source={{}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            backgroundColor: '#8F939B',
            borderWidth: 1,
            borderColor: LIGHT_GRAY_COLOR,
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderWidth: 1,
            borderColor: LINE_GRAY_COLOR,
            borderRadius: 30 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={CAMERA_GRAY_FILLED_BIG_ICON}
            style={{width: 18, height: 14}}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: '100%'}}>
        <TextKRBold style={{fontSize: 14, lineHeight: 17}}>닉네임</TextKRBold>
        <TextInput
          placeholder="5자 이내로 닉네임을 작성해 주세요"
          style={{
            fontSize: 14,
            lineHeight: 24,
            borderWidth: 1,
            borderColor: LINE_GRAY_COLOR,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            textAlignVertical: 'center',
            marginTop: 7,
          }}
          placeholderTextColor={MAIN_GRAY_COLOR}></TextInput>
      </View>
      <View style={{width: '100%', position: 'absolute', bottom: 45}}>
        <BtnVerticalOrange onPress={() => {}} text={'저장하기'} />
      </View>
    </View>
  );
};

export default EditProfile;
