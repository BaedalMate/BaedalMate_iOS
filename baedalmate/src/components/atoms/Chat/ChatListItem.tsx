import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {eachChatRoomI, formDate, formTime} from 'components/utils/api/Chat';
import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';

export const ChatListItem = ({item}: {item: eachChatRoomI}) => {
  console.log(item);
  const navigation = useNavigation();
  let duration = '';
  const dateString = item.lastMessage.sendDate;

  const time = dateString.replace(' ', 'T');
  const lastTime = new Date(time);
  const currentTime = new Date();
  const durationYear = currentTime.getFullYear() - lastTime.getFullYear();
  const durationMonth = currentTime.getMonth() - lastTime.getMonth();
  const durationDate = currentTime.getDate() - lastTime.getDate();
  const durationHour = currentTime.getHours() - lastTime.getHours();
  const durationMinutes = currentTime.getMinutes() - lastTime.getMinutes();
  const durationSeconds = currentTime.getSeconds() - lastTime.getSeconds();

  // durationYear > 0
  //   ? (duration = durationYear + '년 전')
  //   : durationMonth > 0
  //   ? (duration =durationMonth + '달 전')
  //   : durationDate > 0
  //   ? (duration= durationDate + '일 전')
  //   : durationHour > 0
  //   ? (duration=durationHour + '시간 전')
  //   : durationMinutes > 0
  //   ? (duration=durationMinutes + '분 전')
  //   : (duration= createDate: '방금 전');

  return (
    <TouchableHighlight
      style={styles.boardItemWrapper}
      activeOpacity={0.6}
      underlayColor="#FFF3F0"
      onPress={() => {
        navigation.navigate(
          '채팅방' as never,
          {
            id: item.chatRoomId,
          } as never,
        );
      }}>
      <>
        <Image
          source={{uri: url + '/images/' + item.image}}
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
              {currentTime.getDate() === lastTime.getDate()
                ? formTime(item.lastMessage.sendDate)
                : formDate(item.lastMessage.sendDate)}
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
              {item.lastMessage.message}
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
