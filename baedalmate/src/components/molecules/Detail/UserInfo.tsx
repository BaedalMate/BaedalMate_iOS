import {useNavigation} from '@react-navigation/native';
import {UserProfileImage} from 'components/atoms/Image/UserImage';
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
  const navigation = useNavigation();
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
      <UserProfileImage item={item} />
      <View
        style={{
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
        }}>
        <TextKRBold>{item?.userInfo.nickname}</TextKRBold>
        <View style={{flexDirection: 'row'}}>
          <Image source={STAR_LINEORANGE} />
          <TextKRBold>
            {item?.userInfo.score
              ? Math.round(item?.userInfo.score * 10) / 10
              : 0}
          </TextKRBold>
        </View>
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
          {item?.dormitory}
        </Text>
        {!item?.host && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('게시글 신고하기' as never);
            }}
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
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default UserInfo;
