import React, {useEffect, useState} from 'react';
import {ScrollView, Switch, View} from 'react-native';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import MypageUserInfo from 'components/atoms/Setting/MyPageUserInfo';
import MyPageListItem from 'components/atoms/Setting/MyPageListItem';
import MyPageBar from 'components/atoms/Setting/MyPageBar';
import MyPageBottom from 'components/atoms/Bottom/MyPageBottom';
import {getUserAPI} from 'components/utils/api/User';
import {TextKRBold, TextKRReg} from 'themes/text';

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

const MyPage = ({route, navigation}) => {
  // const navigation = useNavigation();
  const [mypageUserInfo, setMyPageUserInfo] = useState();
  const MyPageSettingList = [
    {
      name: '프로필 수정',
      onPress: () => {
        navigation.navigate('프로필 수정' as never);
      },
    },
    {
      name: '거점 변경',
      onPress: () => {
        navigation.navigate('거점 인증' as never);
      },
    },
    {
      name: '차단 관리',
      onPress: () => {
        navigation.navigate('차단 관리' as never);
      },
    },
  ];
  const MyPageSUseInfoList = [
    {
      name: '공지사항',
      onPress: () => {
        navigation.navigate('공지사항' as never);
      },
    },
    {
      name: '문의하기',
      onPress: () => {},
    },
  ];

  const getMyPageUserData = async () => {
    const result = await getUserAPI();
    setMyPageUserInfo(result);
    console.log(result);
  };

  useEffect(() => {
    getMyPageUserData();
  }, []);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: WHITE_COLOR,
      }}>
      <MypageUserInfo item={mypageUserInfo} />
      <View style={{marginTop: 18, marginBottom: 35}}>
        <TextKRBold
          style={{
            fontSize: 14,
            lineHeight: 17,
            color: 'black',
          }}>
          설정
        </TextKRBold>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <TextKRReg
              style={{fontSize: 14, lineHeight: 24, color: DARK_GRAY_COLOR}}>
              {'알림 설정'}
            </TextKRReg>
            <Switch
              trackColor={{false: DARK_GRAY_COLOR, true: PRIMARY_COLOR}}
              thumbColor={WHITE_COLOR}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {MyPageSettingList.map((v, i) => (
            <View key={i}>
              <MyPageBar height={1} />
              <MyPageListItem item={v} />
            </View>
          ))}
        </View>
      </View>
      <View style={{marginTop: 18}}>
        <TextKRBold
          style={{
            fontSize: 14,
            lineHeight: 17,
            color: 'black',
          }}>
          이용 정보
        </TextKRBold>
        <View>
          {MyPageSUseInfoList.map((v, i) => (
            <View key={i}>
              <MyPageListItem item={v} />
              <MyPageBar height={1} />
            </View>
          ))}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <TextKRReg
              style={{fontSize: 14, lineHeight: 24, color: DARK_GRAY_COLOR}}>
              {'앱 버전'}
            </TextKRReg>
            <TextKRReg
              style={{fontSize: 14, lineHeight: 24, color: DARK_GRAY_COLOR}}>
              {'1.0.0'}
            </TextKRReg>
          </View>
        </View>
      </View>

      <MyPageBottom />
    </ScrollView>
  );
};

export default MyPage;
