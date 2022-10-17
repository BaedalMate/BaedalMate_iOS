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
import {LIGHT_GRAY_COLOR, MAIN_GRAY_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const BtnVerticalDeactive = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      disabled
      style={styles.btnVerticalGrayWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnVerticalGrayText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnVerticalGrayWrapper: {
    width: '100%',
    height: 53,
    backgroundColor: LIGHT_GRAY_COLOR,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnVerticalGrayText: {
    fontFamily: Fonts.Ko,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: MAIN_GRAY_COLOR,
  },
});

export default BtnVerticalDeactive;
