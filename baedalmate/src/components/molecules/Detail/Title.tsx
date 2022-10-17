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
  STAR_LINEORANGE,
  STAR_PRIMARY,
} from 'themes/theme';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const Title = ({item}: {item: RecruitItemProps | undefined}) => {
  return (
    <View
      style={{
        top: -19,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: BLACK_COLOR,
        marginHorizontal: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: LINE_GRAY_COLOR,
      }}>
      <TextKRBold
        style={{
          fontSize: 24,
          lineHeight: 33,
        }}>
        {item?.title}
      </TextKRBold>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Title;
