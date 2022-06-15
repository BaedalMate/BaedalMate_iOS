/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Fonts} from '../../../assets/Fonts';
import KaKaoLoginBtn from '../../../assets/images/kakao_login_medium_wide.png';
const BtnKakaoLoginWrapper = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image source={KaKaoLoginBtn}></Image>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default BtnKakaoLoginWrapper;
