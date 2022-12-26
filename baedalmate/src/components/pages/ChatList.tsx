import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {url} from '../../../App';
import {getJWTToken} from 'components/utils/Recruit';
import axios from 'axios';
import {chatRoomListI, chatRoomURL} from 'components/utils/Chat';
import ChatListItem from 'components/atoms/Chat/ChatListItem';

export const Chat = () => {
  const [chatRooms, setChatRooms] = useState<chatRoomListI>();
  const getChatRoomAPI = async () => {
    const JWTAccessToken = await getJWTToken();
    try {
      const chatRooms = await axios
        .get(chatRoomURL, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setChatRooms(response.data);
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
    getChatRoomAPI();
  }, []);
  return (
    <ScrollView>
      <View>
        {/* <TextKRBold>진행중인 모집글</TextKRBold> */}
        <View>
          {chatRooms?.rooms.map((v, i) => (
            <ChatListItem item={v} key={i} />
          ))}
        </View>
      </View>
      {/* <View>
        <TextKRBold>마감된 모집글</TextKRBold>
        <View></View>
      </View> */}
      {/* <Message /> */}
    </ScrollView>
  );
};

export default Chat;
