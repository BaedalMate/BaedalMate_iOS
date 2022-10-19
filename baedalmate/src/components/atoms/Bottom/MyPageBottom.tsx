import {url} from '../../../../App';
import {RecruitItemProps} from 'components/pages/Detail';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export type BtnWithoutTextProps = {
  onPress(): void;
};

const MyPageBottom = () => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            paddingVertical: 15,
            textAlign: 'center',
            borderWidth: 1,
            borderRadius: 10,
          }}>
          고객센터
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            paddingVertical: 15,
            textAlign: 'center',
            borderWidth: 1,
            borderRadius: 10,
          }}>
          문의사항
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MyPageBottom;
