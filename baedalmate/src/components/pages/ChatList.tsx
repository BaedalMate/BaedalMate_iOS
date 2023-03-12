import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {getJWTToken} from 'components/utils/api/Recruit';
import axios from 'axios';
import {chatRoomListI, chatRoomURL} from 'components/utils/api/Chat';
import ChatListItem from 'components/atoms/Chat/ChatListItem';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {url} from '../../../App';
import {UserInfoI, getUserAPI} from 'components/utils/api/User';
import {readRecvI, talkEnterRecvI} from './DetailChatRoom';
let ws = Stomp.over(function () {
  return new SockJS(url + '/ws/chat');
});
export const Chat = () => {
  const [userInfo, setUserInfo] = useState<UserInfoI>();
  const [recv, setRecv] = useState();
  const getUserInfo = async () => {
    const result = await getUserAPI();
    result && setUserInfo(result);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  ws.configure({});
  // const sendChatList = messageText => {
  //   ws.send(
  //     '/app/chat/message',
  //     {},
  //     JSON.stringify({
  //       roomId: props.route.params.id,
  //       senderId: userId,
  //       message: messageText,
  //     }),
  //   );
  //   addMessages(messageText);
  // };
  const recvChatList = ({recv}: {recv: talkEnterRecvI | readRecvI}) => {
    console.log(recv);
    // recv && messages
    //   ? setMessages([
    //       ...messages,
    //       {
    //         sender: recv.sender,
    //         message: recv.message,
    //       },
    //     ])
    //   : recv &&
    //     setMessages([
    //       {
    //         sender: recv.sender,
    //         message: recv.message,
    //       },
    //     ]);
  };

  let reconnect = 0;
  function connect() {
    // pub/sub event
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(
          '/topic/chat/user/' + userInfo?.userId,
          function (message) {
            const recv = JSON.parse(message.body);
            recvChatList(recv);
            setRecv(recv);
          },
        );
      },
      function (error) {
        if (reconnect++ <= 5) {
          setTimeout(function () {
            console.log('connection reconnect');
            ws = Stomp.over(function () {
              return new SockJS(url + '/ws/chat');
            });
            connect();
          }, 1 * 1000);
        }
      },
    );
  }
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
            return response;
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
          return response;
        })
        .catch(function (error) {
          console.log(error);
          return error;
        });
      return chatRooms;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  useEffect(() => {
    getChatRoomAPI();
    connect();
  }, []);
  return (
    <ScrollView>
      <View>
        <View>
          {chatRooms?.rooms.map((v, i) => (
            <ChatListItem item={v} key={i} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Chat;
