/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import BtnHorizontalGrayS from '../../atoms/Button/BtnHorizontalGrayS';
import BtnHorizontalOrangeS from '../../atoms/Button/BtnHorizontalOrangeS';
import BtnHorizontalWhiteS from '../../atoms/Button/BtnHorizontalWhiteS';
const BtnHorizontal3 = () => {
  return (
    <View style={styles.btnHorizontalWrapper}>
      <BtnHorizontalWhiteS></BtnHorizontalWhiteS>
      <BtnHorizontalGrayS></BtnHorizontalGrayS>
      <BtnHorizontalOrangeS></BtnHorizontalOrangeS>
    </View>
  );
};

const styles = StyleSheet.create({
  btnHorizontalWrapper: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
});

export default BtnHorizontal3;
