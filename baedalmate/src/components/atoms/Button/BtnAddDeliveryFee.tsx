/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DARK_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const BtnAddDeliveryFee = (props: BtnWithoutTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnAddDeliveryFeeWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnAddDeliveryText}>+ 구간 추가하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnAddDeliveryFeeWrapper: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: DARK_GRAY_COLOR,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
  },
  btnAddDeliveryText: {
    color: DARK_GRAY_COLOR,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
  },
});

export default BtnAddDeliveryFee;
