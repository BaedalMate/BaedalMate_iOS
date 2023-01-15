import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {DARK_GRAY_COLOR, LINE_GRAY_COLOR} from 'themes/theme';

const NoticeListItem = ({item}: {item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.NoticeListItemWrapper}
      onPress={() =>
        navigation.navigate('상세 공지' as never, {id: item.noticeId} as never)
      }>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        <TextKRBold
          style={{
            fontSize: 18,
            color: DARK_GRAY_COLOR,
            marginBottom: 10,
          }}>
          {item.title}
        </TextKRBold>
        <TextKRReg
          style={{
            fontSize: 14,
            color: DARK_GRAY_COLOR,
          }}>
          {item.createDate}
        </TextKRReg>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  NoticeListItemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: LINE_GRAY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default NoticeListItem;
