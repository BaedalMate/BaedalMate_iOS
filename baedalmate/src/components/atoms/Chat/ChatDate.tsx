import {formDate, messageI} from 'components/utils/api/Chat';
import React from 'react';
import {Text, View} from 'react-native';
import {MAIN_GRAY_COLOR} from 'themes/theme';

export const ChatDate = ({item}: {item: messageI}) => {
  const timeText =
    item?.sendDate.split(' ')[0] + 'T' + item?.sendDate.split(' ')[1];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          marginVertical: 24,
          marginHorizontal: 15,
          width: '30%',
          height: 1,
          backgroundColor: MAIN_GRAY_COLOR,
        }}
      />
      <View>
        <Text>{formDate(timeText)}</Text>
      </View>
      <View
        style={{
          marginVertical: 24,
          marginHorizontal: 15,
          width: '30%',
          height: 1,
          backgroundColor: MAIN_GRAY_COLOR,
        }}
      />
    </View>
  );
};

export default ChatDate;
