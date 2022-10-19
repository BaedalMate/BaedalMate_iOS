import {url} from '../../../../App';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MyPageI} from 'components/pages/Setting/MyPage';
import {BAEMIN_ICON} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const UserProfileImage = ({item}: {item: RecruitItemProps | undefined}) => {
  // console.log(item?.profileImage);
  console.log(item?.profileImage.replace('http', 'https'));
  BAEMIN_ICON;
  return (
    <Image
      source={{
        uri: item?.profileImage.replace('http', 'https'),
      }}
      style={{
        width: 45,
        height: 45,
        backgroundColor: '#ffffff',
        borderRadius: 45 / 2,
      }}
    />
  );
};

const MyPageUserProfileImage = ({item}: {item: MyPageI | undefined}) => {
  return (
    <View style={{}}>
      <Image
        source={{
          uri: item?.profileImage,
          // uri: url + '/images/' + item?.profileImage,
        }}
        style={{
          width: 60,
          height: 60,
          backgroundColor: '#ffffff',
          borderRadius: 60 / 2,
          marginHorizontal: 15,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export {UserProfileImage, MyPageUserProfileImage};
