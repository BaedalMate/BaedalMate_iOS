import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {url} from '../../../../App';
import {useRecoilValue} from 'recoil';
import {getUserProfileImageSelector} from 'components/utils/recoil/selectors/User';

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

const MyPageUserProfileImage = () => {
  // const [profileImage, setProfileImage] = useRecoilState(userProfileImageState);
  const profileImage = useRecoilValue(getUserProfileImageSelector);

  return (
    <View style={{}}>
      <Image
        source={{
          // uri: item?.profileImage,
          uri: url + '/images/' + profileImage,
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
