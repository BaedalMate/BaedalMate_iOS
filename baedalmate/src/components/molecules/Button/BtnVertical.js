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
const BtnVertical = () => {
  return (
    <View style={styles.btnVerticalWrapper}>
      <BtnVerticalWhite></BtnVerticalWhite>
      <BtnVerticalGray></BtnVerticalGray>
      <BtnVerticalOrange></BtnVerticalOrange>
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
