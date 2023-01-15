import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {MyPageI} from 'components/pages/Setting/MyPage';
import {url} from '../../../../App';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const UserProfileImage = ({item}: {item: RecruitItemProps | undefined}) => {
  // console.log(item?.profileImage);
  // console.log(item?.profileImage.replace('http', 'https'));
  return (
    <Image
      // source={{
      //   uri: item?.profileImage.replace('http', 'https'),
      // }}
      source={{uri: url + '/images/' + item?.userInfo.profileImage}}
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
          // uri: item?.profileImage,
          uri: url + '/images/' + item?.profileImage,
        }}
        style={{
          width: 55,
          height: 55,
          backgroundColor: '#ffffff',
          borderRadius: 55 / 2,
          marginRight: 15,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export {UserProfileImage, MyPageUserProfileImage};
