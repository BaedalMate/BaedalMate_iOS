/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Fonts} from 'assets/Fonts';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SELECT_RADIO, UNSELECT_RADIO} from 'themes/theme';

export interface BtnCreateFloatingProps {
  onPress(): void;
  text: string;
  id: number;
}
const BtnCreateFloating = (props: BtnCreateFloatingProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
      }}>
      <View
        style={{
          top: -120,
          position: 'relative',
          flexDirection: 'row',
          width: '100%',
          height: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={props.id === 1 ? SELECT_RADIO : UNSELECT_RADIO}
          style={{width: 10, height: 10, margin: 3}}
        />
        <Image
          source={props.id === 2 ? SELECT_RADIO : UNSELECT_RADIO}
          style={{width: 10, height: 10, margin: 3}}
        />
        <Image
          source={props.id === 3 ? SELECT_RADIO : UNSELECT_RADIO}
          style={{width: 10, height: 10, margin: 3}}
        />
        <Image
          source={props.id === 4 ? SELECT_RADIO : UNSELECT_RADIO}
          style={{width: 10, height: 10, margin: 3}}
        />
      </View>
      <TouchableOpacity
        style={styles.btnCreateFloatingWrapper}
        onPress={props.onPress}>
        <Text style={styles.btnCreateFloatingText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCreateFloatingWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 60,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  btnCreateFloatingText: {
    fontFamily: Fonts.Ko,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default BtnCreateFloating;
