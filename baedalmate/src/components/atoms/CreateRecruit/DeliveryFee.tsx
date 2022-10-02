/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {Fonts} from 'assets/Fonts';
import {BtnWithTextProps} from 'components/molecules/Button/BtnHorizontal2';
import {deliveryFeeProps} from 'components/pages/CreateRecuit/first';
import React, {FC, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextKRReg} from 'themes/text';
import {WHITE_COLOR} from 'themes/theme';
import BtnAddDeliveryFee from '../Button/BtnAddDeliveryFee';
import BtnRemoveDeliveryFee from '../Button/BtnRemoveDeliveryFee';
const {StatusBarManager} = NativeModules;

const DeliveryFee: FC<deliveryFeeProps> = ({i, cnt, setCnt}) => {
  const [deliveryFeeRangeStart, setDeliveryFeeRangeStart] = useState('');
  const [deliveryFeeRangeEnd, setDeliveryFeeRangeEnd] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    Platform.OS == 'ios'
      ? StatusBarManager.getHeight(statusBarFrameData => {
          setStatusBarHeight(statusBarFrameData.height);
        })
      : null;
  }, []);
  return (
    <View
      style={{
        padding: 15,
        width: '100%',
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 15,
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextKRReg
              style={{
                width: '15%',
                fontSize: 14,
                lineHeight: 24,
                fontStyle: 'normal',
                display: 'flex',
                alignItems: 'center',
              }}>
              구간
            </TextKRReg>
            <TextInput
              style={{
                backgroundColor: WHITE_COLOR,
                width: '40%',
                height: 45,
                borderRadius: 10,
                padding: 15,
                textAlign: 'right',
                fontFamily: Fonts.Ko,
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 20,
                // textAlign: 'center',
                textAlignVertical: 'center',
              }}
              keyboardType={'number-pad'}
              value={
                deliveryFeeRangeStart.toString().split('원')[0]
                // priceFormat(minPrice.toString().split('원')[0])
                // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              onChangeText={start => setDeliveryFeeRangeStart(start)}>
              원
            </TextInput>
            <Text
              style={{
                width: '5%',
                textAlign: 'center',
              }}>
              ~
            </Text>
            <TextInput
              style={{
                backgroundColor: WHITE_COLOR,
                width: '40%',
                height: 45,
                borderRadius: 10,
                padding: 15,
                textAlign: 'right',
                fontFamily: Fonts.Ko,
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 20,
                // textAlign: 'center',
                textAlignVertical: 'center',
              }}
              keyboardType={'number-pad'}
              value={
                deliveryFeeRangeEnd.toString().split('원')[0]
                // priceFormat(minPrice.toString().split('원')[0])
                // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              onChangeText={end => setDeliveryFeeRangeEnd(end)}>
              원
            </TextInput>
          </View>
          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 15,
            }}>
            <TextKRReg
              style={{
                width: '15%',
                fontSize: 14,
                lineHeight: 20,
                fontStyle: 'normal',
                display: 'flex',
                alignItems: 'center',
              }}>
              금액
            </TextKRReg>
            <TextInput
              style={{
                backgroundColor: WHITE_COLOR,
                width: '85%',
                height: 45,
                borderRadius: 10,
                padding: 15,
                textAlign: 'right',
                fontFamily: Fonts.Ko,
                fontStyle: 'normal',
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 19,
                textAlignVertical: 'center',
              }}
              keyboardType={'number-pad'}
              value={
                deliveryFee.toString().split('원')[0]
                // priceFormat(minPrice.toString().split('원')[0])
                // .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              onChangeText={newDeliveryFee => setDeliveryFee(newDeliveryFee)}>
              원
            </TextInput>
          </View>
        </View>
        {cnt > 0 && i > 0 && (
          <BtnRemoveDeliveryFee
            onPress={() => {
              setCnt(cnt - 1);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCreateFloatingWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 60,
    backgroundColor: '#FB6C1C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  btnCreateFloatingText: {
    fontFamily: Fonts.Ko,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
});

export default DeliveryFee;
