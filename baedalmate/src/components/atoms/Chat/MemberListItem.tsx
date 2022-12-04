import {url} from '../../../../App';
import {participantI} from 'components/utils/Chat';
import {View, Image, Text} from 'react-native';
import React from 'react';
import {MAX_USERNAME_LIMIT} from 'components/molecules/Chat/Message';
import {LINE_GRAY_COLOR} from 'themes/theme';
export const MemberList = ({item}: {item: participantI}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        paddingBottom: 15,
      }}>
      <Image
        source={{
          uri: item?.profileImage.replace('http', 'https'),
        }}
        style={{
          width: 45,
          height: 45,
          backgroundColor: '#ffffff',
          borderRadius: 45 / 2,
          marginBottom: 6,
        }}
      />
      <View>
        <Text>
          {item.nickname.length >= MAX_USERNAME_LIMIT
            ? item.nickname.substring(0, MAX_USERNAME_LIMIT) + '...'
            : item.nickname}
        </Text>
      </View>
    </View>
  );
};
