import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import {recruitI} from 'components/utils/api/Chat';
import {formPrice} from 'components/utils/api/Recruit';
import React from 'react';
import {View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
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
          lineHeight: 20,
          color: MAIN_GRAY_COLOR,
        }}>
        {criteriaText}
      </TextKRReg>
    </View>
  );
};

const OrangeMainTag = ({item}: {item: BoardListProps | recruitI}) => {
  // const endCriteria =
  //   item.criteria === 'PRICE'
  //     ? item.minPrice.toString + '원'
  //     : item.criteria === 'NUMBER'
  //     ? item.minPeople + '인 모집'
  //     : item.deadlineDate;
  const now = new Date();
  const text =
    item?.deadlineDate.split(' ')[0] + 'T' + item?.deadlineDate.split(' ')[1];
  const deadline = new Date(text);
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
          ? '현재 ' + formPrice(item.currentPrice) + '원'
          : item.criteria === 'NUMBER'
          ? '현재인원' + item.currentPeople + '인'
          : timeText.includes('마감')
          ? timeText
          : timeText + ' 남음'}
        {/* 현재인원 {item.currentPeople}인 */}
      </TextKRBold>
    </View>
  );
};

const OrangeChatTag = ({item}: {item: BoardListProps | recruitI}) => {
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
        borderColor: LINE_ORANGE_COLOR,
        borderRadius: 20,
        marginRight: 10,
      }}>
      <TextKRReg
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: LINE_ORANGE_COLOR,
        }}>
        {criteriaText}
      </TextKRReg>
    </View>
  );
};

const WhiteTag = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: WHITE_COLOR,
        borderRadius: 15,
        marginRight: 10,
      }}>
      <TextKRReg
        style={{
          fontSize: 12,
          lineHeight: 18,
          color: DARK_GRAY_COLOR,
        }}>
        내 위치
      </TextKRReg>
    </View>
  );
};

export {GrayTag, OrangeMainTag, OrangeChatTag, WhiteTag};
