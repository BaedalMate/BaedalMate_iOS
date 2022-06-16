/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import BtnVerticalGray from '../../atoms/Button/BtnVerticalGray';
import BtnVerticalOrange from '../../atoms/Button/BtnVerticalOrange';
import BtnVerticalWhite from '../../atoms/Button/BtnVerticalWhite';
import {BtnWithTextProps} from './BtnHorizontal2';
const BtnVertical: React.FunctionComponent<BtnWithTextProps> = props => {
  return (
    <View style={styles.btnVerticalWrapper}>
      <BtnVerticalWhite
        onPress={props.onPress}
        text={props.text}></BtnVerticalWhite>
      <BtnVerticalGray
        onPress={props.onPress}
        text={props.text}></BtnVerticalGray>
      <BtnVerticalOrange
        onPress={props.onPress}
        text={props.text}></BtnVerticalOrange>
    </View>
  );
};

const styles = StyleSheet.create({
  btnVerticalWrapper: {
    width: '100%',
    height: 175,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
});

export default BtnVertical;
