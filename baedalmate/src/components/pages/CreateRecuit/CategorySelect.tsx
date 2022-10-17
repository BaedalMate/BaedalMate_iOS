import React, {useEffect, useRef, useState} from 'react';
import {
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {useController, useForm} from 'react-hook-form';
import {categoryData} from 'components/molecules/Main/Category';
import SelectCategoryItem from 'components/atoms/CreateRecruit/CategorySelect';

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

const SelectCategoryPage = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      minPrice: '',
      // minPeople: '',
      // orderHour: '',
      // orderMinute: '',
    },
  });
  const onSubmit = data => console.log(data);

  return (
    <View
      style={{
        backgroundColor: WHITE_COLOR,
      }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {categoryData.map(
            (v, i) => i !== 0 && <SelectCategoryItem item={v} key={i} />,
          )}
        </View>
      </ScrollView>
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

export default SelectCategoryPage;
