/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

// const BtnPlatform = (props: BtnPlatformProps) => {
//   return (
//     // {data.map(item => {
//     //   return (
//     //     <Pressable
//     //       onPress={() => selectHandler(item.value)}
//     //       style={[
//     //         item.value === userOption ? styles.selected : styles.unselected,
//     //         {
//     //           marginRight: 15,
//     //         },
//     //       ]}>
//     //       <Text
//     //         style={[
//     //           styles.option,
//     //           {
//     //             color:
//     //               item.value === userOption ? WHITE_COLOR : LINE_ORANGE_COLOR,
//     //           },
//     //         ]}>
//     //         {item.name}
//     //       </Text>
//     //     </Pressable>
//     //   );
//     // })}

//     <TouchableOpacity
//       onPressIn={props.onPress}
//       style={{
//         backgroundColor: props.checkedPlatform === props.platform ? '' : 'gray',
//         opacity: props.checkedPlatform === props.platform ? 1 : 0.3,
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//       }}>
//       <Image
//         source={
//           props.platform === 'BAEMIN'
//             ? BAEMIN_ICON
//             : props.platform === 'YOGIYO'
//             ? YOGIYO_ICON
//             : props.platform === 'COUPANGEATS'
//             ? COUPANGEATS_ICON
//             : props.platform === 'DDANGYO'
//             ? DDANGYO_ICON
//             : ETC_ICON
//         }
//         style={{
//           width: 60,
//           height: 60,
//           borderRadius: 30,
//         }}
//       />
//     </TouchableOpacity>
//   );
// };

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

const PlatformSelect = ({
  platform,
  setPlatform,
  control,
  error,
  name,
  rules,
  setValue,
}) => {
  const data = [
    {value: 'BAEMIN', url: BAEMIN_ICON},
    {value: 'YOGIYO', url: YOGIYO_ICON},
    {value: 'COUPANGEATS', url: COUPANGEATS_ICON},
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
