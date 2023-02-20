import React from 'react';
import {Image, NativeModules, Text, TouchableOpacity, View} from 'react-native';

import {BLACK_COLOR, WHITE_COLOR} from 'themes/theme';
import {useNavigation} from '@react-navigation/native';
import {detailRecruitI} from 'components/utils/api/Recruit';

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

export interface CategoryProps {
  categoryId: number;
  categoryName: string;
  categoryImg: any;
}
const SelectCategoryItem = ({
  item,
  defaultItem,
  selectedCategoryId,
  setSelectedCategoryId,
}: {
  item: CategoryProps;
  defaultItem?: detailRecruitI;
  selectedCategoryId?;
  setSelectedCategoryId?;
  type?;
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCategoryId(item.categoryId);
        navigation.navigate(
          '상세 설정1' as never,
          {item, defaultItem} as never,
        );
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
            opacity: item.categoryId === selectedCategoryId ? 0.3 : 1,

            // tintColor: 'gray',
            // borderWidth: 1,
            // borderColor: BLACK_COLOR,
            // opacity: 0.8,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 90,
            borderRadius: 10,
            backgroundColor: WHITE_COLOR,
            padding: 3,
          }}>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 14,
              lineHeight: 21,
              color: BLACK_COLOR,
              // textShadowColor: BLACK_COLOR,
              // backgroundColor: WHITE_COLOR,
              borderRadius: 10,
              // textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {item.categoryName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SelectCategoryItem;
