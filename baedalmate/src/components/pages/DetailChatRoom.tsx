import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Message} from 'components/molecules/Chat/Message';
import {TextKRBold} from 'themes/text';
import {url} from '../../../App';
import {getJWTToken} from 'components/utils/Main';
import axios from 'axios';
import {
  chatRoomListI,
  chatRoomURL,
  eachChatRoomURL,
  eachDetailChatRoomI,
} from 'components/utils/Chat';
import ChatListItem from 'components/atoms/Chat/ChatListItem';
import ChatHeader from 'components/atoms/Header/ChatHeader';
// import {getChatRoomAPI} from 'components/utils/\bChat';

export const DetailChatRoom = props => {
  const [detailChat, setDetailChat] = useState<eachDetailChatRoomI>();
  const getEachChatRoomAPI = async () => {
    try {
      const chatRooms = await axios
        .get(eachChatRoomURL + props.route.params.id)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setDetailChat(response.data);
            return response.data.recruitList;
          }
          return false;
        })
        .catch(function (error) {
          console.log(error);
          return false;
        });
      return chatRooms;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    console.log(props.route.params.id);
    getEachChatRoomAPI();
  }, []);
  return (
    <View>
      {detailChat && <ChatHeader item={detailChat} />}
      <ScrollView>
        <View>
          <View>
            {/* {chatRooms?.rooms.map((v, i) => (
            <ChatListItem item={v} key={i} />
          ))} */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailChatRoom;
