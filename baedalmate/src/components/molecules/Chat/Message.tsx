import React from 'react';
import {MessageOrange, MessgaeGray} from 'components/atoms/Chat/Message';
import {StyleSheet, View} from 'react-native';
import {PRIMARY_COLOR} from 'themes/theme';

const Message = () => {
  return (
    <View>
      <MessageOrange text={'안녕하세요!'} />
      <MessgaeGray text={'계좌번호 알려주세요!'} />
      <MessageOrange text={'국민은행 1004-xxxxxxxxxxxxxxx 보내주세요~'} />
    </View>
  );
};

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

export {Message};
