import React, {Component, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BtnHorizontal2 from './components/molecules/Button/BtnHorizontal2';
import BtnHorizontal3 from './components/molecules/Button/BtnHorizontal3';
import Login from './components/pages/login';
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

const isLoggedIn = false;

const AppTabComponent = () => {
  return (
    <MainScreenTab.Navigator>
      <MainScreenTab.Screen name="Home" component={BtnHorizontal2} />
      <MainScreenTab.Screen name="Board" component={BtnHorizontal3} />
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
