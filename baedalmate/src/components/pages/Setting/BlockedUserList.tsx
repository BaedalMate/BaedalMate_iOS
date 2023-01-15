import React from 'react';
import {ScrollView, View} from 'react-native';
import BlockedUserItem from 'components/atoms/BlockedUserItem/BlockedUserItem';
import {WHITE_COLOR} from 'themes/theme';

export const dummyBoardListData = Array(10).fill({
  userNickname: '유저닉네임',
  isBlocked: true,
  profileImage:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ6yI5v-1UCyMx8CdTpABg9QzItPHcPLZh7_1ZnzOpTg&s',
});

const renderItem = blockedUserList => {
  return (
    <View style={{backgroundColor: WHITE_COLOR, paddingHorizontal: 15}}>
      {blockedUserList === undefined ? (
        <View></View>
      ) : (
        blockedUserList.map(item => {
          return <BlockedUserItem item={item} />;
        })
      )}
    </View>
  );
};

const BlockedUserList = props => {
  return (
    <ScrollView style={{backgroundColor: WHITE_COLOR}}>
      {renderItem(dummyBoardListData)}
    </ScrollView>
  );
};

export default BlockedUserList;
