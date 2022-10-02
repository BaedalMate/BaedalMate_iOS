import React from 'react';

import {View, Image, ImageBackground} from 'react-native';
import {PEOPLE_WHITE, STAR_WHITE, TIMER_WHITE, WHITE_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';

const NowGatheringItem = ({item}) => {
  return (
    <View
      style={{
        // backgroundColor: LIGHT_GRAY_COLOR,
        marginRight: 15,
        width: 180,
        height: 224,
        borderRadius: 10,
      }}>
      <ImageBackground
        resizeMode="cover"
        source={{uri: item.imgUrl}}
        style={{
          width: '100%',
          height: '100%',
        }}
        imageStyle={{
          borderRadius: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.7,
            backgroundColor: 'rgba(33, 33, 35, 100)',
            borderRadius: 10,
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              paddingTop: 10,
              paddingRight: 15,
            }}>
            <TextKRBold
              style={{
                color: WHITE_COLOR,
                fontSize: 16,
              }}>
              <Image source={PEOPLE_WHITE} /> {item.body.curruntPeople}/
              {item.body.maxPeople}
              {'\t'}
              <Image source={TIMER_WHITE} /> {item.body.maxTime}분
            </TextKRBold>
          </View>

          <View
            style={{
              paddingLeft: 15,
              paddingTop: 87,
            }}>
            <TextKRBold
              fontSize={18}
              style={{
                color: WHITE_COLOR,
                marginBottom: 10,
                fontSize: 18,
              }}>
              {item.title}{' '}
            </TextKRBold>
            <TextKRReg style={{color: WHITE_COLOR}}>
              배달팁{' '}
              <TextKRBold style={{fontWeight: 'bold'}}>
                {item.body.baedalTips
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </TextKRBold>
            </TextKRReg>
            <TextKRReg style={{color: WHITE_COLOR}}>
              최소주문{' '}
              <TextKRBold style={{fontWeight: 'bold'}}>
                {item.body.minCost
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </TextKRBold>
            </TextKRReg>
            <TextKRReg style={{color: WHITE_COLOR}}>
              {item.user.userName} &middot; {item.user.userAddress}{' '}
              <Image
                source={STAR_WHITE}
                style={{width: 14, height: 14}}></Image>{' '}
              {item.user.userStarRate}
            </TextKRReg>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NowGatheringItem;
