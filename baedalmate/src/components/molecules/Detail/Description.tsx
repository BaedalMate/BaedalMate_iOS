import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextKRBold} from 'themes/text';
import {PRIMARY_COLOR} from 'themes/theme';

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
          {item?.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Description;
