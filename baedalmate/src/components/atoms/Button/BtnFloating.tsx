/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const BtnFloating = (props: BtnWithoutTextProps) => {
  return (
    <TouchableOpacity style={styles.btnFloatingWrapper} onPress={props.onPress}>
      <Text style={styles.btnFloatingText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnFloatingWrapper: {
    position: 'absolute',
    bottom: 15,
    right: '5%',
    width: 60,
    height: 60,
    backgroundColor: '#FB6C1C',
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  btnFloatingText: {
    color: '#FFFFFF',
    fontSize: 60,
    fontWeight: '200',
    lineHeight: 60,
  },
});

export default BtnFloating;
