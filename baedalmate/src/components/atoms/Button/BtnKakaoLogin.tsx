/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {KaKaoLoginBtnImage} from 'themes/theme';
import {BtnWithoutTextProps} from './BtnFloating';
const BtnKakaoLoginWrapper = (props: BtnWithoutTextProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{width: '85%', height: 45, marginBottom: 10}}>
      <Image
        source={KaKaoLoginBtnImage}
        style={{width: '100%', height: '100%'}}></Image>
    </TouchableOpacity>
  );
};

export default BtnKakaoLoginWrapper;
