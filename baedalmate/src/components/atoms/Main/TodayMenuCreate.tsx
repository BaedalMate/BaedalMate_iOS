import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLACK_COLOR, WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import {wrap} from 'module';
export type TodayMenuItemProps = {
  text: string;
};
import {STAR_PRIMARY} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
const RightArrowBlack = require('../../../assets/icons/arrow/right_arrow_black.png');

const TodayMenuItemCreate = ({item}) => {
  return (
    <View style={styles.imageSliderWrapper}>
      <Image
        source={{uri: item.imgUrl}}
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
          {item.title}
          {'\n'}
          <TextKRBold
            style={{
              color: WHITE_COLOR,
              fontSize: 12,
              position: 'absolute',
              lineHeight: 18,
              fontWeight: '400',
            }}>
            {item.description}
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
          {item.move}{' '}
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

        {/* <TextKRBold style={{textAlignVertical: 'center'}}>
          <Image source={STAR_PRIMARY} style={{width: 10, height: 10}}></Image>
          {item.body.starRate}
        </TextKRBold>
        <TextKRBold>
          배달팁{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.baedalTips}원
          </TextKRBold>
        </TextKRBold>
        <TextKRBold>
          최소주문{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.minCost}원
          </TextKRBold>
        </TextKRBold>
        <TextKRBold style={{fontWeight: 'bold'}}>
          {item.body.minTime}분 ~ {item.body.maxTime}분
        </TextKRBold> */}
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
