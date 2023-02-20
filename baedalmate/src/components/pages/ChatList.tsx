import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {getJWTToken} from 'components/utils/api/Recruit';
import axios from 'axios';
import {chatRoomListI, chatRoomURL} from 'components/utils/api/Chat';
import ChatListItem from 'components/atoms/Chat/ChatListItem';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        .then(async function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setChatRooms(response.data);
            return response.data.recruitList;
          } else if (response.status === 401) {
            const result = await refreshAPI();
            console.log(result);
            if (result.status == 200) {
              const tokens = await result.data;
              const token = tokens.accessToken;
              const refToken = tokens.refreshToken;
              AsyncStorage.multiSet([
                ['@BaedalMate_JWTAccessToken', token],
                ['@BaedalMate_JWTRefreshToken', refToken],
              ]);
              if (result.status === 200) {
                getChatRoomAPI();
              }
              return result;
            }
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
