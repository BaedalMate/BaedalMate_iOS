import {MyPageI} from 'components/pages/Setting/MyPage';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextKRBold, TextKRReg} from 'themes/text';
import {PRIMARY_COLOR, STAR_WHITE} from 'themes/theme';
import {MyPageUserProfileImage} from '../Image/UserImage';
import {WhiteTag} from '../BoardList/Tags';
import {useNavigation} from '@react-navigation/native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const MyPageUserInfo = ({item}: {item: MyPageI | undefined}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: 120,
        width: '100%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        alignItems: 'stretch',
        padding: 15,
        flexDirection: 'column',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 55,
        }}>
        <View style={{flexDirection: 'row'}}>
          <MyPageUserProfileImage item={item} />

          <View
            style={{
              height: 55,
              justifyContent: 'space-between',
              alignItems: 'stretch',
            }}>
            <TextKRBold style={{color: 'white', fontSize: 18, lineHeight: 22}}>
              {item?.nickname}
            </TextKRBold>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                // height: 41,
                // marginLeft: 50,
                // justifyContent: 'flex-end',
                // bottom: 5,
                // justifyContent: 'flex-start',
              }}>
              <WhiteTag />
              <TextKRBold
                style={{color: 'white', fontSize: 14, lineHeight: 17}}>
                {item?.dormitory}
              </TextKRBold>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image source={STAR_WHITE} />
          <TextKRBold style={{color: 'white'}}>
            {' '}
            {item?.score ? Math.round(item?.score * 10) / 10 : 0}
          </TextKRBold>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginVertical: 15,
          // height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPressOut={() => {
            navigation.navigate('참여한 모집글' as never);
          }}>
          <TextKRReg style={{color: 'white'}}>참여한 모집글</TextKRReg>
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            height: 22,
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 10,
          }}></View>
        <TouchableOpacity
          onPressOut={() => {
            navigation.navigate('주최한 모집글' as never);
          }}>
          <TextKRReg style={{color: 'white'}}>주최한 모집글</TextKRReg>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          position: 'absolute',
          right: 15,
          height: 41,
          marginLeft: 11,
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPageUserInfo;
