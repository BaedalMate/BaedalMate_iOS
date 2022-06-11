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
const BtnVerticalOrange = () => {
  return (
    <TouchableOpacity style={styles.btnVerticalOrangeWrapper}>
      <Text style={styles.btnVerticalOrangeText}>메뉴변경</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnVerticalOrangeWrapper: {
    width: 300,
    height: 53,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnVerticalOrangeText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnVerticalOrange;
