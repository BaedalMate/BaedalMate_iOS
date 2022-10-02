import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import UserInfo from 'components/molecules/Detail/UserInfo';
import Title from 'components/molecules/Detail/Title';
import ItemInfo from 'components/molecules/Detail/ItemInfo';
import Description from 'components/molecules/Detail/Description';
import BtnVerticalOrange from 'components/atoms/Button/BtnVerticalOrange';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfileImage from 'components/atoms/Image/UserImage';
import {TextKRBold, TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  BOTTOM_ARROW,
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MAP_GRAY,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import SelectDropdown from 'react-native-select-dropdown';
import {DormitoryList} from 'components/atoms/BottomSheet/ChangeDormitoryBottomSheet';
export type dormitory =
  | '누리학사'
  | '성림학사'
  | 'KB학사'
  | '불암학사'
  | '수림학사';
export interface RecruitItemProps {
  createDate: string;
  deadlineDate: string;
  deliveryFee: number;
  description: string;
  dormitory: string;
  id: number;
  minPeople: number;
  minPrice: number;
  participate: false;
  platform: string;
  thumbnailImage: string;
  title: string;
  userImage: string;
  userScore: number;
  username: string;
}
const dormitoryList = [
  '누리학사',
  '성림학사',
  'KB학사',
  '불암학사',
  '수림학사',
];
const CreateRecruit2 = props => {
  const [minPrice, setMinPrice] = useState(0);
  const [title, setTitle] = useState('');
  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView
        style={{
          backgroundColor: WHITE_COLOR,
          marginBottom: 150,
        }}>
        <View style={{}}>
          <View
            style={{
              padding: 15,
              display: 'flex',
            }}>
            <TextKRBold style={styles.Title}>주문 조건</TextKRBold>
          </View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>배달 거점</TextKRBold>
            <TextKRReg style={styles.Description}>
              모집 인원에 도달하면 모집이 완료됩니다
            </TextKRReg>
            <View
              style={{
                paddingVertical: 15,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    marginRight: 30,
                  }}>
                  서울과기대
                </Text>
                <SelectDropdown
                  buttonStyle={{
                    backgroundColor: WHITE_COLOR,
                    borderRadius: 10,
                    height: 45,
                    flex: 1,
                    // width: 255,
                  }}
                  dropdownStyle={{
                    borderRadius: 10,
                    backgroundColor: WHITE_COLOR,
                  }}
                  buttonTextStyle={{
                    fontSize: 14,
                    lineHeight: 17,
                    fontWeight: '700',
                  }}
                  rowTextStyle={{
                    fontSize: 14,
                    lineHeight: 24,
                    fontWeight: '400',
                  }}
                  data={dormitoryList}
                  defaultValueByIndex={0}
                  renderDropdownIcon={isOpened => {
                    return <Image source={BOTTOM_ARROW} />;
                  }}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </View>

              <TextInput
                style={{
                  width: '100%',
                  height: 45,
                  color: DARK_GRAY_COLOR,
                  borderBottomWidth: 1,
                  borderBottomColor: DARK_GRAY_COLOR,
                }}
                placeholder="배달을 받을 장소에 대한 설명을 적어주세요"></TextInput>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>
              배달 가게 <Image source={MAP_GRAY} />
            </TextKRBold>
            <View>
              <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: '100%',
                  height: 45,
                  borderRadius: 10,
                  padding: 15,
                }}></TextInput>
            </View>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>배달 플랫폼</TextKRBold>
            <View
              style={{
                justifyContent: 'space-between',
              }}></View>
          </View>
          <View
            style={{
              padding: 15,
              display: 'flex',
              backgroundColor: '#F7F8FA',
              borderBottomWidth: 5,
              borderBottomColor: WHITE_COLOR,
            }}>
            <TextKRBold style={styles.Label}>쿠폰 입력</TextKRBold>
            <TextKRReg style={styles.Description}>
              기존 금액에서 주최자의 쿠폰 사용금액만큼 할인된 후 배달비가 나누기
              됩니다.
            </TextKRReg>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextKRReg
                style={{
                  fontSize: 14,
                  lineHeight: 24,
                  fontStyle: 'normal',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                금액
              </TextKRReg>
              <TextInput
                style={{
                  backgroundColor: WHITE_COLOR,
                  width: 300,
                  height: 45,
                  borderRadius: 10,
                  padding: 15,
                  textAlign: 'right',
                }}
                keyboardType={'number-pad'}
                // ref={ref}
                value={
                  minPrice.toString().split('원')[0]
                  // priceFormat(minPrice.toString().split('원')[0])
                  // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }>
                {' '}
                원
              </TextInput>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <BtnCreateFloating
          onPress={() => props.navigation.navigate('상세 설정3')}
          text={'다음으로'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginLeft: 10,
  },
  Title: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    textAlignVertical: 'center',
    color: PRIMARY_COLOR,
  },
  TitleInput: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 15,
    // textAlign: 'center',
    textAlignVertical: 'center',
  },
  Description: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
    color: DARK_GRAY_COLOR,
  },
});

export default CreateRecruit2;
