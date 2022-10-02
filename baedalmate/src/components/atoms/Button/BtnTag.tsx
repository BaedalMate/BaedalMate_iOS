/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {BtnWithTextProps} from 'components/molecules/Button/BtnHorizontal2';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LINE_GRAY_COLOR, MAIN_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
const BtnTag = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity style={styles.btnTagWrapper} onPress={props.onPress}>
      <Text style={styles.btnTagText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTagWrapper: {
    width: 75,
    height: 41,
    backgroundColor: WHITE_COLOR,
    borderWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnTagText: {
    fontFamily: Fonts.Ko,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: MAIN_GRAY_COLOR,
  },
});

export default BtnTag;
