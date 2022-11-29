import {useNavigation} from '@react-navigation/native';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import {
  chatRoomListI,
  eachChatRoomI,
  formDate,
  messageI,
} from 'components/utils/Chat';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  MARKER_BLACK,
  STORE_BLACK,
  WHITE_COLOR,
} from 'themes/theme';

export const ChatDate = ({item}: {item: messageI}) => {
  // console.log(item);
  const navigation = useNavigation();
  const [colour, setColour] = useState(WHITE_COLOR);
  const handlePress = () => {
    setColour('#FFF3F0');
  };
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

const styles = StyleSheet.create({
  boardItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 15,
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  storeImg: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    marginRight: 15,
  },
});

export default ChatDate;
