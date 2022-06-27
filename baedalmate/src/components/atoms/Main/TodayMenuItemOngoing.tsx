import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WHITE_COLOR} from 'themes/theme';
import {Fonts} from '../../../assets/Fonts';
import {wrap} from 'module';
export type TodayMenuItemProps = {
  text: string;
};
import {STAR_PRIMARY} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {TagComponent} from './TodayMenuItem';
const TodayMenuItemOngoing = ({item}) => {
  return (
    <>
      <TagComponent item={item} />

      <View style={styles.imageSliderWrapper}>
        <Image
          source={{uri: item.imgUrl}}
          style={{
            width: 150,
            height: 114,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <View
          style={{
            width: 150,
            height: 114,
            padding: 12,
            justifyContent: 'space-evenly',
          }}>
          <TextKRBold style={{fontSize: 16}}>{item.title} </TextKRBold>

          <TextKRBold style={{textAlignVertical: 'center'}}>
            <Image
              source={STAR_PRIMARY}
              style={{width: 10, height: 10}}></Image>
            {item.user.userStarRate}
          </TextKRBold>
          <TextKRBold style={{fontWeight: '400'}}>
            배달팁{' '}
            <TextKRBold style={{fontWeight: 'bold'}}>
              {item.body.baedalTips
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </TextKRBold>
          </TextKRBold>
          <TextKRBold style={{fontWeight: '400'}}>
            최소주문{' '}
            <TextKRBold style={{fontWeight: 'bold'}}>
              {item.body.minCost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              원
            </TextKRBold>
          </TextKRBold>
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.minTime}분 ~ {item.body.maxTime}분
          </TextKRBold>
        </View>
      </View>
    </>
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

export default TodayMenuItemOngoing;
