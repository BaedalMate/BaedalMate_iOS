/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {BtnWithTextProps} from 'components/molecules/Button/BtnHorizontal2';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BLACK_COLOR, LINE_ORANGE_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const BtnActive = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity style={styles.brnActiveWrapper} onPress={props.onPress}>
      <Text style={styles.btnActiveText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const BtnDeactive = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity style={styles.brnDeactiveWrapper} onPress={props.onPress}>
      <Text style={styles.btnDeactiveText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  brnActiveWrapper: {
    // width: 99,
    height: 41,
    paddingVertical: 12,
    paddingHorizontal: 23,
    backgroundColor: LINE_ORANGE_COLOR,
    borderRadius: 10,
  },
  btnActiveText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  brnDeactiveWrapper: {
    // width: 99,
    height: 41,
    paddingVertical: 12,
    paddingHorizontal: 23,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
  },
  btnDeactiveText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: BLACK_COLOR,
  },
});

export {BtnActive, BtnDeactive};
