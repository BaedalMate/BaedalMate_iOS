import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  LINE_ORANGE_COLOR,
  WHITE_COLOR,
} from 'themes/theme';

const SortActive = ({text}: {text: string}) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextKRReg
        style={{
          width: 55,
          height: 24,
          borderRadius: 3,
          borderWidth: 1,
          backgroundCoolor: LINE_ORANGE_COLOR,
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 24,
          color: WHITE_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        {text}
      </TextKRReg>
    </TouchableOpacity>
  );
};

const SortDefault = ({item, selectedSort, setSelectedSort}) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 8,
      }}
      onPress={() => setSelectedSort(item.value)}>
      <TextKRReg
        style={{
          width: 55,
          height: 24,
          borderRadius: 3,
          borderWidth: 1,
          borderColor: LINE_GRAY_COLOR,
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 24,
          backgroundColor:
            item.value === selectedSort ? LINE_ORANGE_COLOR : WHITE_COLOR,
          color: item.value === selectedSort ? WHITE_COLOR : DARK_GRAY_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        {item.name}
      </TextKRReg>
    </TouchableOpacity>
  );
};

export {SortActive, SortDefault};
