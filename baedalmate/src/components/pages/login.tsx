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
import appleAuth, {
  AppleCredentialState,
  AppleError,
  AppleRequestOperation,
  AppleRequestScope,
} from '@invertase/react-native-apple-authentication';
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
  const [FCMToken, setFCMToken] = useRecoilState(FCMTokenState);

  const [isEnabledAll, setIsEnabledAll] = useRecoilState(
    NotificationAllAllowState,
  );

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
  const saveTokenToDatabase = async () =>
    // uniqueId,
    // JWTAccessToken,
    // FCMToken,
    {
      const FCMToken = await getFCMToken();

      const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA

      // const values = await AsyncStorage.multiGet([
      //   '@BaedalMate_JWTAccessToken',
      //   '@BaedalMate_JWTRefreshToken',
      // ]);
      const JWTAccessToken = await getJWTToken();
      // // const apiLevel = await getApiLevel(); // only android
      // const brand = await getBrand(); // apple samsung
      // const version = await getVersion(); // 1.0
      // const buildNumber = await getBuildNumber(); // 1
      // const systemVersion = await getSystemVersion(); // iOS 13.4, Android 9
      // const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA
      // const model = await getModel(); // 기종 SM-G960N or iPhone 8

      console.log('saveTokenToDatabase 호출');

      const result = await axios
        .post(
          FCMURL,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + JWTAccessToken,
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

      if (result) {
        console.log('FCM 등록', result);
      }
      return result;
      // Assume user is already signed in
      // const userId = auth().currentUser.uid;
      // Add the token to the users datastore
      // await firestore()
      //   .collection('users')
      //   .doc(userId)
      //   .update({
      //     tokens: firestore.FieldValue.arrayUnion(token),
      //   });
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
        if (value && FCMToken && uniqueId) {
          // saveTokenToDatabase(uniqueId, value, FCMToken);
          saveTokenToDatabase();
          navigation.navigate('BoardStackComponent');
          navigation.reset({
            index: 0,
            routes: [{name: 'BoardStackComponent'}],
          });
        }
      } else {
        getJWTTokens_server();
        // const value = await getJWTToken();
        // const APNSToken = await getAPNSToken();
        // const result = saveTokenToDatabase(FCMToken);
        // console.log(result);
        // await saveTokenToDatabase(APNSToken);
        if (value && FCMToken && uniqueId) {
          saveTokenToDatabase();
          // console.log(value);
          navigation.navigate('BoardStackComponent');
          navigation.reset({
            index: 0,
            routes: [{name: 'BoardStackComponent'}],
          });
        } else {
          // const FCMToken = await getFCMToken();
          saveTokenToDatabase();
          navigation.navigate('BoardStackComponent');
          navigation.reset({
            index: 0,
            routes: [{name: 'BoardStackComponent'}],
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
  const getJWTTokens_localdb = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        '@BaedalMate_JWTAccessToken',
        '@BaedalMate_JWTRefreshToken',
      ]);

      console.log(values);
      return values;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    //  const FCMToken = await getFCMToken();
    //  const uniqueId = await getUniqueId(); // 휴대폰마다 고유 id가 있음. ex) iOS: 59C63C5F-0776-4E4B-8AEF-D27AAF79BCFA
    //  const value = await getJWTToken();
    if (JWTAccessToken !== '') {
      const result = saveTokenToDatabase();
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
    }
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
          marginTop: 55,
          marginBottom: 90,
          width: 400,
          height: 400,
          justifyContent: 'center',
        }}
      />
      {/* </View> */}
      <BtnKakaoLoginWrapper onPress={() => signInWithKakao()} />
      <BtnAppleAuth navigation={navigation} />
      <View style={{position: 'absolute', bottom: 20, flexDirection: 'row'}}>
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
  );
}

export default Login;
