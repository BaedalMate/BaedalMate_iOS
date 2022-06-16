/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import BtnHorizontalOrange from '../../atoms/Button/BtnHorizontalOrange';
import BtnHorizontalWhite from '../../atoms/Button/BtnHorizontalWhite';

export interface BtnWithTextProps {
  onPress(): void;
  text: string;
}

const BtnHorizontal2: React.FunctionComponent<BtnWithTextProps> = props => {
  return (
    <View style={styles.btnHorizontal2Wrapper}>
      <BtnHorizontalWhite
        onPress={props.onPress}
        text={props.text}></BtnHorizontalWhite>
      <BtnHorizontalOrange
        onPress={props.onPress}
        text={props.text}></BtnHorizontalOrange>
    </View>
  );
};

const styles = StyleSheet.create({
  btnHorizontal2Wrapper: {
    width: '100%',
    height: 53,
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
});

export default BtnHorizontal2;
