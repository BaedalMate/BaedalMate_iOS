/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {
  BAEMIN_ICON,
  COUPANGEATS_ICON,
  DDANGYO_ICON,
  ETC_ICON,
  YOGIYO_ICON,
} from 'themes/theme';

export type BtnPlatformProps = {
  onPress(): void;
  platform: string;
  checkedPlatform: string;
  isChecked: boolean;
};

const BtnPlatform = ({data, onSelect}) => {
  const [platform, setPlatform] = useState('BAEMIN');

  const selectHandler = value => {
    onSelect(value);
    setPlatform(value);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 15,
      }}>
      {data.map((item, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => selectHandler(item.value)}
            style={[
              item.value === platform ? styles.selected : styles.unselected,
              {
                marginRight: 15,
              },
            ]}>
            <Image
              source={item.url}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const PlatformSelect = ({setPlatform, control, name, rules, setValue}) => {
  const data = [
    {value: 'BAEMIN', url: BAEMIN_ICON},
    {value: 'YOGIYO', url: YOGIYO_ICON},
    {value: 'COUPANG', url: COUPANGEATS_ICON},
    {value: 'DDANGYO', url: DDANGYO_ICON},
    {value: 'ETC', url: ETC_ICON},
  ];
  // const [option, setOption] = useState(null);
  const {field} = useController({
    control,
    defaultValue: 'BAEMIN',
    name,
    rules,
  });
  return (
    <View>
      <BtnPlatform
        data={data}
        onSelect={value => {
          setValue('platform', value);
          setPlatform(value);
        }}
      />
    </View>
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

export default PlatformSelect;
