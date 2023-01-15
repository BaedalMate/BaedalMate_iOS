/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BOTTOM_ARROW_MAIN,
  DARK_GRAY_COLOR,
  PRIMARY_COLOR,
  RIGHT_ARROW_GRAY_THIN,
} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';

const ReportListItem = ({type, item, onPress, selectedReportReason}) => {
  return (
    <View>
      <TouchableOpacity style={styles.myPageListItem} onPress={onPress}>
        <Text
          style={[
            styles.mypageText,
            selectedReportReason === item.value
              ? {color: PRIMARY_COLOR}
              : {color: DARK_GRAY_COLOR},
          ]}>
          {item.name}
        </Text>
        <Image
          source={
            selectedReportReason === item.value
              ? BOTTOM_ARROW_MAIN
              : RIGHT_ARROW_GRAY_THIN
          }
          style={
            selectedReportReason === item.value
              ? {width: 14, height: 10}
              : {width: 9, height: 14}
          }
        />
      </TouchableOpacity>
      {((type === 'ITEM' && item.value === 7 && selectedReportReason === 7) ||
        (type === 'USER' &&
          item.value === 6 &&
          selectedReportReason === 6)) && (
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: PRIMARY_COLOR,
            borderRadius: 3,
            width: '100%',
            height: 138,
            fontSize: 13,
            lineHeight: 18,
            color: '#313131',
            padding: 15,
          }}
          placeholder={'신고 사유를 작성해주세요. (100자 이내)'}
          placeholderTextColor={'#C8C8C8'}
          multiline
          maxLength={100}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  myPageListItem: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mypageText: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    // color: DARK_GRAY_COLOR,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ReportListItem;
