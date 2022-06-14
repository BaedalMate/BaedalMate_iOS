import {useNavigation} from '@react-navigation/native';

import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, {useEffect, useState} from 'react';

// import Button from '../uis/Button';
// import {IC_MASK} from '../../utils/Icons';
// import ResultView from '../uis/IntroTemp';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
} from 'react-native';

import BtnVerticalOrange from '../atoms/Button/BtnVerticalOrange';

function Login({navigation}): React.ReactElement {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getProfile = async (): Promise<void> => {
    // const profile: KakaoProfile = await getKakaoProfile();
    // setResult(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
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
      {/* <View>
        <Text>result:{result}</Text>
      </View> */}
      <BtnVerticalOrange
        text={'카카오 로그인'}
        onPress={() =>
          signInWithKakao()
            .then(navigation.navigate('AppTabComponent', {}))
            .catch(err => {
              alert('에러 발생');
            })
        }
      />
      <Button
        title="비회원"
        onPress={() => {
          navigation.navigate('AppTabComponent', {});
        }}
      />
    </View>
  );
}

export default Login;
