/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import {RecruitItemProps} from 'components/pages/Detail';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BAEMIN_ICON,
  COUPANGEATS_ICON,
  DARK_GRAY_COLOR,
  DDANGYO_ICON,
  ETC_ICON,
  MAP_ORANGE,
  WHITE_COLOR,
  YOGIYO_ICON,
} from 'themes/theme';
import BtnRadio from './BtnRadio';

export type BtnPlatformProps = {
  onPress(): void;
  platform: string;
  checkedPlatform: string;
  isChecked: boolean;
};

const BtnMap = ({item}: {item: RecruitItemProps | undefined}) => {
  const navigation = useNavigation();
  return (
    // <View>
    <TouchableOpacity
      style={{
        width: 36,
        height: 36,
        borderRadius: 36 / 2,
        position: 'absolute',
        top: 200,
        right: 60,
      }}
      onPress={() => {
        navigation.navigate(
          '지도' as never,
          {
            name: item?.place.name,
            x: item?.place.x,
            y: item?.place.y,
          } as never,
        );
      }}>
      <Image source={MAP_ORANGE} />
    </TouchableOpacity>
    // </View>
  );
};

const styles = StyleSheet.create({
  selected: {
    backgroundColor: '',
    opacity: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  unselected: {
    backgroundColor: 'gray',
    opacity: 0.3,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default BtnMap;
