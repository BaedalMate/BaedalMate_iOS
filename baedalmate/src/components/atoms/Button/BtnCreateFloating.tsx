/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Fonts} from 'assets/Fonts';
import {BtnWithTextProps} from 'components/molecules/Button/BtnHorizontal2';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import BtnVerticalOrange from './BtnVerticalOrange';

const BtnCreateFloating = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnCreateFloatingWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnCreateFloatingText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnCreateFloatingWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 60,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  btnCreateFloatingText: {
    fontFamily: Fonts.Ko,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnCreateFloating;
