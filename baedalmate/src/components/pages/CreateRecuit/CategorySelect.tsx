import React from 'react';
import {NativeModules, ScrollView, StyleSheet, View} from 'react-native';

import {Fonts} from 'assets/Fonts';
import {DARK_GRAY_COLOR, PRIMARY_COLOR, WHITE_COLOR} from 'themes/theme';
import {useForm} from 'react-hook-form';
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

export interface deliveryFeeProps {
  i: number;
  cnt: number;
  setCnt: (cnt: number) => void;
}

const SelectCategoryPage = () => {
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

export default SelectCategoryPage;
