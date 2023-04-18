import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {MyMessage, OpponentMessage} from 'components/molecules/Chat/Message';
import {url} from '../../../App';
import {getJWTToken} from 'components/utils/api/Recruit';
import axios from 'axios';

import ChatHeader from 'components/atoms/Header/ChatHeader';
import {
  BLOCK_ICON,
  DARK_GRAY_COLOR,
  ERROR_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  REPORT_ICON,
  SEND_GRAY_FILLED_ICON,
  WHITE_COLOR,
} from 'themes/theme';
import ChatDate from 'components/atoms/Chat/ChatDate';
import {Text} from 'react-native-paper';
import {MessageTextInput} from 'components/atoms/CreateRecruit/Input';
import {useForm} from 'react-hook-form';
import {
  eachDetailChatRoomI,
  eachChatRoomURL,
  chatRecruitURL,
  recruitParticipantsI,
  participantI,
} from 'components/utils/api/Chat';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import {MemberList} from 'components/atoms/Chat/MemberListItem';
import {getReviewParticipantsAPI} from 'components/utils/api/Review';
import Modal from 'react-native-modal/dist/modal';
import {UsePopup, popupProps} from 'components/utils/usePopup';
import {postBlockAPI, postUnBlockAPI} from 'components/utils/api/Block';
import Toast from 'react-native-root-toast';
import {getUserAPI} from 'components/utils/api/User';
import {refreshAPI} from 'components/utils/api/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface sendI {
  senderId: number;
  roomId: number;
  message: string;
}
export interface talkEnterRecvI {
  senderId: number;
  sender: string;
  senderImage: string;
  messageId: number;
  roomId: number;
  message: string;
  type: 'TALK' | 'ENTER';
  sendDate: string;
}
export interface readRecvI {
  senderId: number;
  sender: string;
  messageId: number;
  readMessageId: number;
  type: 'READ';
  sendDate: string;
}

