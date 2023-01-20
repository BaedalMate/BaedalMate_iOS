import {useNavigation} from '@react-navigation/native';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {DARK_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const Description = ({item}: {item: RecruitItemProps | undefined}) => {
  const navigation = useNavigation();
  console.log(item);
  return (
    <View
      style={{
        marginHorizontal: 15,
      }}>
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <TextKRBold
          style={{
            color: PRIMARY_COLOR,
            fontSize: 16,
            // lineHeight: 24,
            // marginBottom: 13,
          }}>
          상세설명
        </TextKRBold>
        {item?.host && (
          <TouchableOpacity
            style={{borderBottomWidth: 1, borderColor: DARK_GRAY_COLOR}}
            onPress={() => {
              navigation.navigate(
                '상세 설정' as never,
                {type: 'UPDATE', defaultItem: item} as never,
              );
              // navigation.setParams({
              //   type: 'UPDATE',
              //   defaultItem: item,
              // } as never);
              // 임시 값. 변경 필요
            }}>
            <Text
              style={{
                color: DARK_GRAY_COLOR,
              }}>
              모집글 수정하기
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: 16}}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
          }}>
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Description;
