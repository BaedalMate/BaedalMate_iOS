/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const BtnRemoveDeliveryFee = (props: BtnWithoutTextProps) => {
  return (
    <TouchableOpacity
      style={styles.btnAddDeliveryFeeWrapper}
      onPress={props.onPress}>
      <Text style={styles.btnAddDeliveryText}>x</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnAddDeliveryFeeWrapper: {
    width: 45,
    height: 100,
    backgroundColor: LINE_GRAY_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  btnAddDeliveryText: {
    color: DARK_GRAY_COLOR,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default BtnRemoveDeliveryFee;
