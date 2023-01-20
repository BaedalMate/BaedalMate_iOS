import React from 'react';
import {View} from 'react-native';
import {LINE_GRAY_COLOR} from 'themes/theme';

const MyPageBar = ({height}: {height: number}) => {
  return (
    <View
      style={{
        width: '100%',
        height: height,
        backgroundColor: LINE_GRAY_COLOR,
      }}></View>
  );
};

export default MyPageBar;
