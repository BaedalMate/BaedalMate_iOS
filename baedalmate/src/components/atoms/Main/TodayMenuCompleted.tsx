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
const TodayMenuItemCompleted = ({item}) => {
  return (
    <View>
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
          <TextKRBold>{item.title} </TextKRBold>

          <TextKRBold style={{textAlignVertical: 'center'}}>
            <Image
              source={STAR_PRIMARY}
              style={{width: 10, height: 10}}></Image>
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
          </TextKRBold>
        </View>
        <View style={styles.imageSliderInactiveWrapper}>
          <Text
            style={{
              color: 'white',
              display: 'flex',
              width: 150,
              height: 114,
              textAlign: 'center',
              lineHeight: 114,
            }}>
            모집완료
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSliderInactiveWrapper: {
    position: 'absolute',
    width: 300,
    height: 114,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(33, 33, 35, 0.7)',
    zIndex: 1,
  },
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
    display: 'flex',
  },
});

export default TodayMenuItemCompleted;
