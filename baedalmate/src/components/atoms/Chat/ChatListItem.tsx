import {useNavigation} from '@react-navigation/native';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import {chatRoomListI, eachChatRoomI} from 'components/utils/Chat';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MARKER_BLACK,
  STORE_BLACK,
  WHITE_COLOR,
} from 'themes/theme';

export const ChatListItem = ({item}: {item: eachChatRoomI}) => {
  console.log(item);
  const navigation = useNavigation();
  const [colour, setColour] = useState(WHITE_COLOR);
  const handlePress = () => {
    setColour('#FFF3F0');
  };
  return (
    <TouchableHighlight
      style={styles.boardItemWrapper}
      activeOpacity={0.6}
      underlayColor="#FFF3F0"
      onPress={() => {
        navigation.navigate(
          '채팅방' as never,
          {
            id: item.id,
          } as never,
        );
      }}>
      <>
        <Image
          source={
            {
              // uri: item !== null ? item.image : '',
            }
          }
          style={styles.storeImg}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <TextKRBold
              style={{
                fontSize: 16,
                lineHeight: 22,
              }}>
              {item.lastMessage.sender}
            </TextKRBold>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                color: DARK_GRAY_COLOR,
              }}>
              {item.lastMessage.sendDate}
            </TextKRReg>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                color: DARK_GRAY_COLOR,
              }}>
              {item.lastMessage.message}asdf
              {/* <Image source={STORE_BLACK} /> {item.lastMessage.sendDate}{' '} */}
            </TextKRReg>
            {/* <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
              }}>
              <Image source={MARKER_BLACK} /> {item.}
            </TextKRReg> */}
          </View>
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}></View> */}
        </View>
      </>
    </TouchableHighlight>
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

export default ChatListItem;
