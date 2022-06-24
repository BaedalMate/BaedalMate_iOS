import React, {Component, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BtnHorizontal2 from './components/molecules/Button/BtnHorizontal2';
import BtnHorizontal3 from './components/molecules/Button/BtnHorizontal3';
import Login from './components/pages/Login';
import Main from './components/pages/Main';
import {Image} from 'react-native';
import {
  BLACK_COLOR,
  CHATTIING_PRIMARY,
  CHATTIING_PRIMARY_OUTLINE,
  CHATTIING_REGULAR,
  DARK_GRAY_COLOR,
  HOME_PRIMARY,
  HOME_PRIMARY_OUTLINE,
  HOME_REGULAR,
  PRIMARY_COLOR,
  PROFILE_PRIMARY,
  PROFILE_PRIMARY_OUTLINE,
  PROFILE_REGULAR,
} from './themes/theme';
const AuthStack = createNativeStackNavigator();
const MainScreenTab = createBottomTabNavigator();

/*
    Stack Navigator
        - Stack Screen A

    Stack Navigator
        - Tab Navigator
            - Tab Screen B
            - Tab Screen C

*/
const isLoggedIn = true;

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: DARK_GRAY_COLOR,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === '홈') {
            iconName = focused ? HOME_PRIMARY_OUTLINE : HOME_REGULAR;
          } else if (route.name === '채팅') {
            iconName = focused ? CHATTIING_PRIMARY_OUTLINE : CHATTIING_REGULAR;
          } else if (route.name === '마이페이지') {
            iconName = focused ? PROFILE_PRIMARY_OUTLINE : PROFILE_REGULAR;
          }
          return <Image source={iconName} />;
        },
        headerShown: false,
      })}
      sceneContainerStyle={{
        backgroundColor: '#fff',
      }}>
      <MainScreenTab.Screen name="홈" component={Main} />
      <MainScreenTab.Screen name="채팅" component={BtnHorizontal2} />
      <MainScreenTab.Screen name="마이페이지" component={BtnHorizontal3} />
    </MainScreenTab.Navigator>
  );
};
export const RootNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <AuthStack.Screen name="Main" component={AppTabComponent} />
      ) : (
        <>
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen
            name="AppTabComponent"
            component={AppTabComponent}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
