import {useNavigation} from '@react-navigation/native';
import {OrangeMainTag} from 'components/atoms/BoardList/Tags';
import BtnMap from 'components/atoms/Button/BtnMap';
import Tag from 'components/atoms/Main/Tag';
import {RecruitItemProps} from 'components/pages/Detail';
import {detailRecruitI} from 'components/utils/api/Recruit';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {DARK_GRAY_COLOR, PRIMARY_COLOR} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const Description = ({
  item,
  defaultItem,
}: {
  item: RecruitItemProps | undefined;
  defaultItem: detailRecruitI | undefined;
}) => {
  const navigation = useNavigation();
  console.log('defaultItem', defaultItem);
  return (
    <View
      style={{
        marginHorizontal: 15,
      }}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            // alignItems: 'center',
            // alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <TextKRBold
              style={{
                color: PRIMARY_COLOR,
                fontSize: 16,
                marginRight: 5,
                // lineHeight: 24,
                // marginBottom: 13,
              }}>
              배달가게
            </TextKRBold>
            <BtnMap
              onPress={() => {
                navigation.navigate(
                  '지도' as never,
                  {
                    name: item?.place.name,
                    x: item?.place.x,
                    y: item?.place.y,
                  } as never,
                );
              }}
              text={'지도보기'}
            />
            {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                '지도' as never,
                {
                  name: item?.place.name,
                  x: item?.place.x,
                  y: item?.place.y,
                } as never,
              );
            }}>
            < text={'지도보기'} />
          </TouchableOpacity> */}
          </View>
          {item?.host && (
            <TouchableOpacity
              style={{borderBottomWidth: 1, borderColor: DARK_GRAY_COLOR}}
              onPress={() => {
                navigation.navigate(
                  '상세 설정' as never,
                  {type: 'UPDATE', defaultItem} as never,
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
        <Text
          style={{
            marginTop: 4,
            fontSize: 16,
            lineHeight: 24,
          }}>
          {item?.place.name}
        </Text>
      </View>
      <View style={{marginTop: 16}}>
        <TextKRBold
          style={{
            color: PRIMARY_COLOR,
            fontSize: 16,
            // lineHeight: 24,
            // marginBottom: 13,
          }}>
          상세설명
        </TextKRBold>
        <Text
          style={{
            marginTop: 16,
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
