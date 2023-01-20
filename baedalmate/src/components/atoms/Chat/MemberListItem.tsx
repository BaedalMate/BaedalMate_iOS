import {url} from '../../../../App';
import {participantI} from 'components/utils/api/Chat';
import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {MAX_USERNAME_LIMIT} from 'components/molecules/Chat/Message';
import {TextKRBold} from 'themes/text';
export const MemberList = ({
  item,
  handleEachUserModal,
  setSelectedUser,
}: {
  item: participantI;
  handleModal: any;
  handleEachUserModal: any;
  setSelectedUser: any;
}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        paddingBottom: 19,
      }}
      onPress={() => {
        setSelectedUser(item);
        // handleModal(() => handleEachUserModal());
        // handleModal();
        setTimeout(() => {
          handleEachUserModal();
        }, 100);
      }}>
      <Image
        // source={{
        //   uri: item?.profileImage.replace('http', 'https'),
        // }}
        source={{uri: url + '/images/' + item.profileImage}}
        style={{
          width: 45,
          height: 45,
          backgroundColor: '#ffffff',
          borderRadius: 45 / 2,
          marginBottom: 6,
        }}
      />
      <View>
        <TextKRBold style={{fontSize: 14, lineHeight: 17}}>
          {item.nickname.length >= MAX_USERNAME_LIMIT
            ? item.nickname.substring(0, MAX_USERNAME_LIMIT) + '...'
            : item.nickname}
        </TextKRBold>
      </View>
    </TouchableOpacity>
  );
};
