/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useController} from 'react-hook-form';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {
  BAEMIN_LOGO,
  COUPANGEATS_LOGO,
  DDANGYO_LOGO,
  ETC_LOGO,
  YOGIYO_LOGO,
} from 'themes/theme';
import {Grayscale} from 'react-native-color-matrix-image-filters';

export type BtnPlatformProps = {
  onPress(): void;
  platform: string;
  checkedPlatform: string;
  isChecked: boolean;
};

const BtnPlatform = ({platform, setPlatform, data, onSelect}) => {
  // const [platform, setPlatform] = useState();

  const selectHandler = value => {
    onSelect(value);
    setPlatform(value);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-between',
        width: '100%',
      }}>
      {data.map((item, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => selectHandler(item.value)}
            style={[
              item.value === platform ? styles.selected : styles.unselected,
              {
                // marginRight: 15,
              },
            ]}>
            {item.value === platform ? (
              <Image
                source={item.url}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                }}
              />
            ) : (
              <Grayscale>
                <Image
                  source={item.url}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                  }}
                />
              </Grayscale>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const PlatformSelect = ({
  platform,
  setPlatform,
  control,
  name,
  rules,
  setValue,
}) => {
  const data = [
    {value: 'BAEMIN', url: BAEMIN_LOGO},
    {value: 'YOGIYO', url: YOGIYO_LOGO},
    {value: 'COUPANG', url: COUPANGEATS_LOGO},
    {value: 'DDANGYO', url: DDANGYO_LOGO},
    {value: 'ETC', url: ETC_LOGO},
  ];
  // const [option, setOption] = useState(null);
  const {field} = useController({
    control,
    defaultValue: platform ? platform : 'BAEMIN',
    name,
    rules,
  });
  return (
    <View
      style={{
        width: '100%',
        // justifyContent: 'space-between',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: '100%',
        alignItems: 'center',
      }}>
      <BtnPlatform
        data={data}
        onSelect={value => {
          setValue('platform', value);
          setPlatform(value);
        }}
        platform={platform}
        setPlatform={setPlatform}
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
    opacity: 0.9,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default PlatformSelect;
