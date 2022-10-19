import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  LiveMyMessage,
  LiveOpponentMessage,
  MyMessage,
  OpponentMessage,
} from 'components/molecules/Chat/Message';
import {url} from '../../../App';
import {getJWTToken} from 'components/utils/Main';
import axios from 'axios';

import ChatHeader from 'components/atoms/Header/ChatHeader';
import {
  CAMERA_GRAY_FILLED_ICON,
  LINE_GRAY_COLOR,
  SEND_GRAY_FILLED_ICON,
  WHITE_COLOR,
} from 'themes/theme';
import ChatDate from 'components/atoms/Chat/ChatDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native-paper';
import {MessageTextInput} from 'components/atoms/CreateRecruit/Input';
import {useForm} from 'react-hook-form';
import {
  eachDetailChatRoomI,
  eachChatRoomURL,
  messageI,
  formTime,
} from 'components/utils/Chat';
// import {getChatRoomAPI} from 'components/utils/\bChat';

import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

export interface sendI {
  senderId: number;
  roomId: number;
  message: string;
}
export interface recvI {
  senderId: number;
  sender: string;
  senderImage: string;
  roomId: number;
  message: string;
}

export interface messageProps {
  // type: string;
  sender: string;
  message: string;
}
let ws = Stomp.over(function () {
  return new SockJS(url + '/ws/chat');
});
// ws.debug = text => console.log(text);

