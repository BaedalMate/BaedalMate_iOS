import React, {useEffect, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
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
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';

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
const CreateRecruit4 = props => {
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
          <View>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>추가 메뉴</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>배달 메뉴</TextKRBold>
              <View></View>
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 15,
                display: 'flex',
              }}>
              <TextKRBold style={styles.Title}>결제하기</TextKRBold>
            </View>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#F7F8FA',
                borderBottomWidth: 5,
                borderBottomColor: WHITE_COLOR,
              }}>
              <TextKRBold style={styles.Label}>결제금액</TextKRBold>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextKRReg
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontStyle: 'normal',
                    }}>
                    총 주문 금액
                  </TextKRReg>
                  <TextKRReg
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontStyle: 'normal',
                    }}>
                    원
                  </TextKRReg>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
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
                    배달팁
                  </TextKRReg>
                  <TextKRReg
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontStyle: 'normal',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    원
                  </TextKRReg>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}>
                  <TextKRBold
                    style={{
                      fontSize: 14,
                      lineHeight: 24,
                      fontStyle: 'normal',
                    }}>
                    원
                  </TextKRBold>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          marginHorizontal: 15,
        }}>
        <BtnCreateFloating
          onPress={() => props.navigation.navigate('Main')}
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

export default CreateRecruit4;
