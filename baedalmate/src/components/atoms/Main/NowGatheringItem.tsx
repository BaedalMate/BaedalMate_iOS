import React from 'react';

import {View, Image, ImageBackground} from 'react-native';
import {PEOPLE_WHITE, STAR_WHITE, TIMER_WHITE, WHITE_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {eachMainRecruitListI} from 'components/pages/Main';
import {formPrice} from 'components/utils/Main';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';

const NowGatheringItem = ({item}: {item: eachMainRecruitListI}) => {
  const now = new Date();
  const deadline = new Date(item?.deadlineDate);
  const time = deadline.getTime() - now.getTime();
  const durationYear = deadline.getFullYear() - now.getFullYear();
  const durationMonth = deadline.getMonth() - now.getMonth();
  const durationDate = deadline.getDate() - now.getDate();
  const durationHour = deadline.getHours() - now.getHours();
  const durationMinutes = deadline.getMinutes() - now.getMinutes();
  const durationSeconds = deadline.getSeconds() - now.getSeconds();
  const timeText =
    time > 0
      ? durationYear > 0
        ? durationYear + '년'
        : durationMonth > 0
        ? durationMonth + '달'
        : durationDate > 0
        ? durationDate + '일'
        : durationHour > 0
        ? durationHour + '시간'
        : durationMinutes > 0
        ? durationMinutes + '분'
        : '마감 임박'
      : '마감';

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          '글 상세 보기' as never,
          {
            id: item.id,
          } as never,
        );
      }}>
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
          source={{uri: url + '/images/' + item?.image}}
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
                <Image source={PEOPLE_WHITE} /> {item?.currentPeople}/
                {item?.minPeople}
                {'\t'}
                <Image source={TIMER_WHITE} /> {timeText}
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
                {item?.place}{' '}
              </TextKRBold>
              <TextKRReg style={{color: WHITE_COLOR}}>
                배달팁{' '}
                <TextKRBold style={{fontWeight: 'bold'}}>
                  {formPrice(item?.shippingFee)}원
                </TextKRBold>
              </TextKRReg>
              <TextKRReg style={{color: WHITE_COLOR}}>
                최소주문{' '}
                <TextKRBold style={{fontWeight: 'bold'}}>
                  {formPrice(item?.minPrice)}원
                </TextKRBold>
              </TextKRReg>
              <TextKRReg style={{color: WHITE_COLOR}}>
                {item?.username} &middot; {item?.dormitory}{' '}
                <Image
                  source={STAR_WHITE}
                  style={{width: 14, height: 14}}></Image>{' '}
                {item?.userScore}
              </TextKRReg>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

export default NowGatheringItem;
