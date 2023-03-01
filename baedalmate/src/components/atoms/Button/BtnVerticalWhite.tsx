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

const BtnVerticalWhite = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnVerticalWhiteWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnVerticalWhiteText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnVerticalWhiteWrapper: {
    width: '100%',
    height: 53,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  btnVerticalWhiteText: {
    fontFamily: Fonts.Ko,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FB6C1C',
  },
});

export default BtnVerticalWhite;
