/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const BtnHorizontalGray = () => {
  return (
    <TouchableOpacity style={styles.btnHorizontalGrayWrapper}>
      <Text style={styles.btnHorizontalGrayText}>메뉴변경</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalGrayWrapper: {
    width: 150,
    flex: 1,
    backgroundColor: '#F2F3F6',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnHorizontalGrayText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#3B3B3D',
  },
});

export default BtnHorizontalGray;
