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
const BtnHorizontalWhite = () => {
  return (
    <TouchableOpacity style={styles.btnHorizontalWhiteWrapper}>
      <Text style={styles.btnHorizontalWhiteText}>메뉴변경</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalWhiteWrapper: {
    width: 150,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  btnHorizontalWhiteText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FB6C1C',
  },
});

export default BtnHorizontalWhite;
