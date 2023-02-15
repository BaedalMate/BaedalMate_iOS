import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';
import {BoardListProps} from 'components/molecules/BoardList/BoardList';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MARKER_GRAY_4X_ICON,
  PRIMARY_COLOR,
  STORE_GRAY_ICON,
  TASK_GRAY_2X_ICON,
  TIME_GRAY_ICON,
  WHITE_COLOR,
} from 'themes/theme';
import {formDateWithDot} from 'components/utils/api/Chat';

const MyRecruitItem = ({item}: {item: BoardListProps}) => {
  const navigation = useNavigation();
  const [colour, setColour] = useState(WHITE_COLOR);
  const handlePress = () => {
    setColour('#FFF3F0');
  };
  const criteriaText =
    item.criteria === 'PRICE'
      ? '최소 주문'
      : item.criteria === 'NUMBER'
      ? '최소 인원'
      : '마감 시간';
  return (
    <TouchableHighlight
      style={[styles.boardItemWrapper]}
      activeOpacity={0.6}
      underlayColor="#FFF3F0"
      onPress={() => {
        navigation.navigate(
          '글 상세 보기' as never,
          {
            id: item.recruitId,
          } as never,
        );
      }}>
      <>
        <Image
          source={{
            uri: url + '/images/' + item.image,
          }}
          style={[styles.storeImg]}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
              width: '100%',
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19,
                flex: 1,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <TextKRBold
              style={{
                fontSize: 14,
                lineHeight: 17,
                color: PRIMARY_COLOR,
              }}>
              {item.active
                ? '모집 진행중'
                : item.cancel
                ? '모집 취소'
                : item.fail
                ? '모집 실패'
                : '모집 성공'}
            </TextKRBold>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 8,
            }}>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                color: DARK_GRAY_COLOR,
              }}>
              <Image source={STORE_GRAY_ICON} style={{width: 14, height: 12}} />{' '}
              {item.place}{' '}
            </TextKRReg>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                color: DARK_GRAY_COLOR,
              }}>
              <Image
                source={MARKER_GRAY_4X_ICON}
                style={{width: 10.86, height: 13}}
              />{' '}
              {item.dormitory}
            </TextKRReg>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                color: DARK_GRAY_COLOR,
              }}>
              <Image
                source={TASK_GRAY_2X_ICON}
                style={{width: 12, height: 16, resizeMode: 'contain'}}
              />{' '}
              {criteriaText}{' '}
            </TextKRReg>
            <TextKRReg
              style={{
                fontSize: 14,
                lineHeight: 24,
                flex: 1,
                color: DARK_GRAY_COLOR,
              }}>
              <Image source={TIME_GRAY_ICON} style={{width: 12, height: 12}} />{' '}
              {formDateWithDot(item.createDate)}
            </TextKRReg>
          </View>
        </View>
      </>
    </TouchableHighlight>
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

export default MyRecruitItem;
