import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  BAEMIN_ICON,
  COUPANGEATS_ICON,
  DDANGYO_ICON,
  ETC_ICON,
  WHITE_COLOR,
  YOGIYO_ICON,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

export const platformList = [
  {name: 'BAEMIN', url: BAEMIN_ICON},
  {name: 'YOGIYO', url: YOGIYO_ICON},
  {name: 'COUPANGEATS', url: COUPANGEATS_ICON},
  {name: 'DDANGYO', url: DDANGYO_ICON},
  {name: 'ETC', url: ETC_ICON},
];

const PlatformImage = ({item}: {item: RecruitItemProps | undefined}) => {
  console.log(item?.platform);
  let platformImg = platformList.find((v, i) => {
    return v.name === item?.platform;
  })?.url;
  return (
    <View style={{position: 'absolute', right: 15, top: 170}}>
      <Image
        source={platformImg}
        style={{
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
          borderWidth: 2,
          borderColor: WHITE_COLOR,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PlatformImage;
