/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DARK_GRAY_COLOR, RIGHT_ARROW_GRAY_THIN} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const MyPageListItem = props => {
  console.log(props);
  return (
    <TouchableOpacity
      style={styles.myPageListItem}
      onPress={props.item.onPress}>
      <Text style={styles.mypageText}>{props.item.name}</Text>
      <Image source={RIGHT_ARROW_GRAY_THIN} style={{width: 9, height: 14}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myPageListItem: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderColor: LINE_GRAY_COLOR,
  },
  mypageText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: DARK_GRAY_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default MyPageListItem;
