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
import {Fonts} from '../../../assets/Fonts';

const BtnVerticalGray = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
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
    backgroundColor: '#F2F3F6',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnVerticalGrayText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#3B3B3D',
  },
});

export default BtnVerticalGray;