// Object.assign(global, {WebSocket: require('websocket').w3cwebsocket});
export const DetailChatRoom = props => {
  ws.configure({});
  const [recv, setRecv] = useState<recvI>();
  const [messageText, setMessageText] = useState<string>();
  // const [chat, setChat] = useState([]);
  const [detailChat, setDetailChat] = useState<eachDetailChatRoomI>();
  const getEachChatRoomAPI = async () => {
    try {
      const chatRooms = await axios
        .get(eachChatRoomURL + props.route.params.id)
        .then(function (response) {
          if (response.status === 200) {
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

  const [userId, setUserId] = useState('');
  const [myNickname, setMyNickname] = useState('');
  const [JWTAccessToken, setJWTAccessToken] = useState('');
  const getMyInfo = async () => {
    const JWTAccessToken = await getJWTToken();
    setJWTAccessToken(JWTAccessToken);
    const myNickname = await AsyncStorage.getItem('@BaedalMate_UserName');
    const userId = await AsyncStorage.getItem('@BaedalMate_UserId');
    myNickname !== null && setMyNickname(myNickname);
    userId !== null && setUserId(userId);
  };

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const [messages, setMessages] = useState<messageProps[]>([]);

  const findRoom = () => {
    const roomData: any = axios
      .get(url + '/api/v1/room/' + props.route.params.id)
      .then(response => {
        // console.log(response.data);
        setMessages(response.data.messages);
      });
  };
  const sendMessage = messageText => {
    ws.send(
      '/app/chat/message',
      {},
      JSON.stringify({
        roomId: props.route.params.id,
        senderId: userId,
        message: messageText,
      }),
    );
    addMessages(messageText);
    // setMessageText('');
    // setValue('message', '');
  };
  const recvMessage = ({recv}: {recv: recvI}) => {
    console.log({recv});
    recv && messages
      ? setMessages([
          ...messages,
          {
            sender: recv.sender,
            message: recv.message,
          },
        ])
      : recv &&
        setMessages([
          {
            sender: recv.sender,
            message: recv.message,
          },
        ]);
  };

  let reconnect = 0;
  function connect() {
    // pub/sub event
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(
          '/topic/chat/room/' + props.route.params.id,
          function (message) {
            const recv = JSON.parse(message.body);
            // vm.recvMessage(recv);
            // console.log(recv);

            recvMessage(recv);
            setRecv(recv);
          },
        );
      },
      function (error) {
        if (reconnect++ <= 5) {
          setTimeout(function () {
            console.log('connection reconnect');
            // sock = new SockJS(url + '/ws/chat');
            ws = Stomp.over(function () {
              return new SockJS(url + '/ws/chat');
            });
            connect();
          }, 10 * 1000);
        }
      },
    );
  }

  // const onConnected = () => {
  //   console.log('onConnected');
  //   ws.subscribe(
  //     '/topic/chat/room/' + props.route.params.id,
  //     function (message) {
  //       const recv = JSON.parse(message.body);
  //       // vm.recvMessage(recv);
  //       recvMessage(recv);
  //       // setRecv(recv);
  //       console.log(recv);
  //     },
  //   );
  //   ws.send(
  //     '/app/chat/message',
  //     {},
  //     JSON.stringify({
  //       roomId: props.route.params.id,
  //       senderId: userId,
  //       message: messageText,
  //     }),
  //   );
  // };

  const addMessages = msg => {
    setMessages(prev => [...prev, msg]);
    connect();
  };

  useEffect(() => {
    // findRoom();
    getEachChatRoomAPI();
    getMyInfo();
    connect();
  }, []);
  useEffect(() => {
    connect();
    getEachChatRoomAPI();
  }, [messages, recv]);
  useEffect(() => {
    reset({
      message: '',
    });
  }, [messages]);
  // useEffect(() => {
  //   // let reconnect = 0;
  //   // ws.onConnect(
  //   //   {},
  //   // connect();
  //   if (messageText === '') return;

  //   // sendMessage(messageText);
  //   // );
  // }, [messageText]);
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <View style={{flex: 1}}>
      {detailChat && <ChatHeader item={detailChat} />}
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          width: '100%',
          height: `100%`,
        }}>
        <View style={{paddingBottom: 400}}>
          <View
            style={{
              paddingHorizontal: 15,
            }}>
            <>
              {detailChat?.messages.map((v, i) => (
                <>
                  {i > 0 &&
                    (v.sendDate.split(' ')[0].split('-')[0] !==
                      detailChat.messages[i - 1].sendDate
                        .split(' ')[0]
                        .split('-')[0] ||
                      v.sendDate.split(' ')[0].split('-')[1] !==
                        detailChat.messages[i - 1].sendDate
                          .split(' ')[0]
                          .split('-')[1] ||
                      v.sendDate.split(' ')[0].split('-')[2] !==
                        detailChat.messages[i - 1].sendDate
                          .split(' ')[0]
                          .split('-')[2]) && <ChatDate item={v} key={i} />}
                  <Text style={{marginVertical: 5}}>
                    {v.message &&
                      (v.sender === myNickname ? (
                        <MyMessage message={v} />
                      ) : (
                        <>
                          <Text>{v.sender}</Text>
                          <OpponentMessage message={v} />
                        </>
                      ))}
                  </Text>
                </>
              ))}
              {/* {recv && recv.sender !== myNickname ? (
                <>
                  <Text>{recv.sender}</Text>
                  <LiveOpponentMessage message={recv} />
                </>
              ) : (
                recv && (
                  <>
                    <LiveMyMessage message={recv} />
                  </>
                )
              )} */}
              {/* {messages?.map((v, i) => {
                <Text>{(v.message, v.sender)}</Text>;
              })} */}
            </>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
        behavior={'position'}
        keyboardVerticalOffset={statusBarHeight + 44}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: LINE_GRAY_COLOR,
            width: '100%',
            paddingBottom: 44,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity>
            <Image source={CAMERA_GRAY_FILLED_ICON} />
          </TouchableOpacity>
          <MessageTextInput
            error={errors}
            name={'message'}
            control={control}
            rules={{}}
          />
          <TouchableOpacity
            onPress={handleSubmit(d => {
              console.log(d.message);
              setMessageText(d.message);
              sendMessage(d.message);
              setValue('message', '');
            })}>
            <Image source={SEND_GRAY_FILLED_ICON} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* <View
        style={{
          position: 'absolute',
          bottom: 100,
          backgroundColor: LINE_GRAY_COLOR,
          width: '100%',
          paddingBottom: 42,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <TouchableOpacity>
          <Image source={CAMERA_GRAY_FILLED_ICON} />
        </TouchableOpacity>
        <TextInput
          style={{
            backgroundColor: WHITE_COLOR,
            // width: '100%',
            flex: 1,
            height: 45,
            borderRadius: 10,
            padding: 15,
            margin: 15,
            textAlign: 'right',
          }}
          value={messageText}
          onChangeText={newText => {
            setMessageText(newText);
          }}
          maxLength={20}
        />
        <TouchableOpacity
          onPress={handleSubmit(d => {
            console.log(d);
            // sendMessage(d);
          })}>
          <Image source={SEND_GRAY_FILLED_ICON} />
        </TouchableOpacity>
      </View> */}
      {/* <MessageInput
        error={errors}
        name={'message'}
        control={control}
        rules={{}}
        sendMessage={sendMessage}
        handleSubmit={handleSubmit}
      /> */}
    </View>
  );
};

export default DetailChatRoom;
