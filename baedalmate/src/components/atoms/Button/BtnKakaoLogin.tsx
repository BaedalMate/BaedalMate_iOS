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
    <TouchableOpacity onPress={props.onPress}>
      <Image source={KaKaoLoginBtnImage} style={{}}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default BtnKakaoLoginWrapper;
