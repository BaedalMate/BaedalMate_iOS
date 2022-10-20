import {RecruitItemProps} from 'components/pages/Detail';
import {MyPageI} from 'components/pages/Setting/MyPage';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MARKER_BLACK,
  STAR_LINEORANGE,
  STAR_PRIMARY,
  WHITE_COLOR,
} from 'themes/theme';
import {MyPageUserProfileImage} from '../Image/UserImage';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const MyPageUserInfo = ({item}: {item: MyPageI | undefined}) => {
  return (
    <View
      style={{
        height: 130,
        width: '100%',
        backgroundColor: WHITE_COLOR,
        display: 'flex',
        alignItems: 'center',
        padding: 30,
        flexDirection: 'row',
        borderColor: BLACK_COLOR,
      }}>
      <MyPageUserProfileImage item={item} />

      <View
        style={{
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
        }}>
        <TextKRBold>{item?.userName}</TextKRBold>
        <View style={{flexDirection: 'row'}}>
          <Image source={STAR_LINEORANGE} />
          <TextKRBold> {item?.score} / 5.0</TextKRBold>
        </View>
      </View>
      <View
        style={{
          height: 41,
          marginLeft: 50,
          justifyContent: 'flex-end',
          bottom: 5,
          // justifyContent: 'flex-start',
        }}>
        <Text>
          <Image source={MARKER_BLACK} />
          {item?.dormitory}
        </Text>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          right: 15,
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPageUserInfo;
