import UserProfileImage from 'components/atoms/Image/UserImage';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {
  BLACK_COLOR,
  DARK_GRAY_COLOR,
  LINE_GRAY_COLOR,
  MARKER_BLACK,
  QUESTION_MARK,
  STAR_LINEORANGE,
  STAR_PRIMARY,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const ItemInfo = ({item}: {item: RecruitItemProps | undefined}) => {
  return (
    <View
      style={{
        top: -19,
        height: 85,
        display: 'flex',
        alignItems: 'center',
        borderColor: LINE_GRAY_COLOR,
        marginHorizontal: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          width: '100%',
          height: 55,
          justifyContent: 'space-around',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            마감시간
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            18시 30분
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 22,
              textAlign: 'center',
            }}>
            배달비
            <TouchableOpacity
              style={{
                paddingLeft: 3,
              }}>
              <Image
                source={QUESTION_MARK}
                style={{
                  paddingLeft: 3,
                }}
              />
            </TouchableOpacity>
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            15,000원
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            모집인원
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            1명 / 4명
          </TextKRBold>
        </View>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: DARK_GRAY_COLOR,
              fontSize: 14,
              lineHeight: 24,
              textAlign: 'center',
            }}>
            배달거점
          </Text>
          <TextKRBold
            style={{
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'center',
            }}>
            수림학사
          </TextKRBold>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemInfo;