/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootNavigator} from './src/Routes';
import {RecoilEnv, RecoilRoot} from 'recoil';
import {RootSiblingParent} from 'react-native-root-siblings';
import messaging from '@react-native-firebase/messaging';

export const url = 'http://3.35.27.107:8080';
// export const url = 'http://192.168.1.58:8080';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const Tab = createBottomTabNavigator();

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const App = () => {
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
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
        <NavigationContainer>
          <RootNavigator></RootNavigator>
        </NavigationContainer>
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
