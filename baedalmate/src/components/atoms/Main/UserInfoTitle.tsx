import React from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {
  ALARM_WHITE,
  PRIMARY_COLOR,
  SEARCH_WHITE,
  WHITE_COLOR,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
const UserInfoTitle = ({userName, userAddress}) => {
  return (
    <>
      <View
        style={{
          minWidth: 180,
          height: 90,
          flexDirection: 'row',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextKRBold
          style={{
            color: WHITE_COLOR,
            fontSize: 24,
            fontWeight: 'bold',
            lineHeight: 34,
          }}>
          <View
            style={{
              backgroundColor: WHITE_COLOR,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextKRBold
              style={{
                padding: 3,
                paddingBottom: 0,
                fontSize: 24,
                color: PRIMARY_COLOR,
                fontWeight: 'bold',
                lineHeight: 30,
              }}>
              {userName}
            </TextKRBold>
          </View>
          님을 위한{'\n'}오늘의 메뉴
        </TextKRBold>
      </View>
      <View
        style={{
          alignSelf: 'flex-start',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
        }}>
        <TextKRBold style={{color: WHITE_COLOR, fontWeight: '400'}}>
          배달 거점{'\t'}
          <TextKRBold style={{fontWeight: 'bold'}}>{userAddress}</TextKRBold>
        </TextKRBold>
        {/* 해당 부분 화살표가 선택지인지 혹은 그냥 디자인인지 확인 필요 */}
      </View>
    </>
  );
};

export default UserInfoTitle;
