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
const BtnHorizontalOrange = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnHorizontalOrangeWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnHorizontalOrangeText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalOrangeWrapper: {
    width: 150,
    flex: 1,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  btnHorizontalOrangeText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnHorizontalOrange;
