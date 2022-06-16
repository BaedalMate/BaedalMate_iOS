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
import {BtnWithTextProps} from './BtnHorizontal2';
const BtnHorizontal3: React.FunctionComponent<BtnWithTextProps> = props => {
  return (
    <View style={styles.btnHorizontalWrapper}>
      <BtnHorizontalWhiteS
        onPress={props.onPress}
        text={props.text}></BtnHorizontalWhiteS>
      <BtnHorizontalGrayS
        onPress={props.onPress}
        text={props.text}></BtnHorizontalGrayS>
      <BtnHorizontalOrangeS
        onPress={props.onPress}
        text={props.text}></BtnHorizontalOrangeS>
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
