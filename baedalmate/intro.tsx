import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
// import RNKakaoLogins from 'react-native-kakao-logins';
import {View, Text, Button} from 'react-native';
import BtnHorizontalOrange from './src/components/atoms/BtnHorizontalOrange';
export function Intro(): React.ReactElement {
  const [result, setResult] = useState<string>('');

  // 카카오 로그인 시작.
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    setResult(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  // 로그인 후 내 프로필 가져오기.

  const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement =
      await getKakaoProfile();

    setResult(JSON.stringify(profile));
  };

  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    setResult(message);
  };

  return (
    <View>
      <View>
        <Text>result: {result}</Text>
      </View>
      <View>
        <Button
          testID="btn-login"
          onPress={() => signInWithKakao()}
          title={'카카오 로그인'}
        />
        <Button
          testID="btn-login"
          onPress={() => getProfile()}
          title={'프로필 조회'}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => unlinkKakao()}
          title={'링크 해제'}
        />
        <View style={{marginTop: 12}} />
        <Button
          testID="btn-login"
          onPress={() => signOutWithKakao()}
          title={'카카오 로그아웃'}
        />
        <View style={{marginTop: 40}} />
      </View>
    </View>
  );
}
