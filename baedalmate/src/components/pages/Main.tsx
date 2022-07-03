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
  StatusBar,
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
import axios from 'axios';
import {url} from '../../../App';
import {toUSVString} from 'util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userURL = url + '/api/v1/user';
const recruitListURL = url + '/api/v1/recruit/list';

interface MainProps {
  navigation: NavigationProp<any, any>;
  user: {
    nickname: string;
    dormitory: string;
    profileImage: string;
  };
}

const Main: React.FunctionComponent<MainProps> = props => {
  const [yOffset, setYOffset] = useState(0);
  const [StatusBGColor, setStatusBGColor] = useState(PRIMARY_COLOR);
  //user 관련 state
  const [nickname, setNickname] = useState('캡스톤');
  const [dormitory, setDormitory] = useState('누리학사');
  const [profileImage, setProfileImage] = useState('');
  //recruit 관련 state
  const [recruitList, setRecruitList] = useState('');

  // AsyncStorge에 저장한 JWT token을 받아옴
  const getJWTToken = async () => {
    const JWTAccessToken = await AsyncStorage.getItem(
      '@BaedalMate_JWTAccessToken',
    );
    return String(JWTAccessToken);
  };

  // User Api 를 받아옴
  const getUserData = async () => {
    const JWTAccessToken = await getJWTToken();

    try {
      const UserData = axios
        .get(userURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(function (response) {
          console.log(response);
          // AsyncStorage에 유저 이름과 배달 거점 저장
          AsyncStorage.setItem('@BaedalMate_UserName', response.data.nickname);
          AsyncStorage.setItem(
            '@BaedalMate_Dormitory',
            response.data.dormitory,
          );
          // 해당 페이지는 렌더링 문제로 state 설정 후 사용
          setNickname(response.data.nickname);
          setDormitory(response.data.dormitory);
          setProfileImage(response.data.profileImage);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return UserData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  // 모집글 리스트 Api 받아옴
  const getRecruitList = async () => {
    const JWTAccessToken = await getJWTToken();
    try {
      const RecruitListData = axios
        .get(recruitListURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(function (response) {
          console.log(response);
          setRecruitList(response.data.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      console.log(RecruitListData);
      return RecruitListData;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 스크롤바 위치에 따른 status bar 화면 배경 색상 변경 코드
  useEffect(() => {
    console.log(StatusBGColor);
    yOffset <= 387
      ? setStatusBGColor(PRIMARY_COLOR)
      : setStatusBGColor(WHITE_COLOR);
  }, [yOffset]);

  // 렌더링 시 유저 정보 받아오기
  useEffect(() => {
    getUserData();
    getRecruitList();
  }, []);

  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: StatusBGColor,
          height: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight,
        }}>
        <StatusBar backgroundColor={PRIMARY_COLOR} />
      </View>
      <View style={{flex: 1}}>
        <BtnFloating
          onPress={() => {
            props.navigation.navigate('채팅');
            // 임시 값. 변경 필요
          }}
        />
        <ScrollView
          onScroll={event => {
            console.log(event.nativeEvent.contentOffset.y);
            setYOffset(event.nativeEvent.contentOffset.y);
          }}>
          <TodayMenu
            dormitory={dormitory}
            nickname={nickname}
            profileImage={profileImage}
          />
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
      </View>
    </>
  );
};

export default Main;
