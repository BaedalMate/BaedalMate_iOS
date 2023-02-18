/**
 * @format
 */

import {AppRegistry, Linking, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {navigate} from 'Routes';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    if (Platform.OS === 'ios') Linking.openURL('App-Prefs:root');
  }
}
// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    // navigate(
    //   '채팅방' as never,
    //   {
    //     id: notification.data?.chatRoomId,
    //   } as never,
    // );
    // process the notification
    if (notification.userInteraction || notification.remote) {
      navigate(
        '채팅방' as never,
        {
          id: notification.data?.chatRoomId,
        } as never,
      );
    }
    if (
      notification.foreground &&
      (notification.userInteraction || notification.remote)
    ) {
      // PushNotification.localNotification(notification);
      // PushNotificationIOS.addNotificationRequest({
      //   id: notification.messageId,
      //   body: notification.data.body,
      //   title: notification.data.title,
      //   userInfo: notification.data,
      // });
    }
    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // remoteMessage &&
  //   remoteMessage.notification &&
  //   remoteMessage.messageId &&
  //   PushNotificationIOS.addNotificationRequest({
  //     id: remoteMessage.messageId,
  //     body: remoteMessage.notification.body,
  //     title: remoteMessage.notification.title,
  //     userInfo: remoteMessage.data,
  //   });

  remoteMessage &&
    remoteMessage.data &&
    remoteMessage.messageId &&
    PushNotificationIOS.addNotificationRequest({
      id: remoteMessage.messageId,
      body: remoteMessage.data.body,
      title: remoteMessage.data.title,
      userInfo: remoteMessage.data,
    });
});
AppRegistry.registerComponent(appName, () => App);
