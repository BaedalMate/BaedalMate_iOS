import React from 'react';

import {View, Image} from 'react-native';
import {
  LINE_GRAY_COLOR,
  PEOPLE_BLACK,
  STAR_BLACK,
  TIMER_BLACK,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

const BaedalMateRecommendationItem = ({item}) => {
  return (
    <View
      style={{
        marginRight: 15,
        width: 150,
        minHeight: 204,
        borderRadius: 10,
      }}>
      <Image
        source={{uri: item.imgUrl}}
        resizeMode="cover"
        // source={{uri: item.imgUrl}}
        style={{
          width: 150,
          height: 95,
          backgroundColor: LINE_GRAY_COLOR,
          borderRadius: 10,
        }}
      />
      <View
        style={{
          width: '100%',
          marginVertical: 5,
          minHeight: 104,
        }}>
        <TextKRBold
          fontSize={16}
          style={{
            fontSize: 18,
          }}>
          {item.title}{' '}
        </TextKRBold>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'center',
          }}>
          <TextKRBold
            style={{
              flex: 1,
              fontSize: 14,
              marginBottom: 7,
              lineHeight: 20,
              marginRight: 17,
              justifyContent: 'center',
            }}>
            <Image
              source={PEOPLE_BLACK}
              style={{width: 17, height: 15, resizeMode: 'contain'}}
            />{' '}
            {item.body.curruntPeople}/{item.body.maxPeople}
          </TextKRBold>
          <TextKRBold
            style={{
              flex: 1.5,
              fontSize: 14,
              marginBottom: 7,
              lineHeight: 20,
              justifyContent: 'center',
            }}>
            {' '}
            <Image
              source={TIMER_BLACK}
              style={{width: 12, height: 15, resizeMode: 'contain'}}
            />{' '}
            {item.body.maxTime}분
          </TextKRBold>
        </View>

        <TextKRReg>
          배달팁{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.baedalTips
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </TextKRBold>
        </TextKRReg>
        <TextKRReg>
          최소주문{' '}
          <TextKRBold style={{fontWeight: 'bold'}}>
            {item.body.minCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </TextKRBold>
        </TextKRReg>
        <TextKRReg>
          {item.user.userName} &middot; {item.user.userAddress}{' '}
          <Image source={STAR_BLACK} style={{width: 14, height: 14}}></Image>{' '}
          {item.user.userStarRate}
        </TextKRReg>
      </View>
    </View>
  );
};

export default BaedalMateRecommendationItem;
