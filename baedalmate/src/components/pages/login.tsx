import {useNavigation} from '@react-navigation/native';

import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  getAccessToken,
} from '@react-native-seoul/kakao-login';
import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';

import BtnKakaoLoginWrapper from '../atoms/Button/BtnKakaoLogin';

function Login({navigation}): React.ReactElement {
  const [result, setResult] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [JWTtoken, setJWTData] = useState([]);
  const url = 'http://3.35.27.107:8080/login/oauth2/kakao';

  // accessToken 갱신 시마다 서버에 accessToken 보내고 JWT token 받아옴
  useEffect(() => {
    getData();
  }, [accessToken]);

  // 로그인
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      setAccessToken(token.accessToken);
      setResult(JSON.stringify(token));
      // JWTtoken 받아온 후 메인 페이지 이동
      if (JWTtoken) {
        navigation.navigate('AppTabComponent');
      }
    } catch (error) {
      console.error(error);
    }
  };

  //로그아웃
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  // 프로필 가져오기 (에러 해결 필요)
  const getProfile = async (): Promise<void> => {
    // const profile: KakaoProfile = await getKakaoProfile();
    // setResult(JSON.stringify(profile));
  };

  // 카카오 로그인 연결 끊기
  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    setResult(message);
  };

  // 서버에 accessToken을 포함한 request르 보내고 JWT token을 받아옴
  const getData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      });
      const token = await response.json();
      setJWTData(token);
      console.log(JWTtoken);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <View
      style={{
        marginTop: 50,
        marginHorizontal: '5%',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'gray',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 50,
            lineHeight: 50,
          }}>
          LOGO
        </Text>
      </View>
      <BtnKakaoLoginWrapper
        text={'카카오 로그인'}
        onPress={() => signInWithKakao()}
      />
      {/* <Button
        title="비회원"
        onPress={() => {
          navigation.navigate('AppTabComponent', {});
        }}
      /> */}
    </View>
  );
}

export default Login;
