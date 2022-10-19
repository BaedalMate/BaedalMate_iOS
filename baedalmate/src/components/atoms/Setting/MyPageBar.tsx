/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DARK_GRAY_COLOR, LIGHT_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const MyPageBar = ({height}: {height: number}) => {
  return (
    <View
      style={{
        width: '100%',
        height: height,
        backgroundColor: height === 12 ? LINE_GRAY_COLOR : DARK_GRAY_COLOR,
      }}></View>
  );
};

const styles = StyleSheet.create({
  myPageListItem: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 3,
    borderColor: '#FB6C1C',
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnVerticalWhiteText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FB6C1C',
  },
});

export default MyPageBar;
