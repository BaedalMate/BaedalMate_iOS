import React from 'react';
import {View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_ORANGE_COLOR} from 'themes/theme';

const SortActive = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          width: 4,
          height: 27,
          borderRadius: 10,
          backgroundColor: LINE_ORANGE_COLOR,
          marginRight: 6,
        }}
      />
      <TextKRBold
        style={{
          fontSize: 14,
          lineHeight: 20,
        }}>
        마감순
      </TextKRBold>
    </View>
  );
};

const SortDefault = ({text}: {text: string}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
      }}>
      <View
        style={{
          width: 4,
          height: 16,
          borderRadius: 10,
          backgroundColor: DARK_GRAY_COLOR,
          marginRight: 6,
        }}
      />
      <TextKRReg
        style={{
          fontSize: 14,
          lineHeight: 24,
          color: DARK_GRAY_COLOR,
        }}>
        {text}
      </TextKRReg>
    </View>
  );
};

export {SortActive, SortDefault};
