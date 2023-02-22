import React from 'react';

import {View, Image, ImageBackground} from 'react-native';
import {PEOPLE_WHITE, STAR_WHITE, TIMER_WHITE, WHITE_COLOR} from 'themes/theme';
import {TextKRBold, TextKRReg} from 'themes/text';
import {eachMainRecruitListI} from 'components/pages/Main';
import {formPrice} from 'components/utils/api/Recruit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {url} from '../../../../App';

const NowGatheringItem = ({item}: {item: eachMainRecruitListI}) => {
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
            id: item.recruitId,
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
                {item.active && (
                  <>
                    {'\t'}
                    <Image source={TIMER_WHITE} /> {timeText}
                  </>
                )}
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
                배달비{' '}
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
                {item?.userScore ? Math.round(item?.userScore * 10) / 10 : 0}
              </TextKRReg>
            </View>
          </View>
        </ImageBackground>
      </View>
      {!item.active && (
        <View
          style={{
            position: 'absolute',
            marginRight: 15,
            width: 180,
            height: 224,
            borderRadius: 10,
            flexDirection: 'row',
            backgroundColor: ' rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}>
          <TextKRBold
            style={{
              color: 'white',
              display: 'flex',
              width: 180,
              height: 224,
              marginRight: 15,
              textAlign: 'center',
              lineHeight: 150,
              fontSize: 18,
            }}>
            모집완료
          </TextKRBold>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NowGatheringItem;
