import UserProfileImage from 'components/atoms/Image/UserImage';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  MARKER_BLACK,
  STAR_LINEORANGE,
  STAR_PRIMARY,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const UserInfo = ({item}: {item: RecruitItemProps | undefined}) => {
  return (
    <View
      style={{
        top: -19,
        height: 72,
        width: '100%',
        backgroundColor: '#F7F8FA',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        borderColor: BLACK_COLOR,
      }}>
      <UserProfileImage />
      <View
        style={{
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
        }}>
        <TextKRBold>유현영</TextKRBold>
        <Image source={STAR_LINEORANGE} />
      </View>
      <View
        style={{
          position: 'absolute',
          right: 15,
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        <Text>
          <Image source={MARKER_BLACK} />
          누리학사
        </Text>
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            borderColor: DARK_GRAY_COLOR,
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
            }}>
            신고하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserInfo;
