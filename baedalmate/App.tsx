/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootNavigator} from './src/Routes';
import {RecoilEnv, RecoilRoot} from 'recoil';
export const url = 'http://3.35.27.107:8080';
// export const url = 'http://192.168.1.58:8080';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <RootNavigator></RootNavigator>
      </NavigationContainer>
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
