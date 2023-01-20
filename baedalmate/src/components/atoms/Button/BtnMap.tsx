/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {MAP_ORANGE} from 'themes/theme';

export type BtnPlatformProps = {
  onPress(): void;
  platform: string;
  checkedPlatform: string;
  isChecked: boolean;
};

const BtnMap = ({item}: {item: RecruitItemProps | undefined}) => {
  const navigation = useNavigation();
  return (
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
  );
};

export default BtnMap;
