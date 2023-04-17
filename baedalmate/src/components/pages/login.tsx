import {NavigationProp} from '@react-navigation/native';

import {
  KakaoOAuthToken,
  KakaoProfile,
  login,
  logout,
  unlink,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';

import React, {useEffect, useState} from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';

import BtnKakaoLoginWrapper from '../atoms/Button/BtnKakaoLogin';
import {TextKRBold} from 'themes/text';
import axios from 'axios';
import {FCMURL, url} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGO, LOGO_WITH_TEXT} from 'themes/theme';
import BtnAppleAuth from 'components/atoms/Button/BtnAppleAuth';
import {Text} from 'react-native-paper';
import {
  getAPNSToken,
  getFCMToken,
  getJWTToken,
} from 'components/utils/api/Recruit';
import {refreshAPI} from 'components/utils/api/Login';
import {
  getBrand,
  getVersion,
  getBuildNumber,
  getSystemVersion,
  getUniqueId,
  getModel,
} from 'react-native-device-info';
import {callApiSubscribeTopic} from 'components/utils/FCMSubscribeTopic';
import {
  NotificationAllAllowState,
  NotificationNoticeAllowState,
} from 'components/utils/recoil/atoms/FCMNotificationAllowList';
import {useRecoilState} from 'recoil';
import {
  FCMTokenState,
  JWTAccessTokenState,
  JWTRefreshTokenState,
} from 'components/utils/recoil/atoms/User';

const loginURL = url + '/login/oauth2/kakao';

interface LoginProps {
  navigation: NavigationProp<any, any>;
}

