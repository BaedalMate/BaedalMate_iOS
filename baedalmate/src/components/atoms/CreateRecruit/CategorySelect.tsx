import React from 'react';
import {
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {TextKRReg} from 'themes/text';
import {Fonts} from 'assets/Fonts';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from 'themes/theme';
import {useNavigation} from '@react-navigation/native';
import {useController} from 'react-hook-form';

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
            // opacity: 0.8,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 80,
            borderRadius: 10,
            backgroundColor: WHITE_COLOR,
            padding: 5,
          }}>
          <Text
            style={{
              fontWeight: '900',
              fontSize: 18,
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
