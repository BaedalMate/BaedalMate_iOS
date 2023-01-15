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

const BtnVerticalOrange = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnVerticalOrangeWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnVerticalOrangeText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnVerticalOrangeWrapper: {
    width: '100%',
    height: 53,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnVerticalOrangeText: {
    fontFamily: Fonts.Ko,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnVerticalOrange;
