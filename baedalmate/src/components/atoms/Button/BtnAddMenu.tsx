/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Fonts} from 'assets/Fonts';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DARK_GRAY_COLOR, WHITE_COLOR} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const BtnAddMenu = (props: BtnWithoutTextProps) => {
  return (
    <TouchableOpacity style={styles.btnAddMenuWrapper} onPress={props.onPress}>
      <Text style={styles.btnAddMenuText}>+ 메뉴 추가하기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnAddMenuWrapper: {
    width: 203,
    height: 90,
    backgroundColor: WHITE_COLOR,
    borderWidth: 1,
    borderColor: DARK_GRAY_COLOR,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnAddMenuText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
  },
});

export default BtnAddMenu;
