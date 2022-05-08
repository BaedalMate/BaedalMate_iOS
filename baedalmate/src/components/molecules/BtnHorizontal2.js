/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import BtnHorizontalOrange from '../atoms/BtnHorizontalOrange';
import BtnHorizontalWhite from '../atoms/BtnHorizontalWhite';

const BtnHorizontal2 = () => {
  return (
    <View style={styles.btnHorizontal2Wrapper}>
      <BtnHorizontalWhite></BtnHorizontalWhite>
      <BtnHorizontalOrange></BtnHorizontalOrange>
    </View>
  );
};

const styles = StyleSheet.create({
    btnHorizontal2Wrapper:{
        width: '100%',
        height: 53,
        flexDirection: 'row',
        paddingHorizontal: '5%',
    }
});

export default BtnHorizontal2;
