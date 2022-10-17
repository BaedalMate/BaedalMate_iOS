import React, {useEffect, useRef, useState} from 'react';
import DetailImage from 'components/atoms/Image/DetailImage';
import {
  Image,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  DECREASE_ACTIVE,
  DECREASE_DEACTIVE,
  INCREASE_ACTIVE,
  LINE_GRAY_COLOR,
  MAIN_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {useNavigation} from '@react-navigation/native';
import BtnHorizontal3 from 'components/molecules/Button/BtnHorizontal3';
import BtnRadio from 'components/atoms/Button/BtnRadio';
import {BtnActive, BtnDeactive} from 'components/atoms/Button/BtnEndStandard';
import BtnCreateFloating from 'components/atoms/Button/BtnCreateFloating';
import {RadioButton} from 'react-native-paper';
import BtnAddDeliveryFee from 'components/atoms/Button/BtnAddDeliveryFee';
import {Controller, useController, useForm} from 'react-hook-form';
import {categoryData} from 'components/molecules/Main/Category';

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

const {StatusBarManager} = NativeModules;
type endStandardType = 'people' | 'price' | 'time';
export interface deliveryFeeProps {
  i: number;
  cnt: number;
  setCnt: (cnt: number) => void;
}

const Input = ({name, control}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
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
      {/* <Controller
        control={control}
        rules={{required: true}}
        name={'minPrice'}
        render={({field: {onChange, onBlur, value}}) => ( */}
      <TextInput
        style={{
          backgroundColor: WHITE_COLOR,
          width: 300,
          height: 45,
          borderRadius: 10,
          padding: 15,
          textAlign: 'right',
          fontFamily: Fonts.Ko,
          fontStyle: 'normal',
          fontWeight: '700',
          fontSize: 16,
          lineHeight: 19,
          // textAlign: 'center',
          textAlignVertical: 'center',
        }}
        keyboardType={'number-pad'}
        // ref={ref}
        value={field.value.toString().split('원')[0]}
        onChangeText={field.onChange}>
        원
      </TextInput>
      {/* )}
      />
      {errors.minPrice && <Text>최소 주문 금액을 입력해주세요</Text>} */}
    </View>
  );
};
export interface CategoryProps {
  categoryId: number;
  categoryName: string;
  categoryImg: any;
}
const SelectCategoryItem = ({item}: {item: CategoryProps}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('상세 설정1' as never, item as never);
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Image
          source={item.categoryImg}
          style={{
            width: 124,
            height: 124,
            borderRadius: 62,
            backgroundColor: WHITE_COLOR,
            borderWidth: 1,
            borderColor: BLACK_COLOR,
            opacity: 0.5,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            top: 90,
            fontWeight: '900',
            fontSize: 18,
            lineHeight: 21,
            // color: WHITE_COLOR,
            // textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.categoryName}
        </Text>
      </View>
    </TouchableOpacity>
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
    textAlignVertical: 'center',
  },
  Label: {
    fontFamily: Fonts.Ko,
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
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
    paddingBottom: 18,
  },
  avoidingView: {
    // flex: 1,
  },
});

export default SelectCategoryItem;
