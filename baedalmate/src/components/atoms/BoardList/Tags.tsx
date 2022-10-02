import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  LINE_GRAY_COLOR,
  LINE_ORANGE_COLOR,
  MAIN_GRAY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';

const GrayTag = ({item}: {item: BoardListProps}) => {
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
        최소인원
      </TextKRReg>
    </View>
  );
};

const OrangeTag = ({item}: {item: BoardListProps}) => {
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
        {item.minPeople}인 모집 |{' '}
      </TextKRReg>
      <TextKRBold
        style={{
          fontSize: 14,
          lineHeight: 24,
          color: LINE_ORANGE_COLOR,
        }}>
        현재인원 {item.currentPeople}인
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
