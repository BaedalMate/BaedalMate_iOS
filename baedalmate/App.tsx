import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  DeviceEventEmitter,
  Linking,
  LogBox,
  Platform,
  StyleSheet,
} from 'react-native';
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
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

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
    PushNotification.localNotification(remoteMessage);

    remoteMessage.data &&
      sendLocalNotificationWithSound(
        remoteMessage.messageId,
        remoteMessage.data.title,
        remoteMessage.data.body,
        remoteMessage.data.image,
      );
    // remoteMessage &&
    //   remoteMessage.data &&
    //   remoteMessage.messageId &&
    //   PushNotificationIOS.addNotificationRequest({
    //     id: remoteMessage.messageId,
    //     body: remoteMessage.data.body,
    //     title: remoteMessage.data.title,
    //     userInfo: remoteMessage.data,
    //     sound: 'default',
    //   });

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
      remoteMessage.data &&
        sendLocalNotificationWithSound(
          remoteMessage.messageId,
          remoteMessage.data.title,
          remoteMessage.data.body,

          remoteMessage.data.image,
        );
      // remoteMessage &&
      //   remoteMessage.notification &&
      //   remoteMessage.messageId &&
      //   PushNotificationIOS.addNotificationRequest({
      //     id: remoteMessage.messageId,
      //     body: remoteMessage.notification.body,
      //     title: remoteMessage.notification.title,
      //     userInfo: remoteMessage.data,
      //   });
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
          // token && AsyncStorage.setItem('@BaedalMate_APNSToken', token);

          // token && setFCMToken(token);

          // return saveTokenToDatabase(token);
        });
    }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log(token);
      // token && AsyncStorage.setItem('@BaedalMate_APNSToken', token);
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
          userInfo: {
            image: url + '/images/' + remoteMessage.data.image,
          },
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

  // const [permissions, setPermissions] = useState({});

  // useEffect(() => {
  //   PushNotificationIOS.addEventListener('register', onRegistered);
  //   PushNotificationIOS.addEventListener(
  //     'registrationError',
  //     onRegistrationError,
  //   );
  //   PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  //   PushNotificationIOS.addEventListener(
  //     'localNotification',
  //     onLocalNotification,
  //   );

  //   PushNotificationIOS.requestPermissions({
  //     alert: true,
  //     badge: true,
  //     sound: true,
  //     critical: true,
  //   }).then(
  //     data => {
  //       console.log('PushNotificationIOS.requestPermissions', data);
  //     },
  //     data => {
  //       console.log('PushNotificationIOS.requestPermissions failed', data);
  //     },
  //   );

  //   return () => {
  //     PushNotificationIOS.removeEventListener('register');
  //     PushNotificationIOS.removeEventListener('registrationError');
  //     PushNotificationIOS.removeEventListener('notification');
  //     PushNotificationIOS.removeEventListener('localNotification');
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const sendNotification = () => {
  //   DeviceEventEmitter.emit('remoteNotificationReceived', {
  //     remote: true,
  //     aps: {
  //       alert: {title: 'title', subtitle: 'subtitle', body: 'body'},
  //       // badge: 1,
  //       sound: 'default',
  //       category: 'REACT_NATIVE',
  //       'content-available': 1,
  //       'mutable-content': 1,
  //     },
  //   });
  // };

  // const sendSilentNotification = () => {
  //   DeviceEventEmitter.emit('remoteNotificationReceived', {
  //     remote: true,
  //     aps: {
  //       category: 'REACT_NATIVE',
  //       'content-available': 1,
  //     },
  //   });
  // };

  // const sendLocalNotification = () => {
  //   PushNotificationIOS.presentLocalNotification({
  //     alertTitle: 'Sample Title',
  //     alertBody: 'Sample local notification',
  //     // applicationIconBadgeNumber: 1,
  //   });
  // };

  const sendLocalNotificationWithSound = (id, title, body, image) => {
    PushNotificationIOS.addNotificationRequest({
      id: id,
      title: title,
      body: body,
      sound: 'default',
      userInfo: {
        image: url + '/images/' + image,
      },
      // badge: 1,
    });
  };

  // const scheduleLocalNotification = () => {
  //   PushNotificationIOS.scheduleLocalNotification({
  //     alertBody: 'Test Local Notification',
  //     fireDate: new Date(new Date().valueOf() + 2000).toISOString(),
  //   });
  // };

  // const addNotificationRequest = () => {
  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'test',
  //     title: 'title',
  //     subtitle: 'subtitle',
  //     body: 'body',
  //     category: 'test',
  //     threadId: 'thread-id',
  //     fireDate: new Date(new Date().valueOf() + 2000),
  //     repeats: true,
  //     userInfo: {
  //       image: 'https://www.github.com/Naturalclar.png',
  //     },
  //   });
  // };

  // const addCriticalNotificationRequest = () => {
  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'critical',
  //     title: 'Critical Alert',
  //     subtitle: 'subtitle',
  //     body: 'This is a critical alert',
  //     category: 'test',
  //     threadId: 'thread-id',
  //     isCritical: true,
  //     fireDate: new Date(new Date().valueOf() + 2000),
  //     repeats: true,
  //   });
  // };

  // const addMultipleRequests = () => {
  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'test-1',
  //     title: 'First',
  //     subtitle: 'subtitle',
  //     body: 'First Notification out of 3',
  //     category: 'test',
  //     threadId: 'thread-id',
  //     fireDate: new Date(new Date().valueOf() + 10000),
  //     repeats: true,
  //   });

  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'test-2',
  //     title: 'Second',
  //     subtitle: 'subtitle',
  //     body: 'Second Notification out of 3',
  //     category: 'test',
  //     threadId: 'thread-id',
  //     fireDate: new Date(new Date().valueOf() + 12000),
  //     repeats: true,
  //   });

  //   PushNotificationIOS.addNotificationRequest({
  //     id: 'test-3',
  //     title: 'Third',
  //     subtitle: 'subtitle',
  //     body: 'Third Notification out of 3',
  //     category: 'test',
  //     threadId: 'thread-id',
  //     fireDate: new Date(new Date().valueOf() + 14000),
  //     repeats: true,
  //   });
  // };

  // const getPendingNotificationRequests = () => {
  //   PushNotificationIOS.getPendingNotificationRequests(requests => {
  //     Alert.alert('Push Notification Received', JSON.stringify(requests), [
  //       {
  //         text: 'Dismiss',
  //         onPress: () => {},
  //       },
  //     ]);
  //   });
  // };

  // const setNotificationCategories = async () => {
  //   PushNotificationIOS.setNotificationCategories([
  //     {
  //       id: 'test',
  //       actions: [
  //         {id: 'open', title: 'Open', options: {foreground: true}},
  //         {
  //           id: 'ignore',
  //           title: 'Desruptive',
  //           options: {foreground: true, destructive: true},
  //         },
  //         {
  //           id: 'text',
  //           title: 'Text Input',
  //           options: {foreground: true},
  //           textInput: {buttonTitle: 'Send'},
  //         },
  //       ],
  //     },
  //   ]);
  //   Alert.alert(
  //     'setNotificationCategories',
  //     `Set notification category complete`,
  //     [
  //       {
  //         text: 'Dismiss',
  //         onPress: () => {},
  //       },
  //     ],
  //   );
  // };

  // const removeAllPendingNotificationRequests = () => {
  //   PushNotificationIOS.removeAllPendingNotificationRequests();
  // };

  // const removePendingNotificationRequests = () => {
  //   PushNotificationIOS.removePendingNotificationRequests(['test-1', 'test-2']);
  // };

  // const onRegistered = deviceToken => {
  //   AsyncStorage.setItem('@BaedalMate_FCMToken', deviceToken);
  //   // Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
  //   //   {
  //   //     text: 'Dismiss',
  //   //     onPress: () => {},
  //   //   },
  //   // ]);
  // };

  // const onRegistrationError = error => {
  //   Alert.alert(
  //     'Failed To Register For Remote Push',
  //     `Error (${error.code}): ${error.message}`,
  //     [
  //       {
  //         text: 'Dismiss',
  //         onPress: () => {},
  //       },
  //     ],
  //   );
  // };

  // const onRemoteNotification = notification => {
  //   console.log(notification);
  //   const isClicked = notification.getData().userInteraction === 1;

  //   // const result = `
  //   //   Title:  ${notification.getTitle()};\n
  //   //   Subtitle:  ${notification.getSubtitle()};\n
  //   //   Message: ${notification.getMessage()};\n
  //   //   badge: ${notification.getBadgeCount()};\n
  //   //   sound: ${notification.getSound()};\n
  //   //   category: ${notification.getCategory()};\n
  //   //   content-available: ${notification.getContentAvailable()};\n
  //   //   Notification is clicked: ${String(isClicked)}.`;

  //   // if (notification.getTitle() == undefined) {
  //   sendLocalNotification();
  //   // Alert.alert('Silent push notification Received', result, [
  //   //   {
  //   //     text: 'Send local push',
  //   //     onPress: sendLocalNotification,
  //   //   },
  //   // ]);
  //   // } else {
  //   //   Alert.alert('Push Notification Received', result, [
  //   //     {
  //   //       text: 'Dismiss',
  //   //       onPress: () => {},
  //   //     },
  //   //   ]);
  //   // }
  //   notification.finish(notification);

  //   notification.finish('UIBackgroundFetchResultNoData');
  // };

  // const onLocalNotification = notification => {
  //   const isClicked = notification.getData().userInteraction === 1;
  //   console.log(notification);
  //   Alert.alert(
  //     'Local Notification Received',
  //     `Alert title:  ${notification.getTitle()},
  //     Alert subtitle:  ${notification.getSubtitle()},
  //     Alert message:  ${notification.getMessage()},
  //     Badge: ${notification.getBadgeCount()},
  //     Sound: ${notification.getSound()},
  //     Thread Id:  ${notification.getThreadID()},
  //     Action Id:  ${notification.getActionIdentifier()},
  //     User Text:  ${notification.getUserText()},
  //     Notification is clicked: ${String(isClicked)}.`,
  //     [
  //       {
  //         text: 'Dismiss',
  //         onPress: () => {},
  //       },
  //     ],
  //   );
  // };

  // const showPermissions = () => {
  //   PushNotificationIOS.checkPermissions(permissions => {
  //     setPermissions({permissions});
  //   });
  // };

  // const getToken = () => {
  //   messaging()
  //     .getToken()
  //     .then(x => console.log(x))
  //     .catch(e => console.log(e));
  // };
  // const requestPermissions = () => {
  //   messaging()
  //     .requestPermission()
  //     .then(status => {
  //       if (status === 1) {
  //         console.log('Authorized');
  //         onMessage();
  //       } else {
  //         console.log('Not authorized');
  //       }
  //     })
  //     .catch(e => console.log(e));
  // };

  // const onMessage = () => {
  //   messaging().onMessage((response: any) => {
  //     console.log(response.data.notification);
  //   });
  // };

  // React.useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  // useEffect(() => {
  //   // Get the device token
  //   messaging()
  //     .getToken()
  //     .then(token => {
  //       console.log(token);
  //       AsyncStorage.setItem('@BaedalMate_FCMToken', token);

  //       // setFCMToken(token);
  //       // return saveTokenToDatabase(token);
  //     });

  //   // If using other push notification providers (ie Amazon SNS, etc)
  //   // you may need to get the APNs token instead for iOS:
  //   if (Platform.OS == 'ios') {
  //     messaging()
  //       .getAPNSToken()
  //       .then(token => {
  //         console.log(token);
  //         // token && setFCMToken(token);

  //         // return saveTokenToDatabase(token);
  //       });
  //   }

  //   // Listen to whether the token changes
  //   return messaging().onTokenRefresh(token => {
  //     console.log(token);
  //     // setFCMToken(token);
  //     // saveTokenToDatabase(token);
  //   });
  // }, []);

  // useEffect(() => {
  //   const type = 'notification';
  //   PushNotificationIOS.addEventListener(type, onRemoteNotification);
  //   return () => {
  //     PushNotificationIOS.removeEventListener(type);
  //   };
  // });

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     remoteMessage &&
  //       remoteMessage.data &&
  //       remoteMessage.messageId &&
  //       PushNotificationIOS.addNotificationRequest({
  //         id: remoteMessage.messageId,
  //         body: remoteMessage.data.body,
  //         title: remoteMessage.data.title,
  //         userInfo: remoteMessage.data,
  //       });
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         remoteMessage &&
  //           remoteMessage.data &&
  //           remoteMessage.messageId &&
  //           PushNotificationIOS.addNotificationRequest({
  //             id: remoteMessage.messageId,
  //             body: remoteMessage.data.body,
  //             title: remoteMessage.data.title,
  //             userInfo: remoteMessage.data,
  //           });
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return null;
  // }

  // const onRemoteNotification = notification => {
  //   const actionIdentifier = notification.getActionIdentifier();

  //   if (actionIdentifier === 'open') {
  //     // Perform action based on open action
  //   }

  //   if (actionIdentifier === 'text') {
  //     // Text that of user input.
  //     const userText = notification.getUserText();
  //     // Perform action based on textinput action
  //   }
  //   // Use the appropriate result based on what you needed to do for this notification
  //   const result = PushNotificationIOS.FetchResult.NoData;
  //   notification.finish(result);
  // };
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
