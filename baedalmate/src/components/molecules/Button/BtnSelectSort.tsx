import React, {useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LINE_ORANGE_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import {TextKRBold, TextKRReg} from 'themes/text';
import BtnRadio from 'components/atoms/Button/BtnRadio';
export type TagProps = {
  text: string;
  active: boolean;
};

const BtnSelectSort = () => {
  const data = [{value: '마감순'}, {value: '인기순'}, {value: '가격순'}];
  const [option, setOption] = useState(null);

  return (
    <View>
      <BtnRadio data={data} onSelect={value => setOption(value)} />
    </View>
  );
};

const styles = StyleSheet.create({
  tagWrapper: {
    width: 55,
    height: 28,
    backgroundColor: LINE_ORANGE_COLOR,
    borderRadius: 10,
  },
  tagText: {
    color: WHITE_COLOR,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default BtnSelectSort;
