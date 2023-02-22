/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Fonts} from 'assets/Fonts';
import {formPrice} from 'components/utils/api/Recruit';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DARK_GRAY_COLOR, DELETE_ICON, WHITE_COLOR} from 'themes/theme';

export type MenuType = {
  menu: string;
  price: number;
  cnt: number;
  onPress(): void;
};

const MenuItem = (props: MenuType) => {
  return (
    <View style={{height: 100, marginRight: 20}}>
      <TouchableOpacity
        onPress={props.onPress}
        style={{zIndex: 10, position: 'absolute', left: 10, top: -5}}>
        <Image
          source={DELETE_ICON}
          style={{width: 20, height: 20, top: 0, left: 0}}
        />
      </TouchableOpacity>
      <View style={styles.menuItemWrapper}>
        <View>
          <Text style={styles.menuItemTitle}>{props.menu}</Text>
          <Text style={styles.menuItemSub}>
            {props.cnt}개 · {formPrice(props.price)}원{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemWrapper: {
    width: 200,
    height: 90,
    backgroundColor: WHITE_COLOR,
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 18,
  },
  menuItemTitle: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 17,
  },
  menuItemSub: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: DARK_GRAY_COLOR,
  },
});

export default MenuItem;
