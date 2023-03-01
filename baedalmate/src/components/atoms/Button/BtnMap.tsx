// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import {useNavigation} from '@react-navigation/native';
// import {RecruitItemProps} from 'components/pages/Detail';
// import React from 'react';
// import {Image, TouchableOpacity} from 'react-native';
// import {MAP_ORANGE} from 'themes/theme';

// export type BtnPlatformProps = {
//   onPress(): void;
//   platform: string;
//   checkedPlatform: string;
//   isChecked: boolean;
// };

// const BtnMap = ({item}: {item: RecruitItemProps | undefined}) => {
//   const navigation = useNavigation();
//   return (
//     <TouchableOpacity
//       style={{
//         width: 36,
//         height: 36,
//         borderRadius: 36 / 2,
//         position: 'absolute',
//         top: 200,
//         right: 60,
//       }}
//       onPress={() => {
//         navigation.navigate(
//           '지도' as never,
//           {
//             name: item?.place.name,
//             x: item?.place.x,
//             y: item?.place.y,
//           } as never,
//         );
//       }}>
//       <Image source={MAP_ORANGE} />
//     </TouchableOpacity>
//   );
// };

// export default BtnMap;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {BtnWithTextProps} from 'components/molecules/Button/BtnHorizontal2';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LINE_ORANGE_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
const BtnMap = (props: BtnWithTextProps) => {
  return (
    <TouchableOpacity style={styles.btnTagWrapper} onPress={props.onPress}>
      <Text style={styles.btnTagText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnTagWrapper: {
    // width: 75,
    // height: 41,
    paddingHorizontal: 4,
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: LINE_ORANGE_COLOR,
    backgroundColor: WHITE_COLOR,
  },
  btnTagText: {
    fontFamily: Fonts.Ko,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: LINE_ORANGE_COLOR,
  },
});

export default BtnMap;
