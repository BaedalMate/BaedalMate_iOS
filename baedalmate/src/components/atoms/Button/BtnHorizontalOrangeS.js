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
const BtnHorizontalOrangeS = props => {
  return (
    <TouchableOpacity
      style={styles.btnHorizontalOrangeSWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnHorizontalOrangeSText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalOrangeSWrapper: {
    width: 75,
    flex: 1,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  btnHorizontalOrangeSText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnHorizontalOrangeS;
