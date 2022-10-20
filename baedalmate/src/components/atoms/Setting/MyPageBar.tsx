import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';
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

export default MyPageBar;
