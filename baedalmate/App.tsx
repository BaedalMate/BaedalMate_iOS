/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BtnFloating from './src/components/atoms/Button/BtnFloating';
import BtnHorizontal2 from './src/components/molecules/Button/BtnHorizontal2';
import BtnHorizontal3 from './src/components/molecules/Button/BtnHorizontal3';
import BtnVertical from './src/components/molecules/Button/BtnVertical';
import {Fonts} from './src/assets/Fonts';
import {RootNavigator} from './src/Routes';
export const url = 'http://3.35.27.107:8080';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator></RootNavigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  floatingBtn: {
    bottom: -100,
    marginHorizontal: '5%',
  },
});

export default App;