export interface messageProps {
  // type: string;
  sender: string;
  message: string;
}
let ws;
export const DetailChatRoom = props => {
  // const [JWTAccessToken, setJWTAccessToken] =
  //   useRecoilState(JWTAccessTokenState);
  // const [JWTRefreshToken, setJWTRefreshToken] =
  //   useRecoilState(JWTRefreshTokenState);
  const [recv, setRecv] = useState<talkEnterRecvI | readRecvI>();
  const [messageText, setMessageText] = useState<string>('');
  const [detailChat, setDetailChat] = useState<eachDetailChatRoomI>();
  const [participantsInfo, setParticipantsInfo] =
    useState<recruitParticipantsI>();
  const getEachChatRoom = async () => {
    try {
      const JWTAccessToken = await getJWTToken();
      const chatRooms = await axios
        .get(eachChatRoomURL + props.route.params.id, {
          headers: {
            Authorization: 'Bearer ' + JWTAccessToken,
          },
        })
        .then(async function (response) {
          if (response.status === 200) {
            setDetailChat(response.data);
            console.log(response);
            return response.data;
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
                getEachChatRoom();
              }
              return result.data;
            }
          }
          return false;
        })
        .catch(async function (error) {
          console.log(error);
          if (error.response.status === 401) {
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
                getEachChatRoom();
              }
              return result.data;
            }
          }
          return false;
        });
      return chatRooms;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getParticipants = async id => {
    try {
      const JWTAccessToken = await getJWTToken();
      const result = await axios.get(chatRecruitURL + `${id}/participants`, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        },
      });
      if (result) {
        if (result.status === 200) {
          setParticipantsInfo(result.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [userId, setUserId] = useState(-1);
  const [myNickname, setMyNickname] = useState('');
  const getMyInfo = async () => {
    const result = await getUserAPI();
    setUserId(result.userId);
    setMyNickname(result.nickname);
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

  const sendMessage = messageText => {
    try {
      ws &&
        ws.send(
          '/app/chat/message',
          {},
          JSON.stringify({
            roomId: props.route.params.id,
            senderId: userId,
            message: messageText,
          }),
        );
    } catch (error) {
      console.log(error);
      throw new Error('sendMessage error' + error);
    }

    addMessages(messageText);
  };
  const recvMessage = ({recv}: {recv: talkEnterRecvI | readRecvI}) => {
    recv && recv.type === 'TALK' && messages
      ? setMessages([
          ...messages,
          {
            sender: recv.sender,
            message: recv.message,
          },
        ])
      : recv &&
        recv.type === 'TALK' &&
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
    ws &&
      ws.connect(
        {},
        function (frame) {
          ws.subscribe(
            '/topic/chat/room/' + props.route.params.id,
            function (message) {
              const recv = JSON.parse(message.body);
              recvMessage(recv);
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
            }, 0.5 * 1000);
          }
        },
      );
  }

  const MemberListModal = props => {
    return (
      <View style={{}}>
        <Modal
          isVisible={modal}
          style={{
            width: '100%',
            height: '100%',
            flex: 1,
            margin: 0,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          {props.children}
          <View
            onTouchStart={handleModal}
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              width: '100%',
              paddingHorizontal: 15,
              position: 'relative',
              bottom: 0,
              backgroundColor: WHITE_COLOR,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingVertical: 43,
            }}>
            <View
              style={{
                marginBottom: 22,
              }}>
              <TextKRBold
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  color: PRIMARY_COLOR,
                }}>
                현재 참여자
              </TextKRBold>
            </View>
            <View
              style={{
                paddingBottom: 30,
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                  }}>
                  {participantsInfo?.participants.map((v, i) => (
                    <MemberList
                      item={v}
                      key={v.userId}
                      handleModal={handleModal}
                      handleEachUserModal={handleEachUserModal}
                      setSelectedUser={setSelectedUser}
                    />
                  ))}
                </View>
              </View>
            </View>

            <BtnVerticalOrange
              onPress={() => {
                handleModal();
                props.navigation.navigate('주문 내역', {
                  id: detailChat?.recruit.recruitId,
                } as never);
              }}
              text={'전체 주문 확인'}
            />
          </View>
          {/* </View> */}
        </Modal>
      </View>
    );
  };
  const EachMemberModal = () => {
    const [blockModal, setBlockModal] = useState(false);
    const handleBlockModal = () => {
      blockModal ? setBlockModal(false) : setBlockModal(true);
    };

    const blockUser = async () => {
      if (selectedUser?.userId) {
        const result = await postBlockAPI(selectedUser?.userId);
        if (result.result === 'success') {
          Toast.show('차단이 완료되었습니다.');
        } else {
          Toast.show('차단에 실패하였습니다.');
        }
      }
    };
    const unblockUser = async () => {
      if (selectedUser?.userId) {
        const result = await postUnBlockAPI(selectedUser?.userId);
        if (result.result === 'success') {
          Toast.show('차단 해제가 완료되었습니다.');
        } else {
          Toast.show('차단 해제에 실패하였습니다.');
        }
      }
    };
    const blockModalData = {
      title: selectedUser?.nickname + '님을 차단 하시겠습니까?',
      description:
        '차단하더라도, 해당 사용자가 주최자 역할이 아닌 참여하고 있는 모집글과 채팅방은 정상적으로 보여지게 됩니다.',
      modal: blockModal,
      handleModal: handleBlockModal,
      confirmEvent: blockUser,
      choiceCnt: 2,
    };
    const unblockModalData = {
      title: '차단을 해제하시겠습니까?',
      description: '해당 유저가 주최하는 모집글을 다시 볼 수 있게 됩니다.',
      modal: modal,
      handleModal: handleBlockModal,
      confirmEvent: unblockUser,
      choiceCnt: 2,
    };
    const [modalData, setModalData] = useState<popupProps>(blockModalData);

    return (
      <View>
        <Modal isVisible={eachUserModal} style={{margin: 0}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.45)',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              onTouchStart={handleEachUserModal}
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
                padding: 15,
                position: 'relative',
                bottom: 0,
                backgroundColor: WHITE_COLOR,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}>
              <View
                style={{
                  paddingTop: 28,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: LINE_GRAY_COLOR,
                    paddingBottom: 18,
                  }}>
                  <Image
                    source={{
                      uri: url + '/images/' + selectedUser?.profileImage,
                    }}
                    style={{
                      width: 77,
                      height: 77,
                      backgroundColor: '#ffffff',
                      borderRadius: 77 / 2,
                      marginBottom: 17,
                    }}
                  />
                  <View>
                    <TextKRBold style={{fontSize: 14, lineHeight: 17}}>
                      {selectedUser?.nickname}
                    </TextKRBold>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    paddingTop: 32,
                    paddingBottom: 15,
                  }}>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                      selectedUser?.block
                        ? setModalData(unblockModalData)
                        : setModalData(blockModalData);
                      handleBlockModal();
                    }}>
                    <UsePopup
                      title={modalData.title}
                      description={modalData.description}
                      modal={blockModal}
                      handleModal={handleBlockModal}
                      confirmEvent={modalData.confirmEvent}
                      choiceCnt={2}
                    />
                    <Image
                      source={BLOCK_ICON}
                      style={{width: 28, height: 28, marginBottom: 8}}
                    />
                    <TextKRReg style={{fontSize: 11, lineHeight: 13}}>
                      {selectedUser?.block ? '차단해제' : '차단하기'}
                    </TextKRReg>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => {
                      handleEachUserModal();
                      handleModal();
                      props.navigation.navigate('사용자 신고하기', {
                        userInfo: selectedUser,
                      } as never);
                    }}>
                    <Image
                      source={REPORT_ICON}
                      style={{width: 28, height: 28, marginBottom: 8}}
                    />
                    <TextKRReg style={{fontSize: 11, lineHeight: 13}}>
                      신고하기
                    </TextKRReg>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const addMessages = msg => {
    setMessages(prev => [...prev, {sender: myNickname, message: msg}]);
    connect();
  };

  useEffect(() => {
    // findRoom();
    ws = Stomp.over(function () {
      return new SockJS(url + '/ws/chat');
    });
    ws.configure({});
    getEachChatRoom();
    getMyInfo();
    connect();
  }, []);
  useEffect(() => {
    detailChat?.recruit.recruitId &&
      getParticipants(detailChat?.recruit.recruitId);
  }, [detailChat?.recruit.recruitId]);

  useEffect(() => {
    connect();
    getEachChatRoom();
  }, [messages, recv, messageText]);

  useEffect(() => {
    reset({
      message: '',
    });
  }, [messages]);

  // const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [reviewUserList, setReviewUserList] = useState<recruitParticipantsI>();
  const [selectedUser, setSelectedUser] = useState<participantI>();
  const scrollViewRef = useRef<any>(null);
  const [modal, setModal] = useState(false);
  const [eachUserModal, setEachUserModal] = useState(false);
  const handleModal = () => {
    modal
      ? (setModal(false), props.navigation.setParams({modal: false}))
      : (setModal(true), props.navigation.setParams({modal: true}));
  };
  const handleEachUserModal = () => {
    eachUserModal ? setEachUserModal(false) : setEachUserModal(true);
  };
  useEffect(() => {
    props.route.params.modal && setModal(props.route.params.modal);
  }, [props.route.params]);
  const getUsers = async id => {
    try {
      const result = await getReviewParticipantsAPI(id);
      setReviewUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    detailChat?.recruit.recruitId && getUsers(detailChat?.recruit.recruitId);
  }, [detailChat?.recruit.recruitId]);

  const currentTime = Date.now();
  const text =
    detailChat?.recruit.deactivateDate?.split(' ')[0] +
    'T' +
    detailChat?.recruit.deactivateDate?.split(' ')[1];
  const deactivateDate = new Date(text);
  deactivateDate.setHours(deactivateDate.getHours() + 3);
  let prevTime;
  return (
    <>
      <MemberListModal>
        <EachMemberModal />
      </MemberListModal>
      <View style={{flex: 1}}>
        {detailChat && participantsInfo && reviewUserList && (
          <ChatHeader
            item={detailChat}
            participants={participantsInfo}
            reviewUserList={reviewUserList}
          />
        )}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current &&
            scrollViewRef.current.scrollToEnd({animated: true})
          }
          style={{
            backgroundColor: WHITE_COLOR,
            width: '100%',
            height: `100%`,
            paddingTop: 30,
          }}>
          <View style={{paddingBottom: 300}}>
            <View
              style={{
                paddingHorizontal: 15,
              }}>
              <View style={{width: '100%'}}>
                {detailChat?.messages.map(
                  (v, i) =>
                    v.type === 'TALK' &&
                    v.message !== '' && (
                      <View key={i}>
                        {!prevTime
                          ? (prevTime = v.sendDate && (
                              <ChatDate item={v} key={i} />
                            ))
                          : (v.sendDate.split(' ')[0].split('-')[0] !==
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
                                  .split('-')[2]) && (
                              <ChatDate item={v} key={i} />
                            )}
                        {v.message !== '' && (
                          <Text key={`text-${v.messageId}`}>
                            {v.senderId === userId ? (
                              <MyMessage message={v} key={v.messageId} />
                            ) : (
                              <>
                                <OpponentMessage
                                  message={v}
                                  key={v.messageId}
                                />
                              </>
                            )}
                          </Text>
                        )}
                      </View>
                    ),
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        {deactivateDate.getTime() <= currentTime && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 10,
              width: '100%',
              height: 72,
              backgroundColor: 'rgba(33, 33, 35, 0.69);',
              justifyContent: 'center',
            }}>
            <TextKRBold
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                alignItems: 'center',
                textAlign: 'center',
              }}>
              모집 마감후 3시간까지만 채팅이 가능합니다
            </TextKRBold>
          </View>
        )}
        <KeyboardAvoidingView
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          }}
          behavior={'position'}
          keyboardVerticalOffset={44 + 44}
          // behavior={Platform.select({ios: 'padding'})}
          // keyboardVerticalOffset={statusBarHeight}
        >
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              backgroundColor: LINE_GRAY_COLOR,
              width: '100%',
              // paddingBottom: 44,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            {/* <TouchableOpacity>
      <Image source={CAMERA_GRAY_FILLED_ICON} />
    </TouchableOpacity> */}

            <MessageTextInput
              error={errors}
              name={'message'}
              control={control}
              rules={{}}
            />
            <TouchableOpacity
              onPress={handleSubmit(d => {
                try {
                  setMessageText(d.message);
                  sendMessage(d.message);
                  setValue('message', '');
                } catch (error) {
                  throw new Error('sendMessage error' + error);
                }

                // sendMessage(d.message);
              })}>
              <Image source={SEND_GRAY_FILLED_ICON} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default DetailChatRoom;

const styles = StyleSheet.create({
  Validation: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    textAlignVertical: 'center',
    color: ERROR_COLOR,
    marginLeft: 20,
  },
  margin: {
    marginLeft: 10,
  },
  Title: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
    color: PRIMARY_COLOR,
  },
  TitleInput: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    textAlignVertical: 'center',
  },
  Description: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
    paddingBottom: 18,
  },
  avoidingView: {
    // flex: 1,
  },
});
