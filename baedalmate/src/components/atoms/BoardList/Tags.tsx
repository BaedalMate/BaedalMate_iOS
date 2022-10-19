import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import {eachDetailChatRoomI, recruitI} from 'components/utils/Chat';
import {formPrice} from 'components/utils/Main';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  LINE_GRAY_COLOR,
  LINE_ORANGE_COLOR,
  MAIN_GRAY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';

export type criteria = 'PRICE' | 'NUMBER' | 'TIME';
const GrayTag = ({item}: {item: BoardListProps | recruitI}) => {
  const criteriaText =
    item.criteria === 'PRICE'
      ? '최소주문'
      : item.criteria === 'NUMBER'
      ? '최소인원'
      : '마감시간';
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 7,
        backgroundColor: WHITE_COLOR,
        borderWidth: 1,
        borderColor: MAIN_GRAY_COLOR,
        borderRadius: 20,
        marginRight: 10,
      }}>
      <TextKRReg
        style={{
          fontSize: 14,
          lineHeight: 24,
          color: MAIN_GRAY_COLOR,
        }}>
        {criteriaText}
      </TextKRReg>
    </View>
  );
};

const OrangeTag = ({item}: {item: BoardListProps | recruitI}) => {
  // const endCriteria =
  //   item.criteria === 'PRICE'
  //     ? item.minPrice.toString + '원'
  //     : item.criteria === 'NUMBER'
  //     ? item.minPeople + '인 모집'
  //     : item.deadlineDate;
  const now = new Date();
  const deadline = new Date(item.deadlineDate);
  const time = deadline.getTime() - now.getTime();
  const durationYear = deadline.getFullYear() - now.getFullYear();
  const durationMonth = deadline.getMonth() - now.getMonth();
  const durationDate = deadline.getDate() - now.getDate();
  const durationHour = deadline.getHours() - now.getHours();
  const durationMinutes = deadline.getMinutes() - now.getMinutes();
  const durationSeconds = deadline.getSeconds() - now.getSeconds();
  const timeText =
    time < 0
      ? '마감'
      : durationYear > 0
      ? durationYear + '년'
      : durationMonth > 0
      ? durationMonth + '달'
      : durationDate > 0
      ? durationDate + '일'
      : durationHour > 0
      ? durationHour + '시간'
      : durationMinutes > 0
      ? durationMinutes + '분'
      : '마감 임박';
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 7,
        backgroundColor: WHITE_COLOR,
        borderWidth: 1,
        borderColor: LINE_ORANGE_COLOR,
        borderRadius: 20,
        marginRight: 10,
      }}>
      <TextKRReg
        style={{
          fontSize: 14,
          lineHeight: 24,
          color: LINE_ORANGE_COLOR,
        }}>
        {item.criteria === 'PRICE'
          ? formPrice(item.minPrice) + '원'
          : item.criteria === 'NUMBER'
          ? item.minPeople + '인 모집'
          : deadline.getHours() + ':' + deadline.getMinutes()}{' '}
        | {/* {item.minPeople}인 모집 |{' '} */}
      </TextKRReg>
      <TextKRBold
        style={{
          fontSize: 14,
          lineHeight: 24,
          color: LINE_ORANGE_COLOR,
        }}>
        {item.criteria === 'PRICE'
          ? '현재 ' + formPrice(item.minPrice) + '원'
          : item.criteria === 'NUMBER'
          ? '현재인원' + item.minPeople + '인'
          : timeText.includes('마감')
          ? timeText
          : timeText + ' 남음'}
        {/* 현재인원 {item.currentPeople}인 */}
      </TextKRBold>
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

export {GrayTag, OrangeTag};