function Login({navigation}: LoginProps): React.ReactElement {
  const [JWTAccessToken, setJWTAccessToken] =
    useRecoilState(JWTAccessTokenState);
  const [JWTRefreshToken, setJWTRefreshToken] =
    useRecoilState(JWTRefreshTokenState);

  const [isEnabledNotice, setIsEnabledNotice] = useRecoilState(
    NotificationNoticeAllowState,
  );
  useEffect(() => {
    if (isEnabledNotice) {
      callApiSubscribeTopic();
    }
  }, [isEnabledNotice]);

  // const [result, setResult] = useState<string>('');
  const [kakaoAccessToken, setKakaoAccessToken] = useState<string>('');
  // const [JWTRefreshToken, setJWTRefreshToken] = useState([]);

  // accessToken 갱신 시마다 서버에 accessToken 보내고 JWT token 받아옴
  useEffect(() => {
    getJWTTokens_server();
    getProfile();
  }, [kakaoAccessToken]);
  const saveTokenToDatabase = async token => {
    const FCMToken = await getFCMToken();
    const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA
    // const JWTAccessToken = await getJWTToken();
    console.log('saveTokenToDatabase 호출');

    if (token && token !== '') {
      const result = await axios
        .post(
          FCMURL,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Fcm-Token': FCMToken,
              'Device-Code': uniqueId,
            },
          },
        )
        .then(function (response) {
          console.log('FCM 등록', response);
          return response;
        })
        .catch(function (error) {
          console.log('FCM 등록 실패', error);
          return error;
        });
      return result;
    }
  };
  // 로그인
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      // console.warn(token);

      setKakaoAccessToken(token.accessToken);
      // setResult(JSON.stringify(token));

      // JWTtoken 받아온 후 메인 페이지 이동
      // const value = await getJWTTokens_localdb();
      const FCMToken = await getFCMToken();
      const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA

      // const values = await AsyncStorage.multiGet([
      //   '@BaedalMate_JWTAccessToken',
      //   '@BaedalMate_JWTRefreshToken',
      // ]);
      const value = await getJWTToken();
      if (value) {
        // console.log(value);
        // const APNSToken = await getAPNSToken();
        // const result = saveTokenToDatabase(FCMToken);
        // console.log(result);
        if (value && value !== '' && FCMToken && uniqueId) {
          // saveTokenToDatabase(uniqueId, value, FCMToken);
          const result = saveTokenToDatabase(value);
          result.then(res => {
            if (res.status == 200) {
              navigation.navigate('BoardStackComponent');
              navigation.reset({
                index: 0,
                routes: [{name: 'BoardStackComponent'}],
              });
            }
          });
        }
      } else {
        getJWTTokens_server();
        // const value = await getJWTToken();
        // const APNSToken = await getAPNSToken();
        // const result = saveTokenToDatabase(FCMToken);
        // console.log(result);
        // await saveTokenToDatabase(APNSToken);
        if (value && value !== '' && FCMToken && uniqueId) {
          const result = saveTokenToDatabase(value);
          // console.log(value);
          result.then(res => {
            if (res.status == 200) {
              navigation.navigate('BoardStackComponent');
              navigation.reset({
                index: 0,
                routes: [{name: 'BoardStackComponent'}],
              });
            }
          });
        } else {
          // const FCMToken = await getFCMToken();
          const token = await getJWTToken();
          const result = saveTokenToDatabase(token);
          result.then(res => {
            if (res.status == 200) {
              navigation.navigate('BoardStackComponent');
              navigation.reset({
                index: 0,
                routes: [{name: 'BoardStackComponent'}],
              });
            }
          });
        }
      }
      // if (JWTTokens[0][1]) {
      //   console.log(JWTTokens);
      //   console.log(JWTTokens[0][1]);
      //   navigation.navigate('BoardStackComponent');
      // }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  //로그아웃
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    // setResult(message);
  };

  // 프로필 가져오기 (에러 해결 필요)
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();
      // profile && setResult(JSON.stringify(profile));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('signOut error', err);
    }
  };

  // 카카오 로그인 연결 끊기
  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    // setResult(message);
  };

  // 서버에 accessToken을 포함한 request를 보내고 JWT token을 받아옴
  const getJWTTokens_server = async () => {
    const kakaoRequest = {
      kakaoAccessToken: kakaoAccessToken,
    };

    try {
      // console.log(kakaoAccessToken);
      const response = await axios.post(loginURL, kakaoRequest, {
        headers: {
          'Content-Type': `application/json`,
        },
      });
      const tokens = await response.data;
      const token = tokens.accessToken;
      const refToken = tokens.refreshToken;

      AsyncStorage.multiSet([
        ['@BaedalMate_JWTAccessToken', token],
        ['@BaedalMate_JWTRefreshToken', refToken],
      ]);
      setJWTAccessToken(token);
      setJWTRefreshToken(refToken);
      return response;
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        const result = await refreshAPI();
        console.log(result);
        if (result.status == 200) {
          const tokens = await result.data;
          const token = tokens.accessToken;
          const refToken = tokens.refreshToken;
          AsyncStorage.multiSet([
            ['@BaedalMate_JWTAccessToken', token],
            ['@BaedalMate_JWTRefreshToken', refToken],
          ]);
          setJWTAccessToken(token);
          setJWTRefreshToken(refToken);
          // setJWTAccessToken(token);
          // setJWTRefreshToken(refToken);
          return result;
        }
      }
      // if (result.status === 200) {
      //   navigation.navigate('BoardStackComponent');
      //   navigation.reset({
      //     index: 0,
      //     routes: [{name: 'BoardStackComponent'}],
      //   });
      // }
      return error;
    }
  };

  //AsyncStorage에 JWT Access/Refresh Token 저장
  // const getJWTTokens_localdb = async () => {
  //   try {
  //     const values = await AsyncStorage.multiGet([
  //       '@BaedalMate_JWTAccessToken',
  //       '@BaedalMate_JWTRefreshToken',
  //     ]);

  //     console.log(values);
  //     return values;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  useEffect(() => {
    //  const FCMToken = await getFCMToken();
    //  const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA
    //  const value = await getJWTToken();
    // if (JWTAccessToken && JWTAccessToken !== '') {
    const result = saveTokenToDatabase(JWTAccessToken);
    // console.log(value);
    result.then(res => {
      if (res.status == 200) {
        navigation.navigate('BoardStackComponent');
        navigation.reset({
          index: 0,
          routes: [{name: 'BoardStackComponent'}],
        });
      }
    });
    // }
  }, [JWTAccessToken]);
  return (
    <View
      style={{
        // marginTop: 50,
        marginHorizontal: '5%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {/* <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'gray',
          justifyContent: 'center',
        }}> */}
      <Image
        source={LOGO_WITH_TEXT}
        style={{
          // marginTop: 55,
          // marginBottom: 90,
          width: 400,
          height: 400,
          justifyContent: 'center',
        }}
      />
      {/* </View> */}
      {/* <View style={{bottom: 20}}> */}
      <BtnKakaoLoginWrapper onPress={() => signInWithKakao()} />
      <BtnAppleAuth navigation={navigation} />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <TextKRBold
          style={{
            fontSize: 12,
            lineHeight: 18,
            color: '#C8C8C8',
          }}>
          가입 시 배달메이트의{' '}
        </TextKRBold>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(url + '/terms/service.html');
          }}
          style={{}}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: 12,
              lineHeight: 18,
              color: '#C8C8C8',
            }}>
            이용약관
          </Text>
        </TouchableOpacity>
        <TextKRBold
          style={{
            fontSize: 12,
            lineHeight: 18,
            color: '#C8C8C8',
          }}>
          및{' '}
        </TextKRBold>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(url + '/terms/service-privacy.html');
          }}
          style={{}}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: 12,
              lineHeight: 18,
              color: '#C8C8C8',
            }}>
            개인정보취급방침
          </Text>
        </TouchableOpacity>
        <TextKRBold
          style={{
            fontSize: 12,
            lineHeight: 18,
            color: '#C8C8C8',
          }}>
          에 동의하게 됩니다.
        </TextKRBold>
      </View>
    </View>
    // </View>
  );
}

export default Login;
