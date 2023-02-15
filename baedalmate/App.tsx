import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Linking, Platform, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/Routes';
import {RecoilEnv, RecoilRoot} from 'recoil';
import {RootSiblingParent} from 'react-native-root-siblings';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionCheck from 'react-native-version-check';
export const url = 'http://3.35.27.107:8080';
export const FCMURL = url + '/api/v1/fcm';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
// const Tab = createBottomTa fbNavigator();
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
//   }
// }

const App = () => {
  useEffect(() => {
    checkVersion();
  }, []);
  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          '업데이트 안내',
          '계속 앱을 사용하시려면 최신 버전의 앱으로 업데이트해야 합니다.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [permissions, setPermissions] = useState({});
  // const [isEnabledAll, setIsEnabledAll] = useRecoilState(
  //   NotificationAllAllowState,
  // );
  // const [isEnabledNotice, setIsEnabledNotice] = useRecoilState(
  //   NotificationNoticeAllowState,
  // );
  // useEffect(() => {
  //   const type = 'notification';
  //   PushNotificationIOS.addEventListener(type, onRemoteNotification);
  //   return () => {
  //     PushNotificationIOS.removeEventListener(type);
  //   };
  // });

  // const onRemoteNotification = notification => {
  //   const isClicked = notification.getData().userInteraction === 1;

  //   if (isClicked) {
  //     // Navigate user to another screen
  //   } else {
  //     // Do something else with push notification
  //   }
  //   // Use the appropriate result based on what you needed to do for this notification
  //   const result = PushNotificationIOS.FetchResult.NoData;
  //   notification.finish(result);
  // };
  /**
   * By calling this function, notification with category `userAction` will have action buttons
   */
  const setNotificationCategories = () => {
    PushNotificationIOS.setNotificationCategories([
      {
        id: 'userAction',
        actions: [
          {id: 'open', title: 'Open', options: {foreground: true}},
          {
            id: 'ignore',
            title: 'Desruptive',
            options: {foreground: true, destructive: true},
          },
          {
            id: 'text',
            title: 'Text Input',
            options: {foreground: true},
            textInput: {buttonTitle: 'Send'},
          },
        ],
      },
    ]);
  };

  useEffect(() => {
    const type = 'notification';
    PushNotificationIOS.addEventListener(type, onRemoteNotification);
    return () => {
      PushNotificationIOS.removeEventListener(type);
    };
  });

  const onRemoteNotification = notification => {
    const actionIdentifier = notification.getActionIdentifier();

    if (actionIdentifier === 'open') {
      // Perform action based on open action
    }

    if (actionIdentifier === 'text') {
      // Text that of user input.
      const userText = notification.getUserText();
      // Perform action based on textinput action
    }
    // Use the appropriate result based on what you needed to do for this notification
    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };
  // Background, Quit 상태일 경우
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    remoteMessage &&
      remoteMessage.data &&
      remoteMessage.messageId &&
      PushNotificationIOS.addNotificationRequest({
        id: remoteMessage.messageId,
        body: remoteMessage.data.body,
        title: remoteMessage.data.title,
        userInfo: remoteMessage.data,
        sound: 'default',
      });

    //  여기에 로직을 작성한다.
    //  remoteMessage.data로 메세지에 접근가능
    //  remoteMessage.from 으로 topic name 또는 message identifier
    //  remoteMessage.messageId 는 메시지 고유값 id
    //  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
    //  remoteMessage.sentTime 보낸시간
  });

  // Foreground 상태인 경우
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification(remoteMessage);

      remoteMessage &&
        remoteMessage.notification &&
        remoteMessage.messageId &&
        PushNotificationIOS.addNotificationRequest({
          id: remoteMessage.messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  });
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
        AsyncStorage.setItem('@BaedalMate_FCMToken', token);

        // setFCMToken(token);
        // return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    if (Platform.OS == 'ios') {
      messaging()
        .getAPNSToken()
        .then(token => {
          console.log(token);
          // token && setFCMToken(token);

          // return saveTokenToDatabase(token);
        });
    }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log(token);
      // setFCMToken(token);
      // saveTokenToDatabase(token);
    });
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      remoteMessage &&
        remoteMessage.data &&
        remoteMessage.messageId &&
        PushNotificationIOS.addNotificationRequest({
          id: remoteMessage.messageId,
          body: remoteMessage.data.body,
          title: remoteMessage.data.title,
          userInfo: remoteMessage.data,
        });
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          remoteMessage &&
            remoteMessage.data &&
            remoteMessage.messageId &&
            PushNotificationIOS.addNotificationRequest({
              id: remoteMessage.messageId,
              body: remoteMessage.data.body,
              title: remoteMessage.data.title,
              userInfo: remoteMessage.data,
            });
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <RecoilRoot>
      <RootSiblingParent>
        {/* <FCMContainer> */}
        <NavigationContainer>
          <RootNavigator></RootNavigator>
        </NavigationContainer>
        {/* </FCMContainer> */}
      </RootSiblingParent>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  floatingBtn: {
    bottom: -100,
    marginHorizontal: '5%',
  },
});

export default App;
