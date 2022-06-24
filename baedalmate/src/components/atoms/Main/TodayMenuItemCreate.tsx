import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLACK_COLOR, RightArrowBlack, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import {wrap} from 'module';
export type TodayMenuItemProps = {
  text: string;
};
import {STAR_PRIMARY} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

const TodayMenuItemCreate = () => {
  const createItemData = {
    title: '지금 먹고 싶은 메뉴가 생겼다면?',
    tag1: '글 작성하기',
    tag2: '',
    description: '합리적으로 배달시키세요!',
    move: '글 작성하러 가기',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt559x4ig-wTTMPcj3W9LD0dLvY6Ggi1E4L0WAP3IWcQ&s',
    // temporal imgUrl
  };
  return (
    <View style={styles.imageSliderWrapper}>
      <Image
        source={{uri: createItemData.imgUrl}}
        style={{
          width: 180,
          height: 114,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 180,
          height: 114,
          backgroundColor:
            'linear-gradient(0deg, rgba(33, 33, 35, 0.5), rgba(33, 33, 35, 0.5))',
          padding: 15,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}>
        <TextKRBold
          style={{
            position: 'absolute',
            width: 180,
            height: 114,
            color: WHITE_COLOR,
            padding: 15,
            fontSize: 16,
          }}>
          {createItemData.title}
          {'\n'}
          <TextKRBold
            style={{
              color: WHITE_COLOR,
              fontSize: 12,
              position: 'absolute',
              lineHeight: 18,
              fontWeight: '400',
            }}>
            {createItemData.description}
          </TextKRBold>
        </TextKRBold>
      </View>

      <View
        style={{
          width: 120,
          height: 114,
        }}>
        <TextKRBold
          style={{
            height: 30,
            position: 'absolute',
            bottom: 0,
            color: BLACK_COLOR,
            width: 100,
            padding: 8,
            fontSize: 12,
          }}>
          {createItemData.move}{' '}
        </TextKRBold>
        <Image
          source={RightArrowBlack}
          style={{
            position: 'absolute',
            bottom: 7,
            right: 12,
            width: 15,
            height: 15,
            resizeMode: 'contain',
            justifyContent: 'center',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSliderWrapper: {
    width: 300,
    height: 114,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageSliderItemCreateTitle: {
    color: '#FFFFFF',
    fontSize: 55,
    fontWeight: '200',
    lineHeight: 60,
  },
});

export default TodayMenuItemCreate;
