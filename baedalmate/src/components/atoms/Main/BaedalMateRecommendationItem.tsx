import React from 'react';

import {View, Image} from 'react-native';
import {
  LINE_GRAY_COLOR,
  PEOPLE_BLACK,
  STAR_BLACK,
  TIMER_BLACK,
} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {eachMainRecruitListI} from 'components/pages/Main';
import {formPrice} from 'components/utils/api/Recruit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';

const BaedalMateRecommendationItem = ({item}: {item: eachMainRecruitListI}) => {
  const now = new Date();
  const text =
    item?.deadlineDate.split(' ')[0] + 'T' + item?.deadlineDate.split(' ')[1];
  const deadline = new Date(text);
  const time = deadline.getTime() - now.getTime();
  const durationYear = deadline.getFullYear() - now.getFullYear();
  const durationMonth = deadline.getMonth() - now.getMonth();
  const durationDate = deadline.getDate() - now.getDate();
  const durationHour = deadline.getHours() - now.getHours();
  const durationMinutes = deadline.getMinutes() - now.getMinutes();
  const durationSeconds = deadline.getSeconds() - now.getSeconds();

  const timeText = !item.active
    ? '모집 완료'
    : time > 0
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
    : '모집 완료';

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(
          '글 상세 보기' as never,
          {
            id: item?.recruitId,
          } as never,
        );
      }}>
      <View
        style={{
          marginRight: 15,
          width: 150,
          minHeight: 204,
          borderRadius: 10,
        }}>
        <Image
          source={{uri: url + '/images/' + item?.image}}
          resizeMode="cover"
          // source={{uri: item.imgUrl}}
          style={{
            width: 150,
            height: 95,
            backgroundColor: LINE_GRAY_COLOR,
            borderRadius: 10,
          }}
        />
        {!item.active && (
          <View
            style={{
              position: 'absolute',
              width: 150,
              height: 95,
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: ' rgba(0, 0, 0, 0.5)',
              zIndex: 1,
            }}>
            <TextKRBold
              style={{
                color: 'white',
                display: 'flex',
                width: 150,
                height: 95,
                textAlign: 'center',
                lineHeight: 95,
                fontSize: 14,
              }}>
              모집완료
            </TextKRBold>
          </View>
        )}
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
            {item?.place}{' '}
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
              {item?.currentPeople}/{item?.minPeople}
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
              {timeText}
            </TextKRBold>
          </View>

          <TextKRReg>
            배달비{' '}
            <TextKRBold style={{fontWeight: 'bold'}}>
              {formPrice(item?.shippingFee)}원
            </TextKRBold>
          </TextKRReg>
          <TextKRReg>
            최소주문{' '}
            <TextKRBold style={{fontWeight: 'bold'}}>
              {formPrice(item?.minPrice)}원
            </TextKRBold>
          </TextKRReg>
          <TextKRReg>
            {item?.username} &middot; {item?.dormitory}{' '}
            <Image source={STAR_BLACK} style={{width: 14, height: 14}}></Image>{' '}
            {item?.userScore ? Math.round(item?.userScore * 10) / 10 : 0}
          </TextKRReg>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BaedalMateRecommendationItem;
