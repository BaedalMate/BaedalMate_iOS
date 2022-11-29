import React from 'react';
import {
  ChatProfileImage,
  MessageGray,
  MessageOrange,
} from 'components/atoms/Chat/Message';
import {StyleSheet, Text, View} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {formTime, messageI} from 'components/utils/Chat';
import {recvI, sendI} from 'components/pages/DetailChatRoom';

export const MyMessage = ({message}: {message: messageI}) => {
  const timeText =
    message?.sendDate.split(' ')[0] + 'T' + message?.sendDate.split(' ')[1];

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'bottom',
          marginRight: 15,
        }}>
        {formTime(timeText.toString())}
      </Text>
      <MessageOrange text={message.message} />
    </View>
  );
};

export const OpponentMessage = ({message}: {message: messageI}) => {
  const timeText =
    message?.sendDate.split(' ')[0] + 'T' + message?.sendDate.split(' ')[1];

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 7.5,
          width: 30,
        }}>
        <ChatProfileImage image={message.senderImage} />
        <Text style={{width: '100%'}}>{message.sender}</Text>
      </View>
      <MessageGray text={message.message} />
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'bottom',
          marginLeft: 15,
        }}>
        {formTime(timeText)}
      </Text>
    </View>
  );
};

export const LiveMyMessage = ({message}: {message: recvI}) => {
  const currentTime = new Date();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'bottom',
          marginRight: 15,
        }}>
        {formTime(new Date().toString())}
      </Text>
      <MessageOrange text={message.message} />
    </View>
  );
};

export const LiveOpponentMessage = ({message}: {message: recvI}) => {
  const currentTime = new Date();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
      }}>
      <ChatProfileImage image={message.senderImage} />
      <MessageGray text={message.message} />
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'bottom',
          marginLeft: 15,
        }}>
        {currentTime.toTimeString()}
      </Text>
    </View>
  );
};
// const Message = () => {
//   return (
//     <View>
//       <MyMessage text={'안녕하세요'} />
//       <OpponentMessage text={'반갑습니다ㄴ'} />
//       <MessageOrange text={'국민은행 1004-xxxxxxxxxxxxxxx 보내주세요~'} />
//     </View>
//   );
// };

const styles = StyleSheet.create({
  message: {},
  messageOrangeWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: PRIMARY_COLOR,
    right: 15,
  },
  messgaeGrayWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F8FA',
    left: 15,
  },
});

// export {Message};
