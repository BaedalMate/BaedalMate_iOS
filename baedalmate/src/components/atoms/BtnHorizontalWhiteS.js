/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Fonts} from '../../assets/Fonts';
const BtnHorizontalWhiteS = () => {
  return (
    <TouchableOpacity style={styles.btnHorizontalWhiteSWrapper}>
      <Text style={styles.btnHorizontalWhiteSText}>메뉴변경</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalWhiteSWrapper: {
    width: 75,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  btnHorizontalWhiteSText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FB6C1C',
  },
});

export default BtnHorizontalWhiteS;
