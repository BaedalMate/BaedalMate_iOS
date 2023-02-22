import React from 'react';

import {View} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {TextKRBold} from 'themes/text';

export type UserAddressProps = {
  onPress(): void;
  text: string;
};

const UserInfoTitle = ({userName}: {userName: string}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: 4,
          backgroundColor: WHITE_COLOR,
          borderRadius: 10,
        }}>
        <TextKRBold
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 24,
            color: PRIMARY_COLOR,
            fontWeight: 'bold',
            lineHeight: 32,
            justifyContent: 'center',
          }}>
          {userName}
        </TextKRBold>
      </View>
      <View
        style={{padding: 4, justifyContent: 'center', alignItems: 'center'}}>
        <TextKRBold
          style={{
            color: WHITE_COLOR,
            fontSize: 24,
            fontWeight: 'bold',
          }}>
          님 주변 모집글🍴
        </TextKRBold>
      </View>
    </View>
  );
};

export default UserInfoTitle;
