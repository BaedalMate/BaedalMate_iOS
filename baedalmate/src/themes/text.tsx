import React from 'react';
import {StyleSheet, Text} from 'react-native';

const TextKRBold = props => {
  return <Text style={[styles.FontKRBold, props.style]}>{props.children}</Text>;
};
const TextKRReg = props => {
  return <Text style={[styles.FontKRReg, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  FontKRBold: {
    fontFamily: 'AppleSDGothicNeo-Bold',
  },
  FontKRReg: {
    fontFamily: 'AppleSDGothicNeo-Regular',
  },
});

export {TextKRBold, TextKRReg};
