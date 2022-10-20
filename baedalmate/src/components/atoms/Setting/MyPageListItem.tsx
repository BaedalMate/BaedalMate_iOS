/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DARK_GRAY_COLOR, RightArrowBlack, RIGHT_ARROW_GRAY} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const MyPageListItem = props => {
  console.log(props);
  return (
    <TouchableOpacity
      style={styles.myPageListItem}
      onPress={props.item.onPress}>
      <Text style={styles.mypageText}>{props.item.name}</Text>
      <Image source={RIGHT_ARROW_GRAY} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  myPageListItem: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  mypageText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
  },
});

export default MyPageListItem;
