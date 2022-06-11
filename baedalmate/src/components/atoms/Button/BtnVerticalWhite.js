/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../../assets/Fonts';
const BtnVerticalWhite = () => {
  return (
    <TouchableOpacity style={styles.btnVerticalWhiteWrapper}>
      <Text style={styles.btnVerticalWhiteText}>메뉴변경</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnVerticalWhiteWrapper: {
    width: 300,
    height: 53,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnVerticalWhiteText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FB6C1C',
  },
});

export default BtnVerticalWhite;
