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
import {BtnWithTextProps} from './BtnHorizontalGray';
const BtnHorizontalGrayS = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnHorizontalGraySWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnHorizontalGraySText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnHorizontalGraySWrapper: {
    width: 75,
    flex: 1,
    backgroundColor: '#F2F3F6',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  btnHorizontalGraySText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#3B3B3D',
  },
});

export default BtnHorizontalGrayS;
