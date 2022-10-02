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
  PRIMARY_COLOR,
  QUESTION_MARK,
  STAR_LINEORANGE,
  STAR_PRIMARY,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const Description = ({item}: {item: RecruitItemProps | undefined}) => {
  return (
    <View
      style={{
        marginHorizontal: 15,
      }}>
      <TextKRBold
        style={{
          color: PRIMARY_COLOR,
          fontSize: 16,
          lineHeight: 24,
          marginBottom: 13,
        }}>
        상세설명
      </TextKRBold>
      <View>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
          }}>
          글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다.
          글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다.
          글에 대한 내용이 적힐 부분입니다. 글에 대한 내용이 적힐 부분입니다.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Description;
