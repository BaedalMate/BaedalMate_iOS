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
const BtnFloating = () => {
  return (
    <TouchableOpacity style={styles.btnFloatingWrapper}>
      <Text style={styles.btnFloatingText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnFloatingWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: '#FB6C1C',
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFloatingText: {
    color: '#FFFFFF',
    fontSize: 55,
    fontWeight: '200',
    lineHeight: 60,
  },
});

export default BtnFloating;
