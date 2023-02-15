import React, {useEffect} from 'react';
import {ScrollView, Switch, View} from 'react-native';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  getNotificationAllowAPI,
  putNotificationAllowAPI,
} from 'components/utils/api/Notifications';
import {
  NotificationAllAllowState,
  NotificationChatAllowState,
  NotificationNoticeAllowState,
  NotificationRecruitAllowState,
} from 'components/utils/recoil/atoms/FCMNotificationAllowList';
import {useRecoilState} from 'recoil';
import {callApiSubscribeTopic} from 'components/utils/FCMSubscribeTopic';
export interface MyPageI {
  userId: number;
  nickname: string;
  profileImage: string;
  dormitory: string;
  score: number;
}

const Notification = ({route, navigation}) => {
  const [isEnabledAll, setIsEnabledAll] = useRecoilState(
    NotificationAllAllowState,
  );
  const [isEnabledChat, setIsEnabledChat] = useRecoilState(
    NotificationChatAllowState,
  );
  const [isEnabledRecruit, setIsEnabledRecruit] = useRecoilState(
    NotificationRecruitAllowState,
  );
  const [isEnabledNotice, setIsEnabledNotice] = useRecoilState(
    NotificationNoticeAllowState,
  );
  const toggleSwitchAll = () => {
    setIsEnabledAll(previousState => !previousState);
    setIsEnabledChat(!isEnabledAll);
    setIsEnabledNotice(!isEnabledAll);
    setIsEnabledRecruit(!isEnabledAll);
    // if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
  };

  const toggleSwitchChat = () =>
    setIsEnabledChat(previousState => !previousState);
  const toggleSwitchRecruit = () =>
    setIsEnabledRecruit(previousState => !previousState);
  const toggleSwitchNotice = () =>
    setIsEnabledNotice(previousState => !previousState);

  // useEffect(() => {
  //   if (isEnabledAll) {
  //     if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
  //   }
  // }, [isEnabledAll]);

  const AlarmList = [
    {
      title: '전체 알림 설정',
      description: '앱에서 보내는 전체 알림을 받아요',
      isEnable: isEnabledAll,
      toggleSwitch: toggleSwitchAll,
    },
    {
      title: '새로운 메시지 알림',
      description: '참여한 모집글 채팅방의 새 메시지 알림을 받아요',
      isEnable: isEnabledChat,
      toggleSwitch: toggleSwitchChat,
    },
    {
      title: '모집글 알림',
      description: '참여한 모집글 진행상황에 대한 알림을 받아요',
      isEnable: isEnabledRecruit,
      toggleSwitch: toggleSwitchRecruit,
    },
    {
      title: '공지사항 알림',
      description: '배달메이트에서 보내는 공지사항 알림을 받아요',
      isEnable: isEnabledNotice,
      toggleSwitch: toggleSwitchNotice,
    },
  ];

  const getFCMNotificationAllow = async () => {
    const result = await getNotificationAllowAPI();
    // console.log(result);
    setIsEnabledChat(result.allowChat);
    setIsEnabledRecruit(result.allowRecruit);
  };
  useEffect(() => {
    getFCMNotificationAllow();
  }, []);

  useEffect(() => {
    putNotificationAllowAPI({
      allow_chat: isEnabledChat,
      allow_recruit: isEnabledRecruit,
    });
  }, [isEnabledChat, isEnabledRecruit]);
  useEffect(() => {
    if (isEnabledChat && isEnabledNotice && isEnabledRecruit) {
      setIsEnabledAll(true);
    }
    if (!isEnabledChat && !isEnabledNotice && !isEnabledRecruit) {
      setIsEnabledAll(false);
    }
  }, [isEnabledChat, isEnabledNotice, isEnabledRecruit]);

  useEffect(() => {
    if (isEnabledNotice) {
      callApiSubscribeTopic();
    }
  }, [isEnabledNotice]);
  return (
    <ScrollView
      style={{
        width: '100%',
        height: '100%',
        padding: 15,
        backgroundColor: WHITE_COLOR,
      }}>
      {AlarmList.map((v, i) => (
        <View style={{marginTop: 14, marginBottom: 10}} key={i}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <TextKRBold
                  style={{
                    fontSize: 14,
                    color: BLACK_COLOR,
                  }}>
                  {v.title}
                </TextKRBold>
              </View>
              <View>
                <Switch
                  trackColor={{false: DARK_GRAY_COLOR, true: PRIMARY_COLOR}}
                  thumbColor={WHITE_COLOR}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={v.toggleSwitch}
                  value={v.isEnable}
                />
              </View>
            </View>
            <TextKRReg
              style={{fontSize: 12, lineHeight: 18, color: MAIN_GRAY_COLOR}}>
              {v.description}
            </TextKRReg>
            {/* <View style={{height: '100%'}}></View> */}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Notification;
