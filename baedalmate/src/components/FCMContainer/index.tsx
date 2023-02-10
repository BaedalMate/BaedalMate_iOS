// import React, {useEffect} from 'react';
// import {Platform, Alert} from 'react-native';
// import firebase from 'react-native-firebase';
// import DeviceInfo from 'react-native-device-info';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Axios from 'axios';

// // import Config from '~/Config';

// interface Props {
//   children: JSX.Element;
//   onNotificationOpened?: (data: {[key: string]: string}) => any;
// }

// const FCMContainer = ({children, onNotificationOpened}: Props): JSX.Element => {
//   const CHANNEL_ID = 'com.mate.baedalmate';
//   const APP_NAME = 'BaedalMate';
//   const DESCRIPTION = 'BaedalMate channel';

//   let _onTokenRefreshListener: any = undefined;
//   let _notificationDisplayedListener: any = undefined;
//   let _notificationListener: any = undefined;
//   let _notificationOpenedListener: any = undefined;

//   const _registerMessageListener = (): void => {
//     firebase
//       .notifications()
//       .getInitialNotification()
//       .then(notificationOpen => {
//         if (
//           onNotificationOpened &&
//           typeof onNotificationOpened === 'function' &&
//           notificationOpen &&
//           notificationOpen.notification &&
//           notificationOpen.notification.data &&
//           notificationOpen.notification.data.notifications_id
//         ) {
//           onNotificationOpened(notificationOpen.notification.data);
//         }
//       });

//     const channel = new firebase.notifications.Android.Channel(
//       CHANNEL_ID,
//       APP_NAME,
//       firebase.notifications.Android.Importance.Max,
//     ).setDescription(DESCRIPTION);
//     firebase.notifications().android.createChannel(channel);

//     _notificationListener = firebase
//       .notifications()
//       .onNotification(notification => {
//         // Process your notification as required
//         notification.android.setPriority(
//           firebase.notifications.Android.Priority.Max,
//         );
//         notification.android.setChannelId(CHANNEL_ID);

//         firebase.notifications().displayNotification(notification);
//       });
//     _notificationDisplayedListener = firebase
//       .notifications()
//       .onNotificationDisplayed(() => {});
//     _notificationOpenedListener = firebase
//       .notifications()
//       .onNotificationOpened(notificationOpen => {
//         if (
//           onNotificationOpened &&
//           typeof onNotificationOpened === 'function'
//         ) {
//           onNotificationOpened(notificationOpen.notification.data);
//         }
//       });
//   };

//   const _registerToken = async (fcmToken: string): Promise<void> => {
//     console.log(fcmToken);
//     // try {
//     //   const deviceUniqueId = DeviceInfo.getUniqueId();
//     //   const token = await AsyncStorage.getItem('token');
//     //   await Axios.post(
//     //     `URL`,
//     //     {
//     //       token: fcmToken,
//     //       device_unique_id,
//     //     },
//     //     {
//     //       headers: { Authorization: 'Bearer ' + token },
//     //     },
//     //   );
//     // } catch (error) {
//     //   console.log('ERROR: _registerToken');
//     //   console.log(error.response.data);
//     // }
//   };

//   const _registerTokenRefreshListener = (): void => {
//     if (_onTokenRefreshListener) {
//       _onTokenRefreshListener();
//       _onTokenRefreshListener = undefined;
//     }

//     _onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
//       // Process your token as required
//       _registerToken(fcmToken);
//     });
//   };
//   const _updateTokenToServer = async (): Promise<void> => {
//     try {
//       const fcmToken = await firebase.messaging().getToken();
//       _registerMessageListener();
//       _registerToken(fcmToken);
//     } catch (error) {
//       console.log('ERROR: _updateTokenToServer');
//       console.log(error);
//     }
//   };

//   const _requestPermission = async (): Promise<void> => {
//     try {
//       // User has authorised
//       await firebase.messaging().requestPermission();
//       await _updateTokenToServer();
//     } catch (error) {
//       // User has rejected permissions
//       Alert.alert("you can't handle push notification");
//     }
//   };

//   const _checkPermission = async (): Promise<void> => {
//     try {
//       const enabled = await firebase.messaging().hasPermission();
//       if (enabled) {
//         // user has permissions
//         _updateTokenToServer();
//         _registerTokenRefreshListener();
//       } else {
//         // user doesn't have permission
//         _requestPermission();
//       }
//     } catch (error) {
//       console.log('ERROR: _checkPermission', error);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     _checkPermission();
//     return (): void => {
//       if (_onTokenRefreshListener) {
//         _onTokenRefreshListener();
//         _onTokenRefreshListener = undefined;
//       }
//       if (_notificationDisplayedListener) {
//         _notificationDisplayedListener();
//         _notificationDisplayedListener = undefined;
//       }
//       if (_notificationListener) {
//         _notificationListener();
//         _notificationListener = undefined;
//       }
//       if (_notificationOpenedListener) {
//         _notificationOpenedListener();
//         _notificationOpenedListener = undefined;
//       }
//     };
//   }, []);

//   if (Platform.OS === 'ios') {
//     firebase.notifications().setBadge(0);
//   }

//   return children;
// };

// export default FCMContainer;
