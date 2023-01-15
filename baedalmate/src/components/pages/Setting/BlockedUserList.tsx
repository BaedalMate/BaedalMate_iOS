import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import BlockedUserItem from 'components/atoms/BlockedUserItem/BlockedUserItem';
import {WHITE_COLOR} from 'themes/theme';
import {getBlockUserListAPI} from 'components/utils/api/Block';

export const dummyBoardListData = Array(10).fill({
  userNickname: '유저닉네임',
  isBlocked: true,
  profileImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6yI5v-1UCyMx8CdTpABg9QzItPHcPLZh7_1ZnzOpTg&s',
});

const renderItem = (blockedUserList, getData) => {
  return (
    <View style={{backgroundColor: WHITE_COLOR, paddingHorizontal: 15}}>
      {blockedUserList === undefined ? (
        <View></View>
      ) : (
        blockedUserList.map(item => {
          return <BlockedUserItem item={item} getData={getData} />;
        })
      )}
    </View>
  );
};

const BlockedUserList = props => {
  const [userListData, setUserListData] = useState();
  const getData = async () => {
    const result = await getBlockUserListAPI();
    setUserListData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(userListData, getData)}
    </ScrollView>
  );
};

export default BlockedUserList;
